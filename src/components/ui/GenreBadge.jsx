import React from "react";
import { useNavigate } from "react-router-dom";

export const GenreBadge = ({ genre, variant = "glass" }) => {
  const navigate = useNavigate();

  if (!genre) return null;

  const handleClick = () => {
    if (genre.filter) {
      navigate(`/products?filter=${genre.filter}`);
    }
  };

  if (variant === "glass") {
    return (
      <div
        key={genre.id}
        className="px-4 py-2 rounded-lg border text-[13px] font-medium flex items-center cursor-pointer"
        style={{
          backdropFilter: "blur(10px)",
        }}
      >
        <span className="mr-2 text-cyan-400">#</span>
        <span className="text-white">{genre.name}</span>
      </div>
    );
  }

  if (variant === "solid") {
    return (
      <button
        key={genre.id}
        onClick={handleClick}
        className="px-4 py-2 rounded-lg text-[14px] font-medium flex items-center text-white bg-transparent"
        style={{
          backdropFilter: "blur(10px)",
          border: "1px solid rgb(34, 211, 238)",
        }}
      >
        <span className="mr-2 text-cyan-400">#</span>
        {genre.name}
      </button>
    );
  }

  return null;
};
