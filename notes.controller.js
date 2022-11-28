const fs = require('fs/promises');
const path = require('path')
const chalk = require ('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title){
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)

   await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, { encoding: 'utf-8'});
    return Array.isArray(JSON.parse(notes)) ?JSON.parse(notes) : []
}

async function printNotes () {
    const notes = await getNotes()

    console.log(chalk.bgBlue('HEREEEEE'))
    notes.forEach(element => {
        console.log(chalk.yellow(element.id),chalk.green(element.title))
    });
}

async function deleteNotes(id){
    const notes = await getNotes();
     const newNotes = notes.filter(n=>{n.id !== id});
     await fs.writeFile(notesPath, JSON.stringify(newNotes));
}

async function editNotes(id){
    const notes = await getNotes(); 
    const newNotes = notes.forEach(element => {
        element.id === id
    });     
    console.log(newNotes)
    await fs.writeFile(notesPath, JSON.stringify(...notes,newNotes))
}

module.exports = {
    addNote, getNotes,printNotes,deleteNotes,editNotes
}