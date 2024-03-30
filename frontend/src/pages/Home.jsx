
import React, {useEffect, useState} from 'react';
import RentalCard from "../components/RentalCard";
import { FaDesktop, FaTools, FaMotorcycle , FaSearch } from 'react-icons/fa';
import { GiClothes } from "react-icons/gi";
import { Alert,AlertTitle } from '@mui/material';
import '../assets/css/Home.css';
import {fetchRentals,fetchRental} from '../services/apifetch'

import PostRental from '../components/PostRental';
import PaginationComponent from '../components/PaginationComponent';
import {searchRentals} from '../services/apifetch'
import PostLoading from '../components/PostLoading';
import { INTERACTION_TYPES } from '../constants';

export default function Home() {
    const [rentals, setRentals] = useState([]);
    const [pageNo,setPageNo]=useState(0);
    const [totalPages,setTotalPages]=useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState(null);
    const [favourites, setFavourites] = useState([]);
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);
    

    const handlePageChange = (page) => {
        setPageNo(page-1); // Adjusting the page to be 0-based
      };
    

    const fetchAllItems = async (pageNumber,pageSize=10) => {
        try {
            const data = await fetchRentals(pageNumber,pageSize);
            setRentals(data.content);
            setTotalPages(data.totalPages);
            setPageNo(pageNumber);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
          fetchAllItems(pageNo);
      }, [pageNo]);
      
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
    const [loading, setLoading] = useState(false);
    const handleSearch = async (query)=>{
        if(query === "") {
            await fetchAllItems(pageNo);
        }
        setSearchQuery(query);
        setLoading(true);
        const data = await searchRentals(searchQuery, 'TITLE'); // Example: Searching by title
        setRentals(data.content);
        setLoading(false);
        
    }

    useEffect(() => {
        const Favourites = JSON.parse(localStorage.getItem('react-app-favourites'));
        if (Favourites) {
            setFavourites(Favourites);
        }
    }, []);

    const saveToLocalStorage = (items) => {
        localStorage.setItem('react-app-favourites', JSON.stringify(items));
    };

    const addFavourite = async (item) => {
        const newFavouriteList = [...favourites, item.id];
        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
        console.log(item);
        // Log the "favorite" interaction to the backend
        await logUserInteraction(INTERACTION_TYPES.FAVORITE, item.id);
    };
    
    

    const removeFavourite = (item) => {
        const newFavouriteList = favourites.filter(
            (favourite) => favourite !== item.id
        );

        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
    };

    const favoriteRentals = rentals.filter(rental => favourites.some(fav => fav === rental.id));
    const otherRentals = rentals.filter(rental => !favourites.some(fav => fav === rental.id));
    
    const logUserInteraction = async (interactionType, itemId) => {
        try {
            const response = await fetch('http://localhost:8081/api/rentals/logUserInteraction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    interactionType: interactionType,
                    itemId: itemId,
                }),
            });
    
            if (response.ok) {
                console.log(`Successfully logged ${interactionType} for item ${itemId}`);
            } else {
                console.error(`Failed to log ${interactionType} for item ${itemId}`);
            }
        } catch (error) {
            console.error('Error logging user interaction:', error);
        }
    };
    
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
                <h1 className="font-bold text-3xl text-gray-900">Do you need to use items for a short time?</h1>
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
                            onChange={(e) => handleSearch(e.target.value)}
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
                    <h2 className="text-2xl font-bold mb-4">Favourites</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {favoriteRentals.map((rental, index) => (
                            <RentalCard
                                key={index}
                                id={rental.id}
                                title={rental.title}
                                description={rental.description}
                                images={rental.pictures!=null ? rental.pictures[0].data:null}
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
                {loading && <div><PostLoading/></div>}
                    {otherRentals.map((rental, index) => (
                        <RentalCard
                            key={index}
                            id={rental.id}
                            title={rental.title}
                            description={rental.description}
                            images={rental.pictures!=null ? rental.pictures[0].data:null}
                            pricePerDay={rental.pricePerDay}
                            location={rental.location}
                            isFavorite={false}
                            handleFavouritesClick={() => addFavourite(rental)}
                            handleDetailsClick={()=>rental.id}
                        />
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-center">
        <PaginationComponent totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
        </div>
    );
}




