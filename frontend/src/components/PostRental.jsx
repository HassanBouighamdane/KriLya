import React, {useRef, useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import '../assets/css/PostRental.css'; // Import CSS file for additional styling
import { FiImage } from 'react-icons/fi';

const baseUrl = "http://localhost:8081";
function PostRental() {
    const [formData, setFormData] = useState({
        title:'',
        description: '',
        pricePerDay: '',
        availability: true,
        location: '',
        pictures: [],
    });

    const fileInputRef = useRef(null); // Create a reference to the file input element
    const handlePictureClick = () => {
        // Programmatically trigger the file input when the icon is clicked
        fileInputRef.current.click();
    };

    const handleChange = (e) => {
        if (e.target.name === 'pictures') {
            setFormData({ ...formData, pictures: e.target.files });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('pricePerDay', formData.pricePerDay);
            formDataToSend.append('availability', formData.availability);
            formDataToSend.append('location', formData.location);
            for (let i = 0; i < formData.pictures.length; i++) {
                formDataToSend.append('pictures', formData.pictures[i]);
            }

            const response = await axios.post(baseUrl+'/api/rentals', formDataToSend);

            if (response.status === 201) {
                // Reset form fields after successful submission
                setFormData({
                    title: '',
                    description: '',
                    pricePerDay: '',
                    availability: true,
                    location: '',
                    pictures: [],
                });
                alert('RentalCard posted successfully!');
            } else {
                alert('Error posting rental. Please try again.');
            }
        } catch (error) {
            console.error('Error posting rental:', error);
            alert('Error posting rental. Please try again.');
        }
    };


    return (
        <div className="listing-form-container">
            <h2 id={"form-title"}>Create a Rental</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Control  type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title"/>
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Control  as="textarea" name="description" value={formData.description} onChange={handleChange} placeholder="Description"/>
                </Form.Group>
                <Form.Group controlId="pricePerDay">
                    <Form.Control type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} placeholder="Price per Day"/>
                </Form.Group>
                <Form.Group controlId="location">
                    <div className="d-flex">
                        <Form.Control
                            as="select"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        >
                            <option value="">Select Location</option>
                            <option value="Rabat">Rabat</option>
                            <option value="Casablanca">Casablanca</option>
                            <option value="Marrakech">Marrakech</option>

                        </Form.Control>
                    </div>
                </Form.Group>
                <Form.Group controlId="pictures" className="d-flex align-items-center">
                    <Form.Label>Upload Pictures</Form.Label>
                    <FiImage className="picture-icon" onClick={handlePictureClick} style={{ fontSize: '24px' }} />

                    <Form.Control
                        ref={fileInputRef}
                        type="file"
                        name="pictures"
                        onChange={handleChange}
                        accept="image/*"
                        multiple
                        style={{ display: 'none' }} // Hide the file input visually
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Post Rental
                </Button>
            </Form>
        </div>
    );
}

export default PostRental;
