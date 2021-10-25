import { getTrack } from "../rest_api/fedex/track_shipment";

export async function getTrackingShipment(id){

   
    const userName = "ELSFQA";//dataJson.UserName;
    const password = "ZLRGVp+ZyjT6hW8Xg1PJBA==";//dataJson.Password;
    const accountNo = "EGV26o+Ie18pfk93HhpX2w==";//dataJson.AccountNo;
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