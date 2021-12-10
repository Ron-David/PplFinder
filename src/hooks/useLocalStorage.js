import { useState } from "react";

export const useLocalStorage = (key) => {
    const [getStorage, setLocalStoreData] = useState([]);

    const setStorage = data => {
        window.localStorage.setItem(key, JSON.stringify(data))
        setLocalStoreData(JSON.parse(window.localStorage.getItem(key)))
    }

    return { getStorage, setStorage };
};
