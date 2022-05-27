import { task } from "hardhat/config";

task("mint", "Mint a new token")
  .addParam('nft', "The address of the nft 1155 token contract")
  .addParam('address', "The address where nft tokens will be received")
  .addParam('tokenid', "Token id to be minted")
  .addParam('amount', "Amount of tokens to be minted")
  .setAction(async (taskArgs, hre) => {
    const nftAddress = taskArgs.nft;
    const address = taskArgs.address;
    const tokenId = taskArgs.tokenid;
    const amount = taskArgs.amount;
    const nftContractFactory = await hre.ethers.getContractFactory('Nft1155');
    const nftContract = nftContractFactory.attach(nftAddress);
    await nftContract.mint(address, tokenId, amount);

    console.log("Done");
  });