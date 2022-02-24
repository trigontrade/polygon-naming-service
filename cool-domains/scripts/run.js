const main = async () => {
	// The first return is the deployer, the second is a random account
	const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  // We pass in "ly" to the constructor when deploying
	const domainContract = await domainContractFactory.deploy("ly");
	await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
	console.log("Contract deployed by:", owner.address);
	
  console.log("\n...Registering and setter/getter functions...")

  // We're passing in a second variable - value. This is the moneyyyyyyyyyy
	let txn = await domainContract.register("surprising", {value: hre.ethers.utils.parseEther('0.1')});
	await txn.wait();

  const domainAddress = await domainContract.getAddress("surprising");
  console.log("Owner of domain surprising:", domainAddress);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

  let txnSetEmail = await domainContract.setEmail("surprising", "test@testemail.com");
  await txnSetEmail.wait();

  const domainEmail = await domainContract.getEmail("surprising");
  console.log("Email of domain surprising:", domainEmail);

  let txnSetContent = await domainContract.setContent("surprising", "surprising.ly this works");
  await txnSetContent.wait();

  const domainContent = await domainContract.getContent("surprising");
  console.log("Content of domain surprising:", domainContent);

	// Trying to set a record that doesn't belong to me!
  console.log("\n...Testing set functions from another user...")

  let testContent = "Haha my domain now!";
  try {
    let txnOtherSetContent = await domainContract.connect(randomPerson).setContent("surprising", testContent);
  }
  catch(e) {
    console.log(e.message);
    console.log("content: '%s' not set", testContent);
  }

  let testEmail = "ScammyMcScammer@scammers-inc.evil";
  try {
    let txnOtherSetEmail = await domainContract.connect(randomPerson).setEmail("surprising", testEmail);
  }
  catch(e) {
    console.log(e.message);
    console.log("Email: '%s' not set", testEmail);
  }

}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();