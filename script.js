document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const ingredientsInput = document.getElementById('ingredients-input');
    const resultsContainer = document.getElementById('results-container');

    const searchRecipes = async () => {
        const ingredients = ingredientsInput.value.trim();
        if (!ingredients) {
            resultsContainer.innerHTML = '<p>Please enter some ingredients.</p>';
            return;
        }

        //  use the first ingredient for the search.
        const firstIngredient = ingredients.split(',')[0].trim();
        const API_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${firstIngredient}`;

        resultsContainer.innerHTML = '<p>Searching for recipes...</p>';

        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            displayRecipes(data.meals);
        } catch (error) {
            resultsContainer.innerHTML = '<p>Could not fetch recipes. Please try again later.</p>';
            console.error(error);
        }
    };

    const displayRecipes = (recipes) => {
        if (!recipes) {
            resultsContainer.innerHTML = '<p>No recipes found. Try a different ingredient.</p>';
            return;
        }

        resultsContainer.innerHTML = ''; // Clear previous results
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            recipeCard.innerHTML = `
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                <h3>${recipe.strMeal}</h3>
                <a href="https://www.themealdb.com/meal/${recipe.idMeal}" target="_blank">View Recipe</a>
            `;
            resultsContainer.appendChild(recipeCard);
        });
    };

    searchBtn.addEventListener('click', searchRecipes);
    ingredientsInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchRecipes();
        }
    });
});