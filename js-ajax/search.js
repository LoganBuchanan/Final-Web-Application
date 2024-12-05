document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const resultsContainer = document.getElementById("search-results");
  
    // Map search terms to section IDs
    const services = [
      { name: "Outdoor and Indoor!", id: "service1" },
      { name: "Setting the Foundation!", id: "service2" },
      { name: "Water and Piping!", id: "service3" },
    ];
  
    // Handle input event on the search box
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase().trim();
  
      // Clear previous results
      resultsContainer.innerHTML = "";
  
      // If the query is empty, do nothing
      if (!query) {
        return;
      }
  
      // Filter services that match the query
      const filteredServices = services.filter((service) =>
        service.name.toLowerCase().includes(query)
      );
  
      // Display filtered results
      filteredServices.forEach((service) => {
        const listItem = document.createElement("li");
        listItem.textContent = service.name;
        listItem.style.cursor = "pointer";
        listItem.addEventListener("click", () => {
          document.getElementById(service.id).scrollIntoView({
            behavior: "smooth",
          });
        });
        resultsContainer.appendChild(listItem);
      });
  
      // Show "No results" message if no matches found
      if (filteredServices.length === 0) {
        const noResults = document.createElement("li");
        noResults.textContent = "No results found.";
        resultsContainer.appendChild(noResults);
      }
    });
  });
  