import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import exclusive from '../assets/icons/exclusive.svg';
import membership from '../assets/icons/membership_only.svg';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productCount, setProductCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product ? product.price : 0);

  const getProductDetail = async () => {
    const url = `ttps://my-json-server.typicode.com/ziitteo/weverse-shop/products/${id}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
  useEffect(() => {
    getProductDetail();
  }, [id]);

  useEffect(() => {
    setTotalPrice(product ? product.price * productCount : 0);
  }, [productCount, product]);

  return (
    <Container className='product-detail-container'>
      <Row>
        <Col lg={6} md={12} className='product-img-wrap'>
          <img src={product?.img} alt={product?.title} />
        </Col>
        <Col lg={6} md={12} className='product-info-wrap'>
          <div className='product-info'>
            <div className='sale-type'>
              {product?.membership && (
                <div className='membership-only'>
                  <img src={membership} alt='멤버십' />
                </div>
              )}
              {product?.exclusive && (
                <div className='exclusive'>
                  <img src={exclusive} alt='단독판매' />
                  <span>단독판매</span>
                </div>
              )}
            </div>

            <div className='artist'>{product?.artist}</div>
            <h1 className='title'>{product?.title}</h1>
            <strong className='price'>
              {product?.price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}
            </strong>
            <div className='cash'>
              캐시 {product?.cash.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}
            </div>
          </div>

          {product?.reservation && (
            <div className='reservation-info-wrap'>
              <div className='reservation-info-group'>
                <div className='reservation-info'>
                  <h4 className='reservation-title'>해당 상품은 예약 판매 상품입니다.</h4>
                  <div className='delivery-info'>
                    <strong>배송 시작 예정일</strong>
                    <p>{product?.delivery}</p>
                  </div>
                </div>

                <div className='delivery-notice'>
                  <svg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M8 11a.5.5 0 100 1 .5.5 0 000-1zm.005-6.938h-.01a.496.496 0 00-.495.495v5.01c0 .273.223.495.495.495h.01a.496.496 0 00.495-.494v-5.01a.496.496 0 00-.495-.495zM8 15c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM8 0a8 8 0 100 16A8 8 0 008 0z'
                      fill='#404040'
                    ></path>
                  </svg>
                  <p>
                    배송 예정일은 상품 및 물류 상황에 따라 지연될 수 있습니다.일정이 변경될 경우 개별 안내될 예정입니다.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className='product-desc-wrap'>
            <div className='desc-title'>{product?.title}</div>
            <div className='product-desc'>
              <div className='product-count'>
                <button
                  type='button'
                  label='step down'
                  className='button-style step-down'
                  disabled={productCount === 1}
                  onClick={() => setProductCount(prevCount => Math.max(prevCount - 1, 1))}
                ></button>
                <input
                  type='number'
                  min='1'
                  aria-required='true'
                  value={productCount}
                  className='input-style'
                  onChange={event => setProductCount(event.target.value)}
                />
                <button
                  type='button'
                  label='step up'
                  className='button-style step-up'
                  onClick={() => setProductCount(prevCount => prevCount + 1)}
                ></button>
              </div>
            </div>
          </div>

          <div className='total-price-wrap'>
            <div>총 상품 금액 ({productCount}개)</div>
            <div className='total-price'>
              {totalPrice.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}
            </div>
          </div>

          <div className='button-wrap'>
            <button type='button' className='add-cart button-style'>
              카트 추가
            </button>
            <button type='button' className='purchase button-style'>
              바로 구매
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
