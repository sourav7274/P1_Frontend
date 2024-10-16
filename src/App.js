import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home';
import { useState } from 'react';

export let pro = []

function App() {
  const [cartsItem,setCartsItem] = useState([]);  

  const addCart = (product) => {
    setCartsItem(pval => [...pval,product]);
    pro = cartsItem;
  }
  return (
    <div className="App">
      <Header cartsItem={cartsItem.length} />
      <Home addCart={addCart} />
      <Footer />
    </div>
  );
}

export default App;
