import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import { fetchBeverages } from '../services/fetchRecipes';
import './Styles/Recipes.css';
import { getRecipesAction, shouldFetch, isLoadingAction } from '../Redux/actions';
import Filters from '../components/Filters';
import ChefLoading from '../components/ChefLoading';

function Beverages({
  getRecipes,
  recipes,
  itFetch,
  shouldItFetch,
  setIsLoading,
  isLoading }) {
  useEffect(() => {
    setIsLoading(true);
    const timeout = 1500;
    if (shouldItFetch) {
      fetchBeverages().then((data) => {
        getRecipes(data);
        setTimeout(() => {
          setIsLoading(false);
        }, timeout);
      });
      itFetch();
    }
  }, [getRecipes, itFetch, setIsLoading, shouldItFetch]);

  const toLoad = (
    <div>
      <Filters type="Drinks" />
      <Cards items={ recipes } idType="idDrink" />
    </div>
  );

  return (
    <div id="Recipes" className="Baverages">
      <Header title="Explorar Bebidas" searchBtn />
      {isLoading ? <ChefLoading /> : toLoad}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.recipesList.list,
  shouldItFetch: state.recipesList.shouldFetch,
  isLoading: state.recipesList.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getRecipes: (data) => dispatch(getRecipesAction(data)),
  itFetch: () => dispatch(shouldFetch()),
  setIsLoading: (bool) => dispatch(isLoadingAction(bool)),
});

Beverages.propTypes = {
  getRecipes: PropTypes.func,
  recipes: PropTypes.arrayOf({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Beverages);
