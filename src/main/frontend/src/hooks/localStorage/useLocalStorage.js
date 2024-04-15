import { useEffect, useState } from "react"

function getLocalValue(key, initialValue) {
  // SSR Next.js
  if (typeof window === 'undefined') return initialValue;

  // if a value is already stored, determine its type
  const localValue = localStorage.getItem(key);
  if (localValue) {
    if (localValue === 'true' || localValue === 'false') {
      return localValue === 'true';
    } else {
      return localValue;
    }
  }

  // return result of a function
  if (typeof initialValue === 'function') return initialValue();

  return initialValue;
}

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => getLocalValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}

export function useLocallyStoredInput(key, initialValue = '') {
  const [value, setValue] = useLocalStorage(key, initialValue);

  function reset() {
    setValue(initialValue);
  }

  const inputAttrs = {
    value,
    onChange: e => setValue(e.target.value)
  }

  return [value, reset, inputAttrs];
}

export function useLocallyStoredCheckbox(key, initialValue = false) {
  const [value, setValue] = useLocalStorage(key, initialValue);

  const checkboxAttrs = {
    checked: value,
    onChange: () => setValue(prev => !prev)
  }

  return checkboxAttrs;
}

export default useLocalStorage