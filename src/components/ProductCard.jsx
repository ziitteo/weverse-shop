import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = props => {
  const navigate = useNavigate();

  if (!props.item) {
    return null; // item이 없을 경우 아무것도 렌더링하지 않음
  }

  const showDetail = () => {
    navigate(`/product/${props.item.id}`);
  };

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className='product-info-container'
        role='button'
        tabIndex={0}
        style={{ width: props.slideWidth }}
        onClick={showDetail}
      >
        <div className='product-img-wrap' style={{ width: props.slideWidth }}>
          <img
            src={props.item?.img}
            alt={props.item?.title}
            className='product-img'
            style={{ width: props.slideWidth }}
          />
        </div>
        <div className='product-info-wrap'>
          <div className='sale-type'>
            <div className={`membership-only ${props.item?.membership ? '' : 'hide'}`}></div>
            <div className={`exclusive ${props.item?.exclusive ? '' : 'hide'}`}>단독판매</div>
            <div className={`reservation ${props.item?.reservation ? '' : 'hide'}`}>예약판매</div>
          </div>

          <span className={`product-artist ${props.item?.best ? '' : 'hide'}`}></span>
          <h3 className='product-title'>{props.item?.title}</h3>
          <p className='product-price'>
            {(props.item.price || 0).toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
