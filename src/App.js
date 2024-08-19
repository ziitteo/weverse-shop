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

// 1. 전체상품페이지, 로그인, 상품상세페이지
// 2. 전체 상품페이지에서는 전체 상품을 볼 수 있다
// 3. 로그인 버튼을 누르면 로그인 페이지가 나온다
// 4. 상품 디테일을 눌렀으나 로그인이 되어있지 않으면 로그인 페이지로 이동한다
// 5. 로그인이 되어있으면 상품 디테일 페이지로 이동한다
// 6. 로그아웃 버튼을 클릭하면 로그아웃이 된다
// 7. 로그아웃이 되면 상품 디테일 페이지를 볼 수 없다. 다시 로그인 페이지가 보인다
// 8. 로그인을 하면 로그아웃 버튼이 보이고, 로급아웃을 하면 로그인 버튼이 보인다
// 9. 상품을 검색할 수 있다.

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
