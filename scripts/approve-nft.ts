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

  // const tx1 = await tateNftContract.approve(
  //   "0x6668C29e3a1922bd8A322c0FE3C43E77a783A2b4",
  //   1
  // );
  // const receipt1 = await tx1.wait();
  // console.log({ receipt1 });

  const tx2 = await tateNftContract.setApprovalForAll(
    "0x6668C29e3a1922bd8A322c0FE3C43E77a783A2b4",
    true
  );
  const receipt2 = await tx2.wait();
  console.log({ receipt2 });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
