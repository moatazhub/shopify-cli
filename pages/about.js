import {Page, Heading, Form, FormLayout, TextField, Button} from '@shopify/polaris';
import {useCallback, useState, useReducer, useEffect} from 'react';
import axios from 'axios';


const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
 }

function Aboutus() {
    
    
    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
      // Runs once, after mounting 
      async function fetchUser() {
        const shop_url = "mystagstore.myshopify.com";
        const url = `https://95fd1458dd39.ngrok.io/api/users/${shop_url}`;
              const result = await  axios.get(url);
              console.log(result.data);
             
              // var user = result.data.filter(function (obj) { 
              //     return obj.shop_url === shop_url; 
              // })[0];
               
              Object.entries(result.data).map(([name, value]) => (
                setFormData({
                  name : name,
                  value : value    
                })
              ));
              
            }
      fetchUser();
       
    }, []);

    
    
    const handleSubmit = async event => {
      event.preventDefault();
      setSubmitting(true);
      // calling API
      const shop_url = "mystagstore.myshopify.com";
      const url = `https://95fd1458dd39.ngrok.io/api/users/${shop_url}`;
      const payload = {
                "account_number" : formData.account_number ,
                "user_name" : formData.user_name,
                "password" : formData.password,
                "company" : formData.company,
                "country" : formData.country,
                "city" : formData.city,
                "email" : formData.email,
                "address1" : formData.address1,
                "address2" : formData.address2,
                "contact" : formData.contact,
                "mobile" : formData.mobile,
               // "shop_url" : formData.shop_url
 
            }
      const result = await  axios.put(url, payload);            
      console.log(result.data);

      setTimeout(() => {
        setSubmitting(false);
      }, 4000);
    }
  
    const handleChange = event => {
      setFormData({
        name: event.target.name,
        value: event.target.value,
      });
    }
  
    return (
       <Page
        breadcrumbs={[{content: 'Settings', url: '/apps/egypt-express-app/dashboard'}]}
        title="Generals"
        divider
        >  
        {submitting &&
       <div>
         You are submitting the following:
         <ul>
           {Object.entries(formData).map(([name, value]) => (
             <li key={name}><strong>{name}</strong>:{value.toString()}</li>
           ))}
         </ul>
       </div>
      }
      <Form onSubmit={handleSubmit}>
        <FormLayout>
         
        <fieldset>
          <label>
            <p>Account Number</p>
            <input name="account_number" onChange={handleChange} value={formData.account_number || ''}/>
          </label>
          <label>
            <p>Account Name</p>
            <input name="user_name" onChange={handleChange} value={formData.user_name || ''}/>
          </label>
          <label>
            <p>Password</p>
            <input name="password" onChange={handleChange} value={formData.password || ''}/>
          </label>
          <label>
            <p>Company</p>
            <input name="company" onChange={handleChange} value={formData.company || ''}/>
          </label>
          <label>
            <p>Country</p>
            <input name="country" onChange={handleChange} value={formData.country || ''}/>
          </label>
          <label>
            <p>City</p>
            <input name="city" onChange={handleChange} value={formData.city || ''}/>
          </label>
          <label>
            <p>Email</p>
            <input name="email" onChange={handleChange} value={formData.email || ''}/>
          </label>
          <label>
            <p>Address1</p>
            <input name="address1" onChange={handleChange} value={formData.address1 || ''}/>
          </label>
          <label>
            <p>Address2</p>
            <input name="address2" onChange={handleChange} value={formData.address2 || ''}/>
          </label>
          <label>
            <p>Contact</p>
            <input name="contact" onChange={handleChange} value={formData.contact || ''}/>
          </label>
          <label>
            <p>Mobile</p>
            <input name="mobile" onChange={handleChange} value={formData.mobile || ''}/>
          </label>
          
           
            <input hidden name="shop_url" onChange={handleChange} value={formData.shop_url || ''}/>
         

        </fieldset>

  
          <Button submit>Submit</Button>
        </FormLayout>
      </Form>
      </Page>
    );
  }

export default Aboutus;