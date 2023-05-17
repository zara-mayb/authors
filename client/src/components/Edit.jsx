import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {
    //Create an array to store errors from the API
    const [errors, setErrors] = useState([]); 

    const {id} = useParams();
    const nav = useNavigate();
    const [name, setName] = useState("");
    //grab from db
    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${id}`)
        .then((res) => {
            console.log(res.data)
            setName(res.data.name)
        })
        .catch((err) => console.log(err) )
    }, [id])

    const updateOne = (e) => {
        e.preventDefault();
        const tempAuthor = {
            name:name
        }
        axios.patch('http://localhost:8000/api/authors/'+id, tempAuthor)
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
    //nav back to main
    const cancel = () => {
        nav(-1);
    }
    return (
        <div>
            <Link to={'/'}>Home</Link>
            <h2>Edit this author:</h2>
            <fieldset>
                <form onSubmit={updateOne}>
                    <p>
                        name: 
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    </p>
                    <button onClick={cancel}>Cancel</button>
                    <button type='submit'>Submit</button>
                </form>
            </fieldset>
            <div> {errors.map((err, index) => <p style={{color: "red"}} key={index}>{err}</p>)}</div>
        </div>
    )
}

export default Edit