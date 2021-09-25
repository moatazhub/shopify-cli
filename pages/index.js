import { Page } from "@shopify/polaris";

import ProductList from "../components/orderList";

class Index extends React.Component{
 
  render(){
    return(
      <Page   
      >
       
        <ProductList></ProductList>
      </Page>
  

    )
  }

 
  

}
    
 


export default Index;
