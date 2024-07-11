const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { encrypt, decrypt } = require('../utils/encryption');


// Route 1: Get all the notes using: GET "/api/auth/fetchallnotes". Login required
// here basically fetchUser is another file which is working as a middleware for us
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        let notes = await Note.find({ user: req.user.id });
        notes.map((e) => {
            e.title = e.title.replace(e.title, decrypt(e.title));
            e.description = e.description.replace(e.description, decrypt(e.description));
            e.tag = e.tag.replace(e.tag, decrypt(e.tag))
        });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});


// Route 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post(
    "/addnote",
    fetchuser,
    [
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body("description", "Description must be atleast 5 characters").isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        try {
            let { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            title = encrypt(title);
            description = encrypt(description);
            tag = encrypt(tag);


            //creating the new note
            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id,
            });
            let savedNote = await note.save();
            savedNote.title = decrypt(savedNote.title);
            savedNote.description = decrypt(savedNote.description);
            savedNote.tag = decrypt(savedNote.tag)

            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);


// Route 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};

        const secTitle = encrypt(title);
        const secDescription = encrypt(description);
        const secTag = encrypt(tag);

        if (title) {
            newNote.title = secTitle;
        }
        if (description) {
            newNote.description = secDescription;
        }
        if (tag) {
            newNote.tag = secTag;
        }

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        //If user is trying to update note of some other person then we have to send warning 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: newNote },
            { new: true }
        );
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// Route 4: Deleting an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        // Allow deletion only if user owns the note

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ Success: "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;