const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');

console.log(buildPath);

fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Campaign.sol'];

fs.ensureDirSync(buildPath);

outputJsonContract(output.Campaign, 'Campaign');
outputJsonContract(output.CampaignFactory, 'CampaignFactory');

function outputJsonContract(contract, file) {
    fs.outputJSONSync(
        path.resolve(buildPath, file + '.json'),
        contract
    );
}