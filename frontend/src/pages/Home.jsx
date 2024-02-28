import React, { useEffect, useState } from 'react';
import RentalCard from "../components/RentalCard";
import AddToFavorites from '../components/AddToFavorites';
import RemoveFromFavorites from '../components/RemoveFromFavorites';
import { FaDesktop, FaPrint, FaSolarPanel, FaBatteryFull ,FaSearch } from 'react-icons/fa';
import '../assets/css/Home.css';

export default function Home(props) {
    const FavouriteComponent = props.favouriteComponent;

    const [rentals, setRentals] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const [sortOrder, setSortOrder] = useState('asc');
    const [activeFilter, setActiveFilter] = useState(null); 


    useEffect(() => {
        async function fetchRentals() {
            try {
                let url = 'http://localhost:8081/api/rentals';

                url += `?title=${searchQuery}&sortBy=${sortBy}&sortOrder=${sortOrder}`;

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch rentals');
                }
                const data = await response.json();
                setRentals(data);
            } catch (error) {
                console.error('Error fetching rentals:', error);
            }
        }

        fetchRentals();
    }, [searchQuery, sortBy, sortOrder]); 

    const handleFilterClick = (filter) => {
        setSearchQuery(filter);
        setActiveFilter(filter); 
    };

    return (
        <div className="container mx-auto px-4 py-28 ">
            <div class="hero-headline flex flex-col items-center justify-center pt-2 text-center mb-10">
                <h1 class=" font-bold text-5xl text-gray-900">Do you need to use items in a short time?</h1>
                <h2 class=" font-base text-3xl text-gray-600">You are in the right place :)</h2>
            </div>
            
            <div className="max-w-md mx-auto mb-20">
                <div className="border border-black  overflow-hidden" style={{ padding: '8px' }}>
                    <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                        <div class="grid place-items-center h-full w-12 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                            type="text"
                            id="search"
                            placeholder="Search items.." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        /> 
                        
                    </div>
                    
                </div>

            </div>

            <div className="filter-bar">
                <button 
                    className={`filter-button ${activeFilter === 'computers' ? 'active' : ''}`}
                    onClick={() => handleFilterClick('computers')}
                >
                    <FaDesktop /> <span className="button-text">Computers</span>
                </button>
                <button 
                    className={`filter-button ${activeFilter === 'printers' ? 'active' : ''}`}
                    onClick={() => handleFilterClick('printers')}
                >
                    <FaPrint /> <span className="button-text">Printers</span>
                </button>
                <button 
                    className={`filter-button ${activeFilter === 'solar-panels' ? 'active' : ''}`}
                    onClick={() => handleFilterClick('solar-panels')}
                >
                    <FaSolarPanel /> <span className="button-text">Solar Panels</span>
                </button>
                <button 
                    className={`filter-button ${activeFilter === 'digital-signage' ? 'active' : ''}`}
                    onClick={() => handleFilterClick('digital-signage')}
                >
                    <FaBatteryFull style={{ transform: 'rotate(90deg)' }} /> <span className="button-text">Digital Signage</span>
                </button>
            </div>



            
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-28">
                {rentals.map((rental, index) => (
                    <RentalCard
                        key={index}
                        title={rental.title}
                        description={rental.description}
                        images={rental.pictures.map(picture => picture.data)}
                        pricePerDay={rental.pricePerDay}
                        location={rental.location}
                    />
                ))}
            </div>
        </div>
    );
}
