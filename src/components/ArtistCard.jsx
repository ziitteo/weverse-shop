import React from 'react';

const ArtistCard = props => {
  return (
    <div>
      <div className='artist-card-container' style={{ width: `${props.slideWidth}px` }}>
        <div className='artist-logo-box'>
          <img src={props.artistImg} alt={props.artistName} className='artist-logo' />
        </div>
        <div className='artist-name'>{props.artistName}</div>
        <div className='more-button'>둘러보기</div>
      </div>
    </div>
  );
};

export default ArtistCard;
