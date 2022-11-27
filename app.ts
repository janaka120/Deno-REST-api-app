// const message = "Hello world";

// const encorder = new TextEncoder();
// const data = encorder.encode(message);

// Deno.writeFile('message.txt', data).then(result => {
//     console.log('Wrote to file!');
// });


// run app ==> deno run .\app.ts
// run app with write primission ==> deno run --allow-write .\app.ts

import { Application, Context } from "https://deno.land/x/oak/mod.ts";
import tododRoutes from "./routes/todo.ts";


const app = new Application();

// if you use async middleware below as `tododRoutes`, you have to register all middleware as `async`
app.use( async(ctx, next) => {
    console.log('Middleware');
    await next();
});

app.use(tododRoutes.routes());
app.use(tododRoutes.allowedMethods());

await app.listen({ port: 8000 });