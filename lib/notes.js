const fs = require("fs");
const path = require("path");

const filterByQuery = (notesArray, query) => {
//filter notes array by query here! Read
//notes have a title and text
let filteredNotes = notesArray;
if(query.title){
    filteredNotes = filteredNotes.filter(message => message.title === query.title);
}
if(query.text){
    filteredNotes = filteredNotes.filter(message => message.text === query.text);
}
return filteredNotes;
}

function findNoteById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
  }

const makeNewNote = (noteArray, data) => {
//make new note here! Create
const note = data;
noteArray.push(note);
fs.writeFileSync(
  path.join(__dirname, '../db/db.json'),
  JSON.stringify({notes: noteArray}, null, 2)
);
return note;
}

const validateNote = (note) => {
//check notes to make sure they're valid here
if (!note.title || typeof note.title !== 'string') {
    return false;
  }
if (!note.text || typeof note.text !== 'string') {
    return false;
  }
  return true;
}

const updateNote = (id, notesArray, note) => {
    //update an existing note here! Update
    //update the array first
    //then write the array to the file
    notesArray.foreach(data => {
        if(data.id === id){
            data.title = note.title;
            data.text = note.text;
        }
    });
    console.log(notesArray);
    fs.writeFileSync(
        path.join(_dirname, '../db/db.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    )
    return note;
}

const deleteNote = (id, notesArray) => {
//delete notes here! Delete
    let filteredArray = notesArray;
    filteredArray = filteredArray.filter(data => data.id != id);
    fs.writeFileSync(
        path.join(_dirname, '../db/db.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    )
    return; 
}
module.exports = {filterByQuery,findNoteById, makeNewNote, validateNote, updateNote, deleteNote}
