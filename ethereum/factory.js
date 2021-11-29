import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0x090046C0624bEDf0727d4343b292c8F1c671d102'
);

export default instance;