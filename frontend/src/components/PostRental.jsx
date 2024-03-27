import React, { useState,useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
//import { useDropzone } from "react-dropzone";
import { Alert,AlertTitle } from '@mui/material';

const baseUrl = "http://localhost:8081";

const PostRental = ({ onPostSuccess }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [categorySuggestions, setCategorySuggestions] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);


    const handleCategorySearch = async (text) => {
        setSearchText(text);
        // Perform category search based on the text entered
        // Here you would make an API call to fetch category suggestions
        // Replace the following mock example with your actual API call
        const response = await axios.get(baseUrl + `/api/categories/search?text=${text}`);
        setCategorySuggestions(response.data); // Update category suggestions based on the response
    };
    const addSelectedCategory = (category) => {
        setSelectedCategories([...selectedCategories, category]);
    };

    
    const removeSelectedCategory = (index) => {
        const updatedCategories = [...selectedCategories];
        updatedCategories.splice(index, 1);
        setSelectedCategories(updatedCategories);
    };

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        pricePerDay: Yup.number().required('Price per Day is required'),
        location: Yup.string().required('Location is required'),
        pictures: Yup.mixed().required('Pictures are required'),
        categories: Yup.string().required('Categories are required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', values.title);
            formDataToSend.append('description', values.description);
            formDataToSend.append('pricePerDay', values.pricePerDay);
            formDataToSend.append('availability', true);
            formDataToSend.append('location', values.location);
            selectedCategories.forEach((category) => {
                formDataToSend.append('categoryIds', category.id);
            });
            for (let i = 0; i < values.pictures.length; i++) {
                formDataToSend.append('pictures', values.pictures[i]);
            }
            formDataToSend.append('ownerId',localStorage.getItem('userId'));
            const response = await axios.post(baseUrl + '/api/rentals', formDataToSend);

            if (response.status === 201) {
                toggleModal(); // Close the modal after successful submission
                onPostSuccess();
                setSelectedCategories([]);
                setCategorySuggestions([]);
            } else {
                setErrorAlertOpen(true);
                setTimeout(() => {
                    setErrorAlertOpen(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Error posting rental:', error);
            setErrorAlertOpen(true);
            setTimeout(() => {
                setErrorAlertOpen(false);
            }, 3000);
        } finally {
            setSubmitting(false);
        }
    };
    

    return (
        <div > 
            <button
                onClick={toggleModal}
                data-modal-target="crud-modal"
                data-modal-toggle="crud-modal"
                className="block text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Rent out an item
            </button>

            {isOpen && (
                
                <div
                    id="crud-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-80 flex justify-center items-center "
                >
                    <div className="relative bg-white rounded-lg shadow-lg w-4/5  md:w-2/3 ">
                        {/* Display error alert */}
            {errorAlertOpen && (
                <Alert severity="error" onClose={() => setErrorAlertOpen(false)}>
                    <AlertTitle>Error</AlertTitle>
                    Error posting rental. Please try again.
                </Alert>
            )}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            
                            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Post item
                                </h3>
                                <button
                                    onClick={toggleModal}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-toggle="crud-modal"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <Formik
                                initialValues={{
                                    title: '',
                                    description: '',
                                    pricePerDay: '',
                                    location: '',
                                    categories: [],
                                    pictures: [],
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, errors, setFieldValue }) => (
                                    <Form className="p-4 md:p-5">
                                        <div className="grid gap-4 mb-2 grid-cols-2">
                                            <div className="col-span-2 sm:col-span-1">
                                                <label
                                                    htmlFor="title"
                                                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Title
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    placeholder="Title"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                />
                                                <ErrorMessage name="title" component="i" className="error-message text-red-500 text-xs"/>
                                            </div>
                                            <div className="col-span-2 sm:col-span-1">
                                                <label
                                                    htmlFor="category"
                                                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Category
                                                </label>
                                                <div className="selected-categories">
                                                    {selectedCategories.map((selectedCategory, index) => (
                                                        <span key={index} className="selected-category">
                                                            <span>{selectedCategory.name}</span>
                                                            <button
                                                                        onClick={() => removeSelectedCategory(index)}
                                                                        type="button"
                                                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-4 h-4 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                                        data-modal-toggle="crud-modal"
                                                                    >
                                                                        <svg
                                                                            className="w-2 h-2"
                                                                            aria-hidden="true"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="none"
                                                                            viewBox="0 0 14 14"
                                                                        >
                                                                            <path
                                                                                stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth="2"
                                                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                                            />
                                                                        </svg>
                                                                        <span className="sr-only">Close modal</span>
                                                                    </button>
                                                        </span>
                                                    ))}
                                                </div>
                                                <Field
                                                    type="text" 
                                                    name="categories"
                                                    id="categories"
                                                    placeholder="Search categories"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    onChange={(e) => {
                                                        const searchTerm = e.target.value;
                                                        handleCategorySearch(searchTerm);
                                                        setFieldValue('categories', searchTerm);
                                                    }}
                                                    
                                                />
                                                <div className="category-suggestions">
                                                    {categorySuggestions.slice(0,5).map((category, index) => (
                                                        <div key={index} className="category-suggestion" onClick={() => addSelectedCategory(category)}>
                                                            {category.name}
                                                        </div>
                                                    ))}
                                                </div>
                                                <ErrorMessage name="category" component="i" className="error-message text-red-500 text-xs"/>
                                            </div>
                                
                                            <div className="col-span-2 sm:col-span-1">
                                                <label
                                                    htmlFor="pricePerDay"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Price per Day
                                                </label>
                                                <Field
                                                    type="number"
                                                    name="pricePerDay"
                                                    id="pricePerDay"
                                                    placeholder="Price per Day"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                />
                                                <ErrorMessage name="pricePerDay" component="i" className="error-message text-red-500 text-xs"/>
                                            </div>
                                            <div className="col-span-2 sm:col-span-1">
                                                <label
                                                    htmlFor="location"
                                                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Location
                                                </label>
                                                <Field
                                                    as="select"
                                                    name="location"
                                                    id="location"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                >
                                                    <option value="">Select Location</option>
                                                    <option value="Rabat">Rabat</option>
                                                    <option value="Casablanca">Casablanca</option>
                                                    <option value="Marrakech">Marrakech</option>
                                                </Field>
                                                <ErrorMessage name="location" component="i" className="error-message text-red-500 text-xs"/>
                                            </div>
                                            <div className="col-span-2 sm:col-span-1">
                                                <label
                                                    htmlFor="description"
                                                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Description
                                                </label>
                                                <Field
                                                    as="textarea"
                                                    name="description"
                                                    id="description"
                                                    placeholder="Description"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                />
                                                <ErrorMessage name="description" component="i" className="error-message text-red-500 text-xs"/>
                                            </div>
                                            
                                            <div className="col-span-2 sm:col-span-1">
                                                <label
                                                    htmlFor="pictures"
                                                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Pictures
                                                </label>
                                                <input
                                                    type="file"
                                                    id="pictures"
                                                    name="pictures"
                                                    multiple
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    onChange={(event) => {
                                                        const files = event.target.files;
                                                        setFieldValue("pictures", files);
                                                    }}
                                                />
                                                <ErrorMessage name="pictures" component="i" className="error-message text-red-500 text-xs"/>
                                            </div>
    
                                        </div>
                                        <div className="flex justify-center">
                                            <button
                                                type="submit"
                                                className="text-white inline-flex items-center bg-blue-900 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                <svg
                                                    className="me-1 -ms-1 w-5 h-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                Post
                                            </button>
                                            </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            )}
          
        </div>
    );
};

export default PostRental;
