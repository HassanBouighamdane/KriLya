import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import '../assets/css/ListingForm.css'; // Import CSS file for additional styling

function ListingForm() {
    const [formData, setFormData] = useState({
        description: '',
        pricePerDay: '',
        availability: true,
        location: '',
        pictures: [],
    });

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
            formDataToSend.append('description', formData.description);
            formDataToSend.append('pricePerDay', formData.pricePerDay);
            formDataToSend.append('availability', formData.availability);
            formDataToSend.append('location', formData.location);
            for (let i = 0; i < formData.pictures.length; i++) {
                formDataToSend.append('pictures', formData.pictures[i]);
            }

            await axios.post('http://localhost:8081/api/rentals', formDataToSend);
            setFormData({
                description: '',
                pricePerDay: '',
                availability: true,
                location: '',
                pictures: [],
            });
            alert('Rental posted successfully!');
        } catch (error) {
            console.error('Error posting rental:', error);
            alert('Error posting rental. Please try again.');
        }
    };
    const handleCityButtonClick = () => {
        // Logic to populate the location field with cities
        // For example:
        setFormData({ ...formData, location: 'New York, Los Angeles, Chicago' });
    };

    return (
        <div className="listing-form-container">
            <h2 id={"form-title"}>Create a Rental</h2>
            <Form onSubmit={handleSubmit}>
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
                <Form.Group controlId="pictures">
                    <Form.Control type="file" name="pictures" onChange={handleChange} accept="image/*" multiple/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Post Rental
                </Button>
            </Form>
        </div>
    );
}

export default ListingForm;
