import React, { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';

const ProductCarousel = props => {
  const [slideCount, setSlideCount] = useState(3); // 슬라이드에 표시될 아티스트 개수를 관리하는 상태

  const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이드의 시작 인덱스를 관리하는 상태
  const [slideWidth, setSlideWidth] = useState(0); // 슬라이드의 px 단위 너비를 관리

  const slideRef = useRef(null); // 슬라이드 리스트를 참조하는 ref
  const containerRef = useRef(null); // 슬라이드 컨테이너를 참조하는 ref

  const slideGap = 10; // 슬라이드 간격 (5px)
  const containerPadding = 24;

  // 슬라이드 개수를 설정하는 함수
  const updateSlideCount = () => {
    setSlideCount(window.innerWidth >= 1180 ? 3 : window.innerWidth >= 768 ? 2 : 1);
  };

  // 슬라이드 너비 계산 및 브라우저 크기 변경에 따른 재설정
  const calculateSlideWidth = () => {
    // 컨테이너의 너비를 기준으로 슬라이드 너비 계산
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      // 슬라이드 너비 = (컨테이너 너비 - 슬라이드 간격 * (슬라이드 개수 - 1)) / 슬라이드 개수
      const calculatedSlideWidth = (containerWidth - slideGap * (slideCount - 1) - containerPadding * 2) / slideCount;
      setSlideWidth(calculatedSlideWidth);
    }
  };

  // 다음 슬라이드로 이동하는 함수 (1개씩 이동)
  const nextSlide = () => {
    const maxIndex = props.productList.length - 1; // 최대 인덱스
    const nextIndex = Math.min(currentIndex + 1, maxIndex); // 다음 인덱스 계산
    setCurrentIndex(nextIndex); // 인덱스 업데이트
  };

  // 이전 슬라이드로 이동하는 함수 (1개씩 이동)
  const prevSlide = () => {
    const prevIndex = Math.max(currentIndex - 1, 0); // 이전 인덱스 계산
    setCurrentIndex(prevIndex); // 인덱스 업데이트
  };

  // 컴포넌트가 처음 렌더링 될 때와 브라우저 크기가 변경될 때 슬라이드 개수를 재계산
  useEffect(() => {
    // 슬라이드 개수를 먼저 설정한 후 슬라이드 너비 계산
    updateSlideCount();
    calculateSlideWidth();

    const handleResize = () => {
      updateSlideCount();
      calculateSlideWidth();
    };

    window.addEventListener('resize', handleResize); // 창 크기 변경 시 슬라이드 개수 재계산

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      window.removeEventListener('resize', handleResize);
    };
  }, [slideCount]);

  // props.artistName과 일치하는 상품만 보여주기
  const filteredProductList = props.productList.filter(product => product.artist === props.artistName);

  return (
    <div>
      <section className='product-swiper-container'>
        <div className='product-swiper-wrap' ref={containerRef}>
          <div className='artist-info-wrap'>
            {props.artistList.map(artist => (
              <div key={artist.id} className='artist-info'>
                {props.artistName === artist.name && (
                  <>
                    <img src={artist.img} alt={artist.name} />
                    <h1 className='product-artist-name'>{props.artistName}</h1>
                  </>
                )}
              </div>
            ))}
            <div className='more-area'>
              <p>더보기</p>
            </div>
            {/* 이전 슬라이드로 이동하는 버튼 */}
            <button
              onClick={prevSlide}
              className={`carousel-button prev-button ${currentIndex === 0 ? 'hide' : ''}`}
            ></button>
          </div>
          <div className='product-swiper'>
            <ul
              ref={slideRef}
              className='product-swiper-list'
              style={{
                transform: `translateX(-${(slideWidth + slideGap) * currentIndex}px)`,
                transition: 'transform 0.3s ease-in-out',
              }}
            >
              {filteredProductList.map(product => (
                <li key={product.id} className='product-swiper-item' style={{ width: props.slideWidth }}>
                  <ProductCard
                    item={product}
                    artistName={props.artistName}
                    className='product-card'
                    slideWidth={slideWidth}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* 다음 슬라이드로 이동하는 버튼 */}
          <button
            onClick={nextSlide}
            className={`carousel-button next-button ${currentIndex >= filteredProductList.length - slideCount ? 'hide' : ''}`}
          ></button>
        </div>
      </section>
    </div>
  );
};

export default ProductCarousel;
