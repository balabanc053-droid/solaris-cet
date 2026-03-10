"""Update app/public/api/state.json with current CET token and pool data."""

import json
import os

cet_contract = os.environ["CET_CONTRACT"]
dedust_pool = os.environ["DEDUST_POOL"]
timestamp = os.environ["TIMESTAMP"]

with open("/tmp/jetton.json") as f:
    jetton = json.load(f)

with open("/tmp/pool.json") as f:
    pool = json.load(f)

try:
    with open("/tmp/prices.json") as f:
        prices = json.load(f)
except (OSError, json.JSONDecodeError):
    prices = []

meta = jetton.get("metadata", {})
total_supply = jetton.get("total_supply")
decimals_raw = meta.get("decimals")

# ── TVL in TON ────────────────────────────────────────────────────────────────
# DeDust single-pool endpoint returns reserveLeft (TON, nanoTON) and
# reserveRight (CET, nano-CET). TVL = 2x the TON side converted to whole TON.
reserve_left_str = pool.get("reserveLeft")
try:
    tvl_ton = round(float(reserve_left_str) / 1e9 * 2, 4) if reserve_left_str else None
except (TypeError, ValueError):
    tvl_ton = None

# ── CET price in USD ──────────────────────────────────────────────────────────
# Prefer the DeDust /v2/prices endpoint; fall back to reserve-based calculation.
ton_entry = next((p for p in prices if isinstance(p, dict) and p.get("address") == "native"), None)
ton_price_usd = float(ton_entry["price"]) if ton_entry and ton_entry.get("price") else None

cet_entry = next(
    (p for p in prices if isinstance(p, dict) and p.get("address", "").lower() == cet_contract.lower()),
    None,
)
price_usd = float(cet_entry["price"]) if cet_entry and cet_entry.get("price") else None

# Reserve-based fallback
if price_usd is None and ton_price_usd and tvl_ton:
    reserve_right_str = pool.get("reserveRight")
    try:
        cet_reserve = float(reserve_right_str) / 1e9 if reserve_right_str else None
        ton_reserve = tvl_ton / 2  # one side of the pool in TON
        if cet_reserve and cet_reserve > 0:
            price_usd = round((ton_reserve / cet_reserve) * ton_price_usd, 8)
    except (TypeError, ValueError):
        price_usd = None

state = {
    "token": {
        "symbol": meta.get("symbol") if meta.get("symbol") else "CET",
        "name": meta.get("name") if meta.get("name") else "SOLARIS CET",
        "contract": cet_contract,
        "totalSupply": total_supply if total_supply is not None else None,
        "decimals": int(decimals_raw) if decimals_raw is not None else 9,
    },
    "pool": {
        "address": dedust_pool,
        "tvlTon": tvl_ton,
        "priceUsd": price_usd,
    },
    "updatedAt": timestamp,
}

with open("app/public/api/state.json", "w") as f:
    json.dump(state, f, indent=2)

print("state.json written successfully")
