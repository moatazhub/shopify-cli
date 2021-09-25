import gql from 'graphql-tag';
import {useQuery} from 'react-apollo';
import {Card, ResourceList, ResourceItem, Stack,  TextStyle} from '@shopify/polaris';
import { useState } from 'react';

const GET_ORDERS = gql`
query{
	orders(first: 3) { 
    edges{
      node{
        name
        id
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

function ProductList(){

    const {loading, error, data} = useQuery(GET_ORDERS)
    if(loading) return <div>loading.</div>
    if(error) return <div>{error.message}</div>
   // console.log('this is data',data.orders.edges)
   // console.log('this is data',data.orders.edges[0].node.name)

   // const [selectedItems, setSelectedItems] = useState([]);

    return(
     
     
      
      
      <Card>
      <ResourceList
        resourceName={{singular: 'order', plural: 'orders'}}
        items={data.orders.edges}
        renderItem={(item) => {
          const id = item.node.id;
          const name = item.node.name;
          const customer = item.node.customer.firstName;
          const price = item.node.totalPriceSet.shopMoney.amount;

         
          return (
            <ResourceItem
              id={id}
              name={name}
              customer={customer}
              price={price}
              accessibilityLabel={`View details for ${name}`}
            >
              <Stack>
                <Stack.Item fill>
                  <h3>
                    <TextStyle variation="strong">{name}</TextStyle>
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
              </Stack>  

            </ResourceItem>

          );
        }
        
      }
       
        
      />
    </Card>
   
    )
}

export default ProductList;