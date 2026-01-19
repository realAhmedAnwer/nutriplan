export class HeaderComponent {
  static #title = document.getElementById("header-title");
  static #description = document.getElementById("header-description");
  static set(title, description) {
    this.#title.innerText = title;
    this.#description.innerText = description;
  }
}
export class SidebarComponent {
  static #navLinksContainer = document.getElementById("nav-links-container");
  static #sidebarOverlay = document.getElementById("sidebar-overlay");
  static #sidebar = document.getElementById("sidebar");
  static #sidebarOpenButton = document.getElementById("header-menu-btn");
  static #sidebarCloseButton = document.getElementById("sidebar-close-btn");
  static getNavLinkContainer() {
    return this.#navLinksContainer;
  }
  static #initiateMobileMenu() {
    this.#sidebarOpenButton.addEventListener("click", () => {
      this.#sidebar.classList.add("open");
      this.#sidebarOverlay.classList.add("active");
    });
    this.#sidebarCloseButton.addEventListener("click", (e) => {
      this.#sidebar.classList.remove("open");
      this.#sidebarOverlay.classList.remove("active");
    });
    this.#sidebarOverlay.addEventListener("click", (e) => {
      if (e.target === this.#sidebarOverlay) {
        this.#sidebar.classList.remove("open");
        this.#sidebarOverlay.classList.remove("active");
      }
    });
  }
  static initiate() {
    this.#navLinksContainer.addEventListener("click", (e) => {
      let clickedNavLink = e.target.closest("[data-page]");
      if (clickedNavLink) {
        const allNavLinks = this.#navLinksContainer.querySelectorAll("a");
        allNavLinks.forEach((navLink) => {
          navLink?.classList.remove("bg-emerald-50", "text-emerald-700");
          navLink?.classList.add("text-gray-600", "hover:bg-gray-50");
        });
        clickedNavLink = clickedNavLink?.querySelector("a");
        clickedNavLink?.classList.remove("text-gray-600", "hover:bg-gray-50");
        clickedNavLink?.classList.add("bg-emerald-50", "text-emerald-700");
      }
    });
    this.#initiateMobileMenu();
  }
}
export class MealsComponent {
  static title = "Meals & Recipes";
  static description =
    "Discover delicious and nutritious recipes tailored for you";
  static #searchInputSection = document.getElementById(
    "search-filters-section",
  );
  static #mealCategoriesSection = document.getElementById(
    "meal-categories-section",
  );
  static #recipesSection = document.getElementById("all-recipes-section");
  static #recipeDetailsModal = document.getElementById("meal-details");
  static #searchInput = document.getElementById("search-input");
  static #areaContainer = document.getElementById("area-container");
  static #categoriesContainer = document.getElementById("categories-grid");
  static #recipesContainer = document.getElementById("recipes-grid");
  static #recipeCounter = document.getElementById("recipes-count");
  static #viewToggleContainer = document.getElementById("view-toggle");
  static #gridViewToggleButton = document.getElementById("grid-view-btn");
  static #listViewToggleButton = document.getElementById("list-view-btn");
  static #isListView = false;

  static show() {
    this.#searchInputSection.style.display = "";
    this.#mealCategoriesSection.style.display = "";
    this.#recipesSection.style.display = "";
  }
  static hide() {
    this.#searchInputSection.style.display = "none";
    this.#mealCategoriesSection.style.display = "none";
    this.#recipesSection.style.display = "none";
    this.#recipeDetailsModal.style.display = "none";
  }
  static getAreasContainer() {
    return this.#areaContainer;
  }
  static getCategoriesContainer() {
    return this.#categoriesContainer;
  }
  static getRecipesContainer() {
    return this.#recipesContainer;
  }
  static getSearchInput() {
    return this.#searchInput;
  }
  static getViewToggleContainer() {
    return this.#viewToggleContainer;
  }
  static getGridViewToggleButton() {
    return this.#gridViewToggleButton;
  }
  static getListViewToggleButton() {
    return this.#listViewToggleButton;
  }
  static fireListView() {
    if (!this.#isListView) {
      this.#listViewToggleButton.classList.add(
        "rounded-md",
        "bg-white",
        "shadow-sm",
      );
      this.#gridViewToggleButton.classList.remove(
        "rounded-md",
        "bg-white",
        "shadow-sm",
      );
      this.#recipesContainer.classList.remove("grid-cols-4", "gap-5");
      this.#recipesContainer.classList.add("grid-cols-2", "gap-4");
      document.querySelectorAll(".recipe-card").forEach((card) => {
        card.classList.add("flex", "flex-row", "h-40");
        card.firstElementChild.classList.remove("h-48");
        card.firstElementChild.classList.add("w-48", "h-full");
        card.firstElementChild.lastElementChild.classList.add("hidden");
        card.lastElementChild.classList.add("w-full");
      });
      this.#isListView = true;
    }
  }
  static fireGridView() {
    if (this.#isListView) {
      this.#listViewToggleButton.classList.remove(
        "rounded-md",
        "bg-white",
        "shadow-sm",
      );
      this.#gridViewToggleButton.classList.add(
        "rounded-md",
        "bg-white",
        "shadow-sm",
      );
      this.#recipesContainer.classList.add("grid-cols-4", "gap-5");
      this.#recipesContainer.classList.remove("grid-cols-2", "gap-4");
      document.querySelectorAll(".recipe-card").forEach((card) => {
        card.classList.remove("flex", "flex-row", "h-40");
        card.firstElementChild.classList.add("h-48");
        card.firstElementChild.classList.remove("w-48", "h-full");
        card.firstElementChild.lastElementChild.classList.remove("hidden");
        card.lastElementChild.classList.remove("w-full");
      });
      this.#isListView = false;
    }
  }
  static renderMealAreas(areas) {
    areas = areas.slice(0, 10);
    let areaCards = `
        <button
          class="area-filter-btn px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 hover:text-white transition-all"
          data-area
        >
          All Recipes
        </button>
    `;
    areaCards += areas
      .map((area) => {
        return `
            <button
              class="area-filter-btn px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
              data-area="${area.name}"
            >
              ${area.name}
            </button>
        `;
      })
      .join("");
    this.#areaContainer.innerHTML = areaCards;
    this.#areaContainer.addEventListener("click", (e) => {
      const clickedButton = e.target.closest(".area-filter-btn");
      if (clickedButton) {
        const allButtons = [...e.target.parentElement.children];
        allButtons.forEach((button) => {
          button.classList.remove(
            "bg-emerald-600",
            "text-white",
            "hover:bg-emerald-700",
            "hover:text-white",
          );
          button.classList.add(
            "bg-gray-100",
            "text-gray-700",
            "hover:bg-gray-200",
          );
        });
        clickedButton.classList.remove(
          "bg-gray-100",
          "text-gray-700",
          "hover:bg-gray-200",
        );
        clickedButton.classList.add(
          "bg-emerald-600",
          "text-white",
          "hover:bg-emerald-700",
          "hover:text-white",
        );
      }
    });
  }
  static renderMealCategories(categories) {
    categories = categories.slice(0, 12);
    const categoriesUI = {
      Beef: {
        backgroundColor: "from-red-50 to-rose-50",
        border: "border-red-200 hover:border-red-400",
        icon: "fa-drumstick-bite",
        iconBackgroundColor: "from-red-400 to-rose-500",
      },
      Chicken: {
        backgroundColor: "from-amber-50 to-orange-50",
        border: "border-amber-200 hover:border-amber-400",
        icon: "fa-drumstick-bite",
        iconBackgroundColor: "from-amber-400 to-orange-500",
      },
      Dessert: {
        backgroundColor: "from-pink-50 to-rose-50",
        border: "border-pink-200 hover:border-pink-400",
        icon: "fa-cake-candles",
        iconBackgroundColor: "from-pink-400 to-rose-500",
      },
      Lamb: {
        backgroundColor: "from-orange-50 to-amber-50",
        border: "border-orange-200 hover:border-orange-400",
        icon: "fa-drumstick-bite",
        iconBackgroundColor: "from-orange-400 to-amber-500",
      },
      Miscellaneous: {
        backgroundColor: "from-slate-50 to-gray-50",
        border: "border-slate-200 hover:border-slate-400",
        icon: "fa-bowl-rice",
        iconBackgroundColor: "from-slate-400 to-gray-500",
      },
      Pasta: {
        backgroundColor: "from-yellow-50 to-amber-50",
        border: "border-yellow-200 hover:border-yellow-400",
        icon: "fa-bowl-food",
        iconBackgroundColor: "from-yellow-400 to-amber-500",
      },
      Pork: {
        backgroundColor: "from-rose-50 to-red-50",
        border: "border-rose-200 hover:border-rose-400",
        icon: "fa-bacon",
        iconBackgroundColor: "from-rose-400 to-red-500",
      },
      Seafood: {
        backgroundColor: "from-cyan-50 to-blue-50",
        border: "border-cyan-200 hover:border-cyan-400",
        icon: "fa-fish",
        iconBackgroundColor: "from-cyan-400 to-blue-500",
      },
      Side: {
        backgroundColor: "from-green-50 to-emerald-50",
        border: "border-green-200 hover:border-green-400",
        icon: "fa-plate-wheat",
        iconBackgroundColor: "from-green-400 to-emerald-500",
      },
      Starter: {
        backgroundColor: "from-teal-50 to-cyan-50",
        border: "border-teal-200 hover:border-teal-400",
        icon: "fa-utensils",
        iconBackgroundColor: "from-teal-400 to-cyan-500",
      },
      Vegan: {
        backgroundColor: "from-emerald-50 to-green-50",
        border: "border-emerald-200 hover:border-emerald-400",
        icon: "fa-leaf",
        iconBackgroundColor: "from-emerald-400 to-green-500",
      },
      Vegetarian: {
        backgroundColor: "from-lime-50 to-green-50",
        border: "border-lime-200 hover:border-lime-400",
        icon: "fa-seedling",
        iconBackgroundColor: "from-lime-400 to-green-500",
      },
    };
    const categoryCards = categories
      .map((category) => {
        const style = categoriesUI[category.name] || {
          backgroundColor: "from-teal-50 to-cyan-50",
          border: "border-teal-200 hover:border-teal-400",
          icon: "fa-utensils",
          iconBackgroundColor: "from-teal-400 to-cyan-500",
        };
        return `
        <div class="category-card bg-gradient-to-br ${style.backgroundColor} rounded-xl p-3 border ${style.border} hover:shadow-md cursor-pointer transition-all group" data-category="${category.name}">
            <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 bg-gradient-to-br ${style.iconBackgroundColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <i class="fa-solid ${style.icon} text-white text-sm"></i>
                </div>
                <div>
                    <h3 class="text-sm font-bold text-gray-900">${category.name}</h3>
                </div>
            </div>
        </div>
    `;
      })
      .join("");
    this.#categoriesContainer.innerHTML = categoryCards;
  }
  static renderMealRecipes(recipes, filterName = "") {
    let recipeCards;
    if (recipes.length) {
      recipeCards = recipes
        .map((recipe) => {
          return `
            <div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group ${this.#isListView && "flex flex-row h-40"}"
              data-meal-id="${recipe.id}"
            >
              <div class="relative ${this.#isListView ? "w-48 h-full" : "h-48"} overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${recipe.thumbnail}"
                  alt="${recipe.name}"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2 ${this.#isListView && "hidden"}">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${recipe.category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${recipe.area}
                  </span>
                </div>
              </div>
              <div class="p-4 ${this.#isListView && "w-full"}">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${recipe.name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${recipe.instructions.join(" ").length > 100 ? recipe.instructions.join(" ").substring(0, 100) : recipe.instructions.join(" ")}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${recipe.category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${recipe.area}
                  </span>
                </div>
              </div>
            </div>
        `;
        })
        .join("");
    } else {
      recipeCards = `
            <div class="flex flex-col items-center justify-center py-12 text-center">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
                </div>
                <p class="text-gray-500 text-lg">No recipes found</p>
                <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
            </div>
        `;
    }
    this.#recipeCounter.innerText = `Showing ${
      recipes.length || 0
    } ${filterName} recipes`;
    this.#recipesContainer.innerHTML = recipeCards;
  }
  static showLoadingMealRecipes() {
    this.#recipesContainer.innerHTML = `
        <div class="flex items-center justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
    `;
  }
  static #getYoutubeEmbedUrl(url) {
    if (!url) return "";
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return url;
  }
  static createMealModalBackButton() {
    return `
      <button
        id="back-to-meals-btn"
        class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors"
      >
        <i class="fa-solid fa-arrow-left"></i>
        <span>Back to Recipes</span>
      </button>
    `;
  }
  static createMealModalHeroSection(mealRecipe) {
    return `
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div class="relative h-80 md:h-96">
          <img
            src="${mealRecipe.thumbnail}"
            alt="${mealRecipe.name}"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
          ></div>
          <div class="absolute bottom-0 left-0 right-0 p-8">
            <div class="flex items-center gap-3 mb-3">
              <span
                class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
                >${mealRecipe.category}</span
              >
              <span
                class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full"
                >${mealRecipe.area}</span
              >
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
              ${mealRecipe.name}
            </h1>
            <div class="flex items-center gap-6 text-white/90">
              <span class="flex items-center gap-2">
                <i class="fa-solid fa-clock"></i>
                <span>30 min</span>
              </span>
              <span class="flex items-center gap-2">
                <i class="fa-solid fa-utensils"></i>
                <span id="hero-servings">4 servings</span>
              </span>
              <span class="flex items-center gap-2">
                <i class="fa-solid fa-fire"></i>
                <span id="hero-calories">Calculating...</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  static createMealModalActionButtons(mealRecipe) {
    return `
      <div class="flex flex-wrap gap-3 mb-8">
        <button id="log-meal-btn" data-meal-id="${mealRecipe.id}" class="flex items-center gap-2 px-6 py-3 bg-gray-300 text-gray-500 rounded-xl font-semibold cursor-not-allowed transition-all" data-meal-id="52891" disabled="" title="Waiting for nutrition data...">
          <i data-fa-i2svg=""><svg class="svg-inline--fa fa-spinner fa-spin" data-prefix="fas" data-icon="spinner" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M208 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm0 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM48 208a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm368 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM75 369.1A48 48 0 1 1 142.9 437 48 48 0 1 1 75 369.1zM75 75A48 48 0 1 1 142.9 142.9 48 48 0 1 1 75 75zM437 369.1A48 48 0 1 1 369.1 437 48 48 0 1 1 437 369.1z"></path></svg></i>
          <span>Calculating...</span>
      </button>
      </div>
      
    `;
  }
  static createMealModalMainContentGrid(mealRecipe) {
    return `
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Ingredients & Instructions -->
            <div class="lg:col-span-2 space-y-8">
              <!-- Ingredients -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-list-check text-emerald-600"></i>
                  Ingredients
                  <span class="text-sm font-normal text-gray-500 ml-auto"
                    >${mealRecipe.ingredients.length} items</span
                  >
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  ${mealRecipe.ingredients
                    .map((ingredient) => {
                      return `
                      <div
                        class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                        />
                        <span class="text-gray-700">
                          <span class="font-medium text-gray-900">${ingredient.measure}</span>
                          ${ingredient.ingredient}
                        </span>
                      </div>
                      `;
                    })
                    .join("")}
                    
                </div>
              </div>

              <!-- Instructions -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                  Instructions
                </h2>
                <div class="space-y-4">
                    ${mealRecipe.instructions
                      .map((instruction, index) => {
                        return `
                        <div
                          class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <div
                            class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                          >
                            ${index + 1}
                          </div>
                          <p class="text-gray-700 leading-relaxed pt-2">
                            ${instruction}
                          </p>
                        </div>
                      `;
                      })
                      .join("")}

                </div>
              </div>

              <!-- Video Section -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-video text-red-500"></i>
                  Video Tutorial
                </h2>
                <div
                  class="relative aspect-video rounded-xl overflow-hidden bg-gray-100"
                >
                  <iframe
                    src="${this.#getYoutubeEmbedUrl(mealRecipe.youtube)}"
                    class="absolute inset-0 w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  >
                  </iframe>
                </div>
              </div>
            </div>

            <!-- Right Column - Nutrition -->
            <div class="space-y-6">
              <!-- Nutrition Facts -->
              <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                  Nutrition Facts
                </h2>
                <div id="nutrition-facts-container">                        
                  <div class="text-center py-8">
                      <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-4">
                          <i class="animate-pulse text-emerald-600 text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-calculator" data-prefix="fas" data-icon="calculator" role="img" viewBox="0 0 384 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L64 0zM96 64l192 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32L96 160c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32zm16 168a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zm80 24a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm128-24a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zM88 352a24 24 0 1 1 0-48 24 24 0 1 1 0 48zm128-24a24 24 0 1 1 -48 0 24 24 0 1 1 48 0zm80 24a24 24 0 1 1 0-48 24 24 0 1 1 0 48zM64 424c0-13.3 10.7-24 24-24l112 0c13.3 0 24 10.7 24 24s-10.7 24-24 24L88 448c-13.3 0-24-10.7-24-24zm232-24c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24z"></path></svg></i>
                      </div>
                      <p class="text-gray-700 font-medium mb-1">Calculating Nutrition</p>
                      <p class="text-sm text-gray-500">Analyzing ingredients...</p>
                      <div class="mt-4 flex justify-center">
                          <div class="flex space-x-1">
                              <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                              <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                              <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
  }
  static injectMealModalIngredient(ingredientsDetails) {
    document.getElementById("nutrition-facts-container").innerHTML = `
      <p class="text-sm text-gray-500 mb-4">Per serving</p>
      <div
        class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
      >
      
        <p class="text-sm text-gray-600">Calories per serving</p>
        <p class="text-4xl font-bold text-emerald-600">${Math.round(
          ingredientsDetails.calories,
        )}</p>
        <p class="text-xs text-gray-500 mt-1">Total: ${
          ingredientsDetails.calories * 4
        } cal</p>
      </div>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span class="text-gray-700">Protein</span>
          </div>
          <span class="font-bold text-gray-900">${
            ingredientsDetails.protein
          }g</span>
        </div>
        <div class="w-full bg-gray-100 rounded-full h-2">
          <div
            class="bg-emerald-500 h-2 rounded-full"
            style="width: ${
              Math.round((ingredientsDetails.protein / 50) * 100) < 100
                ? Math.round((ingredientsDetails.protein / 50) * 100)
                : 100
            }%"
          ></div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-blue-500"></div>
            <span class="text-gray-700">Carbs</span>
          </div>
          <span class="font-bold text-gray-900">${ingredientsDetails.carbs}g</span>
        </div>
        <div class="w-full bg-gray-100 rounded-full h-2">
          <div
            class="bg-blue-500 h-2 rounded-full"
            style="width: ${
              Math.round((ingredientsDetails.carbs / 300) * 100) < 100
                ? Math.round((ingredientsDetails.carbs / 300) * 100)
                : 100
            }%"
          ></div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-purple-500"></div>
            <span class="text-gray-700">Fat</span>
          </div>
          <span class="font-bold text-gray-900">${ingredientsDetails.fat}g</span>
        </div>
        <div class="w-full bg-gray-100 rounded-full h-2">
          <div
            class="bg-purple-500 h-2 rounded-full"
            style="width: ${
              Math.round((ingredientsDetails.fat / 65) * 100) < 100
                ? Math.round((ingredientsDetails.fat / 65) * 100)
                : 100
            }%"
          ></div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-orange-500"></div>
            <span class="text-gray-700">Fiber</span>
          </div>
          <span class="font-bold text-gray-900">${ingredientsDetails.fiber}g</span>
        </div>
        <div class="w-full bg-gray-100 rounded-full h-2">
          <div
            class="bg-orange-500 h-2 rounded-full"
            style="width: ${
              Math.round((ingredientsDetails.fiber / 25) * 100) < 100
                ? Math.round((ingredientsDetails.fiber / 25) * 100)
                : 100
            }%"
          ></div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-pink-500"></div>
            <span class="text-gray-700">Sugar</span>
          </div>
          <span class="font-bold text-gray-900">${ingredientsDetails.sugar}g</span>
        </div>
        <div class="w-full bg-gray-100 rounded-full h-2">
          <div
            class="bg-pink-500 h-2 rounded-full"
            style="width: ${
              Math.round((ingredientsDetails.sugar / 50) * 100) < 100
                ? Math.round((ingredientsDetails.sugar / 50) * 100)
                : 100
            }%"
          ></div>
        </div>
        <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div>
                        <span class="text-gray-700">Saturated Fat</span>
                    </div>
                    <span class="font-bold text-gray-900">${ingredientsDetails.saturatedFat}g</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2">
                    <div class="bg-red-500 h-2 rounded-full" style="width: ${
                      Math.round((ingredientsDetails.saturatedFat / 25) * 100) <
                      100
                        ? Math.round(
                            (ingredientsDetails.saturatedFat / 25) * 100,
                          )
                        : 100
                    }%"></div>
                </div>
      </div>
      <div class="mt-6 pt-6 border-t border-gray-100">
        <h3 class="text-sm font-semibold text-gray-900 mb-3">
          Vitamins & Minerals (% Daily Value)
        </h3>
        <div class="grid grid-cols-1 gap-3 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600">Sodium</span>
            <span class="font-medium">${ingredientsDetails.sodium / 100}%</span>
          </div>
        </div>
      </div>
    `;
    const logMealButton = document.getElementById("log-meal-btn");
    logMealButton.classList.remove(
      "bg-gray-300",
      "text-gray-500",
      "cursor-not-allowed",
    );
    logMealButton.classList.add(
      "bg-blue-600",
      "text-white",
      "hover:bg-blue-700",
    );
    logMealButton.removeAttribute("disabled");
    logMealButton.removeAttribute("title");
    logMealButton.innerHTML = `
      <i class="fa-solid fa-clipboard-list"></i>
      <span>Log This Meal</span>
    `;
    document.getElementById("hero-calories").innerText =
      `${ingredientsDetails.calories} cal/serving`;
  }
  static showMealRecipeDetailsModal(mealRecipe) {
    this.hide();
    this.#recipeDetailsModal.style.display = "";
    const mealRecipeModal =
      this.createMealModalBackButton() +
      this.createMealModalHeroSection(mealRecipe) +
      this.createMealModalActionButtons(mealRecipe) +
      this.createMealModalMainContentGrid(mealRecipe);
    this.#recipeDetailsModal.innerHTML = mealRecipeModal;
    HeaderComponent.set(
      "Recipe Details",
      "View full recipe information and nutrition facts",
    );
  }
  static hideMealRecipeDetailsModal() {
    this.#recipeDetailsModal.style.display = "none";
    HeaderComponent.set(this.title, this.description);
    this.show();
  }
  static openLogMealModal(mealRecipe) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" id="log-meal-modal">
          <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
              <div class="flex items-center gap-4 mb-6">
                  <img src="${mealRecipe.thumbnail}" alt="${mealRecipe.name}" class="w-16 h-16 rounded-xl object-cover">
                  <div>
                      <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
                      <p class="text-gray-500 text-sm">${mealRecipe.name}</p>
                  </div>
              </div>
              
              <div class="mb-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">Number of Servings</label>
                  <div class="flex items-center gap-3">
                      <button id="decrease-servings" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                          <i class="text-gray-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-minus" data-prefix="fas" data-icon="minus" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"></path></svg></i>
                      </button>
                      <input type="number" id="meal-servings" value="1.0" min="0.5" max="10" step="0.5" class="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-lg py-2">
                      <button id="increase-servings" class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                          <i class="text-gray-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-plus" data-prefix="fas" data-icon="plus" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"></path></svg></i>
                      </button>
                  </div>
              </div>
              
              
              <div class="bg-emerald-50 rounded-xl p-4 mb-6">
                  <p class="text-sm text-gray-600 mb-2">Estimated nutrition per serving:</p>
                  <div class="grid grid-cols-4 gap-2 text-center">
                      <div>
                          <p class="text-lg font-bold text-emerald-600" id="modal-calories">${mealRecipe.nutrients.calories}</p>
                          <p class="text-xs text-gray-500">Calories</p>
                      </div>
                      <div>
                          <p class="text-lg font-bold text-blue-600" id="modal-protein">${mealRecipe.nutrients.protein}g</p>
                          <p class="text-xs text-gray-500">Protein</p>
                      </div>
                      <div>
                          <p class="text-lg font-bold text-amber-600" id="modal-carbs">${mealRecipe.nutrients.carbs}g</p>
                          <p class="text-xs text-gray-500">Carbs</p>
                      </div>
                      <div>
                          <p class="text-lg font-bold text-purple-600" id="modal-fat">${mealRecipe.nutrients.fat}g</p>
                          <p class="text-xs text-gray-500">Fat</p>
                      </div>
                  </div>
              </div>
              
              
              <div class="flex gap-3">
                  <button id="cancel-log-meal" class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                      Cancel
                  </button>
                  <button id="confirm-log-meal" class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all">
                      <i class="mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-clipboard-list" data-prefix="fas" data-icon="clipboard-list" role="img" viewBox="0 0 384 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M311.4 32l8.6 0c35.3 0 64 28.7 64 64l0 352c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l8.6 0C83.6 12.9 104.3 0 128 0L256 0c23.7 0 44.4 12.9 55.4 32zM248 112c13.3 0 24-10.7 24-24s-10.7-24-24-24L136 64c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0zM128 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm32 0c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0c-13.3 0-24 10.7-24 24zm0 128c0 13.3 10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0c-13.3 0-24 10.7-24 24zM96 416a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"></path></svg></i>
                      Log Meal
                  </button>
              </div>
          </div>
      </div>
    `,
    );
    document.getElementById("cancel-log-meal").addEventListener("click", () => {
      document.getElementById("log-meal-modal").remove();
    });
    document
      .getElementById("decrease-servings")
      .addEventListener("click", () => {
        const servingsInput = document.getElementById("meal-servings");
        servingsInput.value =
          servingsInput.value > 0.5
            ? (+servingsInput.value - 0.5).toFixed(1)
            : servingsInput.value;
      });
    document
      .getElementById("increase-servings")
      .addEventListener("click", () => {
        const servingsInput = document.getElementById("meal-servings");
        servingsInput.value =
          servingsInput.value < 10
            ? (+servingsInput.value + 0.5).toFixed(1)
            : servingsInput.value;
      });
    const modalOverlay = document.getElementById("log-meal-modal");
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.remove();
      }
    });
  }
  static closeLogMealModal() {
    document.getElementById("log-meal-modal").remove();
  }
}
export class ProductsComponent {
  static title = "Product Scanner";
  static description = "Search packaged foods by name or barcode";
  static #productsSection = document.getElementById("products-section");
  static #productSearchInput = document.getElementById("product-search-input");
  static #searchProductButton = document.getElementById("search-product-btn");
  static #productBarcodeSearchInput = document.getElementById("barcode-input");
  static #lookupBarcodeButton = document.getElementById("lookup-barcode-btn");
  static #ProductsGridContainer = document.getElementById("products-grid");
  static #productcountsContainer = document.getElementById("products-count");
  static #productsLoadingContainer =
    document.getElementById("products-loading");
  static #productsEmptyContainer = document.getElementById("products-empty");
  static #productsCategoriesContainer =
    document.getElementById("product-categories");
  static #nutriScoreFilterContainer = document.getElementById(
    "nutri-score-filter-container",
  );

  static show() {
    this.#productsSection.style.display = "";
  }
  static hide() {
    this.#productsSection.style.display = "none";
  }
  static getProductSearchInput() {
    return this.#productSearchInput;
  }
  static getSearchProductButton() {
    return this.#searchProductButton;
  }
  static getProductBarcodeSearchInput() {
    return this.#productBarcodeSearchInput;
  }
  static getLookupBarcodeButton() {
    return this.#lookupBarcodeButton;
  }
  static getProductsCategoriesContainer() {
    return this.#productsCategoriesContainer;
  }
  static getNutriScoreFilterContainer() {
    return this.#nutriScoreFilterContainer;
  }
  static getProductsGridContainer() {
    return this.#ProductsGridContainer;
  }
  static renderProductsCategories(categories) {
    const styles = [
      "from-amber-500 to-orange-500",
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-sky-400 to-blue-500",
      "from-red-500 to-rose-500",
      "from-green-500 to-emerald-500",
      "from-amber-600 to-yellow-500",
      "from-red-600 to-rose-600",
      "from-cyan-500 to-blue-600",
      "from-orange-500 to-red-500",
    ];
    this.#productsCategoriesContainer.innerHTML = categories
      .map((category, index) => {
        const style = styles[index % 10];
        return `
        <button
          class="product-category-btn flex-shrink-0 px-5 py-3 bg-gradient-to-r ${style} text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          data-category="${category.name.replace(/\s+/g, "_")}"
        >
          <i class="mr-2" data-fa-i2svg=""
            ><svg
              class="svg-inline--fa fa-wheat-awn"
              data-prefix="fas"
              data-icon="wheat-awn"
              role="img"
              viewBox="0 0 576 512"
              aria-hidden="true"
              data-fa-i2svg=""
            >
              <path
                fill="currentColor"
                d="M79.7 234.6c6.2-4.1 14.7-3.4 20.1 2.1l46.1 46.1 6.1 6.7c19.7 23.8 26.3 55 19.2 83.9 31.7-7.7 66.2 1 90.6 25.3l46.1 46.1c6.2 6.2 6.2 16.4 0 22.6l-7.4 7.4c-37.5 37.5-98.3 37.5-135.8 0L134.1 444.3 49.4 529c-9.4 9.4-24.5 9.4-33.9 0-9.4-9.4-9.4-24.6 0-33.9l84.7-84.7-30.5-30.5c-37.5-37.5-37.5-98.3 0-135.7l7.4-7.4 2.5-2.1zm104-104c6.2-4.1 14.7-3.4 20.1 2.1l46.1 46.1 6.1 6.7c19.7 23.8 26.3 55 19.2 83.9 31.7-7.7 66.2 1 90.6 25.3l46.1 46.1c6.2 6.2 6.2 16.4 0 22.6l-7.4 7.4c-37.5 37.5-98.3 37.5-135.8 0l-94.9-94.9c-37.5-37.5-37.5-98.3 0-135.7l7.4-7.4 2.5-2.1zM495.2 15c9.4-9.4 24.6-9.4 34 0 8.8 8.8 9.3 22.7 1.6 32.2L529.2 49 414.7 163.4c7.7 1 15.2 3 22.5 5.9L495.5 111c9.4-9.4 24.6-9.4 34 0 8.8 8.8 9.3 22.7 1.6 32.1l-1.7 1.8-52.7 52.7 39 39c6.2 6.2 6.2 16.4 0 22.6l-7.4 7.4c-37.5 37.5-98.3 37.5-135.8 0l-94.9-94.9c-37.5-37.5-37.5-98.3 0-135.7l7.4-7.4 2.5-2.1c6.2-4.1 14.7-3.4 20.1 2.1l39 39 52.7-52.7c9.4-9.4 24.6-9.4 34 0 8.8 8.8 9.3 22.7 1.6 32.1l-1.7 1.8-58.3 58.3c2.8 7.1 4.7 14.5 5.7 22.1L495.2 15z"
              ></path></svg></i
          >${category.name}
        </button>
      `;
      })
      .join("");
  }
  static showNoProducts() {
    this.#ProductsGridContainer.innerHTML = "";
    this.#productsEmptyContainer.classList.remove("hidden");
  }
  static hideNoProducts() {
    this.#productsEmptyContainer.classList.add("hidden");
  }
  static showLoadingProducts() {
    this.#ProductsGridContainer.innerHTML = "";
    this.hideNoProducts();
    this.#productsLoadingContainer.classList.remove("hidden");
  }
  static hideLoadingProducts() {
    this.#productsLoadingContainer.classList.add("hidden");
  }
  static renderProducts(data, filterName = "") {
    const products = data.data || [];
    const totalNumberOfProducts = data.totalNumber || 0;
    if (!products.length) this.showNoProducts();
    this.#ProductsGridContainer.innerHTML = products
      .map((product) => {
        let nutriBackgroundColor;
        switch (product.nutritionGrade) {
          case "a":
            nutriBackgroundColor = "bg-green-500";
            break;
          case "b":
            nutriBackgroundColor = "bg-lime-500";
            break;
          case "c":
            nutriBackgroundColor = "bg-yellow-500";
            break;
          case "d":
            nutriBackgroundColor = "bg-orange-500";
            break;
          case "e":
            nutriBackgroundColor = "bg-red-500";
            break;
          default:
            nutriBackgroundColor = "bg-gray-400";
        }
        let novaBackgroundColor;
        switch (product.novaGroup) {
          case 1:
            novaBackgroundColor = "bg-green-500";
            break;
          case 2:
            novaBackgroundColor = "bg-lime-500";
            break;
          case 3:
            novaBackgroundColor = "bg-orange-500 ";
            break;
          case 4:
            novaBackgroundColor = "bg-red-500";
            break;
          default:
            novaBackgroundColor = "bg-gray-400";
        }
        return `
        <div
          class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
          data-barcode="${product.barcode}"
        >
          <div
            class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
          >
            ${
              product.image
                ? `
            
              <img
                class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                src="${product.image}"
                alt="${[product.name]}"
                loading="lazy"
                onerror="this.onerror=null; this.src='https://placehold.co/400x400?text=No+Image';"
              />
              `
                : `
              <div class="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center">
                <i class="text-2xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-box" data-prefix="fas" data-icon="box" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M369.4 128l-34.3-48-222.1 0-34.3 48 290.7 0zM0 148.5c0-13.3 4.2-26.3 11.9-37.2L60.9 42.8C72.9 26 92.3 16 112.9 16l222.1 0c20.7 0 40.1 10 52.1 26.8l48.9 68.5c7.8 10.9 11.9 23.9 11.9 37.2L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 148.5z"></path></svg></i>
              </div>
              `
            }
            <!-- Nutri-Score Badge -->
            <div
              class="absolute top-2 left-2 ${nutriBackgroundColor} text-white text-xs font-bold px-2 py-1 rounded uppercase"
            >
              Nutri-Score ${product.nutritionGrade.toUpperCase()}
            </div>
            <!-- NOVA Badge -->
            ${
              product.novaGroup
                ? `
            <div
              class="absolute top-2 right-2 ${novaBackgroundColor} text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
              title="NOVA ${product.novaGroup}"
            >
              ${product.novaGroup}
            </div>
            `
                : ""
            }
          </div>
          <div class="p-4">
            <p
              class="text-xs text-emerald-600 font-semibold mb-1 truncate"
            >
              Ferrero,${[product.name]}
            </p>
            <h3
              class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
            >
              ${[product.name]}
            </h3>
            <div
              class="flex items-center gap-3 text-xs text-gray-500 mb-3"
            >
              <span
                ><i class="mr-1" data-fa-i2svg=""
                  ><svg
                    class="svg-inline--fa fa-fire"
                    data-prefix="fas"
                    data-icon="fire"
                    role="img"
                    viewBox="0 0 448 512"
                    aria-hidden="true"
                    data-fa-i2svg=""
                  >
                    <path
                      fill="currentColor"
                      d="M160.5-26.4c9.3-7.8 23-7.5 31.9 .9 12.3 11.6 23.3 24.4 33.9 37.4 13.5 16.5 29.7 38.3 45.3 64.2 5.2-6.8 10-12.8 14.2-17.9 1.1-1.3 2.2-2.7 3.3-4.1 7.9-9.8 17.7-22.1 30.8-22.1 13.4 0 22.8 11.9 30.8 22.1 1.3 1.7 2.6 3.3 3.9 4.8 10.3 12.4 24 30.3 37.7 52.4 27.2 43.9 55.6 106.4 55.6 176.6 0 123.7-100.3 224-224 224S0 411.7 0 288c0-91.1 41.1-170 80.5-225 19.9-27.7 39.7-49.9 54.6-65.1 8.2-8.4 16.5-16.7 25.5-24.2zM225.7 416c25.3 0 47.7-7 68.8-21 42.1-29.4 53.4-88.2 28.1-134.4-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5-17.3-22.1-49.1-62.4-65.3-83-5.4-6.9-15.2-8-21.5-1.9-18.3 17.8-51.5 56.8-51.5 104.3 0 68.6 50.6 109.2 113.7 109.2z"
                    ></path></svg></i
                >${Math.round(product.nutrients.calories)} kcal/100g</span
              >
            </div>
            <!-- Mini Nutrition -->
            <div class="grid grid-cols-4 gap-1 text-center">
              <div class="bg-emerald-50 rounded p-1.5">
                <p class="text-xs font-bold text-emerald-700">${product.nutrients.protein.toFixed(1)}g</p>
                <p class="text-[10px] text-gray-500">Protein</p>
              </div>
              <div class="bg-blue-50 rounded p-1.5">
                <p class="text-xs font-bold text-blue-700">${product.nutrients.carbs.toFixed(1)}g</p>
                <p class="text-[10px] text-gray-500">Carbs</p>
              </div>
              <div class="bg-purple-50 rounded p-1.5">
                <p class="text-xs font-bold text-purple-700">${product.nutrients.fat.toFixed(1)}g</p>
                <p class="text-[10px] text-gray-500">Fat</p>
              </div>
              <div class="bg-orange-50 rounded p-1.5">
                <p class="text-xs font-bold text-orange-700">${product.nutrients.sugar.toFixed(1)}g</p>
                <p class="text-[10px] text-gray-500">Sugar</p>
              </div>
            </div>
          </div>
        </div>
      `;
      })
      .join("");
    this.#productcountsContainer.innerText = `Found ${totalNumberOfProducts} products ${filterName}`;
  }
  static openLogProductModal(product) {
    const nutrientsProgress = {
      protein:
        product.nutrients.protein >= 50
          ? 100
          : Math.round((product.nutrients.protein / 50) * 100),
      carbs:
        product.nutrients.carbs >= 300
          ? 100
          : Math.round((product.nutrients.carbs / 300) * 100),
      fat:
        product.nutrients.fat >= 65
          ? 100
          : Math.round((product.nutrients.fat / 65) * 100),
      sugar:
        product.nutrients.sugar >= 25
          ? 100
          : Math.round((product.nutrients.sugar / 25) * 100),
    };
    let nutritionGrade = {
      a: {
        status: "Excellent",
        gradeStyle: "background-color: #038141",
        labelStyle: "background-color: #03814120",
      },
      b: {
        status: "Good",
        gradeStyle: "background-color: #85bb2f",
        labelStyle: "background-color: #85bb2f20",
      },
      c: {
        status: "Average",
        gradeStyle: "background-color: #fecb02",
        labelStyle: "background-color: #fecb0220",
      },
      d: {
        status: "Poor",
        gradeStyle: "background-color: #ee8100",
        labelStyle: "background-color: #ee810020",
      },
      e: {
        status: "Bad",
        gradeStyle: "background-color: #e63e11",
        labelStyle: "background-color: #e63e1120",
      },
      unknown: {
        status: "Unknown",
        gradeStyle: "background-color: #999",
        labelStyle: "background-color: #99999920",
      },
    };
    let nova = {
      1: {
        status: "Unprocessed",
        gradeStyle: "background-color: #038141",
        labelStyle: "background-color: #03814120",
      },
      2: {
        status: "Processed",
        gradeStyle: "background-color: #85bb2f",
        labelStyle: "background-color: #85bb2f20",
      },
      3: {
        status: "Processed",
        gradeStyle: "background-color: #ee8100",
        labelStyle: "background-color: #ee810020",
      },
      4: {
        status: "Ultra-processed",
        gradeStyle: "background-color: #e63e11",
        labelStyle: "background-color: #e63e1120",
      },
    };
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" id="product-detail-modal">
            <div class="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6">
            <!-- Header -->
            <div class="flex items-start gap-6 mb-6">
                <div class="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                        ${
                          product.image
                            ? `
                          <img src="${product.image}" alt="Margarine de table" class="w-full h-full object-contain">
                          `
                            : `
                          <i class="text-4xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-box" data-prefix="fas" data-icon="box" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M369.4 128l-34.3-48-222.1 0-34.3 48 290.7 0zM0 148.5c0-13.3 4.2-26.3 11.9-37.2L60.9 42.8C72.9 26 92.3 16 112.9 16l222.1 0c20.7 0 40.1 10 52.1 26.8l48.9 68.5c7.8 10.9 11.9 23.9 11.9 37.2L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 148.5z"></path></svg></i>
                          `
                        }
                </div>
                <div class="flex-1">
                    <p class="text-sm text-emerald-600 font-semibold mb-1">${product.brand || "Unknown Brand"}</p>
                    <h2 class="text-2xl font-bold text-gray-900 mb-3">Margarine de table</h2>
                    <div class="flex items-center gap-3">
                            ${
                              product.nutritionGrade
                                ? `                              
                              <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="${nutritionGrade[product.nutritionGrade].labelStyle}">
                                  <span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold" style="${nutritionGrade[product.nutritionGrade].gradeStyle}">
                                      ${product.nutritionGrade[0].toUpperCase()}
                                  </span>
                                  <div>
                                      <p class="text-xs font-bold" style="color: #ee8100">Nutri-Score</p>
                                      <p class="text-[10px] text-gray-600">${nutritionGrade[product.nutritionGrade].status}</p>
                                  </div>
                              </div>
                            `
                                : ""
                            }
                            ${
                              product.novaGroup
                                ? `                              
                              <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="${nova[product.novaGroup].labelStyle}">
                                  <span class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style="${nova[product.novaGroup].gradeStyle}">
                                      ${product.novaGroup}
                                  </span>
                                  <div>
                                      <p class="text-xs font-bold" style="color: #ee8100">NOVA</p>
                                      <p class="text-[10px] text-gray-600">${nova[product.novaGroup].status}</p>
                                  </div>
                              </div>
                            `
                                : ""
                            }
                    </div>
                </div>
                <button id="x-close-product-modal" class="close-product-modal text-gray-400 hover:text-gray-600">
                    <i class="text-2xl" data-fa-i2svg=""><svg class="close-product-modal svg-inline--fa fa-xmark" data-prefix="fas" data-icon="xmark" role="img" viewBox="0 0 384 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"></path></svg></i>
                </button>
            </div>
            <!-- Nutrition Facts -->
            <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 mb-6 border border-emerald-200">
                <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i class="text-emerald-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-chart-pie" data-prefix="fas" data-icon="chart-pie" role="img" viewBox="0 0 576 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M512.4 240l-176 0c-17.7 0-32-14.3-32-32l0-176c0-17.7 14.4-32.2 31.9-29.9 107 14.2 191.8 99 206 206 2.3 17.5-12.2 31.9-29.9 31.9zM222.6 37.2c18.1-3.8 33.8 11 33.8 29.5l0 197.3c0 5.6 2 11 5.5 15.3L394 438.7c11.7 14.1 9.2 35.4-6.9 44.1-34.1 18.6-73.2 29.2-114.7 29.2-132.5 0-240-107.5-240-240 0-115.5 81.5-211.9 190.2-234.8zM477.8 288l64 0c18.5 0 33.3 15.7 29.5 33.8-10.2 48.4-35 91.4-69.6 124.2-12.3 11.7-31.6 9.2-42.4-3.9L374.9 340.4c-17.3-20.9-2.4-52.4 24.6-52.4l78.2 0z"></path></svg></i>
                    Nutrition Facts <span class="text-sm font-normal text-gray-500">(per 100g)</span>
                </h3>
                <div class="text-center mb-4 pb-4 border-b border-emerald-200">
                    <p class="text-4xl font-bold text-gray-900">${product.nutrients.calories.toFixed(0)}</p>
                    <p class="text-sm text-gray-500">Calories</p>
                </div>
                <div class="grid grid-cols-4 gap-4">
                    <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div class="bg-emerald-500 h-2 rounded-full" style="width: ${nutrientsProgress.protein}%"></div>
                        </div>
                        <p class="text-lg font-bold text-emerald-600">${product.nutrients.protein.toFixed(1)}g</p>
                        <p class="text-xs text-gray-500">Protein</p>
                    </div>
                    <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div class="bg-blue-500 h-2 rounded-full" style="width: ${nutrientsProgress.carbs}%"></div>
                        </div>
                        <p class="text-lg font-bold text-blue-600">${product.nutrients.carbs.toFixed(1)}g</p>
                        <p class="text-xs text-gray-500">Carbs</p>
                    </div>
                    <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div class="bg-purple-500 h-2 rounded-full" style="width: ${nutrientsProgress.fat}%"></div>
                        </div>
                        <p class="text-lg font-bold text-purple-600">${product.nutrients.fat.toFixed(1)}g</p>
                        <p class="text-xs text-gray-500">Fat</p>
                    </div>
                    <div class="text-center">
                        <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div class="bg-orange-500 h-2 rounded-full" style="width: ${nutrientsProgress.sugar}%"></div>
                        </div>
                        <p class="text-lg font-bold text-orange-600">${product.nutrients.sugar.toFixed(1)}g</p>
                        <p class="text-xs text-gray-500">Sugar</p>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-emerald-200">
                    <div class="text-center">
                        <p class="text-sm font-semibold text-gray-900">${product.nutrients.sodium.toFixed(1)}g</p>
                        <p class="text-xs text-gray-500">Sodium</p>
                    </div>
                    <div class="text-center">
                        <p class="text-sm font-semibold text-gray-900">${product.nutrients.fiber.toFixed(1)}g</p>
                        <p class="text-xs text-gray-500">Fiber</p>
                    </div>
                </div>
            </div>
            <!-- Actions -->
            <div class="flex gap-3">
                <button class="add-product-to-log flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all" data-barcode="6111099003897">
                    <i class="mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-plus" data-prefix="fas" data-icon="plus" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"></path></svg></i>Log This Food
                </button>
                <button id="close-product-modal" class="close-product-modal flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                    Close
                </button>
            </div>
        </div>
            </div>
        </div>
    `,
    );
  }
  static closeLogProductModal() {
    document.getElementById("product-detail-modal").remove();
  }
}
export class FoodLogComponent {
  static title = "Food Log";
  static description = "Track your daily nutrition and food intake";
  static #foodLogSection = document.getElementById("foodlog-section");
  static #foodlogNutritionProgressContainer = document.getElementById(
    "foodlog-nutrition-progress",
  );
  static #loggedItemsContainer = document.getElementById("logged-items-list");
  static #loggedItemsNumber = document.getElementById("logged-items-number");
  static #clearAllFoodLogButton = document.getElementById("clear-foodlog");
  static #weeklyChartContainer = document.getElementById("weekly-chart");
  static #quickStatesContainer = document.getElementById("quick-states");
  static show() {
    this.#foodLogSection.style.display = "";
  }
  static hide() {
    this.#foodLogSection.style.display = "none";
  }
  static getLoggedItemsContainer() {
    return this.#loggedItemsContainer;
  }
  static getClearAllFoodLogButton() {
    return this.#clearAllFoodLogButton;
  }
  static renderNutritionProgress(todayLog) {
    let totalCalories = todayLog.totalCalories;
    let totalCarbs = todayLog.totalCarbs;
    let totalFat = todayLog.totalFat;
    let totalProtein = todayLog.totalProtein;
    let totalCaloriesPercentage = Math.round((totalCalories / 2000) * 100);
    totalCaloriesPercentage =
      totalCaloriesPercentage <= 100 ? totalCaloriesPercentage : 100;
    let totalCarbsPercentage = Math.round((totalCarbs / 250) * 100);
    totalCarbsPercentage =
      totalCarbsPercentage <= 100 ? totalCarbsPercentage : 100;
    let totalFatPercentage = Math.round((totalFat / 65) * 100);
    totalFatPercentage = totalFatPercentage <= 100 ? totalFatPercentage : 100;
    let totalProteinPercentage = Math.round((totalProtein / 50) * 100);
    totalProteinPercentage =
      totalProteinPercentage <= 100 ? totalProteinPercentage : 100;
    this.#foodlogNutritionProgressContainer.innerHTML = `               
      <div class="bg-gray-50 rounded-xl p-4">
          <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Calories</span>
              <span class="text-xs ${
                totalCaloriesPercentage < 100
                  ? "text-emerald-600"
                  : "text-red-600"
              }">${totalCaloriesPercentage}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div class="h-2.5 rounded-full ${
                totalCaloriesPercentage < 100 ? "bg-emerald-500" : "bg-red-500"
              }" style="width: ${totalCaloriesPercentage}%"></div>
          </div>
          <div class="flex items-center justify-between text-xs">
              <span class="font-bold ${
                totalCaloriesPercentage < 100
                  ? "text-emerald-600"
                  : "text-red-600"
              }">${totalCalories} kcal</span>
              <span class="text-gray-400">/ 2000 kcal</span>
          </div>
      </div>   
      <div class="bg-gray-50 rounded-xl p-4">
          <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Protein</span>
              <span class="text-xs ${
                totalProteinPercentage < 100 ? "text-blue-600" : "text-red-600"
              }">${totalProteinPercentage}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div class="h-2.5 rounded-full ${
                totalProteinPercentage < 100 ? "bg-blue-500" : "bg-red-500"
              }" style="width: ${totalProteinPercentage}%"></div>
          </div>
          <div class="flex items-center justify-between text-xs">
              <span class="font-bold ${
                totalProteinPercentage < 100 ? "text-blue-600" : "text-red-600"
              }">${totalProtein} g</span>
              <span class="text-gray-400">/ 50 g</span>
          </div>
      </div>         
      <div class="bg-gray-50 rounded-xl p-4">
          <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Carbs</span>
              <span class="text-xs ${
                totalCarbsPercentage < 100 ? "text-amber-600" : "text-red-600"
              }">${totalCarbsPercentage}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div class="h-2.5 rounded-full ${
                totalCarbsPercentage < 100 ? "bg-amber-500" : "bg-red-500"
              }" style="width: ${totalCarbsPercentage}%"></div>
          </div>
          <div class="flex items-center justify-between text-xs">
              <span class="font-bold ${
                totalCarbsPercentage < 100 ? "text-amber-600" : "text-red-600"
              }">${totalCarbs} g</span>
              <span class="text-gray-400">/ 250 g</span>
          </div>
      </div>        
      <div class="bg-gray-50 rounded-xl p-4">
          <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Fat</span>
              <span class="text-xs ${
                totalFatPercentage < 100 ? "text-purple-600" : "text-red-600"
              }">${totalFatPercentage}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div class="h-2.5 rounded-full ${
                totalFatPercentage < 100 ? "bg-purple-500" : "bg-red-500"
              }" style="width: ${totalFatPercentage}%"></div>
          </div>
          <div class="flex items-center justify-between text-xs">
              <span class="font-bold ${
                totalFatPercentage < 100 ? "text-purple-600" : "text-red-600"
              }">${totalFat} g</span>
              <span class="text-gray-400">/ 65 g</span>
          </div>
      </div>
        
    `;
  }
  static renderNoNutritionProgress() {
    this.#foodlogNutritionProgressContainer.innerHTML = `
      <div class="bg-gray-50 rounded-xl p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-700"
            >Calories</span
          >
          <span class="text-xs text-emerald-600">0%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div
            class="h-2.5 rounded-full bg-emerald-500"
            style="width: 0%"
          ></div>
        </div>
        <div class="flex items-center justify-between text-xs">
          <span class="font-bold text-emerald-600">0 kcal</span>
          <span class="text-gray-400">/ 2000 kcal</span>
        </div>
      </div>
      <div class="bg-gray-50 rounded-xl p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-700">Protein</span>
          <span class="text-xs text-blue-600">0%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div
            class="h-2.5 rounded-full bg-blue-500"
            style="width: 0%"
          ></div>
        </div>
        <div class="flex items-center justify-between text-xs">
          <span class="font-bold text-blue-600">0 g</span>
          <span class="text-gray-400">/ 50 g</span>
        </div>
      </div>
      <div class="bg-gray-50 rounded-xl p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-700">Carbs</span>
          <span class="text-xs text-amber-600">0%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div
            class="h-2.5 rounded-full bg-amber-500"
            style="width: 0%"
          ></div>
        </div>
        <div class="flex items-center justify-between text-xs">
          <span class="font-bold text-amber-600">0 g</span>
          <span class="text-gray-400">/ 250 g</span>
        </div>
      </div>
      <div class="bg-gray-50 rounded-xl p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-gray-700">Fat</span>
          <span class="text-xs text-purple-600">0%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div
            class="h-2.5 rounded-full bg-purple-500"
            style="width: 0%"
          ></div>
        </div>
        <div class="flex items-center justify-between text-xs">
          <span class="font-bold text-purple-600">0 g</span>
          <span class="text-gray-400">/ 65 g</span>
        </div>
      </div>
    `;
  }
  static renderLoggedItems(meals) {
    this.#loggedItemsContainer.innerHTML = `
    ${meals
      .map((meal, index) => {
        const dateObj = new Date(meal.loggedAt);
        const formattedTime = dateObj.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        return `
              <div class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
                <div class="flex items-center gap-4">
                    ${
                      meal.type === "meal"
                        ? `
                      <img src="${meal.thumbnail}" alt="${
                        meal.name
                      }" class="w-14 h-14 rounded-xl object-cover">
                      `
                        : `
                      <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                        <i class="text-blue-600 text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-box" data-prefix="fas" data-icon="box" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M369.4 128l-34.3-48-222.1 0-34.3 48 290.7 0zM0 148.5c0-13.3 4.2-26.3 11.9-37.2L60.9 42.8C72.9 26 92.3 16 112.9 16l222.1 0c20.7 0 40.1 10 52.1 26.8l48.9 68.5c7.8 10.9 11.9 23.9 11.9 37.2L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 148.5z"></path></svg></i>
                      </div>
                      `
                    }

                    <div>
                        <p class="font-semibold text-gray-900">${meal.name}</p>
                        <p class="text-sm text-gray-500">
                            ${
                              meal.type === "meal"
                                ? `
                              ${meal.servings} serving
                            `
                                : `
                              ${meal.brand.toUpperCase()}
                            `
                            }
                            <span class="mx-1">•</span>
                            <span class="${meal.type === "meal" ? "text-emerald-600" : "text-blue-600"}">${
                              meal.type === "meal" ? "Recipe" : "Product"
                            }</span>
                        </p>
                        <p class="text-xs text-gray-400 mt-1">${formattedTime}</p>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <div class="text-right">
                        <p class="text-lg font-bold text-emerald-600">${
                          meal.nutrition.calories * meal.servings
                        }</p>
                        <p class="text-xs text-gray-500">kcal</p>
                    </div>
                    <div class="hidden md:flex gap-2 text-xs text-gray-500">
                        <span class="px-2 py-1 bg-blue-50 rounded">${
                          meal.nutrition.protein * meal.servings
                        }g P</span>
                        <span class="px-2 py-1 bg-amber-50 rounded">${
                          meal.nutrition.carbs * meal.servings
                        }g C</span>
                        <span class="px-2 py-1 bg-purple-50 rounded">${
                          meal.nutrition.fat * meal.servings
                        }g F</span>
                    </div>
                    <button class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2" data-index="${index}">
                        <i data-fa-i2svg=""><svg class="svg-inline--fa fa-trash-can" data-prefix="fas" data-icon="trash-can" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M136.7 5.9C141.1-7.2 153.3-16 167.1-16l113.9 0c13.8 0 26 8.8 30.4 21.9L320 32 416 32c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 8.7-26.1zM32 144l384 0 0 304c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-304zm88 64c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24z"></path></svg></i>
                    </button>
                </div>
              </div>
            `;
      })
      .join("")}
    `;
    this.#loggedItemsNumber.innerText = meals.length;
    this.#clearAllFoodLogButton.style.display = "";
  }
  static renderNoLoggedItems() {
    this.#loggedItemsContainer.innerHTML = `
      <div class="text-center py-12">
          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="text-3xl text-gray-300" data-fa-i2svg=""><svg class="svg-inline--fa fa-utensils" data-prefix="fas" data-icon="utensils" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M63.9 14.4C63.1 6.2 56.2 0 48 0s-15.1 6.2-16 14.3L17.9 149.7c-1.3 6-1.9 12.1-1.9 18.2 0 45.9 35.1 83.6 80 87.7L96 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7 0-6.1-.6-12.2-1.9-18.2L223.9 14.3C223.1 6.2 216.2 0 208 0s-15.1 6.2-15.9 14.4L178.5 149.9c-.6 5.7-5.4 10.1-11.1 10.1-5.8 0-10.6-4.4-11.2-10.2L143.9 14.6C143.2 6.3 136.3 0 128 0s-15.2 6.3-15.9 14.6L99.8 149.8c-.5 5.8-5.4 10.2-11.2 10.2-5.8 0-10.6-4.4-11.1-10.1L63.9 14.4zM448 0C432 0 320 32 320 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-448c0-17.7-14.3-32-32-32z"></path></svg></i>
          </div>
          <p class="text-gray-500 font-medium mb-2">No food logged today</p>
          <p class="text-gray-400 text-sm mb-4">Start tracking your nutrition by logging meals or scanning products</p>
          <div class="flex justify-center gap-3">
              <a id="from-log-to-meals" " class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all">
                  <i data-fa-i2svg=""><svg class="svg-inline--fa fa-plus" data-prefix="fas" data-icon="plus" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"></path></svg></i>
                  Browse Recipes
              </a>
              <a id="from-log-to-products" class="nav-link inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                  <i data-fa-i2svg=""><svg class="svg-inline--fa fa-barcode" data-prefix="fas" data-icon="barcode" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M32 32C14.3 32 0 46.3 0 64L0 448c0 17.7 14.3 32 32 32s32-14.3 32-32L64 64c0-17.7-14.3-32-32-32zm88 0c-13.3 0-24 10.7-24 24l0 400c0 13.3 10.7 24 24 24s24-10.7 24-24l0-400c0-13.3-10.7-24-24-24zm72 32l0 384c0 17.7 14.3 32 32 32s32-14.3 32-32l0-384c0-17.7-14.3-32-32-32s-32 14.3-32 32zm208-8l0 400c0 13.3 10.7 24 24 24s24-10.7 24-24l0-400c0-13.3-10.7-24-24-24s-24 10.7-24 24zm-96 0l0 400c0 13.3 10.7 24 24 24s24-10.7 24-24l0-400c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path></svg></i>
                  Scan Product
              </a>
          </div>
      </div>
    `;
    this.#loggedItemsNumber.innerText = 0;
    this.#clearAllFoodLogButton.style.display = "none";
  }
  static renderWeeklyChart(data) {
    this.#weeklyChartContainer.innerHTML = data
      .map((day) => {
        if (day.isExist) {
          return `
        <div class="text-center ">
            <p class="text-xs text-gray-500 mb-1">${day.dayName}</p>
            <p class="text-sm font-medium text-gray-900">${day.dayNumber}</p>
            <div class="mt-2 text-emerald-600">
                <p class="text-lg font-bold">${day.totalCalories}</p>
                <p class="text-xs">kcal</p>
            </div>
            <p class="text-xs text-gray-400 mt-1">${day.meals.length} items</p>
        </div>
      `;
        } else {
          return `
        <div class="text-center ">
            <p class="text-xs text-gray-500 mb-1">${day.dayName}</p>
            <p class="text-sm font-medium text-gray-900">${day.dayNumber}</p>
            <div class="mt-2 text-gray-300">
                <p class="text-lg font-bold">0</p>
                <p class="text-xs">kcal</p>
            </div>
        </div>
      `;
        }
      })
      .join("");
    let avgCalories = 0;
    let totalItems = 0;
    let daysOnTarget = 0;
    data.forEach((day) => {
      if (day.isExist) {
        avgCalories += day.totalCalories;
        totalItems += day.meals.length;
        day.totalCalories < 2000 && daysOnTarget++;
      }
    });
    avgCalories = Math.round(avgCalories / 7);
    this.#quickStatesContainer.innerHTML = `
    <div class="bg-white rounded-xl p-4 border-2 border-gray-200">
        <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <i class="text-emerald-600 text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-chart-line" data-prefix="fas" data-icon="chart-line" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7 262.6 153.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l73.4-73.4 57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"></path></svg></i>
            </div>
            <div>
                <p class="text-sm text-gray-500">Weekly Average</p>
                <p class="text-xl font-bold text-gray-900">${avgCalories} kcal</p>
            </div>
        </div>
    </div>
    
    <div class="bg-white rounded-xl p-4 border-2 border-gray-200">
        <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <i class="text-blue-600 text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-utensils" data-prefix="fas" data-icon="utensils" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M63.9 14.4C63.1 6.2 56.2 0 48 0s-15.1 6.2-16 14.3L17.9 149.7c-1.3 6-1.9 12.1-1.9 18.2 0 45.9 35.1 83.6 80 87.7L96 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224.4c44.9-4.1 80-41.8 80-87.7 0-6.1-.6-12.2-1.9-18.2L223.9 14.3C223.1 6.2 216.2 0 208 0s-15.1 6.2-15.9 14.4L178.5 149.9c-.6 5.7-5.4 10.1-11.1 10.1-5.8 0-10.6-4.4-11.2-10.2L143.9 14.6C143.2 6.3 136.3 0 128 0s-15.2 6.3-15.9 14.6L99.8 149.8c-.5 5.8-5.4 10.2-11.2 10.2-5.8 0-10.6-4.4-11.1-10.1L63.9 14.4zM448 0C432 0 320 32 320 176l0 112c0 35.3 28.7 64 64 64l32 0 0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-448c0-17.7-14.3-32-32-32z"></path></svg></i>
            </div>
            <div>
                <p class="text-sm text-gray-500">Total Items This Week</p>
                <p class="text-xl font-bold text-gray-900">${totalItems} items</p>
            </div>
        </div>
    </div>
    
    <div class="bg-white rounded-xl p-4 border-2 border-gray-200">
        <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <i class="text-purple-600 text-xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-bullseye" data-prefix="fas" data-icon="bullseye" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M448 256a192 192 0 1 0 -384 0 192 192 0 1 0 384 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256 80a80 80 0 1 0 0-160 80 80 0 1 0 0 160zm0-224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zM224 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"></path></svg></i>
            </div>
            <div>
                <p class="text-sm text-gray-500">Days On Goal</p>
                <p class="text-xl font-bold text-gray-900">${daysOnTarget} / 7</p>
            </div>
        </div>
    </div>
  `;
  }
}
