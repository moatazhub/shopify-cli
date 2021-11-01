import { mapCities, computeWieght } from "../helpers/helper";
import { getFulfilled } from "../rest_api/fedex/fulfilled_shipment";
import { getUpdateTrack } from "../rest_api/shopify/update_track_shipment";
import Shopify from "@shopify/shopify-api"; 

export async function getShippingFulfilled(ctx){

   const resault = await parseShopifyRequest(ctx);
   return resault;
    
}

async function parseShopifyRequest(ctx){

    const buffers = [];

    for await (const chunk of ctx.req) {
        buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString();
    // data to be sent to egyptExpress
    const dataJson = JSON.parse(data);
    
    const userName = "ELSFQA";
    const password = "ZLRGVp+ZyjT6hW8Xg1PJBA==";
    const accountNo = "EGV26o+Ie18pfk93HhpX2w==";
    const airWayBillCreatedBy = "Elsfqa User Name";
    const CODAmount = 0;
    const CODCurrency = "";
    const destination_shopify = dataJson.shipping_address.province_code; //"ALX";
    const destination = mapCities(destination_shopify);
    const dutyConsigneePay = 0;
    const goodsDescription = "Mobile Accessories";
    const numberofPeices = 1;
    const origin_shopify = "ALX";// $city;//from database
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
    const sendersAddress1 = "Masaken Street";
    const sendersAddress2 = "Helipolis";
    const sendersCity = "Helipolis";
    const sendersCompany = "Egypt Express";
    const sendersContactPerson = "Mr.Amin";
    const sendersCountry = "Egypt";
    const sendersEmail = "itm@egyptepxress.eg";
    const sendersGeoLocation = "";
    const sendersMobile = "11222333";
    const sendersPhone = "11222333";
    const sendersPinCode = "";
    const sendersSubCity = "";
    const serviceType = "FRG";
    const shipmentDimension = "";
    const shipmentInvoiceCurrency = dataJson.currency; //"EGP";
    const shipmentInvoiceValue = dataJson.current_total_price; //0;
    const shipperReference = "JD123444";
    const shipperVatAccount = "";
    const specialInstruction = "Confirm Location before Delivery";
    const weight = dataJson.total_weight ;//6;
      
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
    const trackingNumber = result.AirwayBillNumber;
    const orderId = dataJson.id;
    const fulfillmentId = dataJson.fulfillments[0].id;

     const shop_url = "https://mystagstore.myshopify.com";
     const access_token = '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';

    //const { shop, accessToken } = ctx.state.shopify;

    //const session = await Shopify.Utils.loadCurrentSession(ctx.req, ctx.res);
    //console.log('session from token ',shop);




    const payloadToUpdateTrack = {
      fulfillment : {
        tracking_number : trackingNumber,
        id : orderId
      }
    }

    //update traking number
    const resultUpdateTrack = await getUpdateTrack(payloadToUpdateTrack,shop_url, access_token, orderId, fulfillmentId)

    
    // update tracking link

    return result;
    
}



