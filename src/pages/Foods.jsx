import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import { fetchMeals } from '../services/fetchRecipes';
import './Styles/Recipes.css';
import { getRecipesAction, isLoadingAction, shouldFetch } from '../Redux/actions';
import Filters from '../components/Filters';
import ChefLoading from '../components/ChefLoading';

function Foods({ getRecipes, recipes, itFetch, shouldItFetch, setIsLoading, isLoading }) {
  useEffect(() => {
    setIsLoading(true);
    const timeout = 1500;
    if (shouldItFetch) {
      fetchMeals().then((data) => {
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
      <Filters type="Meals" />
      <Cards items={ recipes } idType="idMeal" />
    </div>
  );
  return (
    <div id="Recipes" className="Foods">
      <Header title="Explorar Comidas" searchBtn />
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

Foods.propTypes = {
  getRecipes: PropTypes.func,
  recipes: PropTypes.arrayOf({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
