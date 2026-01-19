import { Meal } from "./api/mealdb.js";
import { AppState } from "./state/appState.js";
import {
  FoodLogComponent,
  MealsComponent,
  ProductsComponent,
  SidebarComponent,
} from "./ui/components.js";
import { Router } from "./router/router.js";

// START HELPERS
const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
const pushErrorMessage = (message) => {
  Toast.fire({
    icon: "error",
    title: message,
  });
};
const pushSuccessMessage = (message) => {
  Toast.fire({
    icon: "success",
    title: message,
  });
};
// END   HELPERS

// START NAVIGATION
const initiateNavigation = () => {
  SidebarComponent.initiate();
  Router.navigateTo(AppState.getCurrentPage());
  const navLinkContainer = SidebarComponent.getNavLinkContainer();
  navLinkContainer.addEventListener("click", (e) => {
    const navLink = e.target.closest("li[data-page]");
    if (navLink) {
      const page = navLink.dataset.page;
      Router.navigateTo(page);
    }
  });
};
initiateNavigation();
// END   NAVIGATION
// START MEALS & RECIPES
// START HELPERS
const hideAppLoadingOverlay = () => {
  const overlay = document.getElementById("app-loading-overlay");
  if (overlay) {
    setTimeout(() => {
      overlay.style.transition = "opacity 0.5s ease-out";
      overlay.style.opacity = "0";
      setTimeout(() => {
        overlay.remove();
      }, 500);
    }, 500);
  }
};
const loadAndRenderRandomRecipes = async () => {
  MealsComponent.showLoadingMealRecipes();
  const recipes = await Meal.getRandomMeals();
  if (!recipes || recipes?.length === 0)
    pushErrorMessage("Failed to get random data, Try Again!");
  AppState.setMealRecipes(recipes);
  MealsComponent.renderMealRecipes(recipes);
};
const loadAndRenderRecipesByArea = async (area) => {
  MealsComponent.showLoadingMealRecipes();
  let recipes;
  if (area) {
    recipes = await Meal.searchMealByArea(area);
  } else {
    recipes = await Meal.getRandomMeals();
  }
  if (!recipes || recipes?.length === 0)
    pushErrorMessage("Failed to get data by area, Try Again!");
  AppState.setMealRecipes(recipes);
  MealsComponent.renderMealRecipes(recipes, area);
};
const loadAndRenderRecipesByCategory = async (category) => {
  MealsComponent.showLoadingMealRecipes();
  const recipes = await Meal.searchMealByCategory(category);
  if (!recipes || recipes?.length === 0)
    pushErrorMessage("Failed to get data by category, Try Again!");
  AppState.setMealRecipes(recipes);
  MealsComponent.renderMealRecipes(recipes, category);
};
const loadAndRenderRecipesByQuery = async (query) => {
  MealsComponent.showLoadingMealRecipes();
  const recipes = await Meal.searchMeals(query);
  AppState.setMealRecipes(recipes);
  MealsComponent.renderMealRecipes(recipes, `"${query}"`);
};
const loadAndRenderRecipeDetailsModal = async (mealRecipeId) => {
  const mealRecipe = AppState.getMealRecipeDetailsById(mealRecipeId);
  MealsComponent.showMealRecipeDetailsModal(mealRecipe);
  document.getElementById("back-to-meals-btn").addEventListener("click", () => {
    Router.navigateTo("meals");
    MealsComponent.hideMealRecipeDetailsModal();
  });
  let ingredientsDetails = await Meal.getMealDetails(
    mealRecipe.name,
    mealRecipe.ingredients.map(
      (ingredient) => `${ingredient.measure} ${ingredient.ingredient}`,
    ),
  );
  if (!ingredientsDetails) {
    ingredientsDetails = {
      calories: 0,
      carbs: 0,
      cholesterol: 0,
      fat: 0,
      fiber: 0,
      protein: 0,
      saturatedFat: 0,
      sodium: 0,
      sugar: 0,
    };
    pushErrorMessage("Sorry, Data details isn't availabe.");
  }
  AppState.setCurrentMeal(mealRecipe, ingredientsDetails);
  MealsComponent.injectMealModalIngredient(ingredientsDetails);
  if (!mealRecipe)
    pushErrorMessage("Failed to get data from server, Try Again!");
  document.getElementById("log-meal-btn").addEventListener("click", () => {
    MealsComponent.openLogMealModal(AppState.getCurrentMeal());
    document
      .getElementById("confirm-log-meal")
      .addEventListener("click", () => {
        const servings = +document.getElementById("meal-servings").value || 1;
        AppState.addToDailyLog(servings);
        MealsComponent.closeLogMealModal();
        Swal.fire({
          title: "Meal Logged!",
          text: `
              ${mealRecipe.name} (${servings} serving) has been added to your daily log.
            `,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        loadAndRenderFoodLogData();
      });
  });
};
// END   HELPERS
const addMealSearchInputEventListener = () => {
  const searchInput = MealsComponent.getSearchInput();
  searchInput.addEventListener("input", async (e) => {
    const query = e.target.value;
    if (query) {
      loadAndRenderRecipesByQuery(query);
    } else {
      loadAndRenderRandomRecipes();
    }
  });
};
const addAreasEventListener = () => {
  const areasContainer = MealsComponent.getAreasContainer();
  areasContainer.addEventListener("click", async (e) => {
    const button = e.target.closest(".area-filter-btn");
    if (button) {
      const area = button.dataset.area;
      loadAndRenderRecipesByArea(area);
    }
  });
};
const initiateAreas = async () => {
  const areas = await Meal.getAllAreas();
  if (!areas || areas?.length === 0)
    pushErrorMessage("Failed to get areas, Refresh Page!");
  MealsComponent.renderMealAreas(areas);
  addAreasEventListener();
};
const addCategoriesEventListener = () => {
  const categoriesContainer = MealsComponent.getCategoriesContainer();
  categoriesContainer.addEventListener("click", async (e) => {
    const card = e.target.closest(".category-card");
    if (card) {
      const category = card.dataset.category;
      loadAndRenderRecipesByCategory(category);
    }
  });
};
const initiateCategories = async () => {
  const categories = await Meal.getAllCategories();
  if (!categories || categories?.length === 0)
    pushErrorMessage("Failed to get categories, Refresh Page!");
  MealsComponent.renderMealCategories(categories);
  addCategoriesEventListener();
};
const addMealRecipesEvenetListener = () => {
  const recipesContainer = MealsComponent.getRecipesContainer();
  recipesContainer.addEventListener("click", async (e) => {
    const card = e.target.closest(".recipe-card");
    if (card) {
      loadAndRenderRecipeDetailsModal(card.dataset.mealId);
    }
  });
};
const initiateMealRecipes = async () => {
  loadAndRenderRandomRecipes();
  addMealRecipesEvenetListener();
};
const toggleMealsView = () => {
  MealsComponent.getListViewToggleButton().addEventListener("click", () => {
    MealsComponent.fireListView();
  });
  MealsComponent.getGridViewToggleButton().addEventListener("click", () => {
    MealsComponent.fireGridView();
  });
};
const initiateMeals = () => {
  addMealSearchInputEventListener();
  initiateAreas();
  initiateCategories();
  initiateMealRecipes();
  hideAppLoadingOverlay();
  toggleMealsView();
};
initiateMeals();
// END   MEALS & RECIPES

// START FOODLOG
const initiateFoodLogDate = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  document.getElementById("foodlog-date").innerText = today;
};
function addDeleteFoodLogItemEventListener() {
  const loggedItemsContainer = FoodLogComponent.getLoggedItemsContainer();
  loggedItemsContainer.addEventListener("click", (e) => {
    const deleteButton = e.target.closest(".remove-foodlog-item");
    if (deleteButton) {
      const index = Number(deleteButton.dataset.index);
      AppState.deleteTodayLogByIndex(index);
      pushSuccessMessage("Item removed from log");
      loadAndRenderFoodLogData();
    }
  });
  const deleteAllButton = FoodLogComponent.getClearAllFoodLogButton();
  deleteAllButton.addEventListener("click", () => {
    Swal.fire({
      title: "Clear Today's Log?",
      text: "This will remove all logged food items for today.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        AppState.deleteAllTodayLog();
        loadAndRenderFoodLogData();
        Swal.fire({
          title: "Cleared!",
          text: "Your today's food log has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          pushSuccessMessage("All items removed from log");
        });
      }
    });
  });
}
function getLastWeekResults(data) {
  const results = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const dayNumber = date.toLocaleDateString("en-US", { day: "2-digit" });
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    if (data[dateKey] && data[dateKey].meals.length) {
      results.push({
        date: dateKey,
        isExist: true,
        dayNumber,
        dayName,
        ...data[dateKey],
      });
    } else {
      results.push({
        date: dateKey,
        isExist: false,
        dayNumber,
        dayName,
      });
    }
  }
  return results.reverse();
}
function loadAndRenderWeeklyChart() {
  let data = AppState.getDailyLog();
  data = getLastWeekResults(data);
  FoodLogComponent.renderWeeklyChart(data);
}
function loadAndRenderFoodLogData() {
  const todayLog = AppState.getTodayLog();
  if (todayLog && todayLog?.meals?.length) {
    FoodLogComponent.renderNutritionProgress(todayLog);
    FoodLogComponent.renderLoggedItems(todayLog.meals);
  } else {
    FoodLogComponent.renderNoNutritionProgress();
    FoodLogComponent.renderNoLoggedItems();
    document
      .getElementById("from-log-to-meals")
      .addEventListener("click", (e) => {
        e.preventDefault();
        Router.navigateTo("meals");
      });
    document
      .getElementById("from-log-to-products")
      .addEventListener("click", (e) => {
        e.preventDefault();
        Router.navigateTo("products");
      });
  }
  loadAndRenderWeeklyChart();
}
const initiateFoodLog = () => {
  initiateFoodLogDate();
  addDeleteFoodLogItemEventListener();
  loadAndRenderFoodLogData();
};
initiateFoodLog();
// END   FOODLOG

