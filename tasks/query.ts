import { bech32 } from "bech32";
import { task } from "hardhat/config";

task("oracle-query", "Query the oracle contract for observation data")
  .addParam("contractAddress", "The deployed contract address")
  .setAction(async ({ contractAddress }, { ethers }) => {
    const oracle = await ethers.getContractAt("Oracle", contractAddress);

    console.log(`Querying oracle contract at ${oracle.target}\n`);

    const rawRoflAppID = await oracle.roflAppID();
    const roflAppID = bech32.encode("rofl", bech32.toWords(ethers.getBytes(rawRoflAppID)));
    const threshold = await oracle.threshold();

    console.log(`ROFL app:  ${roflAppID}`);
    console.log(`Threshold: ${threshold}`);

    try {
      const [value, blockNum] = await oracle.getLastObservation();
      console.log(`\nLast observation: ${value}`);
      console.log(`Last update at:   block ${blockNum}`);
    } catch {
      console.log(`\nNo recent observation available.`);
    }
  });
