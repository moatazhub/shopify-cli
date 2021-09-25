import { Page } from "@shopify/polaris";
import { ResourcePicker} from "@shopify/app-bridge-react";
import ProductList from "../components/orderList";

class Index extends React.Component{
  state = {open: false}
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
