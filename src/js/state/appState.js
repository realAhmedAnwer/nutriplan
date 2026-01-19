export class AppState {
  static #localStorageKey = "daily_log";
  static #currentPage = "meals";
  static #currentMealRecipe = null;
  static #mealRecipes = [];
  static #currentProduct = null;
  static #products = [];
  static #productsFilter = null;

  static getCurrentPage() {
    return this.#currentPage;
  }
  static setCurrentPage(page) {
    this.#currentPage = page;
  }
  static getMealRecipeDetailsById(id) {
    const mealRecipe = this.#mealRecipes.find(
      (mealRecipe) => mealRecipe.id === id,
    );
    return mealRecipe;
  }
  static getCurrentMeal() {
    return this.#currentMealRecipe;
  }
  static setCurrentMeal(meal, nutrients) {
    this.#currentMealRecipe = meal;
    this.#currentMealRecipe.nutrients = nutrients;
  }
  static getMealRecipes() {
    return this.#mealRecipes;
  }
  static setMealRecipes(mealRecipes) {
    this.#mealRecipes = mealRecipes;
  }
  static getTodayFormatedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  static getDailyLog() {
    const rawData = localStorage.getItem(this.#localStorageKey);
    const data = rawData ? JSON.parse(rawData) : {};
    return data;
  }
  static addToDailyLog(servings) {
    let meal = {
      type: "meal",
      id: this.#currentMealRecipe.id,
      name: this.#currentMealRecipe.name,
      category: this.#currentMealRecipe.category,
      nutrition: this.#currentMealRecipe.nutrients,
      thumbnail: this.#currentMealRecipe.thumbnail,
      servings: +servings,
      loggedAt: new Date().toISOString(),
    };
    let data = this.getDailyLog();
    const todayDate = this.getTodayFormatedDate();
    if (todayDate in data) {
      data[todayDate].meals.push(meal);
      data[todayDate].totalCalories = Math.round(
        +data[todayDate].totalCalories +
          meal.nutrition.calories * meal.servings,
      );
      data[todayDate].totalCarbs = Math.round(
        +data[todayDate].totalCarbs + meal.nutrition.carbs * meal.servings,
      );
      data[todayDate].totalFat = Math.round(
        +data[todayDate].totalFat + meal.nutrition.fat * meal.servings,
      );
      data[todayDate].totalProtein = Math.round(
        +data[todayDate].totalProtein + meal.nutrition.protein * meal.servings,
      );
    } else {
      data[todayDate] = {
        meals: [meal],
        totalCalories: Math.round(meal.nutrition.calories * meal.servings),
        totalCarbs: Math.round(meal.nutrition.carbs * meal.servings),
        totalFat: Math.round(meal.nutrition.fat * meal.servings),
        totalProtein: Math.round(meal.nutrition.protein * meal.servings),
      };
    }
    localStorage.setItem(this.#localStorageKey, JSON.stringify(data));
  }
  static getTodayLog() {
    let data = this.getDailyLog();
    data = data[this.getTodayFormatedDate()];
    return data;
  }
  static deleteTodayLogByIndex(index) {
    let todayDate = this.getTodayFormatedDate();
    let dailyLog = this.getDailyLog();
    dailyLog[todayDate].totalCalories -= Math.round(
      dailyLog[todayDate].meals[index].servings *
        dailyLog[todayDate].meals[index].nutrition.calories,
    );
    dailyLog[todayDate].totalCarbs -= Math.round(
      dailyLog[todayDate].meals[index].servings *
        dailyLog[todayDate].meals[index].nutrition.carbs,
    );
    dailyLog[todayDate].totalFat -= Math.round(
      dailyLog[todayDate].meals[index].servings *
        dailyLog[todayDate].meals[index].nutrition.fat,
    );
    dailyLog[todayDate].totalProtein -= Math.round(
      dailyLog[todayDate].meals[index].servings *
        dailyLog[todayDate].meals[index].nutrition.protein,
    );
    dailyLog[todayDate].meals.splice(index, 1);
    localStorage.setItem(this.#localStorageKey, JSON.stringify(dailyLog));
  }
  static deleteAllTodayLog() {
    let todayDate = this.getTodayFormatedDate();
    let dailyLog = this.getDailyLog();
    if (todayDate in dailyLog) {
      delete dailyLog[todayDate];
      localStorage.setItem(this.#localStorageKey, JSON.stringify(dailyLog));
    }
  }
  static getProductsFilter() {
    return this.#productsFilter;
  }
  static setProductsFilter(grade) {
    if (
      grade != "a" &&
      grade != "b" &&
      grade != "c" &&
      grade != "d" &&
      grade != "e"
    )
      this.#productsFilter = null;
    else this.#productsFilter = grade;
  }
  static getCurrentProduct() {
    return this.#currentProduct;
  }
  static setCurrentProduct(product) {
    this.#currentProduct = product;
  }
  static getProductByBarcode(barcode) {
    return this.#products.find((product) => product.barcode === barcode);
  }
  static getProducts() {
    return this.#products;
  }
  static setProducts(products) {
    this.#products = products;
  }
  static logProduct() {
    if (this.#currentProduct) {
      let meal = {
        type: "product",
        barcode: this.#currentProduct.barcode,
        name: this.#currentProduct.name,
        brand: this.#currentProduct.brand,
        nutrition: this.#currentProduct.nutrients,
        servings: 1,
        loggedAt: new Date().toISOString(),
      };

      let data = this.getDailyLog();
      const todayDate = this.getTodayFormatedDate();
      if (todayDate in data) {
        data[todayDate].meals.push(meal);
        data[todayDate].totalCalories = Math.round(
          +data[todayDate].totalCalories +
            meal.nutrition.calories,
        );
        data[todayDate].totalCarbs = Math.round(
          +data[todayDate].totalCarbs + meal.nutrition.carbs,
        );
        data[todayDate].totalFat = Math.round(
          +data[todayDate].totalFat + meal.nutrition.fat,
        );
        data[todayDate].totalProtein = Math.round(
          +data[todayDate].totalProtein +
            meal.nutrition.protein,
        );
      } else {
        data[todayDate] = {
          meals: [meal],
          totalCalories: Math.round(meal.nutrition.calories),
          totalCarbs: Math.round(meal.nutrition.carbs),
          totalFat: Math.round(meal.nutrition.fat),
          totalProtein: Math.round(meal.nutrition.protein),
        };
      }
      localStorage.setItem(this.#localStorageKey, JSON.stringify(data));
    }
  }
}
