const fs = require("fs");
const path = require("path");


const makeNewNote = (noteArray, data) => {
//make new note here! 
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


const deleteNote = (id, notesArray) => {
//delete notes here! 
    let note = {};
    notesArray.forEach(data => {
        if(data.id === id){
            note = data;
        }
    })
    if(!note.title){
        return {message: 'Candidate not found'};
    }
    notesArray = notesArray.filter(data => data.id != id);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    )
    return notesArray; 
}
module.exports = {makeNewNote, validateNote, deleteNote}
