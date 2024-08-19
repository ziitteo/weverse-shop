import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

const Best = props => {
  // Best 상품 목록 중에서 현재 선택된 아티스트의 상품만 필터링
  const filteredBestProductList = props.productList.filter(product => product.artist === props.activeArtist);

  // 상품 목록 중에서 best 상품만 필터링
  const filteredBestList = filteredBestProductList.filter(product => product.best);

  return (
    <div>
      <Container className='best-container'>
        <Row className='row-container'>
          {filteredBestList.map(product => (
            <Col lg={3} md={3} sm={12} xsm={12} key={product.id} className='best-product-card'>
              <ProductCard item={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Best;
