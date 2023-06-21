import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import validate from './validate'
import { postUser } from "../../../Redux/Actions/Actions";
import { RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine, RiUserLine } from 'react-icons/ri'
import { HiOutlineIdentification } from "react-icons/hi";
import { FaPhone } from "react-icons/fa";
import './Register.css'
import NavBar from "../../Nav/NavBar";



function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const initialState = {
        name: '',
        lastName: '',
        dni: '',
        telephone: '',
        eMail: '',
        password: '',
    };

    const [input, setInput] = useState(initialState);
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        console.log(e.target.value)
    }
    function handleOnBlur() {
        let objErr = validate(input);
        setErrors(objErr)
    }

    function handleRegister(e) {
        const newUser = {
            name: input.name,
            lastName: input.lastName,
            dni: input.dni,
            telephone: input.telephone,
            eMail: input.eMail,
            password: input.password
        }
        e.preventDefault();
        dispatch(postUser(newUser));
        alert('Your user has been created succesfully');
        setInput(initialState)
    }

    return (
        <div>
            <h1>Create account</h1>
            {/* <NavBar /> */}
            <form className="format" onSubmit={(e) => handleRegister(e)}>
                <div className="boxes">
                    <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 focus:border text-primary" />
                    <input
                        className="inputs"
                        type='text'
                        name='name'
                        value={input.name}
                        placeholder='Name'
                        onChange={(e) => handleChange(e)}
                        onBlur={(e) => handleOnBlur(e)}
                    />
                </div>
                {errors.name && (
                    <p className="error-text">
                        {errors.name}
                    </p>
                )}
                <div className="boxes">
                    <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                    <input
                        type='text'
                        name='lastName'
                        value={input.lastName}
                        className='inputs'
                        placeholder='Last Name'
                        onChange={(e) => handleChange(e)}
                        onBlur={(e) => handleOnBlur(e)}
                    />
                </div>
                {errors.lastName && (
                    <p className="error-text">
                        {errors.lastName}
                    </p>
                )}
                <div className="boxes">
                    <HiOutlineIdentification
                        className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                    <input
                        type='text'
                        name='dni'
                        value={input.dni}
                        className='inputs'
                        placeholder='DNI'
                        onChange={(e) => handleChange(e)}
                        onBlur={(e) => handleOnBlur(e)}
                    />
                </div>
                {errors.dni && (
                    <p className="error-text">{errors.dni}</p>
                )}
                <div className="boxes">
                    <FaPhone className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                    <input
                        type='text'
                        name='telephone'
                        value={input.telephone}
                        className='inputs'
                        placeholder='Telephone'
                        onChange={(e) => handleChange(e)}
                        onBlur={(e) => handleOnBlur(e)}
                    />
                </div>
                {errors.telephone && (
                    <p className="error-text">
                        {errors.telephone}
                    </p>
                )}
                <div className="boxes">
                    <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
                    <input
                        type='text'
                        name='eMail'
                        value={input.eMail}
                        className='inputs'
                        placeholder='Email Address'
                        onChange={(e) => handleChange(e)}
                        onBlur={(e) => handleOnBlur(e)}
                    />
                </div>
                {errors.mail && (
                    <p className="error-text">
                        {errors.eMail}
                    </p>
                )}
                <div className="boxes">
                    <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2  text-primary" />
                    <input
                        type="password"
                        name="password"
                        value={input.password}
                        className="inputs"
                        placeholder="Password"
                        onChange={(e) => handleChange(e)}
                        onBlur={(e) => handleOnBlur(e)}
                    />
                    {/* {showPassword ? (
                        <RiEyeLine
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer  text-primary"
                        />
                    ) : (
                        <RiEyeOffLine
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer  text-primary"
                        />
                    )}
                    */}
                    {errors.password && (
                        <p className="error-text">{errors.password}</p>
                    )}
                    <div>
                    </div>
                </div>
                <button
                    type='submit'
                    disabled={
                        !input.name ||
                        !input.lastName ||
                        !input.dni ||
                        !input.eMail ||
                        !input.password ||
                        Object.keys(errors).length > 0
                    }
                    className='button-box'
                > Sign Up
                </button>
           
            </form>
        </div>
    )
}
export default Register;