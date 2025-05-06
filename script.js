
document.addEventListener("DOMContentLoaded", function () {
  const cuisineSelect = document.getElementById("cuisineSelector");
  const recipeSelect = document.getElementById("recipeSelector");
  const markdownContainer = document.getElementById("markdown-content");

  const recipes = {
    Indian: [
      "README.md",
      "Indian/Aam Ka Achaar (Home).md",
      "Indian/Aam Ka Achaar (Alternative).md",
      "Indian/Dal Makhani.md",
      "Indian/Sankhla Kulfi.md",
      "Indian/Pahadi Maggi.md",
      "Indian/Indian Pico de Gallo.md"
    ],
    Italian: [
      "Italian/Spaghetti Aglio e Olio.md"
    ]
  };

  function loadMarkdown(file) {
    fetch(file)
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed: " + res.status);
        return res.text();
      })
      .then((text) => {
        markdownContainer.innerHTML = marked.parse(text);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        markdownContainer.innerHTML =
          "<p>⚠️ Recipe could not be loaded. Make sure the file exists and path is correct.</p>";
      });
  }

  function populateRecipes(cuisine) {
    recipeSelect.innerHTML = "";
    recipes[cuisine].forEach((file) => {
      const option = document.createElement("option");
      option.value = file;
      option.textContent = file
        .split("/")
        .pop()
        .replace(/[-_]/g, " ")
        .replace(".md", "");
      recipeSelect.appendChild(option);
    });
    loadMarkdown(recipeSelect.value);
  }

  cuisineSelect.addEventListener("change", () => {
    populateRecipes(cuisineSelect.value);
  });

  recipeSelect.addEventListener("change", () => {
    loadMarkdown(recipeSelect.value);
  });

  // Initial load
  loadMarkdown("README.md");
  populateRecipes(cuisineSelect.value);
});
