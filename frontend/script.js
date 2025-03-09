document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchBtn").addEventListener("click", getRecipes);
});

async function getRecipes() {
    const ingredients = document.getElementById("ingredients").value;
    const diet = document.getElementById("diet").value;

    if (!ingredients) {
        alert("Please enter at least one ingredient.");
        return;
    }

    try {
        const response = await fetch(`/api/recommend?ingredients=${encodeURIComponent(ingredients)}&diet=${encodeURIComponent(diet)}`);
        const data = await response.json();

        if (data.error) {
            document.getElementById("results").innerHTML = `<p>${data.error}</p>`;
        } else {
            document.getElementById("results").innerHTML = `
                <h2>Recipe Suggestions</h2>
                <ul>
                    ${data.recipes.map(recipe => `
                        <li>
                            <h3>${recipe.title}</h3>
                            <img src="${recipe.image}" alt="${recipe.title}" width="150">
                        </li>
                    `).join("")}
                </ul>
            `;
        }
    } catch (error) {
        document.getElementById("results").innerHTML = `<p>Error fetching data</p>`;
    }
}
