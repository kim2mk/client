import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const OnePet = () => {

    const { id } = useParams()

    const [details, setDetails] = useState({});
    const [notFound, setNotFound] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then(response => {
                console.log(response)
                if (response.data.results) {
                    setDetails(response.data.results)
                } else {
                    setNotFound(true)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const deletePet = () => {
        axios.delete(`http://localhost:8000/api/pets/delete/${id}`)
            .then(response => {
                console.log(response)
                navigate("/")
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <a href="/">Back to Home</a>
            {
                notFound === true ?
                    <h3>Hey something is wrong</h3> :
                    <>
                        <h3 className='m-3'>Details about: {details.name}</h3>
                        <h4>Pet type:</h4>
                            <p>{details.type}</p>
                        <h4>Description:</h4>
                            <p>{details.description}</p>
                        <h4>Skills:</h4>
                            <p>{details.skill1}</p>
                            <p>{details.skill2}</p>
                            <p>{details.skill3}</p>
                        <button onClick={deletePet} className='btn btn-danger'>Adopt {details.name}</button>
                    </>
            }
        </div>
    );
};


export default OnePet;