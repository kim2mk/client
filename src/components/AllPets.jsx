import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Link
} from "react-router-dom";

const AllPets = (props) => {

    let [pets, setPet] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets")
            .then(response => {
                setPet(response.data.results);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <a href="/pets/new">Add a pet to the shelter</a>
            <h3>These pets are looking for a good home</h3>
            {
                pets.map((Pet) => {
                    return (
                        <div key={Pet._id} className='card'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td>{Pet.name}</td>
                                    <td>{Pet.type}</td>
                                    <td>
                                        <p><Link to={`/pets/${Pet._id}`}>Details</Link> | <Link to={`/pets/edit/${Pet._id}`}>Edit</Link></p>
                                    </td>
                                </tbody>
                            </table>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default AllPets;
