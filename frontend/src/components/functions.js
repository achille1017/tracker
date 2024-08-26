function getNextFourDays() {
    const dates = [];
    for (let i = 0; i < 2; i++) {
        const date = new Date();
        date.setDate(new Date().getDate() + i);

        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
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
    // Create a new Date object: parts[2] is the year, parts[1] is the month (0-indexed), parts[0] is the day
    return new Date(parts[2], parts[1] - 1, parts[0]);
}
function getDatesBetween(startDate) {
    startDate = parseDate(startDate)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 2);
    const dates = [];
    let currentDate = new Date(startDate);
    currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)
    while (currentDate <= endDate) {
        // Format the date as dd-mm-yyyy
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
            newObject[key] = 2; // Replace "bool" with 2
        } else {
            newObject[key] = ""; // Replace other values with ""
        }
    }

    return newObject;
}



function transformObject(input) {
    // Initialize an empty object to hold the transformed values
    const transformed = {};

    // Iterate through each key in the input object
    for (const key in input) {
        // Check if the value is "bool"
        if (input[key] === "bool") {
            // Add the key with the new value { sum: 0, count: 0 }
            transformed[key] = { sum: 0, count: 0 };
        }
    }

    return transformed;
}

function calculateAverages(data, habits) {
    // Initialize an object to hold the sums and counts
    const totals = transformObject(habits)

    // Iterate through each entry in the data array
    data.forEach(entry => {
        // Process each key
        for (const key of Object.keys(totals)) {
            const value = entry[key];

            // Only consider values 0 and 1
            if (value === 0 || value === 1) {
                totals[key].sum += value;
                totals[key].count += 1;
            }
        }
    });

    // Calculate averages and convert to a percentage
    const averages = {};
    for (const key of Object.keys(totals)) {
        const { sum, count } = totals[key];
        averages[key] = count > 0 ? (sum / count) * 100 : undefined; // If count is 0, average is 0
    }

    return averages;
}
function getNumericValues(obj) {
    // Use Object.values to get an array of values from the object
    // Filter out any undefined values
    return Object.values(obj).filter(value => typeof value === 'number');
}
function sumArray(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
}
function getAverageFromObj(obj){
    let array = getNumericValues(obj)
    return sumArray(array)/array.length
}
export { getNextFourDays, findMostAdvancedDate, getDatesBetween, replaceValues, calculateAverages,getAverageFromObj }
