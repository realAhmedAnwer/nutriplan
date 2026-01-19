import { AppState } from "../state/appState.js";
import {
  MealsComponent,
  ProductsComponent,
  FoodLogComponent,
  HeaderComponent,
} from "../ui/components.js";
export class Router {
  static #pages = ["meals", "products", "foodlog"];
  static #currentPage = "meals";
  static #setCurrentPage(page) {
    page = (page || this.#pages[0]).toLowerCase();
    this.#currentPage = this.#pages.includes(page) ? page : this.#pages[0];
  }
  static #navigateToMeals() {
    MealsComponent.show();
    ProductsComponent.hide();
    FoodLogComponent.hide();
    AppState.setCurrentPage("meals");
    MealsComponent.hideMealRecipeDetailsModal()
    HeaderComponent.set(MealsComponent.title, MealsComponent.description);
  }
  static #navigateToProducts() {
    ProductsComponent.show();
    MealsComponent.hide();
    FoodLogComponent.hide();
    AppState.setCurrentPage("products");
    HeaderComponent.set(ProductsComponent.title, ProductsComponent.description);
  }
  static #navigateToFoodLog() {
    FoodLogComponent.show();
    MealsComponent.hide();
    ProductsComponent.hide();
    AppState.setCurrentPage("foodlog");
    HeaderComponent.set(FoodLogComponent.title, FoodLogComponent.description);
  }
  static navigateTo(page) {
    this.#setCurrentPage(page);
    switch (this.#currentPage) {
      case "meals":
        this.#navigateToMeals();
        break;
      case "products":
        this.#navigateToProducts();
        break;
      case "foodlog":
        this.#navigateToFoodLog();
        break;
      default:
        this.#navigateToMeals();
        break;
    }
  }
}
