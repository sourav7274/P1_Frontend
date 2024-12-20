import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider,createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store'
import Games from './pages/Games';
import Jackets from './pages/Jackets';
import Books from './pages/Books';
import Phone from './pages/Phone';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import BookDetail from './pages/bookDetail';
import PhoneDetail from './pages/phoneDetails';
import GameDetail from './pages/gameDetails';
import JacketDetail from './pages/jacketDetails';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path:"/games",
    element: <Games/>
  },
  {
    path:"/books",
    element: <Books/>
  },
  {
    path:"/jackets",
    element: <Jackets/>
  },
    {
    path:"/phones",
    element: <Phone/>
  },
  {
    path:"/cart",
    element: <Cart/>
  },
  {
    path:"/wishlist",
    element: <Wishlist/>
  },
  {
    path:"/games/:id",
    element:<GameDetail/>
  },
  {
    path:"/phones/:id",
    element:<PhoneDetail/>
  },
  {
    path:"/jackets/:id",
    element:<JacketDetail/>
  },
  {
    path:"/book/:id",
    element:<BookDetail/>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

