/**
 * useEdgeState.ts
 *
 * Reads the pre-built `api/state.json` that the TON Chain Indexer CI workflow
 * publishes to GitHub Pages every 5 minutes.  This is the "Zero-Cost Edge"
 * layer of the architecture: the GitHub Actions runner does the heavy lifting
 * of querying the TON chain and DeDust, then writes a static snapshot.  The
 * browser fetches that snapshot from the same CDN domain — no CORS issues, no
 * external API rate limits, zero extra cost.
 *
 * Types mirror the shape written by `.github/scripts/update_state.py`.
 *
 * The `@ton/core` package is used to parse and normalise raw contract addresses
 * into the user-facing bounceable Base64url format used across the TON ecosystem.
 */

import { useState, useEffect, useCallback } from 'react';
import { Address } from '@ton/core';

export interface EdgeTokenState {
  symbol: string;
  name: string;
  contract: string;
  totalSupply: string | null;
  decimals: number;
}

export interface EdgePoolState {
  address: string;
  tvlTon: string | null;
  priceUsd: string | null;
}

export interface EdgeState {
  token: EdgeTokenState;
  pool: EdgePoolState;
  updatedAt: string;
}

export interface UseEdgeStateResult {
  state: EdgeState | null;
  /** Contract address in bounceable Base64url format (EQ…) for display. */
  contractAddress: string | null;
  loading: boolean;
  error: string | null;
}

const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes — matches the CI schedule

export function useEdgeState(): UseEdgeStateResult {
  const [result, setResult] = useState<UseEdgeStateResult>({
    state: null,
    contractAddress: null,
    loading: true,
    error: null,
  });

  const fetchState = useCallback(() => {
    // Use BASE_URL so the path resolves correctly on GitHub Pages subpaths
    // (Vite sets import.meta.env.BASE_URL to './' in production).
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    fetch(`${base}/api/state.json`, { cache: 'no-cache' })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<EdgeState>;
      })
      .then((data) => {
        // Parse the raw contract address into a normalised bounceable form
        // using @ton/core.  Falls back gracefully if the address is malformed.
        let contractAddress: string | null = null;
        try {
          contractAddress = Address.parse(data.token.contract).toString({
            bounceable: true,
            urlSafe: true,
          });
        } catch {
          contractAddress = data.token.contract;
        }
        setResult({ state: data, contractAddress, loading: false, error: null });
      })
      .catch((err: unknown) => {
        setResult((prev) => ({
          ...prev,
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to fetch edge state',
        }));
      });
  }, []);

  useEffect(() => {
    fetchState();
    const id = setInterval(fetchState, REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchState]);

  return result;
}
