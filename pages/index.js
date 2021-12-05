import {Page, TextContainer, Image,Heading, Form, FormLayout, TextField, Button, Select, Card, Spinner, Layout, Banner} from '@shopify/polaris';


 
const Index = () =>(
  
  <Page   
         title="Egypt Express App"
         divider
         >  
          
        <Layout.AnnotatedSection
        id="storeDetails"
        title="Egypt Express licensee of Federal Express Corporation"
        
        >
       
        
        <Card title="Welcome to our free Egypt Express Shipping App" sectioned>
       
          <p> This app help you manage your shipment products in the real-time shipping rates and tracking the order till it safely reaches to your customers.</p>
        </Card>

       
       
        </Layout.AnnotatedSection>
        </Page>
);
 
export default Index;