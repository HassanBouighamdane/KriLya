import axios from 'axios';
import API from './api.js';

const API_BASE_URL = 'http://localhost:8080/postes/rentals';

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
export async function fetchRentals(id, pageNo,pageSize,sortBy) {
  try {
      let url = API.RENTAL.GET_BY_USER(id,pageNo,pageSize,sortBy);
      // url+=`?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Failed to fetch rentals');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching rentals:', error);
      throw error;
  }
}
export async function fetchRental(id) {
  try {
      let url = `http://localhost:8080/postes/rentals/${id}`;
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Failed to fetch rentals');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching rentals:', error);
      throw error; 
  }
}



export async function searchRentals(query, criteria,pageNo=0,pageSize=10, sortBy='id') {
  try {
      let url = `http://localhost:8080/postes/rentals/search?query=${query}&criteria=${criteria}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`;
      
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Failed to fetch rentals');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching rentals:', error);
      throw error;
  }
}

export function decodeImageBase64(image){
  return `data:image/png;base64,${image}`;
}