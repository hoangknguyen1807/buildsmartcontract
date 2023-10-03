const hre = require("hardhat");
// const contracts = require("../contracts.json");

async function main() {
  // try {
  //   await hre.run("verify:verify", {
  //     address: "0x0Fd4f9aA22E03cD2E15fe04d34365CF42B462a17",
  //     constructorArguments: [
  //       "0xD90A5DB9EbFeb22e374Cd44830250B297085d5c3",
  //       "0x027594fF9B44b2EbebeaF8aEdF8A426A2A988781"
  //     ],
  //   });
  // } catch (err) {
  //   console.log("err :>> ", err);
  // }

  // try {
  //   await hre.run("verify:verify", {
  //     address: "0x027594fF9B44b2EbebeaF8aEdF8A426A2A988781",
  //   });
  // } catch (err) {
  //   console.log("err :>> ", err);
  // }

  // 0xFC10FE756f01D405CeBb465A07A00AF79b93F54f

  try {
    await hre.run("verify:verify", {
  		address: "0x9D71aCC7b37B5e2AEbe8844C3aAaCA01971E5650",
  		constructorArguments: ["TateExcellent", "T8XCL"],
  	}).catch(console.log);
  } catch (err) {
    console.log("err :>> ", err);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
