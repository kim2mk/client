import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const EditPet = (props) => {

    const { id } = useParams()

    let [formErrors, setFormErrors] = useState({});
    const [details, setDetails] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then(response => {
                console.log(response)
                if (response.data.results) {
                    setDetails(response.data.results)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const changeHandler = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/pets/edit/${id}`, details)
            .then(response => {
                if (response.data.errors) {
                    setFormErrors(response.data.errors);
                } else {
                    setFormErrors({})
                    navigate("/")
                    props.setFormSubmitted(!props.formSubmitted)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <a href="/">Back to Home</a>
            <h3 className='m-3'>Edit {details.name}</h3>
            <form onSubmit={submitHandler}>
                <div className='form-group'>
                    <label>Pet Name:</label>
                    <input type="text" name="name" className='form-control' value={details.name} onChange={changeHandler} />
                    <p className="text-danger">{formErrors.name?.message}</p>
                </div>
                <div className='form-group'>
                    <label>Pet Type:</label>
                    <input type="text" name="type" className='form-control' value={details.type} onChange={changeHandler} />
                    <p className="text-danger">{formErrors.type?.message}</p>
                </div>
                <div className='form-group mb-5'>
                    <label>Pet Description:</label>
                    <input type="text" name="description" className='form-control' value={details.description} onChange={changeHandler} />
                    <p className="text-danger">{formErrors.description?.message}</p>
                </div>
                <p>Skills (optional): </p>
                <div className='form-group mb-3'>
                    <label>Skill 1:</label>
                    <input type="text" name="skill1" className='form-control' value={details.skill1} onChange={changeHandler} />
                </div>
                <div className='form-group mb-3'>
                    <label>Skill 2:</label>
                    <input type="text" name="skill2" className='form-control' value={details.skill2} onChange={changeHandler} />
                </div>
                <div className='form-group'>
                    <label>Skill 3:</label>
                    <input type="text" name="skill3" className='form-control' value={details.skill3} onChange={changeHandler} />
                </div>
                <input type="submit" value="Edit Pet" className='btn btn-primary m-3' />
            </form>
        </div>
    );
};



export default EditPet;
