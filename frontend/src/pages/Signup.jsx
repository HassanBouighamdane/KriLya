import React from 'react';
import { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import img from '../assets/images/bg.jpg';
import logo from '../assets/images/logo-nobg.png';
import { MyContext } from '../providers/UserProvider';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../App.css'
import API from '../services/API';

const baseUrl = "http://localhost:8080";

function Signup() {
    const { data, setData } = useContext(MyContext);
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .required('Username is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const createProfile =async ()=> {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({bio: ""}),
        };
        fetch(API.PROFILE.CREATE, options)
        .then(response => console.log(response))
        .catch(err => console.log(err));
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        await axios.post(`${baseUrl}/users/auth/register`,{
            "username" : values.username,
            "email" : values.email,
            "password"  : values.password
        })
            .then((res)=> {
                console.log(res);
                localStorage.setItem('jwtToken', res.data.token);
                localStorage.setItem('userId', res.data.user.id);
                createProfile()
                setData(true);
                navigate("/")
            })
            .catch((err)=> {
                console.log(err);
            })
        setSubmitting(false);
    };

    return (
        <div className='max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-10'>
            <div className='md:order-1 flex justify-center'>
                <img src={img} alt="img" className="" />
            </div>
            <div className="md:order-2 flex justify-center items-center">
            

            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={validationSchema} // Use validation schema
                onSubmit={handleSubmit} // Use form submission function
            >
                {({ isSubmitting, errors }) => (
                    
                    <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/3 bg-gray-100">
                    <img src={logo} alt="Logo" className="logo" />
                    <h1>Create your account for free</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                        <Field placeholder="Username" type="text" name="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        <ErrorMessage name="email" component="i" className="error-message text-red-500 text-xs" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Email
                        </label>
                        <Field placeholder="email@example.com" type="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        <ErrorMessage name="email" component="i" className="error-message text-red-500 text-xs" />
                        
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Password
                        </label>
                        <Field type="password" name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="**********" />
                        <ErrorMessage name="password" component="i" className="error-message text-xs text-red-500" />
                    </div>
                    <div className="mb-4">

                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Confirm Password
                            </label>
                            <Field type="password" name="confirmPassword" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="**********"/>
                            <ErrorMessage name="confirmPassword" component="i" className="error-message text-xs text-red-500" />
                    </div>

                    <button type="submit" id="btn" className="bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                    Sign up
                    </button>
                    <div>You have an account ? <Link to="/login" className="text-blue-500">Login</Link> </div>
                    
                </Form>
                )}
            </Formik>
        </div>
        </div>
    );
}

export default Signup;