import React from 'react';
import {Switch,BrowserRouter as Router,Link,Route} from 'react-router-dom'
import './App.css';
import Header from "./Header";
import {User} from './Class'
import {Button} from 'react-bootstrap'
import $ from "jquery";
import ConnectComponant from '../Connexion/ConnectComponant'
import Inscription from "../Connexion/Inscription";


var url = 'http://localhost:8080';

class App extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {Connection:false,user:null}
  }
  functionchangeuser()
  {
      var objet = this;
      $.ajax(
          {
              url:url+'/recupUser',
              data:{},
              xhrFields:{withCredentials:true},
              method:'GET',
              success:function (data) {
                  alert("connected")
                  objet.setState({Connection:true,user:new User(data.email,data.nom,data.prenom,data.username,data.adress)})
              }
          })
  }

  async componentWillMount()
  {
      this.setState({Connection:false,user:null})
      var objet = this;
      $.ajax(
          {
              url:url+'/isConnected',
              data:{},
              xhrFields:{withCredentials:true},
              method:'GET',
              success:function (data) {
                  if(data.isConnected)
                  {
                      objet.functionchangeuser()
                  }
              }
          })

  }

    render() {
    return(
           <Router>
             <Header Connexion={this.state.Connection} URL={url}/>
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
