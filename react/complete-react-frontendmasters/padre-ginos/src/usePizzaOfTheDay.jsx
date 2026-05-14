import { useState, useEffect, useDebugValue } from "react";

export const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);
  useDebugValue(pizzaOfTheDay ? `${pizzaOfTheDay.name}` : "Loading...");

  useEffect(() => {
    async function fetchPizzaOfTheDay() {
      const response = await fetch("/api/pizza-of-the-day");
      const pizzaOfTheDayJson = await response.json();
      setPizzaOfTheDay(pizzaOfTheDayJson);
    }
    fetchPizzaOfTheDay();
  }, []);

  return pizzaOfTheDay;
};
