import React from 'react';
import {Switch,BrowserRouter as Router,Link,Route} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import './App.css';
import Header from "./Header";
import {Button} from 'react-bootstrap'
import $ from "jquery";
import UserProfil from "../userPages/userProfil";
import ItemForm from "../ItemsForms/itemForm";
import ConnectComponant from '../Connexion/ConnectComponant'
import Inscription from "../Connexion/Inscription";
import Axios from "axios";
import AdminPages from "../AdminComponants/AdminPages";


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
        this.setState({Waiting:false})
    }

    state = {Waiting:true,Connection:false,user:null}

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
              user: data.data
          })
      }
  }


  render() {
        if(this.state.Waiting)
        {
            return <p>Loading</p>
        }
        return(<Router>
             <Header disconnectFunction={this.disconnect.bind(this)} user={this.state.user} Connexion={this.state.Connection} URL={url}/>
                <Switch>
                    <Route path='/' exact>
                    </Route>
                    <Route path="/Connect" exact>
                            <ConnectComponant URL={url} function={this.functionchangeuser.bind(this)}></ConnectComponant>
                    </Route>
                    <Route path="/LogUp" exact>
                        <Inscription function={this.functionchangeuser.bind(this)} URL={url}/>
                    </Route>
                    <Route path="/userProfile" exact>
                        {this.state.Connection ? <UserProfil URL={url} changeUser={this.functionchangeuser.bind(this)} user={this.state.user} /> : <Redirect to="/"/> }
                    </Route>
                    <Route path="/AdminPart" exact>
                        <AdminPages URL={url}  />
                    </Route>
                    <Route path="/addItems" exact>
                        {this.state.Connection ? <ItemForm URL={url} user={this.state.user} /> : <Redirect to="/"/> }
                    </Route>
                </Switch>
           </Router>
    )}
}

export default App;
