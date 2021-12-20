import { getTrack } from "../rest_api/fedex/track_shipment";
import { PrismaClient } from '@prisma/client';
import {Shopify} from '@shopify/shopify-api';

const prisma = new PrismaClient();

export async function getTrackingShipment(id, ctx){

    const session = await Shopify.Utils.loadCurrentSession(ctx.request, ctx.response, false);
    console.log('session from track :',session);
    //const shop = 'mystagstore.myshopify.com';
    const user = await prisma.user.findUnique({
        where: {
          shop_url: session.shop,
        },
    }) 

    const userName = user.user_name;//"ELSFQA";
    const password = user.password;//"ZLRGVp+ZyjT6hW8Xg1PJBA==";
    const accountNo = user.account_number;//"EGV26o+Ie18pfk93HhpX2w==";

    // const userName = "ELSFQA";//dataJson.UserName;
    // const password = "ZLRGVp+ZyjT6hW8Xg1PJBA==";//dataJson.Password;
    // const accountNo = "EGV26o+Ie18pfk93HhpX2w==";//dataJson.AccountNo;
    const trackingAWB = id;
    

    const dataToPost = {
        "UserName" : userName,
        "Password" : password,
        "AccountNo" : accountNo,
        "TrackingAWB" : trackingAWB
    }

    const result = await getTrack(dataToPost);
    return result;
        
}