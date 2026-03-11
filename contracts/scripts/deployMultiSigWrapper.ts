import { toNano, Address } from "@ton/core";
import { MultiSigWrapper } from "../wrappers/MultiSigWrapper";
import { NetworkProvider } from "@ton/blueprint";

/**
 * Deployment script for MultiSigWrapper.
 *
 * Usage:
 *   npx blueprint run deployMultiSigWrapper --network testnet
 *
 * Environment variables:
 *   OWNER   – override the initial single owner address (must be a valid TON address string).
 *             Defaults to the wallet address connected via the network provider.
 */
export async function run(provider: NetworkProvider) {
    const sender = provider.sender();

    let owner: Address;

    const envOwner = process.env.OWNER;
    if (envOwner && envOwner.trim().length > 0) {
        try {
            owner = Address.parse(envOwner.trim());
        } catch {
            throw new Error(
                `Invalid OWNER environment variable value "${envOwner}". ` +
                "Please provide a valid TON address (e.g. EQ...)."
            );
        }
    } else {
        if (!sender.address) {
            throw new Error(
                "Sender address is not available. " +
                "Please connect a wallet or set the OWNER environment variable."
            );
        }
        owner = sender.address;
    }

    const threshold = 1n; // start with 1-of-1; add owners and raise threshold afterwards

    console.log(`Deploying MultiSigWrapper with owner: ${owner.toString()}`);
    console.log(`Initial threshold: ${threshold}`);

    const contract = provider.open(
        await MultiSigWrapper.fromInit(owner, threshold)
    );

    await contract.send(
        sender,
        { value: toNano("0.2") }, // initial TON for rent
        { $$type: "Deploy", queryId: 0n }
    );

    await provider.waitForDeploy(contract.address);

    console.log("✅ MultiSigWrapper deployed at:", contract.address.toString());
    console.log("   Owner count :", (await contract.getOwnerCount()).toString());
    console.log("   Threshold   :", (await contract.getThreshold()).toString());
}
