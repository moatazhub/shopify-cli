import { getPdf } from "../rest_api/fedex/pdf_shipment";

export async function getPdfShipment(id){

   
    const userName = "ELSFQA";//dataJson.UserName;
    const password = "ZLRGVp+ZyjT6hW8Xg1PJBA==";//dataJson.Password;
    const accountNo = "EGV26o+Ie18pfk93HhpX2w==";//dataJson.AccountNo;
    const airwayBillNumber = id;
    

    const dataToPost = {
        "UserName" : userName,
        "Password" : password,
        "AccountNo" : accountNo,
        "AirwayBillNumber" : airwayBillNumber
    }

    const result = await getPdf(dataToPost);
    return result;
        
}