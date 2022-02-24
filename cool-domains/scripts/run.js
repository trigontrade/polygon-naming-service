const main = async () => {
	// The first return is the deployer, the second is a random account
	const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
	const domainContract = await domainContractFactory.deploy();
	await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
	console.log("Contract deployed by:", owner.address);
	
	let txn = await domainContract.register("doom");
	await txn.wait();

  const domainAddress = await domainContract.getAddress("doom");
  console.log("Owner of domain doom:", domainAddress);

  let txnSetEmail = await domainContract.setEmail("doom", "test@testemail.com");
  await txnSetEmail.wait();

  const domainEmail = await domainContract.getEmail("doom");
  console.log("Email of domain doom:", domainEmail);

  let txnSetContent = await domainContract.setContent("doom", "doom is when everyone only eats spam");
  await txnSetContent.wait();

  const domainContent = await domainContract.getContent("doom");
  console.log("Content of domain doom:", domainContent);

	// Trying to set a record that doesn't belong to me!
  console.log("...Testing set functions from another user")

  let testContent = "Haha my domain now!";
  try {
    let txnOtherSetContent = await domainContract.connect(randomPerson).setContent("doom", testContent);
  }
  catch(e) {
    console.log(e.message);
    console.log("content: '", testContent, "' not set");
  }

  let testEmail = "ScammyMcScammer@scammers-inc.evil";
  try {
    let txnOtherSetEmail = await domainContract.connect(randomPerson).setEmail("doom", testEmail);
  }
  catch(e) {
    console.log(e.message);
    console.log("Email: '", testEmail, "' not set");
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