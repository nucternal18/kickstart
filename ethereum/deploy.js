const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
const mnemonicPhrase = "scissors shed cheese reason walnut thing swift correct gown train fury mass"
const provider = new HDWalletProvider({
    mnemonic: mnemonicPhrase,
    providerOrUrl: "https://rinkeby.infura.io/v3/592cdbcf0ad74d12ada855b7215c1f3a"
});
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: '0x' + compiledFactory.bytecode })
    .send({ from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};
deploy();

