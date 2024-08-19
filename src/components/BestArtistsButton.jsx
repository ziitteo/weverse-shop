import React from 'react';

const BestArtistButton = ({ artist, activeArtist, onClick }) => {
  return (
    <div>
      <div className='button-wrap'>
        {artist.map((artistItem, index) => (
          <button
            key={index}
            name={artistItem.name}
            className={`artist-button ${activeArtist === artistItem.name ? 'active' : ''}`}
            onClick={() => onClick(artistItem.name)}
          >
            {artistItem.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BestArtistButton;
