import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Form = (props) => {

    let [formInfo, setFormInfo] = useState({});
    let [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const changeHandler = (e)=>{
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/pets",formInfo)
            .then(response=>{
                console.log("response has been submitted", response)
                if(response.data.errors){
                    setFormErrors(response.data.errors);
                } else{
                    setFormErrors({})
                    navigate("/")
                    props.setFormSubmitted(!props.formSubmitted)
                }
            })
            .catch(err=>console.log(err))
    }


    return (
        <div>
            <a href="/">Back to Home</a>
            <h3 className='m-3'>Know a pet needing a home?</h3>
            <form onSubmit={submitHandler}>
                <div className='form-group'>
                    <label>Pet Name:</label>
                    <input type="text" name="name" className='form-control' onChange={changeHandler}/>
                    <p className="text-danger">{formErrors.name?.message}</p>
                </div>
                <div className='form-group'>
                    <label>Pet Type:</label>
                    <input type="text" name="type" className='form-control' onChange={changeHandler}/>
                    <p className="text-danger">{formErrors.type?.message}</p>
                </div>
                <div className='form-group mb-5'>
                    <label>Pet Description:</label>
                    <input type="text" name="description" className='form-control' onChange={changeHandler}/>
                    <p className="text-danger">{formErrors.description?.message}</p>
                </div>
                <p>Skills (optional): </p>
                <div className='form-group mb-3'>
                    <label>Skill 1:</label>
                    <input type="text" name="skill1" className='form-control' onChange={changeHandler}/>
                </div>
                <div className='form-group mb-3'>
                    <label>Skill 2:</label>
                    <input type="text" name="skill2" className='form-control' onChange={changeHandler}/>
                </div>
                <div className='form-group'>
                    <label>Skill 3:</label>
                    <input type="text" name="skill3" className='form-control' onChange={changeHandler}/>
                </div>
                <input type="submit" value="Add Pet" className='btn btn-primary m-3' />
            </form>
        </div>
    );
};



export default Form;