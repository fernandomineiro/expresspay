const axios = require('axios');
 
const credentials = new Buffer('testing:testing123').toString('base64')
 
const getAuthTokenForThePayment = async (data) => {
 
    try {
 
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`
            }
        };
 
        const URL = 'https://fts.cardconnect.com:6443/cardconnect/rest/auth';
 
        return await axios.put(URL, data, config);
 
    } catch (error) {
 
        throw (error);
 
    }
}
 
const makeCharge = async (data) => {
 
    try {
 
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${credentials}`
            }
        };
 
        const URL = 'https://fts.cardconnect.com:6443/cardconnect/rest/capture';
 
        return await axios.put(URL, data, config);
 
    } catch (error) {
 
        throw (error);
 
    }
}
 
 
 
(async() => {
 
    const paymentRequest = await getAuthTokenForThePayment({
        account: '4444333322221111',
        merchid: '496160873888',
        amount: '1000', 
        expiry: '1220',
        currency: 'USD'
    });
 
    const charge = await makeCharge({
        merchid: paymentRequest.data.merchid, 
        retref: paymentRequest.data.retref
    });
 
    console.log(charge);
 
})();