import React from 'react';
import {Switch,BrowserRouter as Router,Link,Route} from 'react-router-dom'
import './App.css';
import Header from "./Header";
import {User} from './Classes'
import {Button} from 'react-bootstrap'
import $ from "jquery";
import ConnectComponant from '../Connexion/InscriptionComponant'
import Inscription from "../Connexion/Inscription";
import LocationSearchInput from "../Connexion/localisationInput"

var url = 'http://localhost:8080';

class App extends React.Component<any, {user: User | null,Connection:boolean}>
{
  constructor(props:any) {
    super(props);
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
                  alert(data.isConnected)
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
                    <Route path='/test' exact>
                    </Route>
                    <Route path="/Connect" exact>
                            <ConnectComponant URL={url} function={this.functionchangeuser.bind(this)}></ConnectComponant>
                    </Route>
                    <Route path="/t" exact>
                           <LocationSearchInput changeAdress={(adress:any)=>{}}/>
                    </Route>
                    <Route path="/LogUp" exact>
                        <Inscription URL={url}/>
                    </Route>
                </Switch>
           </Router>
    )}
}

export default App;
