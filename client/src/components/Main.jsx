import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Main = (props) => {
    const [authors, setAuthors] = useState([]);
    //grab info from the DB
    useEffect(()=>{
        axios.get('http://localhost:8000/api/authors')
        .then(res => {
            console.log(res.data)
            setAuthors(res.data)
            })
        .catch(err => {console.log(err)})
    }, [])

    //DELETE ONE
    const deleteOne = (authId) => {
        console.log(authId)
        axios.delete('http://localhost:8000/api/authors/'+ authId)
            .then((res)=> {
                console.log(res.data)
                const filteredAuthors = authors.filter((eachAuthor) => {
                    if(eachAuthor._id === authId){
                        return false
                    } else {
                        return true
                    }
                })
                setAuthors(filteredAuthors)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <Link to={'/new'}>Add an Author</Link>
            <h2>We have quotes</h2>
            <table style={{border: "black"}}>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Actions Available</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        authors.map((author)=>{
                            return (
                                <tr key={author._id}>
                                    <td>{author.name}</td>
                                    <td>
                                        <Link to={`/edit/${author._id}`}>edit</Link>
                                        <button onClick={() => deleteOne(author._id)}>delete</button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Main