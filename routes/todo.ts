import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

interface Todo {
    id: string;
    text: string;
}

let todos: Todo[] = [];

router.get('/', (ctx) => {
    ctx.response.body = {todos: todos};
});
router.post('/todo', async (ctx) => {
    const body = await ctx.request.body();
    const values = await body.value;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text:  values.text
    }

    todos.push(newTodo);

    return ctx.response.body = {message: "Created todo!", todo: newTodo};
});
router.put('/todo/:todoId', async (ctx) => {
    const todoId = ctx.params.todoId;
    const body = await ctx.request.body();
    const values = await body.value;
    const todoIndex = todos.findIndex(todo => {
        return todo.id === todoId
    });

    todos[todoIndex] = {id: todos[todoIndex].id, text: values.text};
    ctx.response.body = {message: "Updated todo!", todos: todos};
});
router.delete('/todo/:todoId', (ctx) => {
    const todoId = ctx.params.todoId;
    todos = todos.filter(todo => todo.id !== todoId);

    ctx.response.body = {message: "Deleted todo!", todos: todos};
});

export default router;