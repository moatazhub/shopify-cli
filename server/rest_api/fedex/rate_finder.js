import axios from "axios";

export async function getRate(dataToPost){
    const url = 'http://82.129.197.86:1929/EGEXPService.svc/RateFinder';
    const header = {
        'Content-Type' : 'application/json' 
    }
    const body = dataToPost;
    try{
    
        const result = await axios.post(url, body, header);
        console.log(result.data)
        return result.data;

    }catch(err){
        console.error('Error get rate:', err)
    }

}