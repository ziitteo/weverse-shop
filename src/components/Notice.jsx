import React from 'react';
// import NoticeCard from './NoticeCard';

// 공지 데이터를 저장하는 배열
const noticeList = [
  {
    id: 0,
    category: '공통',
    title: '시스템 점검으로 인한 위버스샵 이용 제한 안내',
    date: '2024.06.28',
  },
  {
    id: 0,
    category: '공통',
    title: '위버스샵 Mercado Pago Pay 지원중단 안내',
    date: '2024.06.01',
  },
  {
    id: 0,
    category: '공통',
    title: 'Weverse Shop 이용약관, 유료서비스 이용약관 변경 사항 안내 (2024.07.01)',
    date: '2024.05.17',
  },
];

const Notice = () => {
  return (
    <div>
      <div className='notice-container'>
        <h1 className='notice-title title'>Notice</h1>
        <ul className='notice-list'>
          {noticeList.map(notice => (
            <li key={notice.id}>
              <div ref={notice.ref} className='notice-card'>
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
