import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductAll from './page/ProductAll';
import Login from './page/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './route/PrivateRoute';
import SearchPage from './page/SearchPage';

function App() {
  // 로그인 여부 확인
  const [authenticate, setAuthenticate] = useState(false); // true: 로그인, false: 로그아웃

  // 검색어 저장
  const [search, setSearch] = useState('');

  const [productList, setProductList] = useState([]); // 상품 데이터를 저장하는 상태

  // 상품 데이터를 가져오는 함수
  const getProducts = async () => {
    const url = `https://my-json-server.typicode.com/ziitteo/weverse-shop/products`;
    const response = await fetch(url);
    const data = await response.json();
    setProductList(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className='container'>
        <Navbar authenticate={authenticate} setAuthenticate={setAuthenticate} setSearch={setSearch} />
        <Routes>
          <Route path='/' element={<ProductAll authenticate={authenticate} productList={productList} />} />
          <Route path='/login' element={<Login setAuthenticate={setAuthenticate} />} />
          <Route path='/product/:id' element={<PrivateRoute authenticate={authenticate} />} />
          <Route path='/search' element={<SearchPage search={search} productList={productList} />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
