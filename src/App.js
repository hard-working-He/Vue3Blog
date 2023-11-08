import Login from './pages/Login';
import GeekLayout from './pages/GeekLayout';
import { AuthRoute } from './components/AuthRoute';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import Publish from './pages/Publish'

import Article from './pages/Article'

function App() {
  return (
  
      <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={
            <AuthRoute>
            <GeekLayout />
            </AuthRoute>
          }>
             <Route index element={<Home></Home>}></Route>
            <Route path="article" element={<Article></Article>
            }></Route>
            <Route path="publish" element={<Publish></Publish>}></Route>
          </Route>

        <Route path='/login' element={<Login/>} />
      </Routes>  
      </div>
      </BrowserRouter>
  
  );
}

export default App;
