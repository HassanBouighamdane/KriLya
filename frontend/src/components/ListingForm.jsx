import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import { createListing } from '../services/api';

function ListingForm() {
  const [formData, setFormData] = useState({
    description: '',
    image: null,
    duration: '',
    price: '',
    location: '',
    availability: true
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      await createListing(formData);
      //history.push('/');
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="description" value={formData.description} onChange={handleChange} />
      <input type="file" name="image" onChange={handleChange} />
      <input type="number" name="duration" value={formData.duration} onChange={handleChange} placeholder="Durée de location (en jours)" />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Prix de location" />
      <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Localisation" />
      <input type="checkbox" name="availability" checked={formData.availability} onChange={handleChange} />
      <button type="submit">Create Listing</button>
    </form>
  );
}

export default ListingForm;
