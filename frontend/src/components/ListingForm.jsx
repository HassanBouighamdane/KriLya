import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import { createListing } from '../services/api';
import axios from "axios";

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

  //const history = useHistory();

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
  return (
      <form onSubmit={handleSubmit}>
          <input type="text" name="description" value={formData.description} onChange={handleChange}
                 placeholder="Description"/>
          <input type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange}
                 placeholder="Price per Day"/>
          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location"/>
          <input type="file" name="pictures" onChange={handleChange} accept="image/*" multiple/>
          <button type="submit">Post Rental</button>
      </form>
  );
}

export default ListingForm;
