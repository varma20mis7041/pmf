const express = require('express')
const cors = require('cors')
const app = express();

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))


app.listen(3000,()=>{
    console.log("server started")
})

app.get("/test",(request,response)=>{
    response.send("Hello")
})

app.post("/api/submit",(req,res)=>{
    const files = req.body.files;
    for(const [fileName,content] of Object.entries(files)){
        console.log(`file name : ${fileName}`)
        console.log("content");
        console.log(content);
        console.log("\n------------\n")
    }
    res.send("api end point")
})


// const server = Bun.serve({
//     port:3000,
//     async fetch(req){
//         if(req.method === "POST" && req.url==="/api/submit"){
//             const body = await req.json()
//             console.log("Recieved data : ",body)
//             return new Response(body)
//         }
//         return new Response("Hello")
//     }
// })


// console.log(`server started at ${server.port}"`)