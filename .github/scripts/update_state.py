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

with open("/tmp/prices.json") as f:
    prices = json.load(f)

# ── Token metadata from TON API ───────────────────────────────────────────────
meta = jetton.get("metadata", {})
total_supply = jetton.get("total_supply")
decimals_raw = meta.get("decimals")
decimals = int(decimals_raw) if decimals_raw is not None else 9

# ── Pool reserves from DeDust API ─────────────────────────────────────────────
# assets: [{"type":"native"}, {"type":"jetton","address":"..."}]
# reserves: ["<nanoTON>", "<nanoCET>"] — same index order as assets
assets = pool.get("assets", [])
reserves = pool.get("reserves", [])

ton_index = 0
for i, asset in enumerate(assets):
    if isinstance(asset, dict) and asset.get("type") == "native":
        ton_index = i
        break

tvl_ton: float | None = None
if len(reserves) > ton_index:
    try:
        ton_reserve = int(reserves[ton_index]) / 1e9  # nanoTON → TON
        # TVL = 2× the TON side (symmetric AMM pool)
        tvl_ton = round(ton_reserve * 2, 6)
    except (ValueError, TypeError):
        tvl_ton = None

# ── CET price in USD from DeDust prices endpoint ──────────────────────────────
# prices is a list of {"address": "<addr>", "price": "<usd_str>"}
# CET jetton address uses EQ… prefix; normalise to lowercase for comparison.
cet_addr_lower = cet_contract.lower()
price_usd: float | None = None
ton_price_usd: float | None = None
for entry in prices:
    addr = entry.get("address", "")
    price_str = entry.get("price")
    if addr == "native":
        try:
            ton_price_usd = float(price_str)
        except (ValueError, TypeError):
            pass
    elif addr.lower() == cet_addr_lower:
        try:
            price_usd = float(price_str)
        except (ValueError, TypeError):
            pass

state = {
    "token": {
        "symbol": meta.get("symbol") or "CET",
        "name": meta.get("name") or "SOLARIS CET",
        "contract": cet_contract,
        "totalSupply": total_supply if total_supply is not None else None,
        "decimals": decimals,
    },
    "pool": {
        "address": dedust_pool,
        "tvlTon": tvl_ton,
        "priceUsd": price_usd,
        "tonPriceUsd": ton_price_usd,
    },
    "updatedAt": timestamp,
}

with open("app/public/api/state.json", "w") as f:
    json.dump(state, f, indent=2)

print("state.json written successfully")
