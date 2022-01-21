const router = require('express').Router();
const { makeNewNote, validateNote, deleteNote } = require('../../lib/notes');
let { notes } = require('../../db/db.json');
const uuid = require('uuid');

 router.get('/notes', (req, res) => {
    res.json(notes);
 }) 

 router.post('/notes', (req, res) => {
   req.body.id = uuid.v4();
  if (!validateNote(req.body)) {
    res.status(400).send('The note is not properly formatted.');
  } else {
    const note = makeNewNote(notes, req.body);
    res.json(note);
  }
 })

 router.delete('/notes/:id', (req, res) => {
   notes = deleteNote(req.params.id, notes)
   res.send("Success");
})

module.exports  = router;