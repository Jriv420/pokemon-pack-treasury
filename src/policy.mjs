// Offline simulation only. Do not use to authorize actual blockchain spending.
export function planPurchase({balanceUsdc, packPriceUsdc, maxPackPriceUsdc = 50, verifiedProvider = false, treasuryLocked = false}) {
  for (const n of [balanceUsdc, packPriceUsdc, maxPackPriceUsdc]) {
    if (!Number.isFinite(n) || n < 0) throw new TypeError("Invalid nonnegative finite amount");
  }
  if (!verifiedProvider || !treasuryLocked) return {approved:false,reason:"Treasury/provider not independently verified"};
  if (packPriceUsdc <= 0 || packPriceUsdc > maxPackPriceUsdc) return {approved:false,reason:"Price exceeds approved policy"};
  if (balanceUsdc < packPriceUsdc) return {approved:false,reason:"Insufficient funds"};
  return {approved:true,remainingUsdc:Number((balanceUsdc-packPriceUsdc).toFixed(2))};
}

export function simulatedTicketsForHolding(usdValue) {
  if (!Number.isFinite(usdValue) || usdValue < 0) throw new TypeError("Invalid holding value");
  // Illustrative only; actual giveaway mechanics require jurisdiction-specific legal review.
  return Math.floor(usdValue / 20);
}
