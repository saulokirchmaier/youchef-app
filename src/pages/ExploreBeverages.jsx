import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Favorites() {
  return (
    <div>
      <Header title="Explorar Bebidas" />
      <div className="Explore">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
            className="button"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/bebidas/178319">
          <button
            type="button"
            data-testid="explore-surprise"
            className="button"
          >
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Favorites;
