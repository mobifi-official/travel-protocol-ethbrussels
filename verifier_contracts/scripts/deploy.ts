import { ethers } from "hardhat";

async function main() {
  try {
    // Get the ContractFactory of your Groth16Verifier
    const Groth16Verifier = await ethers.getContractFactory("Groth16Verifier");

    // Deploy the contract
    const contract = await Groth16Verifier.deploy();

    // Wait for the deployment transaction to be mined
    await contract.waitForDeployment();

    console.log(`Groth16Verifier deployed to: ${await contract.getAddress()}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});