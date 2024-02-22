import axios from 'axios';

const API_BASE_URL = 'URL de  service backend :) '; 

export const createListing = async (listingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/listings`, listingData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getListings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/listings`);
    return response.data;
  } catch (error) {
    throw error;
  }
};