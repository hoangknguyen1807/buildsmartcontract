import { abi as TateNFTABI } from "./TateMorpheus.json";
import { ethers } from "hardhat";

async function main() {
  const [user1] = await ethers.getSigners();
  const tateNFTAddress = "0xDC177cBDe64aC22815122BE0B2b0EA1B327361f2";
  // const proxyEth2WaxBridge = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

  console.log({ account: user1.address });

  const tateNftContract = new ethers.Contract(
    tateNFTAddress,
    TateNFTABI,
    user1
  );

  // const waxeEscrow = await eth2waxBridge.waxeEscrow();
  // console.log({ waxeEscrow });
  // const waxAuthority = await eth2waxBridge.waxAuthority();
  // console.log({ waxAuthority });
  // const waxeToken = await eth2waxBridge.waxeToken();
  // console.log({ waxeToken });

  const tx = await tateNftContract.mintBatch(
    "0xdc63c389e72d9f803f5c8fde241a11e66e8d6531",
    2,
    [
      "https://gateway.pinata.cloud/ipfs/QmSft7ASHbULiBEKRymRTYSY6c964zYMh8XeFNKW18XrBY/1.json",
      "https://gateway.pinata.cloud/ipfs/QmSft7ASHbULiBEKRymRTYSY6c964zYMh8XeFNKW18XrBY/2.json",
    ]
  );
  const receipt = await tx.wait();
  console.log({ receipt });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
