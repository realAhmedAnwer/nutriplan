# 🥗 NutriPlan - Dynamic Meal Planner

**NutriPlan** is a reactive web application built with **JavaScript (ES6+)** that empowers users to manage their nutrition through personalized meal planning. This project demonstrates high-level integration with **Real-World APIs** to provide accurate, real-time nutritional data.

## ✨ Key Features
* **Real-Time Recipe Search:** Integrated with professional nutritional APIs to fetch thousands of recipes and meal ideas instantly.
* **Live Nutritional Analysis:** Provides real-time data on calories, fats, proteins, and vitamins using live API responses.
* **Custom Meal Planning:** Organize discovered recipes into daily or weekly plans.
* **Ingredient Management:** Automatically generates grocery lists based on the ingredients returned by the API.
* **Reactive UI:** Instant feedback and updates without page reloads.

## 🛠️ Tech Stack
* **Language:** JavaScript (ES6+)
* **Data Source:** External RESTful APIs (Fetch API / Async-Await)
* **Architecture:** Object-Oriented Programming (OOP)
* **Storage:** Browser LocalStorage for persisting API data
* **Styling:** Modern CSS3

## 🏗️ Technical Highlights
* **Asynchronous Integration:** Robust implementation of `async/await` and `promises` to handle real-time data fetching from external servers.
* **Data Normalization:** Transforming complex API JSON responses into clean, usable objects using OOP principles.
* **Error & Rate Limit Handling:** Implemented logic to handle API request failures or empty search results gracefully.
* **Modular Design:** Separation of concerns between the "API Service" layer and the "UI Rendering" layer.
