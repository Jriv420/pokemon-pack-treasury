import test from 'node:test';
import assert from 'node:assert/strict';
import {planPurchase,simulatedTicketsForHolding} from '../src/policy.mjs';

test('refuses unverified treasury even with funds',()=>{
  assert.equal(planPurchase({balanceUsdc:100,packPriceUsdc:50,verifiedProvider:true}).approved,false);
});
test('refuses unknown provider',()=>{
  assert.equal(planPurchase({balanceUsdc:100,packPriceUsdc:50,treasuryLocked:true}).approved,false);
});
test('refuses prices over cap',()=>{
  assert.equal(planPurchase({balanceUsdc:300,packPriceUsdc:250,verifiedProvider:true,treasuryLocked:true}).approved,false);
});
test('refuses insufficient balance',()=>{
  assert.equal(planPurchase({balanceUsdc:25,packPriceUsdc:50,verifiedProvider:true,treasuryLocked:true}).approved,false);
});
test('simulates purchase only if conditions pass',()=>{
  assert.deepEqual(planPurchase({balanceUsdc:90,packPriceUsdc:50,verifiedProvider:true,treasuryLocked:true}),{approved:true,remainingUsdc:40});
});
test('simulated ticket calculations',()=>{
  assert.equal(simulatedTicketsForHolding(19.99),0);
  assert.equal(simulatedTicketsForHolding(20),1);
  assert.equal(simulatedTicketsForHolding(100),5);
});
