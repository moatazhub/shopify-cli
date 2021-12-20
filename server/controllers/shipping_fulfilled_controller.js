import { mapCities, computeWieght } from "../helpers/helper";
import { getFulfilled } from "../rest_api/fedex/fulfilled_shipment"; 
import Shopify, { DataType } from '@shopify/shopify-api';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const crypto = require('crypto');

export async function getShippingFulfilled(ctx){
   const resault = await parseShopifyRequest(ctx);
   return resault;  
}

async function verifyShopifyHook(data, ctx) {
  var digest = crypto.createHmac('SHA256', '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')
          .update(data)
          .digest('base64');
       console.log('generated digest',digest);  
       console.log('shopify digest',ctx.req.headers['X-Shopify-Hmac-Sha256']); 
       const hmac = ctx.request.get('X-Shopify-Hmac-Sha256');
       console.log('hmac', hmac);
  
  return digest === ctx.request.get('X-Shopify-Hmac-Sha256');
}

async function parseShopifyRequest(ctx){
    const buffers = [];
    for await (const chunk of ctx.req) {
        buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();  
//     if ( await verifyShopifyHook(data,ctx)) {
//       ctx.res.writeHead(200);
//       ctx.res.end('Verified webhook');
//       console.log('verifyed');
//   } else {
//     ctx.res.writeHead(401);
//     ctx.res.end('Unverified webhook');
//     console.log('Unverifyed');
//     ctx.throw(401,'UnAuthorization');
//   }

    const shopFromHeader = ctx.request.headers['x-shopify-shop-domain'];
    const user = await prisma.user.findFirst({
      where: {
        shop_url: shopFromHeader,
      },
    }) 
    //const userName = user.user_name;
    //const password = user.password;
    
    // data to be sent to egyptExpress
    const dataJson = JSON.parse(data);
    if(dataJson.fulfillments[dataJson.fulfillments.length -1].tracking_company != "Egypt Express"){
     // ctx.res.writeHead(404);
      //ctx.res.end('Invalid tracking comapny');
     // console.log('Invalid tracking comapny.');
     // ctx.throw(401,'Invalid tracking comapny');
     return;
    }
    console.log(dataJson);
    const userName = user.user_name;//"ELSFQA";
    const password = user.password;//"ZLRGVp+ZyjT6hW8Xg1PJBA==";
    const accountNo = user.account_number;//"EGV26o+Ie18pfk93HhpX2w==";
    const airWayBillCreatedBy = "Elsfqa User Name";
    const CODAmount = 0;
    const CODCurrency = "";
    const destination_shopify = dataJson.shipping_address.province_code; //"ALX";
    const destination = mapCities(destination_shopify);
    const dutyConsigneePay = 0;
    const goodsDescription = "Mobile Accessories";
    const numberofPeices = 1;
    if(user.city === null ) 
       user.city = "SU";
    const origin_shopify = user.city;//"ALX";// $city;//from database
    const origin = mapCities(origin_shopify);//"CAI";
    const productType = "FRE";
    const receiversAddress1 = dataJson.shipping_address.address1 ? dataJson.shipping_address.address1 : ""  ; //"2nd Ind. zone";
    const receiversAddress2 = dataJson.shipping_address.address2 ? dataJson.shipping_address.address2 : "" ; 
    const receiversCity = dataJson.shipping_address.province; //"Alexandria";
    const receiversCompany = "Egypt Expresss";//$fulfillment['shipping_address']['company']; //"Egypt Expresss";
    const receiversContactPerson = dataJson.shipping_address.first_name; //"Amin";
    const receiversCountry = dataJson.shipping_address.country; //"Egypt";
    const receiversEmail = dataJson.customer.email; //"it@egexpress.eg";
    const receiversGeoLocation = "";
    const receiversMobile = "01273445799";
    const receiversPhone = "01293445799";//$fulfillment['shipping_address']['phone']; //"01293445799";
    const receiversPinCode = dataJson.shipping_address.zip; //"";
    const receiversProvince = dataJson.shipping_address.province; //"";
    const receiversSubCity = "";
    if(user.address1 === null ) 
       user.address1 = "";
    const sendersAddress1 = user.address1;//"Masaken Street";
    if(user.address2 === null ) 
       user.address2 = "";
    const sendersAddress2 = user.address2;//"Helipolis";
    const sendersCity = user.city;//"Helipolis";
    if(user.company === null ) 
       user.company = "";
    const sendersCompany = user.company; //"Egypt Express";
    if(user.contact === null ) 
       user.contact = "";
    const sendersContactPerson = user.contact;//"Mr.Amin";
    if(user.country === null ) 
       user.country = "";
    const sendersCountry = user.country;//"Egypt";
    if(user.email === null ) 
       user.email = "";
    const sendersEmail = user.email;//"itm@egyptepxress.eg";
    const sendersGeoLocation = "";
    if(user.mobile === null ) 
       user.mobile = "";
    const sendersMobile = user.mobile;//"11222333";
    if(user.mobile === null ) 
       user.mobile = "";
    const sendersPhone = user.mobile;//"11222333";
    const sendersPinCode = "";
    const sendersSubCity = "";
    const serviceType = "FRG";
    const shipmentDimension = "";
    const shipmentInvoiceCurrency = dataJson.currency; //"EGP";
    const shipmentInvoiceValue = dataJson.current_total_price; //0;
    const shipperReference = "JD123444";
    const shipperVatAccount = "";
    const specialInstruction = "Confirm Location before Delivery";
    const weight = dataJson.total_weight/1000 ;//6;
      
    const dataToPost = {

      "UserName":userName,
      "Password":password,
      "AccountNo":accountNo,
      "AirwayBillData":
      {
          "AirWayBillCreatedBy":airWayBillCreatedBy,
          "CODAmount" : CODAmount ,
          "CODCurrency":CODCurrency,
          "Destination":destination,
          "DutyConsigneePay" :dutyConsigneePay,
          "GoodsDescription":goodsDescription,
          "NumberofPeices" :numberofPeices,
          "Origin":origin,
          "ProductType":productType,
          "ReceiversAddress1":receiversAddress1,
          "ReceiversAddress2":receiversAddress2,
          "ReceiversCity":receiversCity,
          "ReceiversCompany":receiversCompany,
          "ReceiversContactPerson":receiversContactPerson,
          "ReceiversCountry":receiversCountry,
          "ReceiversEmail":receiversEmail,
          "ReceiversGeoLocation":receiversGeoLocation,
          "ReceiversMobile":receiversMobile,
          "ReceiversPhone":receiversPhone,
          "ReceiversPinCode":receiversPinCode,
          "ReceiversProvince":receiversProvince,
          "ReceiversSubCity":receiversSubCity,
          "SendersAddress1":sendersAddress1,
          "SendersAddress2":sendersAddress2,
          "SendersCity":sendersCity,
          "SendersCompany":sendersCompany,
          "SendersContactPerson":sendersContactPerson,
          "SendersCountry":sendersCountry,
          "SendersEmail":sendersEmail,
          "SendersGeoLocation":sendersGeoLocation,
          "SendersMobile":sendersMobile,
          "SendersPhone":sendersPhone,
          "SendersPinCode":sendersPinCode,
          "SendersSubCity":sendersSubCity,
          "ServiceType":serviceType,
          "ShipmentDimension":shipmentDimension,
          "ShipmentInvoiceCurrency":shipmentInvoiceCurrency,
          "ShipmentInvoiceValue" :shipmentInvoiceValue,
          "ShipperReference":shipperReference,
          "ShipperVatAccount":shipperVatAccount,
          "SpecialInstruction":specialInstruction,
          "Weight" :weight
      }
  


    }

    const result = await getFulfilled(dataToPost);
    
    // // prepare params to update tracking number
    let trackingNumber = result.AirwayBillNumber;
    const orderId = dataJson.id;
    const fulfillmentId = dataJson.fulfillments[dataJson.fulfillments.length -1].id;

    // get order_status_url
    const order_status_url = dataJson.order_status_url;
    // get shop from the order status
    let urlArr = order_status_url.split('/',3);
    const shop = urlArr[2];
    console.log('shop : ',shop);
    // select the shop object from db
    const shopSession = await prisma.shopSession.findFirst({
      where: {
        shop: shop,
      },
    })
    // get accessToken from shopSession
    const accessToken = shopSession.payload.accessToken;
    console.log('accessToken :',accessToken);

    // check if the response for code ==1 or not
    // if (result.Code != 1)
    //  trackingNumber = `error : ${result.Description}`;

    const client = new Shopify.Clients.Rest(shop, accessToken);
    const dataresult = await client.put({
      path: `orders/${orderId}/fulfillments/${fulfillmentId}`,
      data: {"fulfillment":{"tracking_number":trackingNumber,
                            "id":fulfillmentId,
                            "tracking_company":'Egypt Express',
                            "tracking_url":'https://www.egyptexpress.com.eg/en/home/index',
                          }},
      type: DataType.JSON,  
    });
    console.log(dataresult);
    
    return result;
    
}



