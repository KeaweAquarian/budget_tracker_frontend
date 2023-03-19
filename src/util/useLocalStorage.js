import { useEffect, useState } from 'react'

function useLocalState (defaultValue, key) {
    const [value, setValue] = useState(() =>{
        const localStorageToken = localStorage.getItem(key);

        return localStorageToken !==null?
        JSON.parse(localStorageToken):
        defaultValue;
    });

    console.log(`localstoragetoken ${key} is: ${value}`);

    useEffect(()=> {
        localStorage.setItem(key, JSON.stringify(value));
        console.log(`updating local storage ${key} to ${value}`);
        
    }, [key, value]);

    return [value, setValue];
}

export {useLocalState};
