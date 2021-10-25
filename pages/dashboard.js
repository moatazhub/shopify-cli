import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from 'react-apollo';
import {Card, Subheading, ResourceList, ResourceItem, Stack, TextField, DataTable, Button,Heading ,TextContainer, TextStyle,Filters, filterControl, Modal, List} from '@shopify/polaris';
import { useState, useCallback } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [loadingLink, setLoadingLink] = useState(false);
    const [active, setActive] = useState(false);
    const [activeBulk, setActiveBulk] = useState(false);
    const [dataModel, setDataModel] = useState([]);
    const [dataBulk, setDataBulk] = useState([{}]);

    const handleChange = useCallback(() => setActive(!active), [active]);
    const handleChangeBulk = useCallback(() => setActiveBulk(!activeBulk), [activeBulk]);

    // const activator = <Button onClick={handleChange}>Open</Button>;
    // const activatorBulk = <Button onClick={handleChangeBulk}>Open</Button>;


    

    const GET_ORDERS = gql`
    query{
      orders(first:3,query:"fulfillment_status:shipped"){ 
        edges{
          node{
            name
            id
            fulfillments{
                trackingInfo{
                  number
                }
              }
            customer{
              firstName
            }
            totalWeight
            currencyCode
            totalPriceSet{
              shopMoney{
                amount
              }
              
            }
          }
        }
        
      }
    }`;

    const {loading, error, data} = useQuery(GET_ORDERS)
    if(loading) return <div>loading.</div>
    if(error) return <div>{error.message}</div>
      console.log('this is data',data.orders.edges)

    // console.log('this is data',data.orders.edges[0].node.name)
     // console.log('this is data2',data.orders.edges[0].node.fulfillments[0].trackingInfo[0].number);

     // const [selectedItems, setSelectedItems] = useState([]);

    const promotedBulkActions = [
    {
      content: 'Track order',
      onAction: () => console.log(data.orders.edges[1].node.fulfillments[0].trackingInfo[0].number),
    },
    ];

    
    const bulkActions = [
    {
      content: 'Add tags',
      onAction: async () => {
        let bulkResult = [];
        console.log(selectedItems);
        let i = 0;
        for(const item of selectedItems){
          
          const  result =  await  axios.post(`https://murmuring-sierra-22719.herokuapp.com/api/shipping-track?id=${item}`);
          bulkResult[i] = result.data;
          i++;
        }
        
        setDataBulk(bulkResult);
        console.log(dataBulk);
        handleChangeBulk();

      } ,
    },
    {
      content: 'Remove tag',
      onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
      content: 'Delete customers',
      onAction: () => console.log('Todo: impleme bulk delete'),
    },
    ];

  
  
 
  return(
    <>
    

   <Card>
      <ResourceList
        resourceName={{singular: 'orderrr', plural: 'orders'}}
        items={data.orders.edges}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        promotedBulkActions={promotedBulkActions}
        bulkActions={bulkActions}
        showHeader
        totalItemsCount={50}
        
           
      />
    </Card>
    <div style={{height:'500px'}}>
      <Modal
        open={active}
        onClose={handleChange}
        title=   {dataModel.AirWayBillNo  }
        
        secondaryActions={[
          {
            content: 'Close',
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
         
         <Heading>Tracking Info</Heading>
           {Object.entries(dataModel).map(([name, value]) => (
            <TextContainer>
              <List type="bullet">
              
                <List.Item>{name} : {value.toString()}</List.Item>
              </List>
             </TextContainer>
           ))}

          <Heading>Tracking Log Details</Heading>
           {Object.entries(dataModel.TrackingLogDetails[0]).map(([name, value]) => (
            <TextContainer>
              <List type="bullet">
                <List.Item>{name} : {value.toString()}</List.Item>
              </List>
             </TextContainer>
           ))}
              
        </Modal.Section>
        <Modal.Section>
        
        </Modal.Section>
      </Modal>
    </div>
    <div style={{height:'500px'}}>
      <Modal
        open={activeBulk}
        onClose={handleChangeBulk}
        title= 'new'
        
        secondaryActions={[
          {
            content: 'Close',
            onAction: handleChangeBulk,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
          
          
          
          </TextContainer>
        </Modal.Section>
        <Modal.Section>
        
        </Modal.Section>
      </Modal>
    </div>
    </>
  )

  function renderItem(item) {
    const id = item.node.id;
        const name = item.node.name;
        const customer = item.node.customer.firstName;
        const price = item.node.totalPriceSet.shopMoney.amount;
        const trackingNumber = item.node.fulfillments[0].trackingInfo[0].number;
        return (
          <ResourceItem
            id={trackingNumber}
            name={name}
            customer={customer}
            price={price}
            trackingNumber = {trackingNumber}
            accessibilityLabel={`View details for ${name}`}
          >
              <Stack>
              <Stack.Item fill >
                    <Heading> Orders </Heading>
              </Stack.Item>

              <Stack.Item fill >
                    <Heading> Tracking# </Heading>
              </Stack.Item>
             
              <Stack.Item fill>
                    <Heading> Customer </Heading>
              </Stack.Item>
              <Stack.Item fill>
                    <Heading> Pricee </Heading>  
              </Stack.Item>
              <Stack.Item fill>
                    <Heading> pdf print </Heading>  
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
                   loading = {loadingLink}
                   onClick = {async() => {
                   
                    
                   // setLoadingLink(true);   
                    //setTimeout(() => {  console.log("World!"); }, 4000);
                    const result = await  axios.post(`https://murmuring-sierra-22719.herokuapp.com/api/shipping-track?id=${trackingNumber}`);
                   // console.log("details:",result.data.AirwayBillTrackList[0].Destination);
                    console.log(result.data);
                   // if(Array.isArray(result.data.AirwayBillTrackList[0].TrackingLogDetails) && result.data.AirwayBillTrackList.TrackingLogDetails)
                      // console.log('is an array and not empty..')
                       setDataModel(result.data.AirwayBillTrackList[0]);
                    handleChange();
                    
                   // setLoadingLink(false);
                 }}

                  
                  >{trackingNumber}</Button>
                </h3>
              </Stack.Item>
             
              <Stack.Item fill>
                <h3>  
                  <TextStyle variation="strong">{customer}</TextStyle>
                </h3>   
              </Stack.Item>
              <Stack.Item fill>
                <h3>  
                  <TextStyle variation="strong">{price}</TextStyle>
                </h3>   
              </Stack.Item>

              <Stack.Item fill >
                <h3>
                  
                  <Button
                   plain
                   loading = {loadingLink}
                   onClick = {async() => {
            
                   // setLoadingLink(true);   
                    //setTimeout(() => {  console.log("World!"); }, 4000);
                    const result = await axios.post(`https://60fbcecd9d09.ngrok.io/api/shipping-pdf?id=${trackingNumber}`);
                   // console.log("details:",result.data.ReportDoc);
                    //var b64 = result.data.ReportDoc;
                    downloadPDF(result.data.ReportDoc);
                    //var bin = atob(b64);
                   // console.log('File Size:', Math.round(bin.length / 1024), 'KB');
                    //console.log('PDF Version:', bin.match(/^.PDF-([0-9.]+)/)[1]);
                    //console.log('Create Date:', bin.match(/<xmp:CreateDate>(.+?)<\/xmp:CreateDate>/)[1]);
                    //console.log('Modify Date:', bin.match(/<xmp:ModifyDate>(.+?)<\/xmp:ModifyDate>/)[1]);
                    //console.log('Creator Tool:', bin.match(/<xmp:CreatorTool>(.+?)<\/xmp:CreatorTool>/)[1]);

                    // Embed the PDF into the HTML page and show it to the user
                    // var obj = document.createElement('object');
                    // obj.style.width = '100%';
                    // obj.style.height = '842pt';
                    // obj.type = 'application/pdf';
                    // obj.data = 'data:application/pdf;base64,' + b64;
                    // document.body.appendChild(obj);

                    // Insert a link that allows the user to download the PDF file
                    // var link = document.createElement('a');
                    // link.innerHTML = 'Download PDF file';
                    // link.download = 'file.pdf';
                    // link.href = 'data:application/octet-stream;base64,' + b64;
                    // document.body.appendChild(link);

                   // setDataModel(result.data.AirwayBillTrackList[0]);
                    //handleChange();
                    
                   // setLoadingLink(false);
                 }}

                  
                  >{trackingNumber}</Button>
                </h3>
              </Stack.Item>

            </Stack>  

          </ResourceItem>

        );

  }
  
  function downloadPDF(pdf) {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = "vct_illustration.pdf";

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}
};
 

 
export default Dashboard;