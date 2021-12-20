import {Page, Heading, Form, FormLayout, TextField, Button, Select, Card, Spinner, Layout, Banner} from '@shopify/polaris';

function About() {

    return (
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
         title="About us"
         divider
         >  
          
        <Layout.AnnotatedSection
        id="storeDetails"
        title="Egypt Express licensee of Federal Express Corporation"
        description="This app help you manage your shipment products."
        >
       
        <Card title="Egypt Express (EE)" sectioned>
            <p>Welcome to our Egypt Express Shipping App.
          Egypt Express (EE) is a joint stock company registered in Egypt and has been the licensee of Federal Express Corporation since 1998. Its  headquarter is in Cairo and it employs more than 700 employees.
          </p>
        </Card>
        <Card title="Egypt Express shipping App" sectioned>
          <p> The store owner can integrate Egypt Express shipping in an existing shopify store and offer a delivery method to the customers.</p>
        </Card>
        </Layout.AnnotatedSection>
        </Page>
        </>
    );
}

export default About;