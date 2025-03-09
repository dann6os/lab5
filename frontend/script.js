async function getRecommendations() {
    const artist = document.getElementById("artist").value;
    if (!artist) {
        alert("Please enter an artist name.");
        return;
    }

    const response = await fetch(`/api/recommend?artist=${encodeURIComponent(artist)}`);
    const data = await response.json();

    if (data.error) {
        document.getElementById("results").innerHTML = `<p>${data.error}</p>`;
    } else {
        document.getElementById("results").innerHTML = `
            <h2>Similar Artists</h2>
            <ul>${data.recommendations.map(a => `<li>${a}</li>`).join("")}</ul>
        `;
    }
}
