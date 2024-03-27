import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import img from '../assets/images/bg.jpg';
import logo from '../assets/images/logo-nobg.png';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../providers/UserProvider';
import '../App.css'

const baseUrl = "http://localhost:8080";

function Login() {
    const { data, setData } = useContext(MyContext);
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        await axios.post(`${baseUrl}/users/auth/authenticate`,{
            "email" : values.email,
            "password"  : values.password
        })
            .then((res)=> {
                console.log(res);
                localStorage.setItem('jwtToken', res.data.token);
                localStorage.setItem('userId', res.data.user.id);
                const parts = values.email.split("@");
                localStorage.setItem('username', parts[0])
                // setData(res.data.user);
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
                    email: '',
                    password: '',
                }}
                validationSchema={validationSchema} 
                onSubmit={handleSubmit} 
            >
                {({ isSubmitting, errors }) => (
                <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/3 bg-gray-100">
                    <img src={logo} alt="Logo" className="logo" />
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Email
                        </label>
                        <Field placeholder="email@example.com" type="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        <ErrorMessage name="email" component="i" className="error-message text-red-500 text-xs" />
                        
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Password
                        </label>
                        <Field type="password" name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="**********" />
                        <ErrorMessage name="password" component="i" className="error-message text-xs text-red-500" />
                    
                    </div>
                    <button type="submit" id="btn" className="bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                        Login
                    </button>
                    <div>don't have an account ? <Link to="/signup" className="text-blue-500">Sign up</Link> </div>
                    
                </Form>
                  )}
            </Formik>
            </div>

         </div>
    );
}

export default Login;