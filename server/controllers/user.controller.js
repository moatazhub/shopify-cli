import { PrismaClient } from '@prisma/client';
import {Shopify} from '@shopify/shopify-api';

const prisma = new PrismaClient();

module.exports = {
   
    async create(ctx){
         try{
             ctx.body = await ctx.db.Account.create({
                account_number : ctx.request.body.account_number,  
                user_name : ctx.request.body.user_name,
                password : ctx.request.body.password,
                company : ctx.request.body.company, 
                country : ctx.request.body.country, 
                city : ctx.request.body.city, 
                email : ctx.request.body.email, 
                address1 : ctx.request.body.address1, 
                address2 : ctx.request.body.address2, 
                contact : ctx.request.body.contact, 
                mobile : ctx.request.body.mobile, 
                password : ctx.request.body.password,   
                shop_url : ctx.request.body.shop_url, 
             });

         }
         catch(err){
             ctx.throw(500, err)
         }
    }, 
    
    async find(ctx){
        try{
            ctx.body = await ctx.db.Account.findAll({});
        }
        catch(err){
            ctx.throw(500, err)
        }
    },

    async findOne(ctx){

            const session = await Shopify.Utils.loadCurrentSession(ctx.request, ctx.response, false);
            console.log(session);
        // try{
        //     const user = await ctx.db.Account.findOne({
        //         where:{
        //             shop_url : ctx.params.id

        //         }
                
        //     });
        //     if(!user){
        //         ctx.throw(404, 'user id is invalid');
        //     }
        //     ctx.body = user;

        // }
        // catch(err){
        //     ctx.throw(500, err)
        // }

        try{
            const user = await prisma.user.findUnique({
                where: {
                  shop_url: session.shop,
                },
              })
            console.log(user);    
            if(!user){
                ctx.throw(404, 'user id is invalid');
            }
            ctx.body = user;

        }
        catch(err){
            ctx.throw(500, err)
        }
    },

    async destroy(ctx){
        try{
            const result = await ctx.db.Account.destroy({
               where:{
                id : ctx.params.id
               } 
            });
            result === 0 ? ctx.throw(500, ' invalid id provides'): ctx.body = `deleted the user withe id ${ctx.params.id}`;


        }
        catch(err){
            ctx.throw(500, err);
        }
    },

    async update(ctx){
        try{

            const session = await Shopify.Utils.loadCurrentSession(ctx.request, ctx.response, false);
            console.log(session);

            // const result = await ctx.db.Account.update({
            //     account_number : ctx.request.body.account_number,  
            //     user_name : ctx.request.body.user_name,
            //     password : ctx.request.body.password,
            //     company : ctx.request.body.company, 
            //     country : ctx.request.body.country, 
            //     city : ctx.request.body.city, 
            //     email : ctx.request.body.email, 
            //     address1 : ctx.request.body.address1, 
            //     address2 : ctx.request.body.address2, 
            //     contact : ctx.request.body.contact, 
            //     mobile : ctx.request.body.mobile, 
            //     password : ctx.request.body.password,   
            //    // shop_url : ctx.request.body.shop_url, 
            // }, {
            //    where:{
            //     shop_url : ctx.params.shop_url
            //    } 
            // });
            // result === 0 ? ctx.throw(500, ' invalid shop_url provides'): ctx.body = `updated the user withe id ${ctx.params.shop_url}`;
            console.log('put request..');
            console.log(ctx.request.body);
            const updateUser = await prisma.user.update({
                where: {
                    shop_url : session.shop,
                },
                data: {
                    account_number : ctx.request.body.account_number,  
                    user_name : ctx.request.body.user_name,
                    password : ctx.request.body.password,
                    company : ctx.request.body.company, 
                    country : ctx.request.body.country, 
                    city : ctx.request.body.city, 
                    email : ctx.request.body.email, 
                    address1 : ctx.request.body.address1, 
                    address2 : ctx.request.body.address2, 
                    contact : ctx.request.body.contact, 
                    mobile : ctx.request.body.mobile, 
                    password : ctx.request.body.password,   
                },
              })
              ctx.body = 'updated the user withe id';
              return ctx.body;
              // result === 0 ? ctx.throw(500, ' invalid shop_url provides'): ctx.body = `updated the user withe id ${ctx.params.shop_url}`;

        }
        catch(err){
            ctx.throw(500, err);
        }
    }





}