import Shopify from '@shopify/shopify-api';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getOrders(ctx){
    // staticShop =  'mystagstore.myshopify.com';
    const session = await Shopify.Utils.loadCurrentSession(ctx.request, ctx.response,false);
    //const shop = 'mystagstore.myshopify.com';
    // select the shop object from db
    const shopSession = await prisma.shopSession.findFirst({
        where: {
          shop: session.shop,
        },
    });
    // get accessToken from shopSession
    const accessToken = shopSession.payload.accessToken;
    //console.log('accessToken :',accessToken);

    const client = new Shopify.Clients.Rest( session.shop, accessToken);
    const data = await client.get({
    path: 'orders',
    query: {"fulfillment_status":"shipped","status":"any", "fields":"id,created_at,name,total-price,fulfillments"},
    });
    console.log('order data :',JSON.stringify(data.body));
    return data;

}