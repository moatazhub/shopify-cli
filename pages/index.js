import { Page } from "@shopify/polaris";
import { ResourcePicker} from "@shopify/app-bridge-react";
import ProductList from "../components/orderList";

class Index extends React.Component{
  state = {open: false}
  render(){
    return(
      <Page
        title='Product selecto'
        primaryAction={{
          content:'Select products',
          onAction: ()=> this.setState({open: true})
        }}
      >
        <ResourcePicker
          resourceType='Product'
          open={this.state.open}
          onCancel= {()=> this.setState({open: false})}
          onSelection= { (resources)=> this.handleSelection(resources)}
        />
        <ProductList></ProductList>
      </Page>
  

    )
  }

  handleSelection = (resources)=> {
    const idFromResources = resources.selection.map((product)=> product.id);
    this.setState({open: false});
    console.log(idFromResources);
  }

}
    
 


export default Index;
