import React, { useState, useEffect } from 'react';

const noticeList = [
  {
    id: 1,
    category: '공통',
    title: '시스템 점검으로 인한 위버스샵 이용 제한 안내',
    date: '2024.06.28',
  },
  {
    id: 2,
    category: '공통',
    title: '위버스샵 Mercado Pago Pay 지원중단 안내',
    date: '2024.06.01',
  },
  {
    id: 3,
    category: '공통',
    title: 'Weverse Shop 이용약관, 유료서비스 이용약관 변경 사항 안내 (2024.07.01)',
    date: '2024.05.17',
  },
];

const Notice = () => {
  const [isWide, setIsWide] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <div className='notice-container'>
        <h1 className='notice-title title'>Notice</h1>
        <ul className={`notice-list ${isWide ? 'wide' : 'narrow'}`}>
          {noticeList.map(notice => (
            <li key={notice.id}>
              <div className='notice-card'>
                <span>{notice.category}</span>
                <h3>{notice.title}</h3>
                <p>{notice.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notice;
