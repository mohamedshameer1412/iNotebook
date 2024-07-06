import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="cards card-body mb-2 mt-2">
                    <div className="d-inline-flex align-items-center gap-1">
                        <h5 className="card-title">{note.title}</h5>
                        <div className="d-flex flex-row position-absolute top-0 end-0 mx-2 mt-2">
                            <i className="far fa-trash-alt mx-2" onClick={() => { deleteNote(note._id) }}></i>
                            <i className="far fa-edit mx-2" onClick={() => { updateNote(note) }}></i>
                        </div>
                    </div>
                    <p className="form-text">Note Tag: {note.tag}</p>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem
