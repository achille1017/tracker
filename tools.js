
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
export { getToday, getYesterday }