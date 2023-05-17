import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const New = () => {
    //navigate
    const nav = useNavigate();
    //state vars for the form
    const [name, setName] = useState("");
    //Create an array to store errors from the API
    const [errors, setErrors] = useState([]); 
    //CREATE
    const createOne = (e) => {
        e.preventDefault();
        const tempAuthor = {
            name:name
        }
        axios.post('http://localhost:8000/api/authors/', tempAuthor)
            .then( res => {
                console.log(res.data)
                nav("/")
            })
            .catch((err) => {
                console.log("XXX", err)
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }
    //CANCEL
    const cancel = () => {
        nav(`/`);
    };
    return (
        <div>
            <Link to={'/'}>Home</Link>
            <fieldset>
                <form onSubmit={createOne}>
                    <p>
                        name: 
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    </p>
                    <button onClick={cancel}>Cancel</button>
                    <button>Submit</button>
                </form>
            </fieldset>
            <div> {errors.map((err, index) => <p style={{color: "red"}} key={index}>{err}</p>)}</div>
        </div>
    )
}

export default New