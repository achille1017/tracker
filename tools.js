
function getToday() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  today = dd + '-' + mm + '-' + yyyy;
  return today
}
function getYesterday() {
  let today = new Date();
  let yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));

  let dd = String(yesterday.getDate()).padStart(2, '0');
  let mm = String(yesterday.getMonth() + 1).padStart(2, '0');
  let yyyy = yesterday.getFullYear();

  let yesterdayDate = dd + '-' + mm + '-' + yyyy;
  return yesterdayDate
}

function replaceObjectValues(obj, value, replacement) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        replaceObjectValues(obj[key]);
      } else if (obj[key] === value) {
        obj[key] = replacement;
      }
    }
  }
  return obj;
}
function moveKeyValuePair(obj, key, direction) {
  const keys = Object.keys(obj);
  const currentIndex = keys.indexOf(key);
  if (currentIndex === -1) {
    return obj;
  }

  let newIndex;
  if (direction === "up") {
    newIndex = Math.max(0, currentIndex - 1);
  } else if (direction === "down") {
    newIndex = Math.min(keys.length - 1, currentIndex + 1);
  } else {
    return obj;
  }
  if (newIndex === currentIndex) {
    return obj;
  }
  const newObj = {};
  keys.forEach((k, index) => {
    if (index === newIndex) {
      if (direction === "down") {
        newObj[keys[index]] = obj[keys[index]]
        newObj[key] = obj[key];
      }
      if (direction === "up") {
        newObj[key] = obj[key];
        newObj[k] = obj[k];
      }
    }
    else {
      if (direction === "up") {
        newObj[k] = obj[k];
      }
      else if (direction === "down") {
        if (index !== currentIndex) {
          newObj[k] = obj[k];
        }
      }
    }
  });

  if (newIndex === keys.length - 1 && direction === "down") {
    newObj[key] = obj[key];
  }
  return newObj;
}

export { getToday, getYesterday, replaceObjectValues, moveKeyValuePair }