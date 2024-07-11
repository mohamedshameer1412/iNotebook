import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from "../context/notes/noteContext";
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [filteredNotes, setFilteredNotes] = useState([]);
    
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    };

    const handleClick = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        // Filter notes based on searchQuery
        if (props.searchQuery.trim() !== '') {
            const filtered = notes.filter(note =>
                note.title.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
                note.description.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
                note.tag.toLowerCase().includes(props.searchQuery.toLowerCase())
            );
            setFilteredNotes(filtered);
        } else {
            setFilteredNotes(notes);
        }
    }, [props.searchQuery, notes]);

    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade mt-3" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 notes--title" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label notes--field">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" autoComplete='off' value={note.etitle || ""} onChange={onChange} minLength={3} required />
                                    <div id="textHelp" className="form-text">*Title must be at least 3 characters long.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label notes--field">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' autoComplete='off' value={note.edescription || ""} onChange={onChange} minLength={5} required />
                                    <div id="descriptionHelp" className="form-text">*Description must be at least 5 characters long.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label notes--field">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' autoComplete='off' value={note.etag || ""} onChange={onChange} />
                                    <div id="emailHelp" className="form-text">Enter a tag to easily categorize notes.</div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary btn-block" disabled={note.etitle.length < 3 || note.edescription.length < 5} onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <div className="col-md-8">
                    <h2>Your Notes</h2>
                </div>
                {/* <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control my-3"
                        placeholder="Search Notes..."
                        value={props.searchQuery}
                        onChange={(e) => props.setSearchQuery(e.target.value)}
                    />
                </div> */}
                <div className="container mx-2">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {filteredNotes.map((note) => (
                    <Noteitem key={note._id} updateNote={updateNote} note={note} />
                ))}
            </div>
        </>
    );
};

export default Notes;
