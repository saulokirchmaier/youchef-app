import React from 'react';
import { connect } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { arrayOf, bool } from 'prop-types';
import { resetNotFound } from '../Redux/actions';
import Card from './Card';
import './Cards.css';

function Cards({ notFound, items, idType, notFoundReset, couldRedirect }) {
  const location = useLocation();
  const type = (location.pathname === '/comidas') ? 'comidas' : 'bebidas';
  const maxItemsToshow = 12;

  const alertNotFound = () => {
    notFoundReset();
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  };

  return (
    <div className="Cards">
      {notFound && alertNotFound()}
      {items.length === 0 && <p>Faça uma busca</p>}
      {items.length === 1 && couldRedirect ? (
        <Redirect to={ `${location.pathname}/${items[0][idType]}` } />
      ) : null}
      {items.slice(0, maxItemsToshow).map((item, index) => (
        <Card
          item={ item }
          index={ index }
          type={ type }
          key={ index }
          detailsURL={ `${location.pathname}/${items[0][idType]}` }
        />
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  notFound: state.recipesList.notFound,
  couldRedirect: state.filter.couldRedirect,
});

const mapDispatchToProps = (dispatch) => ({
  notFoundReset: () => dispatch(resetNotFound()),
});

Cards.propTypes = {
  items: arrayOf(),
  notFound: bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
