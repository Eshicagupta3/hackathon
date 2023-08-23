const hre = require("hardhat");
const fs = require('fs');
const address = "0xF7079308daA87f8790679d9D7f9806c31EE17611";
async function main() {
  // const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  // const nftMarketplace = await NFTMarketplace.deploy();
  // await nftMarketplace.deployed();
  // console.log("nftMarketplace deployed to:", nftMarketplace.address);
  console.log("nftMarketplace deployed to:", address);

  // fs.writeFileSync('./config.js', `
  // export const marketplaceAddress = "${nftMarketplace.address}"
  // `)
  fs.writeFileSync('./config.js', `
  export const marketplaceAddress = "${address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
