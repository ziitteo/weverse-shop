import React, { useEffect, useState } from 'react';
import BannerCarousel from '../components/BannerCarousel';
import ArtistCarousel from '../components/ArtistCarousel';
import ProductCarousel from '../components/ProductCarousel';
import Notice from '../components/Notice';
import Best from '../components/Best';
import BestArtistButton from '../components/BestArtistsButton';

// 아티스트 데이터를 저장하는 배열
const artistList = [
  {
    id: 0,
    name: 'BTS',
    img: 'https://cdn-contents.weverseshop.io/public/shop/88b0601c7d5a06f90bfec4b0dfe92dbf.jpg',
    myartist: true,
  },
  {
    id: 1,
    name: 'TOMORROW X TOGETHER',
    img: 'https://cdn-contents.weverseshop.io/public/shop/b023bbe6a36f400500977e45b5d3318a.jpg',
    myartist: true,
  },
  {
    id: 2,
    name: 'WINNER',
    img: 'https://cdn-contents.weverseshop.io/public/shop/7e438920daa6bfc9a1897851bd058a17.png',
    myartist: true,
  },
  {
    id: 3,
    name: 'SHINee',
    img: 'https://cdn-contents.weverseshop.io/public/shop/0cab8f4599d30ef1aa5947d7cc272405.jpg',
    myartist: true,
  },
  {
    id: 4,
    name: 'SEVENTEEN',
    img: 'https://cdn-contents.weverseshop.io/public/shop/e61b9c31017a5d0090853d61bb2956c8.jpg',
    myartist: false,
  },
  {
    id: 5,
    name: 'NewJeans',
    img: 'https://cdn-contents.weverseshop.io/public/shop/d4ccb8a126439e3313a95f396dfb97f4.jpg',
    myartist: false,
  },
];

const ProductAll = props => {
  // 아티스트 목록 중에서 나의 아티스트 저장하는 useState
  const [artist, setArtist] = useState([]);

  // 현재 선택된 아티스트 이름을 저장하는 useState
  const [activeArtist, setActiveArtist] = useState('BTS');

  // 나의 아티스트만 추출하는 함수
  useEffect(() => {
    setArtist(artistList.filter(artist => artist.myartist));
  }, []);

  // 현재 선택된 아티스트의 이름을 받아와서 저장하는 함수
  const getActiveArtist = artistName => {
    setActiveArtist(artistName);
  };

  return (
    <div>
      <div className='main-container'>
        {/* 이벤트 배너 시작 */}
        <BannerCarousel className='banner-carousel' />
        {/* 이벤트 배너 끝 */}

        {/* 나의 아티스트 or 추천 아티스트 시작 */}
        <div className='artist-container'>
          <h1 className='title'>{props.authenticate ? 'My Artist' : 'Recommended Artist'}</h1>
          {/* 아티스트 목록 시작 */}
          <ArtistCarousel artistList={props.authenticate ? artist : artistList} />
          {/* 아티스트 목록 끝 */}
        </div>
        {/* 나의 아티스트 or 추천 아티스트 끝 */}

        {/* Now 시작 */}
        <div className='now-sale-container'>
          <h1 className='title'>Now</h1>
          {/* 아티스트 별 상품 목록 시작 */}
          {(props.authenticate ? artist : artistList).map(artist => (
            <ProductCarousel artistList={[artist]} artistName={artist.name} productList={props.productList} />
          ))}
          {/* 아티스트 별 상품 목록 끝 */}
        </div>
        {/* Now 끝 */}

        {/* Notice 시작 */}
        <Notice />
        {/* Notice 끝 */}

        {/* Best 시작 */}
        <div className='best-sale-container'>
          <h1 className='title'>Best</h1>
          {/* 아티스트 별 상품 목록 시작 */}
          <BestArtistButton
            artist={props.authenticate ? artist : artistList}
            activeArtist={activeArtist}
            onClick={getActiveArtist}
          />
          <Best activeArtist={activeArtist} productList={props.productList} />
          {/* 아티스트 별 상품 목록 끝 */}
        </div>
        {/* Best 끝 */}
      </div>
    </div>
  );
};

export default ProductAll;
