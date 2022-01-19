const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const {notes} = require('../db/db');
const { filterByQuery, makeNewNote, validateNote, updateNote, deleteNote} = require('../lib/notes');

const PORT = process.env.PORT || 3001;

  // parse incoming string or array data
  app.use(express.urlencoded({ extended: true }));
  // parse incoming JSON data
  app.use(express.json());
  app.use(express.static('public'));


 app.get('/notes', (req, res) => {
    //return notes here - filterByQuery
    res.send("hello world!");
 }) 
 //need a post route for posting new notes
 //need a route for deleting notes

 app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
 })

 app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });