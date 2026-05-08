import { getItemFromLocalStorage } from "@/services/localStorage";
export const useLocalStorage = (key, value) => {
  const [storedValue, setStoredValue] = useState(
    getItemFromLocalStorage(key, value),
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};
