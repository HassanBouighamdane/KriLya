
import React from 'react';

export  function RemoveFromFavorites ({ handleFavoritesClick }) {
	return (
		<>
			<span className='mr-2'>&nbsp;</span>
			<svg
				width='1em'
				height='1em'
				viewBox='0 0 16 16'
				className='bi bi-heart-fill'
				fill='red'
				xmlns='http://www.w3.org/2000/svg'
				onClick={handleFavoritesClick}
			>
				<path
					fillRule='evenodd'
					d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
				/>
			</svg>
		</>
	);
};

export  function AddToFavorites ({ handleFavoritesClick }) {
	return (
		<>
			<span className='mr-2'>&nbsp;</span>
			<svg
				width='1em'
				height='1em'
				viewBox='0 0 16 16'
				className='bi bi-heart-fill'
				fill='#c0c0c0'
				xmlns='http://www.w3.org/2000/svg'
				onClick={handleFavoritesClick}
			>
				<path
					fillRule='evenodd'
					d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
				/>
			</svg>
		</>
	);
};


