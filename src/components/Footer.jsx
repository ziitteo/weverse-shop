import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer className='footer'>
        <div class='footer-wrap'>
          <div class='term-info-wrap'>
            <a href='https://privacy.weverse.io/union/privacy_policy_ko.html' class='privacy'>
              개인정보처리방침
            </a>
            <a href='https://api.weverseshop.io/static/terms/agreement?languageCode=ko' class='term-info'>
              이용약관
            </a>
            <a href='https://api.weverseshop.io/static/terms/paid?languageCode=ko' class='term-info'>
              유료서비스 이용 약관
            </a>
            <a
              href='https://privacy.weverse.io/common_cookie/ko.html'
              target='_blank'
              rel='noreferrer noopener'
              class='term-info'
            >
              쿠키정책
            </a>
            <div class='term-info'>쿠키 설정</div>
          </div>
          <dl class='compony-info-wrap'>
            <div class='compony-info'>
              <dt class='compony-info-title'>COMPANY</dt>
              <dd class='compony-info-desc'>WEVERSE COMPANY Inc.</dd>
            </div>
            <div class='compony-info'>
              <dt class='compony-info-title'>CEO</dt>
              <dd class='compony-info-desc'>최준원</dd>
            </div>
            <div class='compony-info'>
              <dt class='compony-info-title'>CALL CENTER</dt>
              <dd class='compony-info-desc'>(+82) 1544-0790</dd>
            </div>
            <div class='compony-info'>
              <dt class='compony-info-title'>FAX</dt>
              <dd class='compony-info-desc'>(+82)-2-2144-9399</dd>
            </div>
            <div class='compony-info'>
              <dt class='compony-info-title'>주소</dt>
              <dd class='compony-info-desc'>경기도 성남시 분당구 분당내곡로 131, C동 6층 (백현동, 판교테크원타워)</dd>
            </div>
            <div class='compony-info'>
              <dt class='compony-info-title'>사업자등록번호</dt>
              <dd class='compony-info-desc'>
                716-87-01158{' '}
                <a
                  data-before-unload-anchor='true'
                  href='http://www.ftc.go.kr/bizCommPop.do?wrkr_no=7168701158'
                  target='_blank'
                  rel='noreferrer noopener'
                >
                  사업자정보확인
                </a>
              </dd>
            </div>
            <div class='compony-info'>
              <dt class='compony-info-title'>통신판매업 신고번호</dt>
              <dd class='compony-info-desc'>제 2022-성남분당A-0557 호</dd>
            </div>
            <div class='compony-info'>
              <dt class='compony-info-title'>호스팅 서비스 사업자</dt>
              <dd class='compony-info-desc'>Amazon Web Services, Inc.</dd>
            </div>
          </dl>
          <address class='address-info'>
            팬클럽 멤버십 서비스의 경우 Weverse Shop은 통신판매중개업자로서 통신판매의 당사자가 아니며, 등록된 입점
            상품의 정보 및 거래에 대해 책임을 지지 않습니다.
          </address>
          <address class='address-info'>
            Copyright by WEVERSE COMPANY INC. or its affiliates (WEVERSE JAPAN &amp; WEVERSE AMERICA Inc) All rights
            reserved.
          </address>
          <address class='address-info'>© WEVERSE COMPANY Inc.</address>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
