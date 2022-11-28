const http = require('http');
const chalk = require('chalk');
const fs = require('fs/promises');
const path = require('path');
const {addNote,getNotes,deleteNotes, editNotes} =require('./notes.controller');
const { title } = require('process');
const express = require('express');


const port = 3000

// const basePath = path.join(__dirname,'pages')

const app = express();

app.use(express.json())

app.set('view engine', 'ejs');
app.set('views','pages'); 

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(express.urlencoded({
    extended: true
}))

app.get('/', async(req,res) =>{
    // res.sendFile(path.join(basePath, "index.html"))
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created:false
    })
})

app.post('/', async(req,res) =>{
    await addNote(req.body.title)
    // res.sendFile(path.join(basePath, "index.html"))
    res.render('index',{
        title: 'Express App',
        notes: await getNotes(),
        created: true
    })
})

app.delete('/:id',async(req,res)=>{
    deleteNotes(req.params.id)
    res.render('index',{
        title: 'Express App',
        notes: await getNotes(),
        created: false
    })
})

app.put('/:id', async(req,res)=>{
    editNotes(req.params.id)
    res.render('index', {
        title: 'Express App', 
        notes: await getNotes(),
        created: false
    })
})

app.listen(port, ()=>{
    console.log(chalk.green(`Server on port ${port}`))
})

// ТЕСТОВЫЙ СЕРВЕР
// const server = http.createServer(async(req,res)=>{
//     if(req.method === "GET"){
//         const content = await fs.readFile(path.join(basePath, "index.html"));
//         // res.setHeader('Content-type', 'text/html');
//         res.writeHead(200, {
//             'Content-type': 'text/html'
//         });
//         res.end(content);
//     }
//     else if (req.method=== "POST"){
//         const body = [];
//         res.writeHead (200,{
//             'Content-type': 'text/plain; charset = utf-8'
//         })
//         req.on('data',data =>{
//             body.push(Buffer.from(data))
//         })

//         req.on ('end', ()=>{
//             const title = body.toString().split('=')[1].replaceAll('+', ' ');
//             addNote(title)
//             res.end(`Title = ${title}`)
//         })
        
//     }
//     // res.end("Hello from server")
// })

// server.listen(port, ()=>{
//     console.log(chalk.green(`Server on port ${port}`))
// })







// ПРОБА РАБОТЫ С ФЕЙКОВЫМ СЕРВЕРОМ
// const yargs = require('yargs');
// const {addNote,getNotes,printNotes,deleteNotes} = require('./notes.controller')

// yargs.command({
//     command: "add",
//     describe: "add new note to list",
//     builder:{
//         title:{
//             type: "string",
//             describe:"Note title",
//             demandOption: true
//         }
//     },
//     handler({title}) {
//         addNote(title)
//     }
// })

// yargs.command({
//     command: "list",
//     describe: "print all notes",
//     async handler() {
//         const note = await getNotes();
//         printNotes();
//     }
// })

// yargs.command({
//     command: "delete",
//     describe: " delete note ",
//     async handler({id}){
//         deleteNotes(id)
//     }
// })

// yargs.parse()