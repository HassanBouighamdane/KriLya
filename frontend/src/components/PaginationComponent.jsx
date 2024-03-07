import React, { useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

function PaginationComponent({totalPages,onPageChange}) {
  const [active, setActive] = useState(1);

  const getItemProps = (index) => ({
    style: {
      backgroundColor: active === index ? "#1E3A8A" : "",
      color: active === index ? "#FFFFFF" : "#1F2937",
      hover: active !== index ? { backgroundColor: "red" } : {},
    },
    onClick: () => setActive(index),
  });

  const next = () => {
    onPageChange((active) => {
      if (active === totalPages) return active;
      else{
        setActive(active+1);
        return active + 1;}
    });
  };

  const prev = () => {
    onPageChange((active) => {
      if (active === 1) return active;
      else{
        setActive(active-1);
        return active - 1;}
    });
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <div className="flex items-center gap-4 mb-4 mt-20">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2 ">
      {Array.from({ length: totalPages }, (_, index) => (
            <IconButton key={index+1} 
            {...getItemProps(index+1)} 
            className="flex items-center justify-center h-10 w-10 rounded-full"
            onClick={() => handlePageClick(index + 1)}>
            {index+1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === totalPages}
      >
        Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default PaginationComponent;