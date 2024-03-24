import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/rentals) ';

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
export async function fetchRentals(searchQuery,sortBy,sortOrder) {
  try {
      let url = 'http://localhost:8080/rentals';

      url += `?title=${searchQuery}&sortBy=${sortBy}&sortOrder=${sortOrder}`;

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
      let url = `http://localhost:8080/rentals/${id}`;
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