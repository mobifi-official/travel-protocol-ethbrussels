require('dotenv').config();
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the Groth16Verifier contract
  const Verifier = await ethers.getContractFactory("Groth16Verifier");
  const verifier = await Verifier.deploy();
  await verifier.deployed();
  console.log("Groth16Verifier deployed to:", verifier.address);

  // Deploy the TravelProtocol contract with the verifier address
  const TravelProtocol = await ethers.getContractFactory("TravelProtocol");
  const travelProtocol = await TravelProtocol.deploy(verifier.address);
  await travelProtocol.deployed();
  console.log("TravelProtocol deployed to:", travelProtocol.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
