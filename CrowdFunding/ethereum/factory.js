import web3 from './web3';
import CampaginFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaginFactory.interface),
    '0xb88aaAA9309aB320aAD5501c51239F4FAD4e78E6'
);

export default instance;

//0xb88aaAA9309aB320aAD5501c51239F4FAD4e78E6