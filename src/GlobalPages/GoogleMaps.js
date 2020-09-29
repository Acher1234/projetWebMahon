import React from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Axios from "axios";


class GoogleMaps extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {Loading:true,latitude:0,longitude:0,categorie:null}
        //this.recupCategorie();
        this.recupCoord()
    }

    async recupCoord()
    {
        var data = await Axios.get(this.props.URL+"/getCoord",{withCredentials:true})
        this.setState({latitude:data.data.latitude,longitude:data.data.longitude})
        this.setState({Loading:false})
       // this.getObject()
    }

    async getObject()
    {
        var Marker = await Axios.post(this.props.URL+"/getObjectFromCoordinate",{latitude:this.state.latitude,longitude:this.state.longitude},{withCredentials:true})


    }

    render()
    {
        return this.state.Loading ? <p>...Load</p> :
            <Map google={this.props.google}
            initialCenter={{
            lat: this.state.latitude,
            lng: this.state.longitude
        }}
        style={{width:"100vw",height:"100vh"}}
        >
        <Marker>

        </Marker>
        </Map>
    }

}



export default GoogleApiWrapper({
    apiKey: ('AIzaSyAK3voBTqcjwJcxgE16blYzeYFGmNuXLk8')
})(GoogleMaps)