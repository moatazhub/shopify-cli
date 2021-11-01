
module.exports = {
   
    async create(ctx){
         try{
             ctx.body = await ctx.db.appSession.create({
                sessionId : ctx.request.body.sessionId,  
                shop : ctx.request.body.shop,
                payload : ctx.request.body.payload,
                
             });

         }
         catch(err){
             ctx.throw(500, err)
         }
    }, 
    
    async find(ctx){
        try{
            ctx.body = await ctx.db.appSession.findAll({});
        }
        catch(err){
            ctx.throw(500, err)
        }
    },

    async findOne(ctx){
        try{
            const session = await ctx.db.appSession.findOne({
                where:{
                    sessionId : ctx.params.sessionId

                }
                
            });
            if(!session){
                ctx.throw(404, 'session id is invalid');
            }
            ctx.body = session;

        }
        catch(err){
            ctx.throw(500, err)
        }
    },

    async destroy(ctx){
        try{
            const result = await ctx.db.appSession.destroy({
               where:{
                sessionId : ctx.params.sessionId
               } 
            });
            result === 0 ? ctx.throw(500, ' invalid id provides'): ctx.body = `deleted the sessionId withe id ${ctx.params.sessionId}`;


        }
        catch(err){
            ctx.throw(500, err);
        }
    },

    async update(ctx){
        try{
            const result = await ctx.db.appSession.update({
                 
                shop : ctx.request.body.shop,
                payload : ctx.request.body.payload,
               
            }, {
               where:{
                sessionId : ctx.params.sessionId
               } 
            });
            result === 0 ? ctx.throw(500, ' invalid sessionId provides'): ctx.body = `updated the session withe id ${ctx.params.sessionId}`;


        }
        catch(err){
            ctx.throw(500, err);
        }
    }


}