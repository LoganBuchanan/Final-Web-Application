document.addEventListener("DOMContentLoaded", () => {
    // Define the namespace and key for CountAPI
    const namespace = "buchanan_building";
    const key = "homepage_visits";

    // Optional: Check if a cached visit count exists in localStorage
    const cachedVisitCount = localStorage.getItem("visitCount");
    if (cachedVisitCount) {
        // Display the cached value while waiting for the live update
        document.getElementById("visit-count").textContent = cachedVisitCount;
    }

    // Fetch the visit count from CountAPI
    fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
        .then((response) => {
            // Ensure the response is OK
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse the JSON response
        })
        .then((data) => {
            // Display the visit count on the page
            document.getElementById("visit-count").textContent = data.value;

            // Cache the visit count in localStorage for faster subsequent loads
            localStorage.setItem("visitCount", data.value);
        })
        .catch((error) => {
            console.error("Error fetching visit count:", error);
            // Show an error message if the fetch fails
            document.getElementById("visit-count").textContent = "Visit count unavailable.";
        });
});
