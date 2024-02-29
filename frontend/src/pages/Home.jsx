
import React, {useEffect, useState} from 'react';
import RentalCard from "../components/RentalCard";

export default function Home() {

    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        async function fetchRentals() {
            try {
                const response = await fetch('http://localhost:8081/api/rentals');
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
    }, []);
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Available Rentals</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rentals.map((rental, index) => (
                    <RentalCard
                        key={index}
                        title={rental.title}
                        description={rental.description}
                        images={rental.pictures[0].data}
                        pricePerDay={rental.pricePerDay}
                        location={rental.location}
                    />
                ))}
            </div>
        </div>
    );
}
