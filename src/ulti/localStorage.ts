export const loadFromStorage = (key: string,defaultValue: [])=>{
    try {
        const itemContainer = localStorage.getItem(key)
        return itemContainer ? JSON.parse(itemContainer) : defaultValue
    } catch  {
        return defaultValue
    }
}

export const saveFromStorage = (key: string, value: any) => {
    try {
        localStorage.setItem(key,JSON.stringify(value))
    } catch {
        return null
    }
}