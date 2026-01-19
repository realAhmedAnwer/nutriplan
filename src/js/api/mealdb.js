export class Meal {
  static #baseUrl = "https://nutriplan-api.vercel.app/api";
  static #USDAXApiKey = "lYGEBS6tbmSrVCUiAck36zhna19dExNtvAHqXtnx";

  static async getAllCategories() {
    try {
      const url = `${this.#baseUrl}/meals/categories`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response error");
      }
      const data = await response.json();
      if (data.message !== "success") {
        throw new Error("Server response error");
      }
      return data?.results;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  }
  static async getAllAreas() {
    try {
      const url = `${this.#baseUrl}/meals/areas`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response error");
      }
      const data = await response.json();
      if (data.message !== "success") {
        throw new Error("Server response error");
      }
      return data?.results;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  }
  static async searchMeals(query) {
    let results = await this.searchMealsByName(query);
    if (results.length) return results;
    results = await this.filterMeals(query, query, query);
    return results;
  }
  static async searchMealsByName(query) {
    try {
      const url = `${this.#baseUrl}/meals/search?q=${query}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response error");
      }
      const data = await response.json();
      if (data.message !== "success") {
        throw new Error("Server response error");
      }
      return data?.results;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  }
  static async searchMealByCategory(category) {
    const results = await this.filterMeals(category);
    return results;
  }
  static async searchMealByArea(area) {
    const results = await this.filterMeals(null, area);
    return results;
  }
  static async getMealById(id) {
    try {
      const url = `${this.#baseUrl}/meals/${id}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response error");
      }
      const data = await response.json();
      if (data.message !== "success") {
        throw new Error("Server response error");
      }
      if (data?.result?.id) {
        return data.result;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }
  static async filterMeals(
    category = null,
    area = null,
    ingredient = null,
    limit = 25,
  ) {
    try {
      if (!category && !area && !ingredient) return [];
      const categoryParam = category ? `category=${category}` : "";
      const areaParam = area ? `area=${area}` : "";
      const ingredientyParam = ingredient ? `ingredienty=${ingredient}` : "";
      const limitParam = `limit=${limit}`;
      const url = `${
        this.#baseUrl
      }/meals/filter?${categoryParam}&${areaParam}&${ingredientyParam}&${limitParam}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response error");
      }
      const data = await response.json();
      if (data.message !== "success") {
        throw new Error("Server response error");
      }
      return data?.results;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  }
  static async getRandomMeals(limit = 25) {
    try {
      const url = `${this.#baseUrl}/meals/random?count=${limit}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response error");
      }
      const data = await response.json();
      if (data.message !== "success") {
        throw new Error("Server response error");
      }
      return data.results;
    } catch (error) {
      console.error(error.message);
      return this.searchMealByCategory("Chicken");
    }
  }
  static async getMealIngredientDetails(ingredient) {
    try {
      const url = `${this.#baseUrl}/nutrition/search?q=${ingredient}&limit=2`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-api-key": this.#USDAXApiKey,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response error");
      }
      const data = await response.json();
      if (data.message !== "success") {
        throw new Error("Server response error");
      }
      if (data) {
        return data?.results[0]?.nutrients;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }
  static async getMealDetails(recipeName, ingredients) {
    try {
      const url = `${this.#baseUrl}/nutrition/analyze`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "x-api-key": this.#USDAXApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeName: recipeName,
          ingredients: ingredients,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response error");
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error("Server response error");
      }
      return data.data.perServing;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }
  static async getAllProductsCategories() {
    try {
      const url = `${this.#baseUrl}/products/categories`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response error");
      }
      const data = await response.json();
      if (data.message !== "success") {
        throw new Error("Server response error");
      }
      return data?.results;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  }
  static async searchProducts(query) {
    try {
      const url = `${this.#baseUrl}/products/search?q=${query}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response error");
      }
      const data = await response.json();
      if (data.message !== "success") {
        throw new Error("Server response error");
      }
      return { data: data?.results, totalNumber: data.pagination.total };
    } catch (error) {
      console.error(error.message);
      return [];
    }
  }
  static async getProductByBarcode(code) {
    try {
      const url = `${this.#baseUrl}/products/barcode/${code}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response error");
      }
      const data = await response.json();
      if (data.message !== "success") {
        throw new Error("Server response error");
      }
      return data?.result;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }
  static async getProductsByCategory(category) {
    try {
      const url = `${this.#baseUrl}/products/category/${category}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response error");
      }
      const data = await response.json();
      if (data.message !== "success") {
        throw new Error("Server response error");
      }
      return { data: data?.results, totalNumber: data.pagination.total };
    } catch (error) {
      console.error(error.message);
      return [];
    }
  }
}
