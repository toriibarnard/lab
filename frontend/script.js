async function getRecipes() {
  const ingredients = document.getElementById("ingredients").value;
  if (!ingredients) {
    alert("Please enter ingredients.");
    return;
  }

  const response = await fetch(`/api/recipes?ingredients=${ingredients}`);

  const data = await response.json();

  if (data.error) {
    document.getElementById("result").innerHTML = `<p>${data.error}</p>`;
  } else {
    let resultHtml = "";
    data.forEach(recipe => {
      resultHtml += `
        <div class="recipe">
          <h3>${recipe.title}</h3>
          <img src="${recipe.image}" alt="${recipe.title}">
        </div>
      `;
    });
    document.getElementById("result").innerHTML = resultHtml;
  }
}
