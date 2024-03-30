const BASE_URL_USER = 'http://localhost:8080/users';
const BASE_URL_RENTAL = 'http://localhost:8080/postes';

const API = {
  PROFILE: {
    GET_ALL: `${BASE_URL_USER}/profiles`, // GET all profiles
    GET_ONE: id => `${BASE_URL_USER}/profiles/${id}`, // GET one profile by ID
    CREATE: `${BASE_URL_USER}/profiles`, // POST to create a new profile
    UPDATE: id => `${BASE_URL_USER}/profiles/${id}`, // PUT to update a profile by ID
    DELETE: id => `${BASE_URL_USER}/profiles/${id}`, // DELETE to delete a profile by ID
  },
  USER: {
    GET_ALL: `${BASE_URL_USER}/users`, // GET all profiles
    GET_ONE: id => `${BASE_URL_USER}/users/${id}`, // GET one profile by ID
    CREATE: `${BASE_URL_USER}/users`, // POST to create a new profile
    UPDATE: id => `${BASE_URL_USER}/users/${id}`, // PUT to update a profile by ID
    DELETE: id => `${BASE_URL_USER}/users/${id}`, // DELETE to delete a profile by ID
  },
  RENTAL: {
    GET_ALL: (pageNo, pageSize, sortBy) =>
      `${BASE_URL_RENTAL}/rentals?pageNo=${pageNo}&pageSize=${pageSize}`,
    GET_BY_USER: (id,pageNo, pageSize, sortBy) =>
      `${BASE_URL_RENTAL}/rentals/user/${id}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`,
    GET_ONE: (id) => `${BASE_URL_RENTAL}/rentals/${id}`,
    CREATE: `${BASE_URL_RENTAL}/rentals`,
    UPDATE: (id) => `${BASE_URL_RENTAL}/rentals/${id}`,
    DELETE: (id) => `${BASE_URL_RENTAL}/rentals/${id}`,
    SEARCH: (query, criteria, pageNo, pageSize, sortBy) =>
      `${BASE_URL_RENTAL}/rentals/search?query=${query}&criteria=${criteria}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`
  },
  CATEGORY: {
    GET_ALL: `${BASE_URL_RENTAL}/categories`, // GET all categories
    GET_ONE: (id) => `${BASE_URL_RENTAL}/categories/${id}`, // GET one category by ID
    CREATE: `${BASE_URL_RENTAL}/categories`, // POST to create a new category
    UPDATE: (id) => `${BASE_URL_RENTAL}/categories/${id}`, // PUT to update a category by ID
    DELETE: (id) => `${BASE_URL_RENTAL}/categories/${id}`, // DELETE to delete a category by ID
    SEARCH: (text) => `${BASE_URL_RENTAL}/categories/search?text=${text}`, // GET categories by search text
  }
  
};

export default API;