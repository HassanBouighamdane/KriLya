import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import img from '../images/pc.jpg';
import logo from '../images/logo-nobg.png';
import '../assets/css/signup.css';
import axios from 'axios';
import '../App.css'

const baseUrl = "http://localhost:8080";

function Signup() {
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

    const handleSubmit = async (values, { setSubmitting }) => {
        await axios.post(`${baseUrl}/api/users`,{
            "id" : 1,
            "username" : values.username,
            "email" : values.email,
            "password"  : values.password
        })
            .then((res)=> {
                console.log(res);
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
        <div className="signup-container md:order-2">
            <img src={logo} alt="Logo" className="logo" />
            <h1>Create your account for free</h1>
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
                    <Form className="signup-form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field placeholder="Username" type="text" name="username" className="form-control" />
                            <ErrorMessage name="username" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field placeholder="email@example.com" type="email" name="email" className="form-control" />
                            <ErrorMessage name="email" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" className="form-control" placeholder="**********" />
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Field type="password" name="confirmPassword" className="form-control" placeholder="**********"/>
                            <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                        </div>

                        <button type="submit" className="btn button" id='btn' >Sign up</button>
                    </Form>
                )}
            </Formik>
        </div>
        </div>
    );
}

export default Signup;