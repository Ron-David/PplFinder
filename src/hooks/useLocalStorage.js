import { useState } from "react";

export const useLocalStorage = (key) => {
    const [getStorage, setLocalStoreData] = useState(window.localStorage.getItem(key) ? JSON.parse(window.localStorage.getItem(key)) : []);

    const setStorage = data => {
        window.localStorage.setItem(key, JSON.stringify(data))
        setLocalStoreData(JSON.parse(window.localStorage.getItem(key)))
    }

    return { getStorage, setStorage };
};
