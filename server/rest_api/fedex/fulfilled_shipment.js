import axios from "axios";

export async function getFulfilled(dataToPost){
    const url = 'http://82.129.197.86:1929/EGEXPService.svc/CreateAirwayBill';
    const header = {
        'Content-Type' : 'application/json' 
    }
    const body = dataToPost;
    try{
    
        const result = await axios.post(url, body, header);
        console.log(JSON.stringify(result.data))
        return result.data;

    }catch(err){
        console.error('Error get create shipment:', err)
    }

}