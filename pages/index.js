import {Page, TextContainer, Image, MediaCard, Heading, Form, FormLayout, TextField, Button, Select, Card, Spinner, Layout, Banner} from '@shopify/polaris';


 
const Index = () =>(

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
         title="Egypt Express App"
         divider
         >  
          
        <Layout.AnnotatedSection
        id="storeDetails"
        title="Welcome to our free Shipping App"
        
        >
       
       
       
        <Card sectioned>
       
        <Heading>Egypt Express Shipping App enables the admin to add Egypt Express shipment service to the products..</Heading>
        </Card>

        <MediaCard
        title="Egypt Express Free Shipping App"
        
        description="This app help you manage your shipment products in the real-time shipping rates and tracking the order till it safely reaches to your customers."
        
      >
        <img
          alt=""
          width="100%"
          height="100%"
          
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          src="https://i.ibb.co/nBzz0QD/grid.jpg"
        />
</MediaCard>

       
        </Layout.AnnotatedSection>
        
        </Page>

        </>
);
 
export default Index;