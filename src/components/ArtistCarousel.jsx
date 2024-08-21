import React, { useState, useEffect, useRef } from 'react';

import ArtistCard from './ArtistCard';

const ArtistCarousel = props => {
  // 슬라이드에 표시될 아티스트 개수를 관리하는 상태
  const [slideCount, setSlideCount] = useState(3);

  // 현재 슬라이드의 시작 인덱스를 관리하는 상태
  const [currentIndex, setCurrentIndex] = useState(0);

  // 슬라이드의 px 단위 너비를 관리
  const [slideWidth, setSlideWidth] = useState(0);

  // 슬라이드 리스트를 참조하는 ref
  const slideRef = useRef(null);
  // 슬라이드 컨테이너를 참조하는 ref
  const containerRef = useRef(null);

  // 슬라이드 간의 간격(마진)을 저장하는 변수
  const slideGap = 10;

  // 슬라이드 개수를 설정하는 함수
  const updateSlideCount = () => {
    setSlideCount(window.innerWidth >= 1180 ? 3 : 1);
  };

  // 슬라이드 너비 계산 및 브라우저 크기 변경에 따른 재설정
  const calculateSlideWidth = () => {
    // 컨테이너의 너비를 기준으로 슬라이드 너비 계산
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      // 슬라이드 너비 = (컨테이너 너비 - 슬라이드 간격 * (슬라이드 개수 - 1)) / 슬라이드 개수
      const calculatedSlideWidth = (containerWidth - slideGap * (slideCount - 1)) / slideCount;
      setSlideWidth(calculatedSlideWidth);
    }
  };

  const handleResize = () => {
    updateSlideCount();
    calculateSlideWidth();
  };

  // 다음 슬라이드로 이동하는 함수
  const nextSlide = () => {
    // 이동할 수 있는 최대 인덱스를 계산
    const maxIndex = props.artistList.length - slideCount;
    // 한 번에 slideCount만큼 이동하도록 설정
    const nextIndex = Math.min(currentIndex + slideCount, maxIndex);
    // 인덱스가 변경되면 상태 업데이트
    setCurrentIndex(nextIndex);
  };

  // 이전 슬라이드로 이동하는 함수
  const prevSlide = () => {
    // 한 번에 slideCount만큼 이동하도록 설정
    const prevIndex = Math.max(currentIndex - slideCount, 0);
    // 인덱스가 변경되면 상태 업데이트
    setCurrentIndex(prevIndex);
  };

  // 컴포넌트가 처음 렌더링 될 때와 브라우저 크기가 변경될 때 슬라이드 개수를 재계산
  useEffect(() => {
    // 슬라이드 개수를 먼저 설정한 후 슬라이드 너비 계산
    handleResize();

    window.addEventListener('resize', handleResize); // 창 크기 변경 시 슬라이드 개수 재계산

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      window.removeEventListener('resize', handleResize);
    };
  }, [slideCount]);

  return (
    <div>
      <section className='artist-swiper-container' ref={containerRef}>
        <div className='artist-swiper-wrap'>
          {/* 이전 슬라이드로 이동하는 버튼 */}
          <button
            onClick={prevSlide} // 클릭 시 이전 슬라이드로 이동
            className={`carousel-button prev-button ${currentIndex === 0 ? 'hide' : ''}`} // 첫 슬라이드에서는 버튼 숨김
          ></button>
          <div className='artist-swiper'>
            {/* 슬라이드 리스트 */}
            <ul
              ref={slideRef}
              className='artist-swiper-list'
              style={{
                transform: `translateX(-${(slideWidth + slideGap) * currentIndex}px)`, // 슬라이드의 위치 이동
                transition: 'transform 0.5s ease-in-out', // 슬라이드 이동 시 애니메이션 효과 적용
              }}
            >
              {props.artistList.map(artist => (
                <li key={artist.id} className='artist-swiper-item' style={{ width: `${slideWidth}px` }}>
                  <ArtistCard artistName={artist.name} artistImg={artist.img} slideWidth={slideWidth} />
                  {/* 아티스트 카드 컴포넌트 */}
                </li>
              ))}
            </ul>
          </div>
          {/* 다음 슬라이드로 이동하는 버튼 */}
          <button
            onClick={nextSlide} // 클릭 시 다음 슬라이드로 이동
            className={`carousel-button next-button ${currentIndex >= props.artistList.length - slideCount ? 'hide' : ''}`} // 마지막 슬라이드에서는 버튼 숨김
          ></button>
        </div>
      </section>
    </div>
  );
};

export default ArtistCarousel;
