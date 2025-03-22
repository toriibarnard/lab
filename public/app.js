async function getRecommendations() {
  const diet = document.getElementById('diet').value;
  const ingredients = document.getElementById('ingredients').value;
  
  // call backend api
  const response = await fetch(`http://localhost:3000/api/recommendations?diet=${diet}&ingredients=${ingredients}`);
  
  if (response.ok) {
    const data = await response.json();
    displayRecipes(data);
  } else {
    alert("Error fetching recipes.");
  }
}

function displayRecipes(recipes) {
  const recipesDiv = document.getElementById('recipes');
  recipesDiv.innerHTML = '';  // clear previous results

  if (recipes.length === 0) {
    recipesDiv.innerHTML = 'No recipes found for the given ingredients and diet.';
    return;
  }

  recipes.forEach(recipe => {
    const recipeElement = document.createElement('div');
    recipeElement.innerHTML = `
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}" width="200px">
      <p>Ready in ${recipe.readyInMinutes} minutes</p>
      <a href="${recipe.sourceUrl}" target="_blank">View Recipe</a>
      <h4>Ingredients:</h4>
      <ul>
        ${recipe.usedIngredients.map(ingredient => `<li>${ingredient.name}</li>`).join('')}
      </ul>
    `;
    recipesDiv.appendChild(recipeElement);
  });
}

