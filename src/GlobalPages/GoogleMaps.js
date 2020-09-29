import React from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Axios from "axios";


class GoogleMaps extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {Loading:false,latitude:0,longitude:0}
        this.recupCoord()
    }

    async recupCoord()
    {
        var data = await Axios.get(this.props.URL+"/getCoord",{withCredentials:true})
        this.setState({})
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
        Zoom={15}
        >

        </Map>
    }

}



export default GoogleApiWrapper({
    apiKey: ('AIzaSyAK3voBTqcjwJcxgE16blYzeYFGmNuXLk8')
})(GoogleMaps)