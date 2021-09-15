import gql from 'graphql-tag';
import {useQuery} from 'react-apollo';
import {Card, ResourceList, ResourceItem, Stack, TextStyle, Thumbnail, Avatar} from '@shopify/polaris';

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
    if(loading) return <div>loading..</div>
    if(error) return <div>{error.message}</div>

    console.log('this is data',data)


    return(
      <Card>
      <ResourceList
        resourceName={{singular: 'customer', plural: 'customers'}}
        items={[
          {
            id: 100,
            url: 'customers/341',
            name: 'Mae Jemison',
            location: 'Decatur, USA',
          },
          {
            id: 200,
            url: 'customers/256',
            name: 'Ellen Ochoa',
            location: 'Los Angeles, USA',
          },
        ]}
        renderItem={(item) => {
          const {id, url, name, location} = item;
          const media = <Avatar customer size="medium" name={name} />;
    
          return (
            <ResourceItem
              id={id}
              url={url}
              media={media}
              accessibilityLabel={`View details for ${name}`}
            >
              <h3>
                <TextStyle variation="strong">{name}</TextStyle>
              </h3>
              <div>{location}</div>
            </ResourceItem>
          );
        }}
      />
    </Card>
    )
}

export default ProductList;