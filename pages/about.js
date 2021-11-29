import {Page, Heading, Form, FormLayout, TextField, Button, Select, Card, Spinner, Layout, Banner} from '@shopify/polaris';
import {useCallback, useState, useReducer, useEffect} from 'react';
import axios from 'axios';
import {useAppBridge} from '@shopify/app-bridge-react';
import {getSessionToken} from '@shopify/app-bridge-utils';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
 }

function Aboutus() {
    
    const app = useAppBridge();
    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);

   
  
    

    useEffect(() => {
      // Runs once, after mounting 
      async function fetchUser() {
        const token = await getSessionToken(app);
        console.log('session token :',token);
       
        ////const id = "mystagstore.myshopify.com";
        const url = `https://murmuring-sierra-22719.herokuapp.com/api/users`;
        const result = await  axios.get(url,{ headers: { Authorization: `Bearer ${token}` }});
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
      const token = await getSessionToken(app);
      event.preventDefault();

      setSubmitting(true);
      // calling API
      //const id = "mystagstore.myshopify.com";
      const url = `https://murmuring-sierra-22719.herokuapp.com/api/users`;
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
                "shop_url" : formData.shop_url
 
            }
      const result = await axios.put(url, payload, { headers: { Authorization: `Bearer ${token}` }});            
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

    const handleChange2 = (value, id) => {
      setFormData({
        name: id,
        value: value,
      });
    }
    
   

    const cities = [
      {
        id: 'SU',
        name: '6th of October',     
      },
      {
        id: 'SHR',
        name: 'Al Sharqia',   
      },
      {
        id: 'ALX',
        name: 'Alexandria',   
      },
      {
        id: 'ASN',
        name: 'Aswan',   
      },
      {
        id: 'AST',
        name: 'Asyut',   
      },
      {
        id: 'BH',
        name: 'Beheira',   
      },
      {
        id: 'BNS',
        name: 'Beni Suef',   
      },
      {
        id: 'C',
        name: 'Cairo',   
      },
      {
        id: 'DK',
        name: 'Dakahlia',   
      },
      {
        id: 'DT',
        name: 'Damietta',   
      },
      {
        id: 'FYM',
        name: 'Faiyum',   
      },
      {
        id: 'GH',
        name: 'Gharbia',   
      },
      {
        id: 'GZ',
        name: 'Giza',   
      },
      {
        id: 'HU',
        name: 'Helwan',   
      },
      {
        id: 'IS',
        name: 'Ismailia',   
      },
      {
        id: 'KFS',
        name: 'Kafr el-Sheikh',   
      },
      {
        id: 'LX',
        name: 'Luxor',   
      },
      {
        id: 'MT',
        name: 'Matrouh',   
      },
      {
        id: 'MN',
        name: 'Minya',   
      },
      {
        id: 'MNF',
        name: 'Monufia',   
      },
      {
        id: 'WAD',
        name: 'New Valley',   
      },
      {
        id: 'SIN',
        name: 'North Sinai',   
      },
      {
        id: 'PTS',
        name: 'Port Said',   
      },
      {
        id: 'KB',
        name: 'Qalyubia',   
      },
      {
        id: 'KN',
        name: 'Qena',   
      },
      {
        id: 'BA',
        name: 'Red Sea',   
      },
      {
        id: 'SHG',
        name: 'Sohag',   
      },
      {
        id: 'JS',
        name: 'South Sinai',   
      },
      {
        id: 'SUZ',
        name: 'Suez',   
      },
     
    ]

    const cityRows = [];
    for (let city of cities) {
      if(city.id === formData.city)
        cityRows.push(<option key={city.id} selected='selected' value={city.id}>{city.name}</option>);
      cityRows.push(<option key={city.id} value={city.id}>{city.name}</option>);
    }

    return (

     
       <Page
        
        title="General Setting"
        divider
        >  
        
       
       
      <Layout.AnnotatedSection
    id="storeDetails"
    title="Setting details"
    description="Please set up your company's data to run our shipping app successfully."
  >
     
      <Form  onSubmit={handleSubmit}>
        <FormLayout>
         
        <TextField 
            id="account_number"
            name="account_number"
            label="Account Number"
            value={formData.account_number || ''}
            onChange={handleChange2}
            autoComplete="off"
          />
           <TextField
            id="user_name"
            name="user_name"
            label="User Name"
            value={formData.user_name || ''}
            onChange={handleChange2}
            autoComplete="off"
          />
           <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formData.password || ''}
            onChange={handleChange2}
            autoComplete="off"
          />

           <TextField
            id="company"
            name="company"
            label="Company"
            value={formData.company || ''}
            onChange={handleChange2}
            autoComplete="off"
          />
         
         <TextField
            id="country"
            name="country"
            label="Country"
            
            value={formData.country || ''}
            onChange={handleChange2}
            autoComplete="off"
          />
          
          <label>
            <p>City</p>
            <select name="city"  onChange={handleChange}>
               
            {cityRows}
                    
            </select>
            
          </label>
          
         


          <TextField
            id="email"
            name="Email"
            label="Email"
            inputMode="email"
            type="email"
            value={formData.email || ''}
            onChange={handleChange2}
            autoComplete="off"
          />
          <TextField
            id="address1"
            name="address1"
            label="Address1"
            value={formData.address1 || ''}
            onChange={handleChange2}
            autoComplete="off"
          />
          <TextField
            id="address2"
            name="address2"
            label="Address2"
            value={formData.address2 || ''}
            onChange={handleChange2}
            autoComplete="off"
          />
         <TextField
            id="mobile"
            name="mobile"
            label="Mobile"
            value={formData.mobile || ''}
            onChange={handleChange2}
            autoComplete="off"
          />
         
         
         
         
           
          <input hidden name="shop_url" onChange={handleChange} value={formData.shop_url || ''}/> 
         
          <TextField
            id="contact"
            name="contact"
            label="Contact"
            value={formData.contact || ''}
            onChange={handleChange2}
            autoComplete="off"
          />
        
        {submitting &&
          <div>  
            <Spinner accessibilityLabel="Spinner example" size="large" />
          </div>
          }
  
          <Button submit>Update</Button>
          
        </FormLayout>
      </Form>
     
      </Layout.AnnotatedSection>
      </Page>
     
    );
  }

export default Aboutus;