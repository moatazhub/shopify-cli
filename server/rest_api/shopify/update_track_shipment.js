import axios from "axios";

export async function getUpdateTrack(payloadToUpdateTrack,shop_url, access_token, orderId, fulfillmentId){

    // const shop = "";
    // const token = "";
    // const orderId = "";
    // const fulfillmentId = "";

    const url = `${shop_url}/admin/api/2021-07/orders/${orderId}/fulfillments/${fulfillmentId}.json`;

    const header = {
        'Content-Type' : 'application/json',
        'X-Shopify-Access-Token' : access_token 
    }
    const body = payloadToUpdateTrack;
    try{
    
        const result = await axios.post(url, body, header);
        console.log(JSON.stringify(result.data))
        return result.data;

    }catch(err){
        console.error('Error get update track:', err)
    }

}