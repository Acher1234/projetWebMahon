import React from 'react';
import {Switch,BrowserRouter as Router,Link,Route} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import './App.css';
import Header from "./Header";
import {User} from './Class'
import {Button} from 'react-bootstrap'
import $ from "jquery";
import UserProfil from "../userPages/userProfil";
import ConnectComponant from '../Connexion/ConnectComponant'
import Inscription from "../Connexion/Inscription";
import Axios from "axios";


var url = 'http://localhost:8080';

class App extends React.Component
{
      constructor(props)
      {
            super(props);
      }

    async componentDidMount()
    {
        if(!this.state.Connection)
        {
             await this.testConection()
        }
        this.setState({Waiting:true})
    }

    state = {Waiting:false,Connection:false,user:null}

    async testConection()
    {
        var data = await Axios.get(url+"/isConnected",{withCredentials:true})
        if(data.data.isConnected)
        {
            await this.functionchangeuser()
        }
    }

    disconnect()
    {
          this.setState({Connection:false,user:null})
    }

  async functionchangeuser() {
      var data = await Axios.get(url + '/recupUser', {withCredentials: true})
      if (data.data != null) {
          this.setState({
              Connection: true,
              user: new User(data.data.email, data.data.nom, data.data.prenom, data.data.username, data.data.adress)
          })
      }
  }

  render() {
        if(!this.state.Waiting)
        {
            return <p>Loading</p>
        }
        return(<Router>
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
                    <Route path="/userProfile" exact>
                        {this.state.Connection ? <UserProfil URL={url} user={this.state.user} /> : <Redirect to="/userProfile"/> }
                    </Route>
                </Switch>
           </Router>
    )}
}

export default App;
