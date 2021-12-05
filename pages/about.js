import {Page, Heading, Form, FormLayout, TextField, Button, Select, Card, Spinner, Layout, Banner} from '@shopify/polaris';

function About() {

    return (
  
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
        <Card title="Online store dashboard" sectioned>
          <p> This app help you manage your shipment products in the real-time shipping rates and tracking the order till it safely reaches to your customers.</p>
        </Card>
        </Layout.AnnotatedSection>
        </Page>
    );
}

export default About;