# Pokémon Pack Treasury (development only)

A proposed non-custodial Solana treasury for Pump.fun creator fees and Pokémon pack purchases.

**Status: design and offline test scaffolding only. NOT deployed, audited, or safe for funds.**

## Security objectives
- Collect creator fees into a program-owned treasury, not an ordinary developer wallet.
- Only authorize known, verified pack-purchase instructions; never arbitrary transfers.
- Maintain independent NFT custody and explicitly restrict prize delivery.
- Remove upgrade and administrative authority only **after** independent review and devnet testing.
- The Railway worker is an untrusted caller; it must not possess unrestricted treasury signing keys.
- Pause purchases on unexpected program IDs, destinations, prices, expired quotes, or API errors.
- Do not claim the fee stream is locked until the fee config and on-chain authority have been verified.

## Outstanding blockers
1. Verify that Pump.fun can route/claim creator fees to the selected PDA/program-owned address.
2. Inspect Collector Crypt's **actual** purchase and open transactions and determine whether they support PDA/CPI signing and immutable destination allowlists.
3. Implement an Anchor program with strict account validation and explicit state transitions.
4. Implement price caps, spending budgets, replay protection, slippage limits, receipts and NFT custody.
5. Run devnet integration and adversarial tests, then obtain an independent security review.
6. Obtain legal review of sweepstakes. Holder-valued weighted tickets may constitute unlawful consideration; a no-purchase path must provide equivalent odds and no disadvantage. Do not enable paid-token-based drawings until cleared.

## Current tests
`npm test` checks basic offline purchase-planning invariants in `src/policy.mjs`. This **is not** an on-chain enforcement mechanism.

## Deployment
Do not fund or use with a real token. Railway project `pokemon-pack-giveaways` was created separately but no production service has been deployed.
