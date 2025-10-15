import { bech32 } from "bech32";
import { task } from "hardhat/config";

task("deploy", "Deploy the oracle contract")
  .addParam("roflAppId", "ROFL App ID (e.g., rofl1...)")
  .addOptionalParam("threshold", "Number of app instances required", "1")
  .setAction(async ({ roflAppId, threshold }, hre) => {
    const thresholdNum = parseInt(threshold);

    // Parse ROFL app ID
    const { prefix, words } = bech32.decode(roflAppId);
    if (prefix !== "rofl") {
      throw new Error(`Malformed ROFL app identifier: ${roflAppId}`);
    }
    const rawAppID = new Uint8Array(bech32.fromWords(words));

    // Get signer
    const [deployer] = await hre.ethers.getSigners();
    console.log(`Deploying Oracle contract...`);
    console.log(`  Deployer: ${deployer.address}`);
    console.log(`  Network: ${hre.network.name}`);
    console.log(`  ROFL App ID: ${roflAppId}`);
    console.log(`  Threshold: ${thresholdNum}`);

    // Deploy the oracle contract
    const Oracle = await hre.ethers.getContractFactory("Oracle");
    const oracle = await Oracle.connect(deployer).deploy(rawAppID, thresholdNum);
    await oracle.waitForDeployment();

    console.log(`\n✓ Oracle deployed to: ${oracle.target}`);
    console.log(`\nTo query this contract, run:`);
    console.log(`  bunx hardhat oracle-query --contract-address ${oracle.target} --network ${hre.network.name}`);
  });
