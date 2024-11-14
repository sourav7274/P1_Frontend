import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './components/Header';
import Footer from './components/Footer';
import AllProducts from './pages/AllProducts';

export let pro = []

function App() {
    
  return (
    <div>
      <Header />
      <AllProducts/>
      <Footer />
    </div>
  );
}

export default App;
