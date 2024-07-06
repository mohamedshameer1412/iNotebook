import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container addnote my-3">
            <h2>Add a Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label notes--field">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} autoComplete='off' onChange={onChange} minLength={3} required />
                    <div id="textHelp" className="form-text">*Title must be atleast 3 characters long.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label notes--field">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} autoComplete='off' onChange={onChange} minLength={5} required />
                    <div id="descriptionHelp" className="form-text">*Description must be atleast 5 characters long.</div>

                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label notes--field">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} autoComplete='off' onChange={onChange} />
                    <div id="emailHelp" className="form-text">Enter tag to easily categorize notes.</div>
                </div>
                <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary btn-block my-2 addnote--btn" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
