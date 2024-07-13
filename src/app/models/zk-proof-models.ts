import { Groth16Proof, PublicSignals } from "snarkjs"

export type GeneratedProofResponse = {
    proof: Groth16Proof,
    publicSignals: PublicSignals,
}