import React from 'react';
import {Switch,BrowserRouter as Router,Link,Route} from 'react-router-dom'
import './App.css';
import Header from "./Header";
import {User} from './Class'
import {Button} from 'react-bootstrap'
import $ from "jquery";
import ConnectComponant from '../Connexion/ConnectComponant'
import Inscription from "../Connexion/Inscription";
import Axios from "axios";


var url = 'http://localhost:8080';

class App extends React.Component
{
  constructor(props) {
    super(props);
    }

    state = {Connection:false,user:null}


  disconnect()
  {
      this.setState({Connection:false,user:null})
  }

  functionchangeuser()
  {
      alert ('called')
      Axios.get(url+'/recupUser',{withCredentials:true})
          .then((data)=>{
              if(data.data != null) {
              this.setState({
                  Connection: true,
                  user: new User(data.data.email, data.data.nom, data.data.prenom, data.data.username, data.data.adress)
              })
              }
              else
              {
                  alert("not connected")
              }})
          .catch(()=>{alert('error')})
  }


    render() {
    return(
           <Router>
             <Header disconnectFunction={this.disconnect.bind(this)} Connexion={this.state.Connection} URL={url}/>
                <Switch>
                    <Route path='/' exact>
                    </Route>
                    <Route path="/Connect" exact>
                            <ConnectComponant URL={url} function={this.functionchangeuser.bind(this)}></ConnectComponant>
                    </Route>
                    <Route path="/LogUp" exact>
                        <Inscription URL={url}/>
                    </Route>
                </Switch>
           </Router>
    )}
}

export default App;
