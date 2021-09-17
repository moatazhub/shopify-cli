import { Card, Layout, Page } from "@shopify/polaris";
import React from "react";

class Dashboard extends React.Component {
    componentDidMount() {
        fetch('/addCarrier')
        .then((res) => res.json())
        .then((items) => console.log(items))
        .catch(error => { console.error(error)});

        // fetch('/getCarrier')
        // .then((res) => res.json())
        // .then((items) => console.log(items))
        // .catch(error => { console.error(error)});

       // fetch('/getMetaById')
        //.then((res) => console.log(res));
       // .catch(error => { console.error(error)});

       

      
    }

    render() {
        return(
            
                           <div>
                               <p>List of Products here</p>
                           </div>
                       
        );
    }
}

export default Dashboard;