// Single value storage helper functions
export const setItem = (key, value) => { localStorage.setItem(key , JSON.stringify(value)); }
export const getItem = (key) => { 
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null; 
}
export const removeItem = (key) => { localStorage.removeItem(key); }

// Array storage helper functions
export const addItem = (key, value) => {
    let itemID = 0;
    let items = getItem(key) ?? [];
    if (items.length > 0) {
        itemID = items[items.length - 1].id + 1;
    }
    value.id = itemID;
    items.push(value);
    setItem(key, items);
}

export const modifyItem = (key, value) => {
    let items = getItem(key);
    let itemIndex = items.findIndex(i => i.id === value.id);
    items[itemIndex] = value;
    setItem(key, items);
}

export const removeItemByID = (key, id) => {
    let items = getItem(key);
    let newItems = items.filter(i => i.id !== id);
    setItem(key, newItems);
}