// START PRODUCTS
// START HELPER
const filterProducts = (products) => {
  const productsFilter = AppState.getProductsFilter();
  if (productsFilter) {
    products.data = products.data.filter(
      (product) => product?.nutritionGrade === productsFilter,
    );
    products.totalNumber = products.data.length;
  }
  return products;
};
// END   HELPER
const renderProducts = async (products, filterName = "") => {
  ProductsComponent.renderProducts(products, filterName);
  AppState.setProducts(products.data);
};
const loadAndRenderProducts = async (query) => {
  ProductsComponent.showLoadingProducts();
  let products = await Meal.searchProducts(query);
  products = filterProducts(products);
  renderProducts(products, `for "${query}"`);
  ProductsComponent.hideLoadingProducts();
  if (!products || products?.data?.length === 0)
    pushErrorMessage("No Matched Products! Try Another Words!");
};
const loadAndRenderProductsByBarcode = async (code) => {
  ProductsComponent.showLoadingProducts();
  let product = await Meal.getProductByBarcode(code);
  renderProducts(
    { data: product ? [product] : [], totalNumber: product ? 1 : 0 },
    `for "${code}"`,
  );
  ProductsComponent.hideLoadingProducts();
  if (!product) pushErrorMessage("No Matched Products! Try Another Barcode!");
};
const loadAndRenderProductsByCategory = async (category) => {
  ProductsComponent.showLoadingProducts();
  const products = await Meal.getProductsByCategory(category);
  if (!products || products?.length === 0)
    pushErrorMessage("Failed to get data by category, Try Again!");
  renderProducts(products, `in ${category.replace(/_/g, " ")}`);
  ProductsComponent.hideLoadingProducts();
};
const loadAndRenderProductsCategories = async () => {
  const categories = await Meal.getAllProductsCategories();
  if (!categories || categories?.length === 0)
    pushErrorMessage("Failed to get categories, Refresh Page!");
  ProductsComponent.renderProductsCategories(categories);
};
const addProductSearchEventListener = () => {
  ProductsComponent.getProductSearchInput().addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const query = e.target.value.trim();
      query != "" && loadAndRenderProducts(query);
    }
  });
  ProductsComponent.getSearchProductButton().addEventListener("click", () => {
    const query = ProductsComponent.getProductSearchInput().value.trim();
    query != "" && loadAndRenderProducts(query);
  });
};
const addProductBarcodeSearchEventListener = () => {
  ProductsComponent.getProductBarcodeSearchInput().addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const query = e.target.value.trim();
        query != "" && loadAndRenderProductsByBarcode(e.target.value);
      }
    },
  );
  ProductsComponent.getLookupBarcodeButton().addEventListener("click", () => {
    const code = ProductsComponent.getProductBarcodeSearchInput().value.trim();
    code != "" && loadAndRenderProductsByBarcode(code);
  });
};
const addCategoryEventListener = () => {
  ProductsComponent.getProductsCategoriesContainer().addEventListener(
    "click",
    (e) => {
      const categoryButton = e.target.closest(".product-category-btn");
      if (categoryButton) {
        const category = categoryButton.dataset.category.trim();
        category != "" && loadAndRenderProductsByCategory(category);
      }
    },
  );
};
const addNutriScoreFilterEventListener = () => {
  ProductsComponent.getNutriScoreFilterContainer().addEventListener(
    "click",
    (e) => {
      const scoreButton = e.target.closest("button.nutri-score-filter");
      if (scoreButton) {
        const scoreGrade = scoreButton.dataset.grade.trim();
        AppState.setProductsFilter(scoreGrade);
        ProductsComponent.getNutriScoreFilterContainer()
          .querySelectorAll("button.nutri-score-filter")
          .forEach((button) => {
            button.classList.remove("ring-2", "ring-gray-900");
          });
        scoreButton.classList.add("ring-2", "ring-gray-900");
        const searchValue =
          ProductsComponent.getProductSearchInput().value.trim();
        searchValue != "" && loadAndRenderProducts(searchValue);
      }
    },
  );
};
const addProductCardEventListener = () => {
  ProductsComponent.getProductsGridContainer().addEventListener(
    "click",
    (e) => {
      const clickedProductCard = e.target.closest(".product-card");
      if (clickedProductCard) {
        AppState.setCurrentProduct(
          AppState.getProductByBarcode(clickedProductCard.dataset.barcode),
        );
        ProductsComponent.openLogProductModal(AppState.getCurrentProduct());

        const closeModalCallback = (e) => {
          if (
            e.target.classList.contains("close-product-modal") ||
            e.target.id === "product-detail-modal"
          ) {
            e.preventDefault();
            ProductsComponent.closeLogProductModal();
          }
        };
        document
          .getElementById("product-detail-modal")
          .addEventListener("click", closeModalCallback);

        const logProductCallback = (e) => {
          AppState.logProduct();
          ProductsComponent.closeLogProductModal();
          loadAndRenderFoodLogData();
          pushSuccessMessage("Item added successfully!");
        };
        document
          .querySelector(".add-product-to-log")
          .addEventListener("click", logProductCallback);
      }
    },
  );
};
const initiateProducts = () => {
  addProductSearchEventListener();
  addProductBarcodeSearchEventListener();
  addCategoryEventListener();
  addNutriScoreFilterEventListener();
  loadAndRenderProductsCategories();
  addProductCardEventListener();
};
initiateProducts();
// END   PRODUCTS
