$(document).ready(function () {
    // Fetch and update the visitor count from CountAPI
    $.getJSON("https://api.countapi.xyz/hit/webpages.charlotte.edu/bucha13Final_Projectindex.html/visits", function (response) {
        // Update the visitor count in the designated element
        $("#visits").text(response.value);
    }).fail(function () {
        // Handle any errors in the API call
        console.error("Failed to fetch visitor count.");
        $("#visits").text("Error fetching count");
    });
});
