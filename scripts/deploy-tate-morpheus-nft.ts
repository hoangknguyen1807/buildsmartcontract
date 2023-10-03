const { ethers, network, run } = require("hardhat");
import { TateMorpheus__factory, TateMorpheus } from "../typechain-types";
import { Table } from "./utils";

const table = new Table();

async function main() {
	const [deployer] = await ethers.getSigners();
	const TateMorpheus_factory = (await ethers.getContractFactory("TateMorpheus")) as TateMorpheus__factory;

  console.log("=====================================================================================");
  console.log("DEPLOYER:", deployer.address);

	console.log("============DEPLOYING CONTRACTS============");

	const tateMorpheus: TateMorpheus = await TateMorpheus_factory.deploy("TateExcellent", "T8XCL");
	await tateMorpheus.deployed();
	table.add([{ name: "TateMorpheus", type: "deploy", address: tateMorpheus.address }]);
	table.log();

	console.log("============SAVE CONTRACTS ADDRESS============");
	await table.save("deployed", `tate_morpheus_${network.name}_${Date.now()}.json`);

	console.log("============VERIFY CONTRACTS============");
	await run("verify:verify", {
		address: tateMorpheus.address,
		constructorArguments: ["TateExcellent", "T8XCL"],
	}).catch(console.log);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});

