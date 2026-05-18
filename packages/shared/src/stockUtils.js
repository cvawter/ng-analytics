/**
 * Utility functions for generating deterministic mock stock price history
 * and options chain data for each company.
 *
 * The data is seeded from the company ticker so every render is consistent.
 */

/** Simple seeded pseudo-random number generator (mulberry32) */
function seededRng(seed) {
    let s = seed;
    return function () {
        s |= 0; s = s + 0x6d2b79f5 | 0;
        let t = Math.imul(s ^ s >>> 15, 1 | s);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

function tickerSeed(ticker) {
    return ticker.split('').reduce((acc, c) => acc * 31 + c.charCodeAt(0), 0);
}

/**
 * Generates 30 trading days of OHLCV-style close price history.
 * @param {string} ticker
 * @param {number} basePrice - approximate "current" price in USD
 * @returns {{ date: string, price: number }[]}
 */
export function generateStockHistory(ticker, basePrice) {
    const rng = seededRng(tickerSeed(ticker));
    const days = 30;
    const history = [];
    let price = basePrice * (0.92 + rng() * 0.16); // start slightly different from current

    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(now.getDate() - i);
        // Skip weekends
        if (d.getDay() === 0 || d.getDay() === 6) continue;

        const change = (rng() - 0.48) * 0.028; // slight upward drift
        price = Math.max(price * (1 + change), 1);
        history.push({
            date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            price: parseFloat(price.toFixed(2)),
        });
    }
    return history;
}

/**
 * Generates an options chain for 2 nearby expirations with strikes around ATM.
 * @param {string} ticker
 * @param {number} currentPrice
 * @returns {{ expiration: string, strikes: { strike: number, call: {bid,ask,volume,iv}, put: {bid,ask,volume,iv} }[] }[]}
 */
export function generateOptionChain(ticker, currentPrice) {
    const rng = seededRng(tickerSeed(ticker) + 1337);

    // Two expirations: ~3 weeks and ~6 weeks out
    const expirations = [21, 42].map(daysOut => {
        const d = new Date();
        d.setDate(d.getDate() + daysOut);
        // Move to the nearest Friday
        const day = d.getDay();
        const daysToFriday = day <= 5 ? 5 - day : 6;
        d.setDate(d.getDate() + daysToFriday);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    });

    const step = currentPrice < 20 ? 1 : currentPrice < 100 ? 5 : currentPrice < 500 ? 10 : 25;
    const atmStrike = Math.round(currentPrice / step) * step;
    const strikes = [-3, -2, -1, 0, 1, 2, 3].map(n => atmStrike + n * step).filter(s => s > 0);

    return expirations.map(expiration => ({
        expiration,
        strikes: strikes.map(strike => {
            const moneyness = (strike - currentPrice) / currentPrice;
            const daysRatio = expiration.includes(expirations[0].split(' ')[2]) ? 0.08 : 0.12;
            const iv = 0.22 + rng() * 0.25 + Math.abs(moneyness) * 0.4;

            // Simplified Black-Scholes approximation for premium
            const callIntrinsic = Math.max(0, currentPrice - strike);
            const putIntrinsic = Math.max(0, strike - currentPrice);
            const timeValue = currentPrice * iv * Math.sqrt(daysRatio) * 0.4;

            const callMid = parseFloat((callIntrinsic + timeValue * (1 - Math.max(0, moneyness))).toFixed(2));
            const putMid = parseFloat((putIntrinsic + timeValue * (1 + Math.min(0, moneyness))).toFixed(2));
            const spread = parseFloat((Math.max(0.05, callMid * 0.04)).toFixed(2));

            return {
                strike,
                call: {
                    bid: Math.max(0.01, callMid - spread),
                    ask: callMid + spread,
                    volume: Math.floor(rng() * 8000 + 100),
                    iv: parseFloat((iv * 100).toFixed(1)),
                },
                put: {
                    bid: Math.max(0.01, putMid - spread),
                    ask: putMid + spread,
                    volume: Math.floor(rng() * 6000 + 50),
                    iv: parseFloat(((iv + rng() * 0.05) * 100).toFixed(1)),
                },
            };
        }),
    }));
}

/**
 * Maps ticker symbols to approximate current prices (USD).
 * Used as the seed for synthetic data generation.
 */
export const TICKER_BASE_PRICES = {
    NEE: 72,
    D: 55,
    DUK: 108,
    SO: 90,
    PCG: 18,
    CEG: 245,
    VST: 185,
    NRG: 105,
    AMZN: 205,
    MSFT: 450,
    GOOGL: 175,
    META: 590,
    AAPL: 215,
    NVDA: 115,
    AMD: 165,
    INTC: 22,
    ARM: 130,
    TSLA: 280,
    GE: 200,
    ETR: 130,
    AES: 14,
    EIX: 68,
    FE: 44,
    PPL: 30,
    CNP: 32,
    XEL: 64,
    DTE: 120,
    WEC: 94,
    PEG: 88,
    ED: 92,
};
