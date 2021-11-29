const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    'glass upon giant segment pen identify burden turtle monster couch enable police',
    'https://rinkeby.infura.io/v3/8913cc56d49f41ec8edf9751bf9b90a6'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ gas: 5000000, from: accounts[0] });

    console.log(JSON.stringify(compiledFactory.abi));
    console.log('Contract Factory deploy to', result.options.address);
    provider.engine.stop();
};

deploy();