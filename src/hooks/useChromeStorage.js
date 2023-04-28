import { useEffect, useState, useMemo } from "react";

export function useChromeStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const memoizedInitialValue = useMemo(() => {
    return typeof initialValue === "function" ? initialValue() : initialValue;
  }, []);
  useEffect(() => {
    chrome.storage.local.get([key], (result) => {
      if (result[key] !== undefined) {
        setValue(result[key]);
      } else {
        setValue(memoizedInitialValue);
      }
    });
  }, [key, memoizedInitialValue]);

  useEffect(() => {
    chrome.storage.local.set({ [key]: value });
  }, [key, value]);

  return [value, setValue];
}
