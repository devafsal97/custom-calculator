//BREAKPOINT

const calculateBreakpointFees = (accountValue, householdAUM, tiers, feePercentages) => {

    // Initialize variables for results and cumulative calculations
    let results = tiers.map(() => ({ valueInBreakpoint: 0, fee: 0 }));
    let cumulativeTierValue = 0;
    let tierPlaced = false;

    for (let i = 0; i < tiers.length; i++) {
        // Update the cumulative tier value
        cumulativeTierValue += tiers[i];

        // Only place the account value in a tier if it hasn't been placed yet and 
        // the account value is less than or equal to the cumulative tier value
        if (!tierPlaced && accountValue <= cumulativeTierValue) {
            results[i].valueInBreakpoint = accountValue; // Place the entire account value in this tier
            results[i].fee = accountValue * (feePercentages[i] / 100); // Calculate the fee based on this tier's percentage
            tierPlaced = true; // Mark as placed to prevent allocation to subsequent tiers
        }
    }

    // If account value exceeds all tier ranges, place it in the last tier
    if (!tierPlaced) {
        let lastTierIndex = tiers.length - 1;
        results[lastTierIndex].valueInBreakpoint = accountValue;
        results[lastTierIndex].fee = accountValue * (feePercentages[lastTierIndex] / 100);
    }

    return results.filter(result => result.valueInBreakpoint > 0 || result.fee > 0);
}

export default calculateBreakpointFees;