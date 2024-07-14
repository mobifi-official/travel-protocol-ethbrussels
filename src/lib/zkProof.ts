import * as snarkjs from 'snarkjs';
import { GeneratedProofResponse } from '../app/models/zk-proof-models';
import { ethers, JsonRpcProvider } from "ethers";
import { GROTH_PROOF_VERIFIER_ABI } from '../app/utils/sc_abis';

function hashToNumber(input: string): bigint {
    let arr = input.split('');
    return BigInt(arr.reduce(
        (hashCode, currentVal) =>
        (hashCode =
            currentVal.charCodeAt(0) +
            (hashCode << 6) +
            (hashCode << 16) -
            hashCode),
        0
    ));
}

export async function generateZKProof(worldcoinId: string, bookingId: string, bookingDate: string) {
    // Hash and convert inputs to BigInt
    const input = {
        worldcoinId: hashToNumber(worldcoinId).toString(),
        bookingId: hashToNumber(bookingId).toString(),
        bookingDate: hashToNumber(bookingDate).toString()
    };

    // Get the path to where the following keys are stored
    const wasmFilePath = '/circuits/booking_js/booking.wasm';
    const zkeyFilePath = '/circuits/booking_0001.zkey';

    const [wasmResponse, zkeyResponse] = await Promise.all([
        fetch(wasmFilePath),
        fetch(zkeyFilePath),
    ]);

    if (!wasmResponse.ok || !zkeyResponse.ok) {
        throw new Error('Failed to load circuit or zkey files');
    }

    const wasmBuffer = new Uint8Array(await wasmResponse.arrayBuffer());
    const zkeyBuffer = new Uint8Array(await zkeyResponse.arrayBuffer());

    try {
        // Generate proof
        const { proof, publicSignals } = await snarkjs.groth16.fullProve(input, wasmBuffer, zkeyBuffer);

        const verificationKeyResponse = await fetch('/circuits/verification_key.json');
        if (!verificationKeyResponse.ok) {
            throw new Error('Failed to load verification key');
        }

        const verificationKey = await verificationKeyResponse.json();

        // Verify proof
        const isValid = await snarkjs.groth16.verify(verificationKey, publicSignals, proof);

        if (!isValid) {
            throw new Error("Invalid proof");
        }

        return { proof, publicSignals };
    } catch (error) {
        console.error("Error generating or verifying proof:", error);
        throw error;
    }
}


// Function to verify the proof
export async function verifyProof(proofDetails: GeneratedProofResponse): Promise<{ status: string, message: string }> {
    const { proof, publicSignals } = proofDetails;

    try {
        const startReadFileTime = performance.now();
        const verificationKeyResponse = await fetch('/circuits/verification_key.json');
        if (!verificationKeyResponse.ok) {
            throw new Error('Failed to load verification key');
        }

        const verificationKey = await verificationKeyResponse.json();
        const endReadFileTime = performance.now();
        console.log(`Read verification key file in ${endReadFileTime - startReadFileTime} ms`);

        console.log(`Verification starting...`);
        const startVerificationTime = performance.now();
        const isValid = await snarkjs.groth16.verify(verificationKey, publicSignals, proof);
        const endVerificationTime = performance.now();
        console.log(`Verification completed in ${endVerificationTime - startVerificationTime} ms`);

        if (isValid) {
            console.log(`-->[proof-appears-valid]<---`);
            return { status: 'success', message: 'Proof verified successfully' };
        } else {
            console.log(`-->[proof-is-not-valid]<---`);
            return { status: 'error', message: 'Invalid proof' };
        }
    } catch (error) {
        console.error("Error verifying proof:", error);
        return { status: 'error', message: 'Error verifying proof' };
    }
}

import { BigNumberish } from "ethers";

export async function verifyZkProofSC(verificationData: GeneratedProofResponse) {
    // 1. Set up the provider (connect to the network)
    const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL);

    // 2. Create a wallet instance
    const privateKey = process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY as `0x${string}`;
    const wallet = new ethers.Wallet(privateKey, provider);

    // 3. Contract details
    const contractAddress = process.env.NEXT_PUBLIC_DEPLOYED_VERIFICATION_SC_ADDRESS as `0x${string}`;

    // 4. Create a contract instance
    const contract = new ethers.Contract(contractAddress, GROTH_PROOF_VERIFIER_ABI, wallet);

    // 5. Call the contract function
    try {
        const { proof, publicSignals } = verificationData;

        // Convert proof values to BigNumberish
        const pA: [BigNumberish, BigNumberish] = [
            BigInt(proof.pi_a[0]),
            BigInt(proof.pi_a[1])
        ];

        const pB: [[BigNumberish, BigNumberish], [BigNumberish, BigNumberish]] = [
            [BigInt(proof.pi_b[0][1]), BigInt(proof.pi_b[0][0])],
            [BigInt(proof.pi_b[1][1]), BigInt(proof.pi_b[1][0])]
        ];

        const pC: [BigNumberish, BigNumberish] = [
            BigInt(proof.pi_c[0]),
            BigInt(proof.pi_c[1])
        ];

        // Convert public signals to BigNumberish
        const formattedPublicSignals: BigNumberish[] = publicSignals.map(signal => BigInt(signal));

        const isValid = await contract.verifyProof(pA, pB, pC, formattedPublicSignals);

        console.log(`---->[tx-result]<----`, isValid);

    } catch (error) {
        console.error('Error in verifyZkProofSC:', error);
        throw error;
    }
}

