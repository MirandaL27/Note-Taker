const path = require("path");
const express = require("express");
const app = express();
let {notes} = require('./db/db.json');
const { filterByQuery, makeNewNote, validateNote, updateNote, deleteNote} = require('./lib/notes');
const uuid = require('uuid');

const PORT = process.env.PORT || 3001;

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static('public'));


 app.get('/api/notes', (req, res) => {
    res.json(notes);
 }) 

 app.post('/api/notes', (req, res) => {
   req.body.id = uuid.v4();
  if (!validateNote(req.body)) {
    res.status(400).send('The note is not properly formatted.');
  } else {
    const note = makeNewNote(notes, req.body);
    res.json(note);
  }
 })

 app.delete('/api/notes/:id', (req, res) => {
   notes = deleteNote(req.params.id, notes)
   res.send("Success");
})

 app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
 })

 app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
 })

  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });