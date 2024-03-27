import React, {useRef, useState} from 'react';
import { Formik, Form, Field } from 'formik';
import avatar from '../assets/images/avatar.jpg';
import { FaArrowLeft } from 'react-icons/fa';
import { useHandleBack } from '../hooks/useHandleBack';
import API from '../services/api';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


function UpdateProfile() {
    const navigate = useNavigate();
    
    const initialValues = {
        firstname: "",
        lastname: "",
        address: "",
        phone: "",
        description: "",
        gender: "",
        email: "",
        createdAt: "",
        status: "Active",
        rating: "",
        responseRate: "",
        picutre: ""
    };

    const fileInputRef = useRef(null);
    const handleBack = useHandleBack();
    const [picture, setPicture] = useState(null);

    const handleFileInputChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        // Do something with the selected file, such as uploading it
        setPicture(file);
        console.log(file);
        console.log('Selected file:', file);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    // const handleSubmit = async (values) => {
    
    //     const formData = new FormData();
    //     // Append profile data to the formData
    //     Object.entries(values).forEach(([key, value]) => {
    //         formData.append(key, value);
    //     });
    //     // Append picture file to the formData
    //     formData.append("picture", picture);
    
    //     try {
    //         // Make a PUT request to the API endpoint with formData
    //         const response = await axios.put(API.PROFILE.UPDATE(1), formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
    //         console.log('Profile updated:', response.data);
    //         // Navigate to the profile page after successful update
    //         navigate('/profile');
    //     } catch (error) {
    //         console.error('Error updating profile:', error);
    //     }
    // };

    const handleSubmit =async (values) => {
        console.log("Form submitted with values:", {...values, picture : picture});
        // const options = {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        // };
        const formData = new FormData();
        Object.entries({...values, picture : picture}).forEach(([key, value]) => {
            formData.append(key, value);
        });
        try {
            const response = await axios.put(API.PROFILE.UPDATE(2), values, picture);
            console.log('Profile created:', response.data);
          } catch (error) {
            console.error('Error creating profile:', error);
          }
        // fetch(API.PROFILE.UPDATE(2), options)
        // .then(response => console.log(response))
        // .catch(err => console.log(err));
        
        navigate('/profile')
        
    };

    

    return (
        <div className="container max-w-xl mx-auto">
          
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form>
                    <div className="bg-white p-3 border-t-4 border-blue-900 space-y-5">
                   <button type='button' onClick={()=>handleBack("/profile")}><FaArrowLeft/></button> 
                    <div className="relative">
                        <div className="image overflow-hidden">
                            <img className="w-40 h-40 rounded-full mx-auto" src={initialValues.picture? initialValues.picture: avatar} alt="avatar" />
                        </div>
                        <div className='grid grid-cols-2 space-x-5'>
                            {/* Hidden input field */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileInputChange}
                            />
                            {/* Button to trigger file input */}
                            <button
                                className="bg-blue-900 hover:bg-blue-800 text-white  py-2 px-4 rounded"
                                onClick={handleButtonClick}
                                type='button'
                            >
                                Change picture
                            </button>
                            <button 
                            className='bg-gray-200 hover:bg-gray-400 text-black  py-2 px-4 rounded'
                            >
                                Remove picture</button>
                        </div>
                    </div>
                        <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li className="flex items-center py-3">
                                <span>First name</span>
                                <span className="ml-auto hover:shadow">
                                    <Field type="text" name="firstname" />
                                </span>
                            </li>
                            <li className="flex items-center py-3">
                                <span>Last name</span>
                                <span className="ml-auto hover:shadow">
                                    <Field type="text" name="lastname" />
                                </span>
                            </li>
                            <li>
                              <span>Bio</span>
                                <h3 className="text-gray-600 font-lg text-semibold hover:shadow">
                                <Field className="w-full h-40" as="textarea" name="description" />
                                </h3>
                            </li>
                           
                            <li className="flex items-center py-3">
                                <span>Status</span>
                                <span className="ml-auto hover:shadow">
                                    <Field type="text" name="status" />
                                </span>
                            </li>
                            <li className="flex items-center py-3">
                                <span>Email</span>
                                <span className="ml-auto bg-gray-400 hover:shadow">
                                    <Field type="text" disabled={true} name="email" />
                                </span>
                            </li>
                            <li className="flex items-center py-3">
                                <span>Phone</span>
                                <span className="ml-auto hover:shadow">
                                    <Field type="text" name="phone" />
                                </span>
                            </li>
                            <li className="flex items-center py-3 ">
                                <span>Gender</span>
                                <span className="ml-auto hover:shadow">
                                    <Field as="select" name="gender" className=" appearance-none border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    </Field>
                                </span>
                                
                            </li>
                            {/* Add input fields for other user information */}
                        </ul>
                    </div>
                    <button
                        type="submit"
                        className="block w-full text-center bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                </Form>
            </Formik>
        </div>
    );
}

export default UpdateProfile;
