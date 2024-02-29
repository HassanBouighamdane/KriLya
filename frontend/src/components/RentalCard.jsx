import React from 'react';
import AddToFavorites from '../components/AddToFavorites'; // Import AddToFavorites component
import RemoveFromFavorites from '../components/RemoveFromFavorites'; // Import RemoveFromFavorites component
import { Link } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

export default function RentalCard({id,title, description, images, pricePerDay, location, isFavorite, handleFavouritesClick,handleDetailsClick }) {
    const imageSrc = `data:image/png;base64,${images}`;

    return (
        <Card className="border-4 p-8 w-full max-w-[25rem] flex flex-col justify-between" style={{ paddingTop: 12, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', minHeight: '100%' }}>
            <div>
                <CardHeader floated={false} color="blue-gray">
                    <img 
                        src={imageSrc}
                        alt="Item Image"
                    
                    />
                    {isFavorite ? (
                        <RemoveFromFavorites handleFavoritesClick={handleFavouritesClick} className="absolute top-2 right-2 z-10" />
                    ) : (
                        <AddToFavorites handleFavoritesClick={handleFavouritesClick} className="absolute top-2 right-2 z-10" />
                    )}
                </CardHeader>

                <CardBody>
                    <div className="mb-3 flex items-center justify-between" style={{ marginTop: '10px' }}>
                        <Typography variant="h5" color="blue-gray" className="font-medium">
                            {title}
                        </Typography>
                        <div className="flex items-center gap-1.5 font-normal">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4 text-gray-500">
                                <path
                                    d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"
                                />
                            </svg>
                            <Typography
                                color="blue-gray"
                                style={{ fontSize: '1rem', color: '#555' }}
                            >
                                {location}
                            </Typography>
                        </div>
                    </div>
                    <Typography color="gray">
                        {description}
                    </Typography>
                    <Typography color="red" className="font-medium">
                        {pricePerDay}$ per day
                    </Typography>
                </CardBody>
            </div>

            <CardFooter className="pt-3 flex justify-between mt-3 space-x-4 ">
            <Button className="pt-3 bg-blue-400 rounded-none" fullWidth={true} size="lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                    Reserve
                </Button>
                <Link className="block w-full" to={`/items/${id}/details`}>
                <Button onClick={handleDetailsClick} className="pt-3 bg-blue-900 rounded-none" fullWidth={true} size="lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                    See more 
                </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
