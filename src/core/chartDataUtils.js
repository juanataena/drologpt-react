
export const getBalanceData = (nodes, initialBalance) => {// 

    // Get dates from balance data
    const names = nodes.map(node => node.name);
    const dates = nodes.map(node => node.trades ? node.trades.map(trade => trade.close_date) : []);
    const datesFlat = [].concat.apply([], dates);
    const datesUnique = [...new Set(datesFlat)];
    const datesSorted = datesUnique.sort();

    
    // Get unique entries for each name
    let rows = {};
    let previousBalance = [];
    for (let date of datesSorted) {
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            const HAS_TRADES = nodes[i]['trades'];
            let found = HAS_TRADES ? nodes[i]['trades'].find(row => row.close_date === date) : false;
            let balance = found ? found.balance : previousBalance[name] ? previousBalance[name] : initialBalance;
            if (!rows[name]) {
                rows[name] = [];
                rows['x'] = []; // For chart
            }
            rows[name].push(balance);
            rows['x'].push(new Date(date).getTime()); // For chart
            previousBalance[name] = balance;
        }
    }
    

    // Remove the duplicates for the dates (they are the 'x' inside the chart)
    rows['x'] = [...new Set(rows['x'])];
    return rows;
}

export const getProfitData = (nodes, initialProfit) => {// 

    // Get dates from profit data
    const names = nodes.map(node => node.name);
    const dates = nodes.map(node => node.trades ? node.trades.map(trade => trade.close_date) : []);
    const datesFlat = [].concat.apply([], dates);
    const datesUnique = [...new Set(datesFlat)];
    const datesSorted = datesUnique.sort();

    
    // Get unique entries for each name
    let rows = {};
    let previousProfit = [];
    for (let date of datesSorted) {
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            const HAS_TRADES = nodes[i]['trades'];
            let found = HAS_TRADES ? nodes[i]['trades'].find(row => row.close_date === date) : false;
            let profit = found ? found.profit : previousProfit[name] ? previousProfit[name] : initialProfit;
            if (!rows[name]) {
                rows[name] = [];
                rows['x'] = []; // For chart
            }
            // Adjust the profit to adapt percentage
            rows[name].push(profit * 0.1);
            rows['x'].push(new Date(date).getTime()); // For chart
            previousProfit[name] = profit;
        }
    }
    

    // Remove the duplicates for the dates (they are the 'x' inside the chart)
    rows['x'] = [...new Set(rows['x'])];
    return rows;
}