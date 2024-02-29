import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
} from "@material-tailwind/react";


export default function RentalCard({ title, description, images, pricePerDay, location }){
    const imageSrc = `data:image/png;base64,${images}`;
    return (
        <Card className=" border-4 p-8 w-full max-w-[25rem] ">
            <CardHeader floated={false} color="blue-gray">
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <img
                    src={imageSrc}
                    alt="Item Image"
                />
            </CardHeader>

            <CardBody>
                <div className="mb-3 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray" className="font-medium">
                        {title}
                    </Typography>
                    <Typography
                        color="blue-gray"
                        className="flex items-center gap-1.5 font-normal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 384 512">
                            <path
                                d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"/>
                        </svg>
                        {location}
                    </Typography>
                </div>
                <Typography color="gray">
                    {description}
                </Typography>
                <Typography color="red" className="font-medium">
                    {pricePerDay}
                </Typography>
                <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                    <Tooltip content="2 bedrooms">
            <span
                className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            </span>
                    </Tooltip>
                    <Tooltip content="And +20 more">
            <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
              +20
            </span>
                    </Tooltip>
                </div>
                <div>
                </div>
            </CardBody>
            <CardFooter className="p-3 bg-blue-900 " >
                <Button className='bg-blue-900' size="lg" fullWidth={true} >
                    Book
                </Button>
            </CardFooter>
        </Card>
    );
}