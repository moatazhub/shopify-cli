import React from 'react';
import {Card, Subheading, ResourceList, ResourceItem, Stack, TextField, DataTable, Button,Heading ,TextContainer, TextStyle,Filters, filterControl, Modal, List} from '@shopify/polaris';
import { useState, useCallback } from 'react';
import axios from 'axios';
import {useAppBridge} from '@shopify/app-bridge-react';
import {getSessionToken} from '@shopify/app-bridge-utils';

const orders = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    const app = useAppBridge();
       let data = '';

        async function fetchOrders() {
        const token = await getSessionToken(app);
        console.log('session token : ',token);
       
        ////const id = "mystagstore.myshopify.com";
        const url = `https://murmuring-sierra-22719.herokuapp.com/api/orders`;
        const result = await  axios.get(url,{ headers: { Authorization: `Bearer ${token}` }});
        console.log(result.data);
        console.log('name:',result.data.body.orders[0].name);
        console.log('trcking number :',result.data.body.orders[0].fulfillments[0].tracking_number);
        data =  result.data.body.orders; 
        }
        fetchOrders();

        const data123 = {
            "orders": {
              "edges": [
                {
                  "node": {
                    "name": "#1001",
                    "id": "gid://shopify/Order/4021998813369",
                    "fulfillments": [
                      {
                        "trackingInfo": [
                          {
                            "number": "101002479"
                          }
                        ]
                      }
                    ],
                    "customer": {
                      "firstName": "motaz"
                    },
                    "totalWeight": "3000",
                    "currencyCode": "EGP",
                    "totalPriceSet": {
                      "shopMoney": {
                        "amount": "21.99"
                      }
                    }
                  }
                },
                {
                  "node": {
                    "name": "#1002",
                    "id": "gid://shopify/Order/4021999730873",
                    "fulfillments": [
                      {
                        "trackingInfo": [
                          {
                            "number": "101002478"
                          }
                        ]
                      }
                    ],
                    "customer": {
                      "firstName": "motaz"
                    },
                    "totalWeight": "5000",
                    "currencyCode": "EGP",
                    "totalPriceSet": {
                      "shopMoney": {
                        "amount": "109.99"
                      }
                    }
                  }
                },
                {
                  "node": {
                    "name": "#1003",
                    "id": "gid://shopify/Order/4022001172665",
                    "fulfillments": [
                      {
                        "trackingInfo": [
                          {
                            "number": "101002471"
                          }
                        ]
                      }
                    ],
                    "customer": {
                      "firstName": "motaz"
                    },
                    "totalWeight": "0",
                    "currencyCode": "EGP",
                    "totalPriceSet": {
                      "shopMoney": {
                        "amount": "275.0"
                      }
                    }
                  }
                }
              ]
            }
          }
    

    return(
        <>
        
           <ResourceList
             resourceName={{singular: 'order', plural: 'orders'}}
             items={data123.orders.edges}
             renderItem={renderItem}
             selectedItems={selectedItems}
             onSelectionChange={setSelectedItems}
             //promotedBulkActions={promotedBulkActions}
             //bulkActions={bulkActions}
             showHeader
             totalItemsCount={50}           
           />
                  
         </>
    )

    function renderItem(item) {
            const id = item.node.id;
            const name = item.node.name;
            
            return (
              <ResourceItem
                id={id}
                name={name}
                
              >
                <Stack>
                  <Stack.Item fill >
                        <Heading> Ordersss </Heading>
                  </Stack.Item>
    
                </Stack>  
    
                <Stack>
                  <Stack.Item fill >
                    <h3>
                      <TextStyle variation="strong">{name}</TextStyle>
                    </h3>
                  </Stack.Item>
    
                  
                </Stack>  
    
              </ResourceItem>
    
            );
    
      }
};

export default orders;