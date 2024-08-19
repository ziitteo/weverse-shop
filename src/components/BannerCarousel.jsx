import React, { useEffect, useState, useRef } from 'react';

const BannerCarousel = () => {
  // 배너 데이터 배열을 정의
  const eventBanner = [
    {
      index: 0,
      title: `'Harper's BAZAAR MAGAZINE (2024년 9월호)'`,
      desc: '지금 바로 만나보세요',
      fontColor: 'white',
      img: 'https://cdn-contents.weverseshop.io/public/shop/7bf152c508ae33be664f4d2ee530895e.png?q=95&w=720',
    },
    {
      index: 1,
      title: 'Toy Story | TinyTAN Collaboration',
      desc: '지금 바로 만나보세요',
      fontColor: 'white',
      img: 'https://cdn-contents.weverseshop.io/public/shop/f42cb439098a423c592afdfb8c24690d.png?q=95&w=720',
    },
    {
      index: 2,
      title: '초현실적 세상에서 모험을 즐기는 모습이 담긴',
      desc: 'TXT Photo TAKE 판매 시작!',
      fontColor: 'black',
      img: 'https://cdn-contents.weverseshop.io/public/shop/236a5183be1ebaec155466905bc1cf89.png?q=95&w=720',
    },
    {
      index: 3,
      title: "HUENINGKAI'S FLOWER SHOP",
      desc: '향기롭게 기억될 8월 14일, 특별한 위버스 컬렉션도 놓치지 마세요!',
      fontColor: 'black',
      img: 'https://cdn-contents.weverseshop.io/public/shop/eeca1803039b9027798a9bd06d845b64.png?q=95&w=720',
    },
    {
      index: 4,
      title: '2024 KEYLAND ON : AND ON <#>',
      desc: '온라인 라이브 스트리밍 이용권 판매 시작!',
      fontColor: 'white',
      img: 'https://cdn-contents.weverseshop.io/public/shop/1e78d470e8e7d0c5ac2da68074f7e1fd.png?q=95&w=720',
    },
    {
      index: 5,
      title: '2024 Asia Fanmeeting Tour [SUMMER LETTER] in Seoul',
      desc: '이제, VOD로 소장해보세요!',
      fontColor: 'white',
      img: 'https://cdn-contents.weverseshop.io/public/shop/fc240d36f8b389668537314bf942d74e.png?q=95&w=720',
    },
  ];

  // 현재 슬라이드 개수와 상태를 관리
  const [slideCount, setSlideCount] = useState(2);
  // 현재 슬라이드의 인덱스를 관리, 초기값은 슬라이드 수와 동일하게 설정
  const [currentIndex, setCurrentIndex] = useState(slideCount); // 슬라이드 시작 위치를 중간으로 설정
  // 타이틀 및 설명 표시 여부를 관리
  const [isShowInfo, setIsShowInfo] = useState(false);
  // 슬라이드 이동 중인지 여부를 관리
  const [isTransitioning, setIsTransitioning] = useState(false);
  // 상품 데이터를 저장하는 상태
  // const [productList, setProductList] = useState([]);

  // 자동 슬라이드를 관리하는 interval ref
  const intervalRef = useRef(null);
  // 자동 슬라이드 재개를 관리하는 timeout ref
  const timeoutRef = useRef(null);

  // 슬라이드 리스트를 참조하는 ref
  const slideRef = useRef(null);
  // 슬라이드 컨테이너를 참조하는 ref
  const containerRef = useRef(null);

  // 슬라이드 간격 (20px)
  const slideGap = 20;
  // 슬라이드의 px 단위 너비를 관리
  const [slideWidth, setSlideWidth] = useState(0);

  // 슬라이드 너비 계산 및 브라우저 크기 변경에 따른 재설정
  const calculateSlideWidth = () => {
    // 컨테이너의 너비를 기준으로 슬라이드 너비 계산
    const containerWidth = containerRef.current.offsetWidth;
    // 슬라이드 너비 = (컨테이너 너비 - 슬라이드 간격 * (슬라이드 개수 - 1)) / 슬라이드 개수
    // 슬라이드 개수는 브라우저 너비에 따라 2개 또는 1개로 설정
    // 슬라이드 너비 계산
    const calculatedSlideWidth = (containerWidth - slideGap * (slideCount - 1)) / slideCount;
    // 슬라이드 너비 및 슬라이드 개수 설정
    setSlideWidth(calculatedSlideWidth);

    // 슬라이드 개수 설정
    // 브라우저 너비가 1180px 이상이면 2개, 미만이면 1개로 설정
    setSlideCount(window.innerWidth >= 1180 ? 2 : 1);
  };

  // 슬라이드 너비 계산 및 브라우저 크기 변경에 따른 재설정
  // 컴포넌트가 처음 렌더링될 때와 브라우저 크기가 변경될 때마다 호출
  useEffect(() => {
    calculateSlideWidth(); // 초기 설정
    // 브라우저 크기 변경 이벤트 리스너 등록
    window.addEventListener('resize', calculateSlideWidth);

    return () => {
      // 브라우저 크기 변경 이벤트 리스너 해제
      window.removeEventListener('resize', calculateSlideWidth);
    };
  }, [slideCount, slideGap]);

  // 타이틀 및 설명 표시, 0.5초 후 표시
  const showInfoHandler = () => {
    // setTimeout 함수? 일정 시간이 지난 후에 콜백 함수를 실행
    setTimeout(() => {
      // 타이틀 및 설명 표시 상태를 true로 설정
      setIsShowInfo(true);
    }, 500);
  };

  // 다음 슬라이드로 이동
  const nextSlide = () => {
    // 슬라이드 이동 중이 아닐 때만 실행
    if (!isTransitioning) {
      // 타이틀 및 설명 표시 상태를 false로 설정
      setIsShowInfo(false);
      // 슬라이드 이동 중 상태를 true로 설정
      setIsTransitioning(true);
      // 다음 슬라이드 인덱스 계산
      // 다음 슬라이드 인덱스 = 현재 슬라이드 인덱스 + 슬라이드 개수
      setCurrentIndex(prevIndex => prevIndex + slideCount);
      // 슬라이드 이동 후 타이틀 및 설명 표시 함수 호출
      showInfoHandler();
    }
  };

  // 이전 슬라이드로 이동
  const prevSlide = () => {
    // 슬라이드 이동 중이 아닐 때만 실행
    if (!isTransitioning) {
      // 타이틀 및 설명 표시 상태를 false로 설정
      setIsShowInfo(false);
      // 슬라이드 이동 중 상태를 true로 설정
      setIsTransitioning(true);
      // 이전 슬라이드 인덱스 계산
      // 이전 슬라이드 인덱스 = 현재 슬라이드 인덱스 - 슬라이드 개수
      const prevIndex = currentIndex - slideCount;

      // 슬라이드 이동 후 타이틀 및 설명 표시 함수 호출
      setCurrentIndex(prevIndex);

      // 무한 루프를 위한 효과 처리
      setTimeout(() => {
        // 이전 슬라이드 인덱스가 0보다 작을 때
        if (prevIndex < slideCount) {
          // 슬라이드 트랜지션 효과 제거
          slideRef.current.style.transition = 'none';
          // 슬라이드 위치를 맨 끝으로 이동
          setCurrentIndex(eventBanner.length);
          // 슬라이드 위치 = - (이벤트 배너의 길이  * (슬라이드 너비 + 슬라이드 간격))
          slideRef.current.style.transform = `translateX(-${eventBanner.length * (slideWidth + slideGap)}px)`;

          // 0.01초 후 슬라이드 트랜지션 효과 추가
          setTimeout(() => {
            // 슬라이드 트랜지션 효과 추가
            // 0.5초 동안 ease-in-out 효과로 이동
            slideRef.current.style.transition = 'transform 0.5s ease-in-out';
            // 슬라이드 이동 중 상태를 true로 설정
            setIsTransitioning(false);
            // 타이틀 및 설명 표시 함수 호출
            showInfoHandler();
          }, 1);
        }
        // 이전 슬라이드 인덱스가 0보다 클 때
        else {
          // 슬라이드 이동 중 상태를 false로 설정
          setIsTransitioning(false);
          // 타이틀 및 설명 표시 함수 호출
          showInfoHandler();
        }
      }, 500);
    }
  };

  // 자동 슬라이드 멈춤
  const stopAutoSlide = () => {
    // interval 및 timeout 해제
    // intervalRef.current? interval을 참조하는 변수
    // timeoutRef.current? timeout을 참조하는 변수
    // clearInterval 함수? interval을 해제
    // clearTimeout 함수? timeout을 해제
    // interval? 일정 시간마다 반복되는 작업을 수행
    // timeout? 일정 시간 후에 작업을 수행
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
  };

  // 자동 슬라이드 재개
  const resumeAutoSlide = () => {
    // 자동 슬라이드 멈추는 함수 호출
    stopAutoSlide();
    // 일정 시간 후 자동 슬라이드 재개
    timeoutRef.current = setTimeout(() => {
      // 4초마다 nextSlide 함수 호출
      intervalRef.current = setInterval(nextSlide, 4000);
    }, 4000); // 4초 후 자동 슬라이드 재개
  };

  // 슬라이드 자동 넘김
  useEffect(() => {
    // 4초마다 nextSlide 함수 호출
    intervalRef.current = setInterval(nextSlide, 4000);
    // 컴포넌트가 언마운트될 때 interval 및 timeout 해제
    showInfoHandler();

    return () => {
      // interval 및 timeout 해제
      clearInterval(intervalRef.current);
      // clearTimeout 함수? timeout을 해제
      clearTimeout(timeoutRef.current);
    };
  }, [slideCount]);

  // 무한 루프를 위한 효과 처리
  useEffect(() => {
    // 슬라이드 이동 중일 때
    if (isTransitioning) {
      // 현재 슬라이드 인덱스가 이벤트 배너의 길이 + 슬라이드 개수보다 클 때
      if (currentIndex >= eventBanner.length + slideCount) {
        // 0.5초 후 슬라이드 트랜지션 효과 제거
        setTimeout(() => {
          // 슬라이드 트랜지션 효과 제거
          setIsTransitioning(false);
          // 현재 슬라이드 인덱스를 슬라이드 개수로 설정
          setCurrentIndex(slideCount); // 맨 처음 슬라이드로 이동
        }, 500);
      } // 현재 슬라이드 인덱스가 0보다 작을 때
      else if (currentIndex < 0) {
        // 0.5초 후 슬라이드 트랜지션 효과 제거
        setTimeout(() => {
          // 슬라이드 트랜지션 효과 제거
          setIsTransitioning(false);
          // 현재 슬라이드 인덱스를 이벤트 배너의 길이 - 슬라이드 개수로 설정
          setCurrentIndex(eventBanner.length - slideCount); // 맨 끝 슬라이드로 이동
        }, 500);
      }
      // 슬라이드 이동 중이 아닐 때
      else {
        // 0.5초 후 슬라이드 트랜지션 효과 제거
        setTimeout(() => setIsTransitioning(false), 500);
      }
    }
  }, [currentIndex, isTransitioning]);

  // 사용자가 특정 페이지네이션 버튼을 클릭했을 때 호출되는 함수
  const handlePaginationClick = index => {
    stopAutoSlide();
    setIsTransitioning(true);
    setCurrentIndex(index * slideCount + slideCount); // 페이지네이션 인덱스를 기준으로 슬라이드 인덱스를 설정
    resumeAutoSlide();
  };

  // 현재 페이지네이션 인덱스를 반환하는 함수
  const getPaginationIndex = () => {
    return Math.floor(currentIndex / slideCount - 1);
  };

  return (
    <div>
      <section className='event-swiper-container' ref={containerRef}>
        <div className='event-swiper-wrap'>
          <button
            onClick={() => {
              prevSlide();
              stopAutoSlide(); // 자동 슬라이드 멈춤
              resumeAutoSlide(); // 일정 시간 후 다시 시작
            }}
            className='carousel-button prev-button'
          ></button>
          <div className='event-swiper'>
            <ul
              ref={slideRef}
              className='event-swiper-list'
              style={{
                transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
                transform: `translateX(-${currentIndex * (slideWidth + slideGap)}px)`,
                width: `${(eventBanner.length + slideCount * 2) * (slideWidth + slideGap)}px`, // 복제 슬라이드를 고려한 너비
                gap: `${slideGap}px`, // 슬라이드 간의 간격 설정
              }}
            >
              {/* 앞쪽에 복제된 슬라이드 */}
              {eventBanner.slice(-slideCount).map((banner, index) => (
                <li
                  key={`clone-prev-${index}`}
                  className='event-swiper-item'
                  style={{
                    flex: `0 0 ${slideWidth}px`,
                  }}
                >
                  <div className='slide-inner'>
                    <img src={banner.img} alt={banner.title} className='banner-image' />
                    <div className={`event-info ${isShowInfo ? 'show' : ''}`} style={{ color: banner.fontColor }}>
                      <h2>{banner.title}</h2>
                      <p>{banner.desc}</p>
                    </div>
                  </div>
                </li>
              ))}

              {/* 실제 슬라이드 */}
              {eventBanner.map((banner, index) => (
                <li
                  key={index}
                  className='event-swiper-item'
                  style={{
                    flex: `0 0 ${slideWidth}px`,
                  }}
                >
                  <div className='slide-inner'>
                    <img src={banner.img} alt={banner.title} className='banner-image' />
                    <div className={`event-info ${isShowInfo ? 'show' : ''}`} style={{ color: banner.fontColor }}>
                      <h2>{banner.title}</h2>
                      <p>{banner.desc}</p>
                    </div>
                  </div>
                </li>
              ))}

              {/* 뒤쪽에 복제된 슬라이드 */}
              {eventBanner.slice(0, slideCount).map((banner, index) => (
                <li
                  key={`clone-next-${index}`}
                  className='event-swiper-item'
                  style={{
                    flex: `0 0 ${slideWidth}px`,
                  }}
                >
                  <div className='slide-inner'>
                    <img src={banner.img} alt={banner.title} className='banner-image' />
                    <div className={`event-info ${isShowInfo ? 'show' : ''}`} style={{ color: banner.fontColor }}>
                      <h2>{banner.title}</h2>
                      <p>{banner.desc}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => {
              nextSlide();
              stopAutoSlide(); // 자동 슬라이드 멈춤
              resumeAutoSlide(); // 일정 시간 후 다시 시작
            }}
            className='carousel-button next-button'
          ></button>
        </div>
        <div className='pagination'>
          {Array.from({ length: Math.ceil(eventBanner.length / slideCount) }, (_, index) => (
            <button
              key={index}
              className={`pagination-bar ${getPaginationIndex() === index ? 'active' : ''}`}
              onClick={() => handlePaginationClick(index)}
            ></button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BannerCarousel;
