import Shopify, { DataType } from '@shopify/shopify-api';


module.exports = {

    async  addCarrierService(shop, accessToken)  {
        try{  
            const client = new Shopify.Clients.Rest(shop, accessToken);
            const data = await client.post({
              path: 'carrier_services',
              data: {"carrier_service":{"name":"EgyptExpress Rate","callback_url":"https://murmuring-sierra-22719.herokuapp.com/api/shipping-rate","service_discovery":true}},
              type: DataType.JSON,
            });
            console.log(data);
         
        }
        catch(err){
            ctx.throw(500, err);
        }
    
    },

    async  addOrderFulfilled(shop, accessToken)  {
        try{  
            const client = new Shopify.Clients.Rest(shop, accessToken);
            const data = await client.post({
                path: 'webhooks',
                data: {"webhook":{"topic":"orders/fulfilled","address":"https://murmuring-sierra-22719.herokuapp.com/api/shipping-fulfilled","format":"json"}},
                type: DataType.JSON,
            });
            console.log(data);
        }
        catch(err){
            ctx.throw(500, err);
        }
    
    },

    async  addAppUninstall(shop, accessToken)  {
        try{  
            const client = new Shopify.Clients.Rest(shop, accessToken);
            const data = await client.post({
                path: 'webhooks',
                data: {"webhook":{"topic":"app/uninstalled","address":"https://murmuring-sierra-22719.herokuapp.com/api/app-uninstalled","format":"json"}},
                type: DataType.JSON,
            });
            console.log(data);
        }
        catch(err){
            ctx.throw(500, err);
        }
    
    }



}