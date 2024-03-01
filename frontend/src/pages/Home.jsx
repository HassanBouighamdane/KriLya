
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import RentalCard from "../components/RentalCard";
import { FaDesktop, FaPrint, FaSolarPanel, FaBatteryFull, FaSearch } from 'react-icons/fa';
import '../assets/css/Home.css';
import {fetchRentals,fetchRental} from '../services/api'
import PostRental from '../components/PostRental';

export default function Home() {
    const [rentals, setRentals] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const [sortOrder, setSortOrder] = useState('asc');
    const [activeFilter, setActiveFilter] = useState(null);
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        async function fetchAllItems() {
            try {
                const data = await fetchRentals();
                setRentals(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    
        fetchAllItems();
    }, [searchQuery, sortBy, sortOrder]);


    const handleFilterClick = (filter) => {
        setSearchQuery(filter);
        setActiveFilter(filter);
    };

    useEffect(() => {
        const Favourites = JSON.parse(localStorage.getItem('react-app-favourites'));

        if (Favourites) {
            setFavourites(Favourites);
        }
    }, []);

    const saveToLocalStorage = (items) => {
        localStorage.setItem('react-app-favourites', JSON.stringify(items));
    };

    const addFavourite = (item) => {
        const newFavouriteList = [...favourites, item];
        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
    };

    const removeFavourite = (item) => {
        const newFavouriteList = favourites.filter(
            (favourite) => favourite.id !== item.id
        );

        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
    };

    const favoriteRentals = rentals.filter(rental => favourites.some(fav => fav.id === rental.id));
    const otherRentals = rentals.filter(rental => !favourites.some(fav => fav.id === rental.id));

    return (
        <div className="container mx-auto px-4 py-20 ">
         <PostRental/>
            <div className="hero-headline flex flex-col items-center justify-center pt-2 text-center mb-10">
                <h1 className="font-bold text-5xl text-gray-900">Do you need to use items in a short time?</h1>
                <h2 className="font-base text-3xl text-gray-600">You are in the right place :)</h2>
            </div>

            <div className="max-w-md mx-auto mb-20">
                <div className="border border-black  overflow-hidden" style={{ padding: '8px' }}>
                    <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                            <FaSearch />
                        </div>
                        <input
                            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
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

            {favoriteRentals.length > 0 && (
                <div className="py-8">
                    <h2 className="text-2xl font-bold mb-4">Featured Rentals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {favoriteRentals.map((rental, index) => (
                            <RentalCard
                                key={index}
                                id={rental.id}
                                title={rental.title}
                                description={rental.description}
                                images={rental.pictures[0].data}
                                pricePerDay={rental.pricePerDay}
                                location={rental.location}
                                isFavorite={true}
                                handleFavouritesClick={() => removeFavourite(rental)}
                                handleDetailsClick={()=>fetchRental(rental.id)}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div className="py-8">
                <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherRentals.map((rental, index) => (
                        <RentalCard
                            key={index}
                            id={rental.id}
                            title={rental.title}
                            description={rental.description}
                            images={rental.pictures[0].data}
                            pricePerDay={rental.pricePerDay}
                            location={rental.location}
                            isFavorite={false}
                            handleFavouritesClick={() => addFavourite(rental)}
                            handleDetailsClick={()=>rental.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
