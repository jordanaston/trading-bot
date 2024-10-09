export const getChangePercentage = async (
  completedSellAmount: number,
  usdtCapitalAfterSell: number
) => {
  try {
    const change =
      ((usdtCapitalAfterSell - completedSellAmount) / completedSellAmount) *
      100;
    const fixedChange = parseFloat(change.toFixed(4));
    return fixedChange;
  } catch (error) {
    console.error("Error calculating change percentage:", error);
    throw error;
  }
};
