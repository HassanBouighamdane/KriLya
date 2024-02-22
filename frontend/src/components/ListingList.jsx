import React, { useState, useEffect } from 'react';
import { getListings } from '../services/api';

function ListingList() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };
    fetchListings();
  }, []);

  return (
    <div>
      <ul>
        {listings.map((listing) => (
          <li key={listing.id}>
            <img src={listing.image} alt={listing.description} />
            <p>{listing.description}</p>
            <p>{listing.duration}</p>
            <p>{listing.price}</p>
            <p>{listing.location}</p>
            <p>{listing.availability ? 'Available' : 'Not Available'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListingList;
