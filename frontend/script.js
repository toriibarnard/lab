async function getRecipes() {
  const ingredients = document.getElementById("ingredients").value;
  if (!ingredients) {
    alert("Please enter ingredients.");
    return;
  }

  try {
    const response = await fetch(`/api/recipes?ingredients=${ingredients}`);
    const data = await response.json();

    if (data.error) {
      document.getElementById("result").innerHTML = `<p>${data.error}</p>`;
    } else {
      let resultHtml = "";

      // check if data is an array before using forEach
      if (Array.isArray(data) && data.length > 0) {
        data.forEach(recipe => {
          resultHtml += `
            <div class="recipe">
              <h3>${recipe.title}</h3>
              <img src="${recipe.image}" alt="${recipe.title}">
            </div>
          `;
        });
      } else {
        resultHtml = "<p>No recipes found for the given ingredients.</p>";
      }

      document.getElementById("result").innerHTML = resultHtml;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("result").innerHTML = "<p>Error retrieving recipes. Please try again later.</p>";
  }
}
