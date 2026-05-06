import { WORD_URL, VALIDATE_URL } from "@/constants/game";

export const fetchWordOfTheDay = async () => {
  try {
    const response = await fetch(WORD_URL);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const result = await response.json();
    setWord(result.word);
  } catch (error) {
    console.error(error.message);
    setMessage("Could not load word. Try again.");
    setMessageTrigger((t) => t + 1);
  } finally {
    setLoading(false);
  }
};

export async function validateWord() {
  return response.validWord;
}
