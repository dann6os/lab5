document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchBtn").addEventListener("click", getDietRecommendations);
});

async function getDietRecommendations() {
    const diet = document.getElementById("diet").value;
    
    const restrictions = Array.from(document.querySelectorAll('input[name="restriction"]:checked'))
                             .map(checkbox => checkbox.value)
                             .join(",");

    try {
        const response = await fetch(`/api/recommend-diet?diet=${encodeURIComponent(diet)}&restrictions=${encodeURIComponent(restrictions)}`);
        const data = await response.json();

        console.log("Frontend Received Data:", data); 

        if (!data.recipes || data.recipes.length === 0) {
            document.getElementById("results").innerHTML = `<p>No recipes found</p>`;
        } else {
            document.getElementById("results").innerHTML = `
                <h2>Recommended ${diet} Recipes</h2>
                <ul>
                    ${data.recipes.map(recipe => `
                        <li>
                            <h3>${recipe.title}</h3>
                            <p>Scrumptious ${diet} recipe</p>
                            <img src="${recipe.image}" alt="${recipe.title} - a ${diet} friendly dish">
                        </li>
                    `).join("")}
                </ul>
            `;
        }
    } catch (error) {
        document.getElementById("results").innerHTML = `<p>Error fetching data</p>`;
    }
}

//added reset function
function resetFilters(){
    document.querySelectorAll('input[name="restriction"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    document.getElementById("results").innerHTML = "";
}
