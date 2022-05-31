import { ethers } from "hardhat";
import { Contract, ContractFactory, Signer } from "ethers";
import { expect } from "chai";

describe("Nft1155", function () {
  let owner: Signer;
  let addresses: Signer[];
  let nft1155ContractFactory: ContractFactory;
  let nft1155Contract: Contract;

  beforeEach(async function () {
    [owner, ...addresses] = await ethers.getSigners();
    nft1155ContractFactory = await ethers.getContractFactory('Nft1155');
    nft1155Contract = await nft1155ContractFactory.deploy("");
  });

  it("should create a nft contact with default settings", async function () {
    expect(await nft1155Contract.getBaseTokenUri()).equal("ipfs://QmPLRr5WWHmv6B5gaapAqL9onc1sKSkAny7dE6ng2pHWGA/{id}.json");
    expect(await nft1155Contract.getMaxAllowedTokensAmount()).equal(10);
  });

  it("should set another baseTokenUri by constructor", async function () {
    const anotherUri: string = "123";
    nft1155Contract = await nft1155ContractFactory.deploy(anotherUri);
    expect(await nft1155Contract.getBaseTokenUri()).equal(anotherUri);
  });

  it("should set another baseTokenUri", async function () {
    const anotherUri: string = "123";
    nft1155Contract.setBaseTokenUri(anotherUri);
    expect(await nft1155Contract.getBaseTokenUri()).equal(anotherUri);
  });

  it("should mint a new token", async function () {
    expect(await nft1155Contract.balanceOf(owner.getAddress(), 1)).equal(0);
    await nft1155Contract.mint(owner.getAddress(), 1, 1);
    expect(await nft1155Contract.balanceOf(owner.getAddress(), 1)).equal(1);
    await nft1155Contract.mint(owner.getAddress(), 1, 10);
    expect(await nft1155Contract.balanceOf(owner.getAddress(), 1)).equal(11);
  });

  it("should throw an exception if tokenId out of the range from 1 to 10", async function () {
    const address: string = await owner.getAddress();

    try {
      expect(await nft1155Contract.mint(owner.getAddress(), 11, 1)
      ).to.throw();
    } catch (error: unknown) {
      expect(error instanceof Error ? error.message : "").to.have.string("TokenId should be in the range from 1 to 10");
    }
  });
});