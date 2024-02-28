import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'; 
import * as Yup from 'yup';
import axios from 'axios';
import { FiImage } from 'react-icons/fi';
import '../assets/css/PostRental.css';
import img from '../images/bg.jpg';
import logo from '../images/logo-nobg.png';

const baseUrl = "http://localhost:8081";

function PostRental() {
    const [showModal, setShowModal] = useState(false);

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        pricePerDay: Yup.number().required('Price per Day is required'),
        location: Yup.string().required('Location is required'),
        pictures: Yup.mixed().required('Pictures are required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', values.title);
            formDataToSend.append('description', values.description);
            formDataToSend.append('pricePerDay', values.pricePerDay);
            formDataToSend.append('availability', true);
            formDataToSend.append('location', values.location);
            for (let i = 0; i < values.pictures.length; i++) {
                formDataToSend.append('pictures', values.pictures[i]);
            }

            const response = await axios.post(baseUrl + '/api/rentals', formDataToSend);

            if (response.status === 201) {
                alert('Rental posted successfully!');
            } else {
                alert('Error posting rental. Please try again.');
            }
        } catch (error) {
            console.error('Error posting rental:', error);
            alert('Error posting rental. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)}>Open Post Rental Modal</button>
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setShowModal(false)}>X</button>
                        <Formik
                            initialValues={{
                                title: '',
                                description: '',
                                pricePerDay: '',
                                location: '',
                                pictures: [],
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit} 
                        >
                            {({ isSubmitting, errors }) => (
                                <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/3 bg-gray-100">
                                    <h2 id="form-title" className="text-center">Create a Rental</h2>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                            Title
                                        </label>
                                        <Field type="text" name="title" id="title" placeholder="Title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                        <ErrorMessage name="title" component="i" className="error-message text-red-500 text-xs" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                            Description
                                        </label>
                                        <Field as="textarea" name="description" id="description" placeholder="Description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                        <ErrorMessage name="description" component="i" className="error-message text-red-500 text-xs" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pricePerDay">
                                            Price per Day
                                        </label>
                                        <Field type="number" name="pricePerDay" id="pricePerDay" placeholder="Price per Day" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                        <ErrorMessage name="pricePerDay" component="i" className="error-message text-red-500 text-xs" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                                            Location
                                        </label>
                                        <Field as="select" name="location" id="location" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                            <option value="">Select Location</option>
                                            <option value="Rabat">Rabat</option>
                                            <option value="Casablanca">Casablanca</option>
                                            <option value="Marrakech">Marrakech</option>
                                        </Field>
                                        <ErrorMessage name="location" component="i" className="error-message text-red-500 text-xs" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Upload Pictures
                                        </label>
                                        <input type="file" name="pictures"  multiple className="hidden" />
                                        <FiImage className="picture-icon" onClick={() => { document.getElementsByName("pictures")[0].click() }} style={{ fontSize: '24px' }} />
                                        <ErrorMessage name="pictures" component="i" className="error-message text-red-500 text-xs" />
                                    </div>
                                    <button type="submit" id="btn" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                                        Post
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PostRental;
