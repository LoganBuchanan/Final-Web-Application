document.addEventListener("DOMContentLoaded", () => {
    // Unique namespace and key for this site
    const namespace = "buchanan_building";
    const key = "homepage_visits";

    // Fetch the visit count from CountAPI
    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
        .then((response) => response.json())
        .then((data) => {
            // Update the visit count on the page
            document.getElementById("visit-count").textContent = data.value;
        })
        .catch((error) => {
            console.error("Error fetching visit count:", error);
            document.getElementById("visit-count").textContent = "Unavailable";
        });
});
