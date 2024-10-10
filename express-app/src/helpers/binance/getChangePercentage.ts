export const getChangePercentage = async (
  usdtCapitalBeforeBuy: number,
  usdtCapitalAfterSell: number
) => {
  try {
    const change =
      ((usdtCapitalAfterSell - usdtCapitalBeforeBuy) / usdtCapitalBeforeBuy) *
      100;
    const fixedChange = parseFloat(change.toFixed(4));
    return fixedChange;
  } catch (error) {
    console.error("Error calculating change percentage:", error);
    throw error;
  }
};
