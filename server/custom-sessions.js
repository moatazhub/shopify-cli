import { PrismaClient } from '@prisma/client';

import { Session } from '@shopify/shopify-api/dist/auth/session';


const prisma = new PrismaClient();

let domain = '';

module.exports.storeCallback = async function storeCallback(session){
  console.log('Running storeCallback')

  const payload = { ...session }
    console.log('StoreCallback session===============================')
    console.log(session)
    console.log('StoreCallback Payload===============================')
    console.log(payload)

    if(session.id.indexOf(`${session.shop}`) > -1){
        domain = session.id;
    }

    return prisma.shopSession.upsert({
        where: {  shop: session.shop },
        create: { session_id: session.id, domain_id:domain, payload: payload, shop: session.shop },
        update: { session_id: session.id, domain_id:domain, payload: payload}

    }).then(_ => {
        return true
    }).catch(err => {
        return false
    })
}

module.exports.loadCallback = async function loadCallback(id) {
    console.log('loadCallback ID===============================')
        console.log(id)
    return prisma.shopSession.findFirst({
        where: {
            OR:[
                {session_id: id},
                {domain_id: id }
            ] 
        }
    }).then(data => {
        if (!data) {
            console.log('undefind.....')
            return undefined
        }
        console.log('before inialize.....')
        const session = new Session(id)
        console.log('after inialize.....')
        console.log('session.....',session)
        // @ts-ignore
        const { shop, state, scope, accessToken, isOnline, expires, onlineAccessInfo } = data.payload
        session.shop = shop
        session.state = state
        session.scope = scope
        session.expires = expires ? new Date(expires) : undefined
        session.isOnline = isOnline
        session.accessToken = accessToken
        session.onlineAccessInfo = onlineAccessInfo

        console.log('loadCallback New session Complete===============================')
        console.log(session)
        return session
    }).catch(err => {
        
        console.log('errrrrrr',err);
        return undefined;
    })
}


module.exports.deleteCallback = async function deleteCallback(id){
  console.log('deleteCallback ID===============================')
        console.log(id)
    return prisma.shopSession.delete({
        where: { id: id }
    }).then(_ => {
        return true
    }).catch(err => {
        return false
    })
} 
  