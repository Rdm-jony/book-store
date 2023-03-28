const getLocalStorage = (key) => {
    const value = localStorage.getItem(key)
    if (!value) return [];
    return JSON.parse(value)

}
export default getLocalStorage;