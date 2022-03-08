const display = document.querySelector('#displayResponse');
const formSubmit = document.querySelector('#symbolForm');
const mainList = document.querySelector('#mainList');
const symbolInput1 = document.getElementById('inputSymbol1');
const symbolInput2 = document.getElementById('inputSymbol2');


formSubmit.addEventListener('submit', addSymbolToList);


function addSymbolToList() {
    /* --- SHOULD ADD EXCEPTION FOR BAD INPUTS --- */
    let input1 = symbolInput1.value.toUpperCase();
    let input2 = symbolInput2.value.toUpperCase();
    let symbolPair = {
        symbol1: input1,
        symbol2: input2,
        status: "Open"
    };


    let currentSymbols = localStorage.getItem('watchListSymbols');
    if (currentSymbols === null) {
        let symbols = [];
        symbols.push(symbolPair);
        localStorage.setItem('watchListSymbols', JSON.stringify(symbols));
    } else {
        let symbols = JSON.parse(currentSymbols);
        symbols.push(symbolPair);
        localStorage.setItem('watchListSymbols', JSON.stringify(symbols));
    }
    fetchUserList();
}

async function getCurrentPrice(symbol1, symbol2) {
    /* --- ADD EXCEPTION FOR BAD INPUT ---*/
    symbol2 = symbol2.toUpperCase();
    symbol1 = symbol1.toUpperCase();
    let currentPriceURL = `https://api.binance.com/api/v3/avgPrice?symbol=${symbol1}${symbol2}`;
    let response = await fetch(currentPriceURL);
    let data = await response.json();
    return parseFloat(data.price).toFixed(2);
}

async function getDailyData(symbol1, symbol2) {
    /* --- ADD EXCEPTION FOR BAD INPUT ---*/
    symbol2 = symbol2.toUpperCase();
    symbol1 = symbol1.toUpperCase();
    let dailyDataURL = `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol1}${symbol2}`;
    let response = await fetch(dailyDataURL);
    let data = await response.json();
    console.log(JSON.stringify(data));
}

async function fetchUserList() {
    let symbols = JSON.parse(localStorage.getItem('watchListSymbols'));
    symbols === null ? symbols = []: null;
    console.log(symbols);

    for (let i = 0; i < symbols.length; i++) {
        let symbol1 = symbols[i].symbol1;
        let symbol2 = symbols[i].symbol2;
        let price = await getCurrentPrice(symbol1, symbol2);
        let status = symbols[i].status;

        if (status == 'Open') {
            let newListItem = document.createElement('li');
            newListItem.innerHTML = `${symbol1}/${symbol2}: ${price}`;
            mainList.appendChild(newListItem);
        }
    }
};