import React from 'react';
import {Card, Subheading, ResourceList, ResourceItem, Stack,Page,Layout, TextField, DataTable, Button,Heading ,TextContainer, TextStyle,Filters, filterControl, Modal, List} from '@shopify/polaris';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import {useAppBridge} from '@shopify/app-bridge-react';
import {getSessionToken} from '@shopify/app-bridge-utils';  
//const mergeImages = require('merge-base64');

const orders = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [dataModel, setDataModel] = useState([]);
    const [active, setActive] = useState(false);
    const [dataBulk, setDataBulk] = useState([{}]);
    const [showDataBulk, setShowDataBulk] = useState([{}]);
    const [activeBulk, setActiveBulk] = useState(false);
    const handleChange = useCallback(() => setActive(!active), [active]);
    const handleChangeBulk = useCallback(() => setActiveBulk(!activeBulk), [activeBulk]);
    
     const app = useAppBridge();
     useEffect(() => {
        // Runs once, after mounting 
        async function fetchOrders() {
          const token = await getSessionToken(app);
          console.log('session token :',token);
         
          ////const id = "mystagstore.myshopify.com";
          const url = `https://murmuring-sierra-22719.herokuapp.com/api/orders`;
          const result = await  axios.get(url,{ headers: { Authorization: `Bearer ${token}` }});
          console.log(result.data);


          // filter orders to be as a non empty tracking number && shipping method by egypt express
          const filteredResult = result.data.body.orders;
          const filteredResult2 = filteredResult.filter(item => item.fulfillments[item.fulfillments.length -1].tracking_number != null && item.fulfillments[item.fulfillments.length -1].tracking_company == "Egypt Express" );
          //const tracking_number = item.fulfillments[item.fulfillments.length -1].tracking_number;
          setSelectedOrders(filteredResult2);  


         /// setSelectedOrders(result.data.body.orders);
                
              }
            fetchOrders();
            
      }, []);
    //     let data123 = [];
    console.log('show data:',selectedOrders);


        let ordersRows = [];
        const bulkActions = [
          {
            content: 'Tracking Orders ',
            onAction: async () => {
              let bulkResult = [];
              console.log(selectedItems);
              const token = await getSessionToken(app);
              let i = 0;
              for(const item of selectedItems){

                const url = `https://murmuring-sierra-22719.herokuapp.com/api/shipping-track?id=${item}`;
                const result = await  axios.post(url, {},{ headers: { Authorization: `Bearer ${token}` }});

               // const  result =  await  axios.post(`https://af42-41-238-83-52.ngrok.io/api/shipping-track?id=${item}`);
                bulkResult[i] = result.data;
                i++;
              }
              
              setDataBulk(bulkResult);
              console.log('result from loop',bulkResult);
              
              for(let oneResult of bulkResult) {
                // ordersRows.push(<ul>);
                for(let oneRow of oneResult.AirwayBillTrackList){
                  console.log('oneRow:',oneRow.AirWayBillNo);
                  ordersRows.push(<h3>AirWayBillNo:<b>{oneRow.AirWayBillNo}</b></h3>);
                  ordersRows.push(<li>Consignee : {oneRow.Consignee } </li>);
                  ordersRows.push(<li>Destination : {oneRow.Destination } </li>);
                  ordersRows.push(<li>Origin : {oneRow.Origin } </li>);
                  ordersRows.push(<li>ShipmentProgress : {oneRow.ShipmentProgress } </li>);
                  ordersRows.push(<li>Shipper : {oneRow.Shipper } </li>);
                  ordersRows.push(<li>Weight : {oneRow.Weight } </li>);
                  for(let logdata of oneRow.TrackingLogDetails){
                    ordersRows.push(<h4>Tracking Log Details : </h4>);
                    ordersRows.push(<li>ActivityDate : {logdata.ActivityDate } </li>);
                    ordersRows.push(<li>ActivityTime : {logdata.ActivityTime } </li>);
                    ordersRows.push(<li>Location : {logdata.Location } </li>);
                    ordersRows.push(<li>Status : {logdata.Status } </li>);
                  }
                  
                  ordersRows.push(<br/>);
                  setShowDataBulk(ordersRows);
                }
                // Object.entries(oneResult).forEach((index,val) =>{
                //   ordersRows.push(<li>{index}: {val} </li>);
                //   setDataBulk(ordersRows);
                // })
                // ordersRows.push(<li> {oneResult.AirwayBillTrackList[0].AirWayBillNo} </li>);
                 //console.log('oneResult.Description',oneResult.AirwayBillTrackList[0].AirWayBillNo);
                // ordersRows.push(</ul>);
              }
              console.log('orderRows',ordersRows);
              handleChangeBulk();
      
            } ,
          },
          {
            content: 'Print shipment PDFs',
            onAction: async () => {
              let bulkPdfResult = [];
              let mergedImage = '';
              //console.log(selectedItems);
              const token = await getSessionToken(app);
              for(const item of selectedItems){
               
                const url = `https://murmuring-sierra-22719.herokuapp.com/api/shipping-pdf?id=${item}`;
                const result = await  axios.post(url, {},{ headers: { Authorization: `Bearer ${token}` }});


               // const result = await axios.post(`https://af42-41-238-83-52.ngrok.io/api/shipping-pdf?id=${item}`);
                //bulkPdfResult = result.data.ReportDoc;
               // mergedImage = await mergeImages(result.data.ReportDoc,result.data.ReportDoc);
              //  bulkPdfResult.push = result.data.ReportDoc;
                
                
                downloadPDF(result.data.ReportDoc);
                
              }
             // mergedImage = await mergeImages([bulkPdfResult, bulkPdfResult]);
             // downloadPDF(mergedImage);   
             // handleChangeBulk();
      
            } ,
          },
          ];

        let rowsLogDetails =[];
        function showLogDetails(){
          rowsLogDetails.push(<h3>AirWayBillNo :<b>{dataModel.AirWayBillNo}</b></h3>);
          rowsLogDetails.push(<li>Consigne : {dataModel.Consignee } </li>);
          rowsLogDetails.push(<li>Destination : {dataModel.Destination } </li>);
          rowsLogDetails.push(<li>Origin : {dataModel.Origin } </li>);
          rowsLogDetails.push(<li>ShipmentProgress : {dataModel.ShipmentProgress } </li>);
          rowsLogDetails.push(<li>Shipper : {dataModel.Shipper } </li>);
          rowsLogDetails.push(<li>Weight : {dataModel.Weight } </li>);
          rowsLogDetails.push(<h4>Tracking Log Details : </h4>);
        if(dataModel.TrackingLogDetails){
         // for(let row of dataModel.TrackingLogDetails){
            rowsLogDetails.push(<li>ActivityDate: {dataModel.TrackingLogDetails[0].ActivityDate} </li>);
            rowsLogDetails.push(<li>ActivityTime: {dataModel.TrackingLogDetails[0].ActivityTime} </li>);
            rowsLogDetails.push(<li>Location: {dataModel.TrackingLogDetails[0].Location} </li>);
            rowsLogDetails.push(<li>Status: {dataModel.TrackingLogDetails[0].Status} </li>);
         // }
        }}
        showLogDetails();
        

    return(
        <>
        <img
          alt=""
         
          
          style={{
            margin : 10,
            marginLeft :48,
            objectPosition: 'center',
          }}
          src="https://i.ibb.co/jr7Nd4j/logo.png"
        />  
         <Page
        
        title="Tracking your Package..."
        divider
        >  
        
        <Layout.AnnotatedSection
    id="storeDetails"
    title="Tracking information"
    description="Here you can view delivery dates and tracking information for your orders."
  >
    
           <Card>
           <ResourceList
             resourceName={{singular: 'order', plural: 'orderss'}}
             items={selectedOrders}
             renderItem={renderItem}
             selectedItems={selectedItems}
             onSelectionChange={setSelectedItems}
             //promotedBulkActions={promotedBulkActions}
             bulkActions={bulkActions}
             showHeader
             totalItemsCount={20}           
           />
           </Card>
           </Layout.AnnotatedSection>
          </Page>

           <div style={{height:'500px'}}>
                <Modal
                  open={active}
                  onClose={handleChange}
                  title= {dataModel.AirWayBillNo  }
                  
                  secondaryActions={[
                    {
                      content: 'Close',
                      onAction: handleChange,
                    },
                  ]}
                >
                  <Modal.Section>
                  
                  <Heading>Tracking Info</Heading>
                   {rowsLogDetails}       
                        
                  </Modal.Section>
                  
                 
                </Modal>
          </div>
          <div style={{height:'500px'}}>
      <Modal
        open={activeBulk}
        onClose={handleChangeBulk}
        title= 'Tracking shipments'
        
        secondaryActions={[
          {
            content: 'Close',
            onAction: handleChangeBulk,
          },
        ]}
      >
        <Modal.Section>
         
             {showDataBulk}
          
        </Modal.Section>
        <Modal.Section>
        
        </Modal.Section>
      </Modal>
          </div>
                  
         </>
    )

    function renderItem(item) {
            const id = item.id;
            // const tracking_number = item.fulfillments[0].tracking_number;
            const tracking_number = item.fulfillments[item.fulfillments.length -1].tracking_number;
            const name = item.name;
            const price = item.total_price;
            
            
            return (
              <ResourceItem
                id={tracking_number}
                tracking_number = {tracking_number}
                name={name}
                price={price}    
              >
                <Stack>
                  <Stack.Item fill >
                        <Heading> Order </Heading>
                  </Stack.Item>
                  <Stack.Item fill >
                        <Heading> Tracking Number </Heading>
                  </Stack.Item>
                  <Stack.Item fill>
                        <Heading> Total Price </Heading>  
                  </Stack.Item>
                  <Stack.Item fill>
                        <Heading>  Shipment PDF </Heading>  
                  </Stack.Item>
                  
                
                </Stack>  
    
                <Stack>
                  <Stack.Item fill >    
                    <h3>
                      <TextStyle variation="strong">{name}</TextStyle>
                    </h3>
                  </Stack.Item>       
                  <Stack.Item fill >    
                      <h3>
                      
                      <Button
                          plain
                          //loading = {loadingLink}
                          onClick = {async() => {
                            // setLoadingLink(true);   
                            //setTimeout(() => {  console.log("World!"); }, 4000);
                            setDataModel({});
                            // prepare request for axios
                            const token = await getSessionToken(app);
                            console.log('token from track :',token);
                            const url = `https://murmuring-sierra-22719.herokuapp.com/api/shipping-track?id=${tracking_number}`;
                            const result = await  axios.post(url, {},{ headers: { Authorization: `Bearer ${token}` }});

                           // const result = await  axios.post(`https://af42-41-238-83-52.ngrok.io/api/shipping-track?id=${tracking_number}`);
                            // console.log("details:",result.data.AirwayBillTrackList[0].Destination);
                            console.log(result.data);
                            // if(Array.isArray(result.data.AirwayBillTrackList[0].TrackingLogDetails) && result.data.AirwayBillTrackList.TrackingLogDetails)
                              // console.log('is an array and not empty..')
                            setDataModel(result.data.AirwayBillTrackList[0]);
                            console.log('data model : ',dataModel);
                            handleChange();
                            
                          // setLoadingLink(false);
                          }}    
                      > 
                           {tracking_number}
                      </Button>
                    </h3>
                  </Stack.Item>    
               
                  <Stack.Item fill >        
                    <h3>
                      <TextStyle variation="strong">{price}</TextStyle>
                    </h3>
                  </Stack.Item>       
                  <Stack.Item fill >
                  <h3>
                  
                  <Button
                      plain
                      onClick = {async() => {

                        // prepare request for axios
                        const token = await getSessionToken(app);
                       // console.log('token from track :',token);
                        const url = `https://murmuring-sierra-22719.herokuapp.com/api/shipping-pdf?id=${tracking_number}`;
                        const result = await  axios.post(url, {},{ headers: { Authorization: `Bearer ${token}` }});


                     // const result = await axios.post(`https://af42-41-238-83-52.ngrok.io/api/shipping-pdf?id=${tracking_number}`);
                      downloadPDF(result.data.ReportDoc);   
                      }} >
                        {tracking_number}
                  </Button>
                </h3>
                  </Stack.Item>
                   
                </Stack>  
    
              </ResourceItem>
    
            );
    
      }

    function downloadPDF(pdf) {
      const linkSource = `data:application/pdf;base64,${pdf}`;
      const downloadLink = document.createElement("a");
      const fileName = `egypt_exprss_${Date.now()}.pdf`;
  
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }
};

export default orders;