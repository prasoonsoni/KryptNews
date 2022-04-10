const main = async ()=> {
  const News = await hre.ethers.getContractFactory("News");
  const news = await News.deploy();
  await news.deployed();
  console.log("News Smart Contract deployed to:", news.address);
}

const runMain = async ()=> {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

runMain();