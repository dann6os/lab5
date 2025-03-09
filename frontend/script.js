document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchBtn").addEventListener("click", getDietRecommendations);
});

async function getDietRecommendations() {
    const diet = document.getElementById("diet").value;

    try {
        const response = await fetch(`/api/recommend-diet?diet=${encodeURIComponent(diet)}`);
        const data = await response.json();

        if (data.error) {
            document.getElementById("results").innerHTML = `<p>${data.error}</p>`;
        } else {
            document.getElementById("results").innerHTML = `
                <h2>Recommended ${diet} Recipes</h2>
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
