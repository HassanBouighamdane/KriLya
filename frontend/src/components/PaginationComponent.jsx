import React, { useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

function PaginationComponent({totalPages, onPageChange}) {
  const [active, setActive] = useState(1);

  const next = () => {
    if (active === totalPages) return;
    const nextPage = active + 1;
    setActive(nextPage);
    onPageChange(nextPage);
  };

  const prev = () => {
    if (active === 1) return;
    const prevPage = active - 1;
    setActive(prevPage);
    onPageChange(prevPage);
  };

  return (
    totalPages>1 &&
    <div className="flex items-center gap-4 mb-4 mt-20">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <IconButton
            key={index + 1}
            style={{
              backgroundColor: active === index + 1 ? "#1E3A8A" : "",
              color: active === index + 1 ? "#FFFFFF" : "#1F2937",
            }}
            className="flex items-center justify-center h-10 w-10 rounded-full"
            onClick={() => {
              setActive(index+1);
              onPageChange(index + 1);
            }}
          >
            {index + 1}
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
