import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

const SearchPage = props => {
  const searchProductList = props.productList.filter(product =>
    product.title.toLowerCase().includes(props.search.toLowerCase()),
  );

  return (
    <Container className='search-product-container'>
      <Row>
        {searchProductList.length > 0 ? (
          searchProductList.map(product => (
            <Col lg={3} md={12} sm={12} key={product.id}>
              <ProductCard item={product} />
            </Col>
          ))
        ) : (
          <Col className='center'>
            <h1>검색 결과가 없습니다.</h1>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default SearchPage;
