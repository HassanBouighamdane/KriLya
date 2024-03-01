const BASE_URL = 'http://localhost:8080/api'; 

const API = {
  PROFILE: {
    GET_ALL: `${BASE_URL}/profiles`, // GET all profiles
    GET_ONE: id => `${BASE_URL}/profiles/${id}`, // GET one profile by ID
    CREATE: `${BASE_URL}/profiles`, // POST to create a new profile
    UPDATE: id => `${BASE_URL}/profiles/${id}`, // PUT to update a profile by ID
    DELETE: id => `${BASE_URL}/profiles/${id}`, // DELETE to delete a profile by ID
  },
  
};

export default API;