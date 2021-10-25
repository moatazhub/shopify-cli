import { mapCities, computeWieght } from "../helpers/helper";
import { getRate } from "../rest_api/fedex/rate_finder";


export async function getShippingRate(ctx){

   const resault = await parseShopifyRequest(ctx);
   return resault;
    
}

async function parseShopifyRequest(ctx){
    

    const buffers = [];

    for await (const chunk of ctx.req) {
        buffers.push(chunk);
    }
    console.log('posted data from buffers',buffers);
    const data = Buffer.concat(buffers).toString();
    // data to be sent to egyptExpress
    console.log('posted data from postman',data);
   // ctx.disableBodyParser = true;
    const dataJson = JSON.parse(data);
    const shopifyOrigin = dataJson.rate.origin.province;
    const shopifyDestination = dataJson.rate.destination.province;
    const items = dataJson.rate.items;
    const fedexOrigin = mapCities(shopifyOrigin);
    const fedexDestination = mapCities(shopifyDestination);
    
    // total up the cart grams for  rate calculations 
    const total = computeWieght(items);
    const weight = total[0];
    const qty = total[1];
    console.log(qty);
    console.log(weight);

    const dataToPost = {
        "UserName" : "ELSFQA",
        "Password" : "ZLRGVp+ZyjT6hW8Xg1PJBA==",
        "Origin" : fedexOrigin,
        "Destination" : fedexDestination,
        "PaymentMethod" : "AC",
        "ServiceType" : "FRG",
        "Product" : "SCS",
        "Weight" : weight / 1000,
        "Dimension" : "",
        "NoofPeices" : qty
    }

    const result = await getRate(dataToPost);
    const finalResult =   buildingRespone(result);
    return finalResult;
    
}

function buildingRespone(result){

  const rates = {
    'rates' : {  
    'service_name' : 'Egypt Express',
    'service_code' : 'EgyEx',
    'total_price' : result.NetAmount * 100 ,
    'currency' : 'EGP',
    'min_delivery_date' : 5,
    'max_delivery_date' : 7
     }
  }

  return rates;

    
}

