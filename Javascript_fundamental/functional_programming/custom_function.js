// Array.map
const myMap = (arr, returnItem) => {
    const recurseArray = (index, newArr) => {
        const newItem = returnItem(arr[index]);
        if(!newItem) return newArr;
        newArr.push(newItem);
        return recurseArray(index+1, newArr);
    }

    return recurseArray(0, []);
}


// Array.filter
const myFilter = (arr, returnBool) => {
    const recurseArray = (index, newArr) => {
        const filteredItem = arr[index];
        if(!filteredItem) return newArr;
        if(returnBool(filteredItem)) newArr.push(filteredItem);
        return recurseArray(index+1, newArr);
    }

    return recurseArray(0, []);
}

// Array.some
const mySome = (arr, selectOneorMore) => {
    const recurseArray = (index) => {
        const item = arr[index];
        const isIt = selectOneorMore(item);
        if(isIt) return true;
        if(!item) return false;
        return recurseArray(index+1);
    }

    return recurseArray(0);
}

// Array.find
const myFind = (arr, findItem) => {
    const recurseArray = (index) => {
        const item = arr[index];
        const isIt = findItem(item);
        if(isIt) return item;
        if(!item) return undefined;
        return recurseArray(index+1);
    }

    return recurseArray(0);
}

// Array.every
const myEvery = (arr, checkEveryItem) => {
    const recurseArray = (index) => {
        const item = arr[index];
        const isIt = checkEveryItem(item);
        if(!isIt) return false;
        if(!item) return true;
        return recurseArray(index+1);
    }

    return recurseArray(0);
}