const api = require('express').Router();

api.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);

    const { title, text } = req.body;

    const newNotes = {
        title,
        text
    }

    console.log(newNotes);
})

module.exports = api;