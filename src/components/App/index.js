import React, { Component } from "react";

import Datos from "../Datos";
import Cuenta from "../Cuenta";
import TronLinkGuide from "../TronLinkGuide";

const contractAddress = "TDMasfwqvW8pKKJcszhkqBTrbwXMrDThCr";
const API_KWH = "https://chatbotchecserver.com/botVideoFac/valueKWH";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tronWeb: {
        installed: false,
        loggedIn: false
      }
    };
  }

  async componentDidMount() {
    
    setInterval(async() => {
      await this.conectar();
    }, 7*1000);
      
  }

  async conectar(){

    if (typeof window.tronLink !== 'undefined' && typeof window.tronWeb !== 'undefined' ) { 

      var tronWeb = this.state.tronWeb;

      tronWeb['installed'] = true;
      tronWeb['web3'] = window.tronWeb;
      const contrato = await window.tronWeb.contract().at(contractAddress);

      this.setState({
        contrato: contrato,
        tronWeb: tronWeb
    
      });

      window.tronLink.request({method: 'tron_requestAccounts'})
        .then(()=>{

          tronWeb['installed'] = true;
          tronWeb['loggedIn'] = true;

         window.tronWeb.trx.getAccount()
         .then((account)=>{

          this.setState({

            accountAddress: window.tronWeb.address.fromHex(account.address)
        
          });

         })
        
          this.setState({

            tronWeb: tronWeb
        
          });
        })
        .catch(()=>{

          tronWeb['installed'] = false;
          tronWeb['loggedIn'] = false;

          this.setState({

            tronWeb: tronWeb
        
          });

        })
    }
  }

  render() {
    if (!this.state.tronWeb.installed) return <><TronLinkGuide /></>;

    if (!this.state.tronWeb.loggedIn) return <><Datos /><TronLinkGuide installed /></>;

    return (
      <div>
        <Datos />
        
        <Cuenta /> 
          
      </div>
      
    );

  }
}
export default App;