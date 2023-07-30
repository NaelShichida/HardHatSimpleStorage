// const { ethers } = require("hardhat")

// async function main() {
//   const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
//   console.log("Deploying contract...")
//   const simpleStorage = await SimpleStorageFactory.deploy()
//   // const deployedContract = await simpleStorage.getDeployedCode
//   console.log(`Deployed contract to: ${simpleStorage.target}`)
//   console.log("Awaiting 6 block confirmations")
//   // await simpleStorage.deploy.wait(6)


//   const currentValue = await simpleStorage.retrieve()
//   const currentValueNumber = currentValue.toNumber(); // Convert BigNumber to JavaScript number
//   console.log(`Current value is: ${currentValueNumber}`)

//   const transactionResponse = await simpleStorage.store(3)
//   await transactionResponse.wait(1)
//   const updatedValue = await simpleStorage.retrieve()
//   console.log(`Updated value is: ${updatedValue}`)
// }



// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });


// imports
const { ethers, run, network } = require("hardhat")

// async main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying contract...")
  const simpleStorage = await SimpleStorageFactory.deploy()
  // await simpleStorage.deployed()
  console.log(`Deployed contract to: ${simpleStorage.target}`)
  // what happens when we deploy to our hardhat network?
  if (network.config.chainId === 58008 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...")
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  const currentValue = await simpleStorage.retrieve()
  console.log(`Current Value is: ${currentValue}`)

  // Update the current value
  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Updated Value is: ${updatedValue}`)
}

// async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e)
    }
  }
}

// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })