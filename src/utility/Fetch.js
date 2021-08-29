import axios from 'axios';
import https from 'https';

import Constants from './Constants';

// eslint-disable-next-line
export default function() {
    return new Promise((resolve, reject) => {
        const Agent = new https.Agent({ rejectUnauthorized: false });

        axios.get(Constants.API, { httpsAgent: Agent }).then(resolve).catch((error) => {
            reject(error); console.error(error);
        });
    });
}