// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Groth16Verifier.sol"; // Import the verifier contract

contract TravelProtocol {
    Groth16Verifier verifier; // Instance of the verifier contract

    // Constructor that sets the verifier contract address
    constructor(address verifierAddress) {
        verifier = Groth16Verifier(verifierAddress); // Ensure correct type
    }

    // Function to verify the proof and execute application-specific logic
    function verifyAndExecute(
        uint[2] calldata proofA, // Proof part A generated off-chain
        uint[2][2] calldata proofB, // Proof part B generated off-chain
        uint[2] calldata proofC, // Proof part C generated off-chain
        uint[1] calldata publicInputs // Public inputs required for the proof
    ) external view { // Marking function as view
        // Verify the proof using the verifier contract
        // The verifyProof function checks if the proof is valid based on the public inputs
        require(verifier.verifyProof(proofA, proofB, proofC, publicInputs), "Invalid proof");

        // If the proof is valid, execute your application-specific logic here
        // For example, updating state, transferring tokens, etc.
        // Note: Since this function is marked as view, you cannot modify the state here.
    }
}
