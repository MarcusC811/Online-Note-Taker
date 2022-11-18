const api = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

api.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);
    let prevNotes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));

    const { title, text } = req.body;

    const newNotes = {
        title,
        text,
        id: uuid()
    }
    prevNotes.push(newNotes);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(prevNotes));
    // Re-render the notes list
    res.json(prevNotes);
})

api.get('/notes', (req, res) => {
    let prevNotes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
    // Renders db file
    res.json(prevNotes);
})

 api.delete('/notes/:id', (req, res) => {
    let prevNotes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
    let keepNotes = prevNotes.filter(item => {
        return item.id !== req.params.id
    })

    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(keepNotes));
    res.json(keepNotes);

 })

module.exports = api;