import { WORD_URL, VALIDATE_URL } from "@/constants/game";

export async function fetchWordOfTheDay() {
  const response = await fetch(WORD_URL);
  if (!response.ok) {
    throw new Error(response.status);
  }
  const result = await response.json();
  return result.word;
}

export async function isValidWord(guess) {
  const response = await fetch(VALIDATE_URL, {
    method: "POST",
    body: JSON.stringify({ word: guess }),
  });

  if (!response.ok) {
    throw new Error("Could not validate word. Try again.");
  }

  const result = await response.json();
  return result.validWord;
}
