import Login from './pages/Login';
import GeekLayout from './pages/GeekLayout';
import { AuthRoute } from './components/AuthRoute';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import Publish from './pages/Publish'
import { HistoryRouter } from './utils/history';
import { history } from './utils/history';
import Article from './pages/Article'

function App() {
  return (
    <HistoryRouter history={history}>
      
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
      
      

    </HistoryRouter>
    
  
  );
}

export default App;
