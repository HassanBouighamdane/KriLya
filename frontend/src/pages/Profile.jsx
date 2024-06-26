import React, { useEffect, useState } from 'react';
import avatar from '../assets/images/avatar.jpg';
import RentalCard from '../components/RentalCard';
import Review from '../components/Review';
import { MdInsights } from "react-icons/md";
import { IoCartSharp } from "react-icons/io5";
import useFetch from '../hooks/useFetch';
import API from '../services/API';
import { FaEdit } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import PostLoading from '../components/PostLoading';
import { fetchRentals } from '../services/apifetch';
import axios from 'axios';


function Profile() {

    const navigate = useNavigate();

    const {data: profile, loading: profileLoading, error: profileError} = useFetch(API.PROFILE.GET_ONE(2));
    const {data: user, loading: userLoading, error: userError} = useFetch(API.USER.GET_ONE(1));
    const [User, setUser] = useState({});
    const [userEmail, setUserEmail] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [rentals, setRentals] = useState([])

    useEffect(() => {
        if (profile) {
            setUser(prevUser => ({
                ...prevUser,
                ...profile
            }));
        }
        console.log(profile);
    }, [profile]);

    useEffect(() => {
        if (user && user.email && user.username) {
            setUserEmail(user.email);
            setUsername(user.username);
        }
    }, [user]);

    useEffect(() => {
        setUser(prevUser => ({
            ...prevUser,
            email: userEmail,
            username: username
        }));
    }, [userEmail]);

    const [image, setImage] = useState(null);

  useEffect(() => {
        const fetchImage = async () => {
        try {
            const response = await axios.get(`${API.PROFILE.GET_ONE(2)}/image`, {
            responseType: 'arraybuffer', // Ensure response is treated as a binary array buffer
            });
            console.log("image : ",response);
            const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(imageBlob);
            setImage(imageUrl);
        } catch (error) {
            console.error('Error fetching profile image:', error);
        }
        };

        fetchImage();

        return () => {
        // Clean up resources when component unmounts
        if (image) {
            URL.revokeObjectURL(image);
        }
        };
    }, []);
    const fetchAllItems = async (pageNumber,pageSize=10,sortBy='id') => {
        try {
            const data = await fetchRentals(localStorage.getItem('userId'),pageNumber,pageSize,sortBy);
            setRentals(data.content);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect( ()=>{
        setLoading(true);
        console.log(localStorage.getItem('userId'));
        fetchAllItems();
        setLoading(false);

    },[])

    const handleEdit = ()=>{
        navigate("/updateprofile")
    }


    const reviews = "";

   
    return (
        <div className='mb-auto'>
        
            <div className="container mx-auto my-5 p-5">
                <div className="md:flex no-wrap md:-mx-2 ">

                    <div className="w-full md:w-3/12 md:mx-2">

                        <div className="bg-white p-3 border-t-4 border-blue-900">
                           <button onClick={handleEdit}><FaEdit className='ml-auto' /></button> 
                      
                            <div className="image overflow-hidden">
                                   <img className='w-40 h-40 rounded-full mx-auto' src={image} alt='avatar' />
                        
                            </div>
                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{User.firstname? User.firstname: User.username} {User.lastname}</h1>
                            <h3 className="text-gray-500 font-lg text-semibold leading-6">{User.description? User.description:"Bio ..."}</h3>
                            <ul
                                className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="flex items-center py-3">
                                    <span>Status</span>
                                    <span className="ml-auto"><span
                                        className="bg-blue-900 py-1 px-2 rounded text-white text-sm">{User.status? User.status: "-"}</span></span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Email</span>
                                    <span className="ml-auto">{User.email? User.email : "-"}</span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Phone</span>
                                    <span className="ml-auto">{User.phone? User.phone : "-"}</span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Member since</span>
                                    <span className="ml-auto">{User.createdAt? User.createdAt:"-"}</span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Address</span>
                                    <span className="ml-auto">{User.address? User.address:"-"}</span>
                                </li>
                                
                            </ul>
                        </div>

                        <div className="my-4"></div>

                        <div className="bg-white p-3 hover:shadow">
                            <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                                <span className="text-blue-900">
                                    <svg className="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </span>
                                <span>Recent Reviews</span>
                            </div>
                            <div className="">
                            <div className="flex flex-col gap-3 mt-14">
                           <Review username="User" message="cool" rating="2"></Review>
                        </div>
                         </div>
                        </div>

                    </div>

                    <div className="w-full md:w-9/12 mx-2 h-64">
                        <div className="bg-white p-3 shadow-sm rounded-sm">
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                <MdInsights/>
                                <span className="tracking-wide">Insights</span>
                            </div>
                            <div className="text-gray-700">
                                <div className="grid md:grid-cols-3 text-sm text-center">
                                    <div>
                                        <div className="px-4 py-2 font-semibold">Rating</div>
                                        <span className="px-2 py-2 font-extrabold text-3xl text-yellow-500">{User.rating? User.rating: "-"}</span><span className='text-xl semi-bold'>/ 5</span>
                                    </div>
                                    <div >
                                        <div className="px-4 py-2 font-semibold">Reviews</div>
                                        <div className="px-4 py-2 font-extrabold text-3xl">{reviews? reviews: "-"}</div>
                                    </div>
                                    <div>
                                        <div className="px-4 py-2 font-semibold">Response Rate</div>
                                        <div className="px-4 py-2 font-extrabold text-3xl text-green-500">{User.responseRate? User.responseRate: "-"}</div>
                                    </div>
                                   
                                   
                                   
                                </div>
                            </div>
                        
                        </div>

                       

                        <div className="bg-white p-3 m-3 shadow-sm rounded-sm my-5">
                                <div>
                                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                        <IoCartSharp/>
                                        <span>Items</span>
                                    </div>
                                    <ul className="list-inside grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        <li>
                                            {/* post */}
                                           {loading && <PostLoading/>}
                                        </li>
                                        <li>
                                            {/* post */}
                                            {loading && <PostLoading/>}
                                        </li>
                                        {rentals.map((rental, index) => (
                                            <li>
                                            <RentalCard
                                                key={index}
                                                id={rental.id}
                                                title={rental.title}
                                                description={rental.description}
                                                images={rental.pictures!=null ? rental.pictures[0].data:null}
                                                pricePerDay={rental.pricePerDay}
                                                location={rental.location}
                                                isFavorite={false}
                                                handleDetailsClick={()=>rental.id}
                                            />
                                            </li>
                                        ))}
                                       
                                       
                                    </ul>
                                </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

  // const User = {firstname: "Jose", lastname: "Morinho", address: "12 rue xcvc rabat", phone: "0678585858",
    //  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus omnis, reiciendis aperiam numquam nam porro unde, iusto iste animi earum enim sapiente facere! Excepturi neque in eius expedita adipisci? Odit?"
    // ,gender: "Male", email: "mail@gm.com", createdAt: "", status: "Active", rating: "4.89", responseRate: "1h"
    // }
    
export default Profile;
