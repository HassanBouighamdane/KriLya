
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import RentalCard from "../components/RentalCard";
import { FaDesktop, FaTools, FaMotorcycle , FaSearch } from 'react-icons/fa';
import { GiClothes } from "react-icons/gi";
import { Alert,AlertTitle } from '@mui/material';
import '../assets/css/Home.css';
import {fetchRentals,fetchRental} from '../services/api'
import PostRental from '../components/PostRental';

export default function Home() {
    const navigate = useNavigate();
    const [rentals, setRentals] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const [sortOrder, setSortOrder] = useState('asc');
    const [activeFilter, setActiveFilter] = useState(null);
    const [favourites, setFavourites] = useState([]);
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);
    

    const fetchAllItems = async () => {
        try {
            const data = await fetchRentals();
            setRentals(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
          fetchAllItems();
        
      }, [searchQuery, sortBy, sortOrder]);
      
    const handlePostSuccess = () => {
        setSuccessAlertOpen(true);
        fetchAllItems(); 
        setTimeout(() => {
            setSuccessAlertOpen(false);
        }, 3000);
    };
    
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
        
        <div className="container mx-auto  px-7">
            {/* Display success alert */}
         {successAlertOpen && (
                <Alert severity="success" className='z-50' onClose={() => setSuccessAlertOpen(false)}>
                    <AlertTitle>Success</AlertTitle>
                    Rental posted successfully!
                </Alert>
            )}

            
            <div className="hero-headline flex flex-col items-center justify-center pt-2 text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">Do you need to use items in a short time?</h1>
                <h2 className="font-base text-2xl text-gray-600">You are in the right place :)</h2>
            </div>

            <div className="max-w-md mx-auto mb-4">
                <div className="border border-black  overflow-hidden p-2">
                    <div className="relative flex items-center w-full h-8 rounded-lg  bg-white overflow-hidden">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                            <FaSearch />
                        </div>
                        <input
                            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                            type="text"
                            id="search"
                            placeholder="Search items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <PostRental onPostSuccess={handlePostSuccess}/>
            </div>
            <div className="filter-bar">
                <button
                    className={`filter-button ${activeFilter === 'computers' ? 'active' : ''}`}
                    onClick={() => handleFilterClick('computers')}
                >
                    <FaDesktop /> <span className="button-text">Computers</span>
                </button>
                <button
                    className={`filter-button ${activeFilter === 'Clothes' ? 'active' : ''}`}
                    onClick={() => handleFilterClick('Clothes')}
                >
                    <GiClothes /> <span className="button-text">Clothes</span>
                </button>
                <button
                    className={`filter-button ${activeFilter === 'Tools' ? 'active' : ''}`}
                    onClick={() => handleFilterClick('Tools')}
                >
                    <FaTools /> <span className="button-text">Tools</span>
                </button>
                <button
                    className={`filter-button ${activeFilter === 'Vehicules' ? 'active' : ''}`}
                    onClick={() => handleFilterClick('Vehicules')}
                >
                    <FaMotorcycle  /> <span className="button-text">Vehicules</span>
                </button>
            </div>

            {favoriteRentals.length > 0 && (
                <div className="py-4">
                    <h2 className="text-2xl font-bold mb-4">Featured Rentals</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

            <div className="py-4">
                <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
