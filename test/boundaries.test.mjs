import test from 'node:test';
import assert from 'node:assert/strict';
import {planPurchase, simulatedTicketsForHolding} from '../src/policy.mjs';

for (const [name,input] of [
 ['negative balance',{balanceUsdc:-1,packPriceUsdc:50}],
 ['NaN price',{balanceUsdc:100,packPriceUsdc:NaN}],
 ['Infinity balance',{balanceUsdc:Infinity,packPriceUsdc:50}],
 ['negative price',{balanceUsdc:100,packPriceUsdc:-50}]
]) {
 test('rejects invalid inputs: '+name,()=>assert.throws(()=>planPurchase(input),TypeError));
}
test('zero-dollar purchase cannot be authorized',()=>{
 assert.equal(planPurchase({balanceUsdc:100,packPriceUsdc:0,verifiedProvider:true,treasuryLocked:true}).approved,false);
});
test('budget cannot be overdrawn even if provider is verified',()=>{
 assert.equal(planPurchase({balanceUsdc:49.99,packPriceUsdc:50,verifiedProvider:true,treasuryLocked:true}).approved,false);
});
test('price cap boundary permits equal only',()=>{
 const x=planPurchase({balanceUsdc:50,packPriceUsdc:50,maxPackPriceUsdc:50,verifiedProvider:true,treasuryLocked:true});
 assert.equal(x.approved,true);
 assert.equal(x.remainingUsdc,0);
});
test('rejects invalid simulated holder valuations',()=>{
 assert.throws(()=>simulatedTicketsForHolding(-1),TypeError);
 assert.throws(()=>simulatedTicketsForHolding(NaN),TypeError);
});
test('tickets require full multiples of 20',()=>{
 assert.equal(simulatedTicketsForHolding(39.99),1);
 assert.equal(simulatedTicketsForHolding(40),2);
});
