import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const useNavigateAndScroll = () => {
    const navigate = useNavigate();

    const navigateAndScroll = useCallback((path) => {
        navigate(path);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [navigate]);

    return navigateAndScroll;
};

export default useNavigateAndScroll;


function getNextFourDays() {
    const dates = [];
    for (let i = 0; i < 2; i++) {
        const date = new Date();
        date.setDate(new Date().getDate() + i);

        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0');
        let yyyy = date.getFullYear();

        dates.push(`${dd}-${mm}-${yyyy}`);
    }

    return dates;
}
function findMostAdvancedDate(array) {
    return array.reduce((latest, current) => {
        return new Date(current.date.split('-').reverse().join('-')) > new Date(latest.date.split('-').reverse().join('-')) ? current : latest;
    });
}

function parseDate(dateString) {
    const parts = dateString.split('-');
    return new Date(parts[2], parts[1] - 1, parts[0]);
}
function getDatesBetween(startDate) {
    startDate = parseDate(startDate)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);
    const dates = [];
    let currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + 1);
    while (currentDate <= endDate) {
        const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}`;
        dates.push(formattedDate);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}
function replaceValues(obj) {
    const newObject = {};

    for (const key in obj) {
        if (obj[key] === "bool") {
            newObject[key] = 2;
        } else {
            newObject[key] = "";
        }
    }

    return newObject;
}



function transformObject(input) {
    const transformed = {};
    for (const key in input) {
        if (input[key] === "bool") {
            transformed[key] = { sum: 0, count: 0 };
        }
    }

    return transformed;
}

function calculateAverages(data, habits) {
    const totals = transformObject(habits)
    data.forEach(entry => {
        for (const key of Object.keys(totals)) {
            const value = entry[key];
            if (value === 0 || value === 1) {
                totals[key].sum += value;
                totals[key].count += 1;
            }
        }
    });
    const averages = {};
    for (const key of Object.keys(totals)) {
        const { sum, count } = totals[key];
        averages[key] = count > 0 ? (sum / count) * 100 : undefined;
    }

    return averages;
}
function getNumericValues(obj) {
    return Object.values(obj).filter(value => typeof value === 'number');
}
function sumArray(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
}
function getAverageFromObj(obj) {
    let array = getNumericValues(obj)
    return sumArray(array) / array.length
}
function checkKeyPosition(obj, inputString) {
    const keys = Object.keys(obj);
    const index = keys.indexOf(inputString);
    if (index === -1) {
        return "Not found";
    } else if (index === 0) {
        return "First position";
    } else if (index === keys.length - 1) {
        return "Last position";
    } else {
        return "Other position";
    }
}
export { getNextFourDays, findMostAdvancedDate, getDatesBetween, replaceValues, calculateAverages, getAverageFromObj, useNavigateAndScroll, checkKeyPosition }
