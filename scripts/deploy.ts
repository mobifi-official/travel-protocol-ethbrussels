const hre = require("hardhat");

async function main() {
  try {
    // Get the ContractFactory of your SimpleContract
    const Groth16Verifier = await hre.ethers.getContractFactory("Groth16Verifier");

    // Deploy the contract
    const contract = await Groth16Verifier.deploy();

    // Wait for the deployment transaction to be mined
    await contract.deployed();

    console.log(`Groth16Verifier deployed to: ${contract.address}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();