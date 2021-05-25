import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Favorites() {
  return (
    <div>
      <Header title="Explorar Comidas" />
      <div className="Explore">
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
            className="button"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            type="button"
            data-testid="explore-by-area"
            className="button"
          >
            Por Local de Origem
          </button>
        </Link>
        <Link to="/comidas/52771">
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
