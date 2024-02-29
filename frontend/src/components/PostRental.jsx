import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../assets/css/PostRental.css';


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
            <button onClick={() => setShowModal(true)} type="button" class="relative w-full flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-900  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out mb-10">
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
               <g>
                  <rect fill="none" height="24" width="24"></rect>
               </g>
               <g>
                  <g>
                     <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z"></path>
                  </g>
               </g>
            </svg>
            <span class="pl-2 mx-1">Rent Out Your Item</span>
         </button>
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
                            {({ isSubmitting, errors,setFieldValue }) => (
                                <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-2/3 bg-gray-100">
                                    <h2 id="form-title" className="text-center">Post</h2>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                            Title
                                        </label>
                                        <Field type="text" name="title" id="title" placeholder="Title"
                                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                        <ErrorMessage name="title" component="i"
                                                      className="error-message text-red-500 text-xs"/>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                               htmlFor="description">
                                            Description
                                        </label>
                                        <Field as="textarea" name="description" id="description"
                                               placeholder="Description"
                                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                        <ErrorMessage name="description" component="i"
                                                      className="error-message text-red-500 text-xs"/>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                               htmlFor="pricePerDay">
                                            Price per Day
                                        </label>
                                        <Field type="number" name="pricePerDay" id="pricePerDay"
                                               placeholder="Price per Day"
                                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                        <ErrorMessage name="pricePerDay" component="i"
                                                      className="error-message text-red-500 text-xs"/>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2"
                                               htmlFor="location">
                                            Location
                                        </label>
                                        <Field as="select" name="location" id="location"
                                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                            <option value="">Select Location</option>
                                            <option value="Rabat">Rabat</option>
                                            <option value="Casablanca">Casablanca</option>
                                            <option value="Marrakech">Marrakech</option>
                                        </Field>
                                        <ErrorMessage name="location" component="i"
                                                      className="error-message text-red-500 text-xs"/>
                                    </div>
                                    <div className="flex items-center justify-center w-full">
                                        <label
                                            htmlFor="dropzone-file"
                                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                     aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                     viewBox="0 0 20 16">
                                                    <path stroke="currentColor" strokeLinecap="round"
                                                          strokeLinejoin="round" strokeWidth="2"
                                                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                                    className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or
                                                    GIF (MAX. 800x400px)</p>
                                            </div>
                                            <input
                                                id="dropzone-file"
                                                type="file"
                                                name="pictures"
                                                multiple
                                                className="hidden"
                                                onChange={(event) => {
                                                    const files = event.target.files;
                                                    setFieldValue("pictures", files);
                                                }}
                                            />
                                        </label>
                                    </div>


                                    <button type="submit" id="btn"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
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
