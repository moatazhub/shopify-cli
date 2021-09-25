import {Page, Heading, Form, FormLayout, TextField, Button} from '@shopify/polaris';
import {useCallback, useState} from 'react';

function Aboutus() {
    
    const [email, setEmail] = useState(''); 
    const handleSubmit = useCallback((_event) =>{
      alert(_event.target.value);
      setEmail('');
    }, []);
  
    const handleEmailChange = useCallback((value) =>{
        setEmail(value);
        console.log(value);
    } , []);
  
    return (
       <Page
        breadcrumbs={[{content: 'Settings', url: '/apps/egypt-express-app/dashboard'}]}
        title="General"
        divider
        >  
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <TextField
            value={email}
            onChange={handleEmailChange}
            label="Email"
            type="email"  
          />
  
          <Button submit>Submit</Button>
        </FormLayout>
      </Form>
      </Page>
    );
  }

export default Aboutus;