import Slider from '@material-ui/core/Slider';
import {Col,Row} from "react-bootstrap";
import React from "react";
import {Map, InfoWindow, Marker,Circle, GoogleApiWrapper} from 'google-maps-react';
import Axios from "axios";



class GoogleMaps extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {Loading:true,latitude:0,longitude:0,categorie:null,radius:600}
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
            <><Row> <Col md={3} style={{backgroundColor:"black",height:"90vh"}}>
                <h1 style={{color:"white"}}>SlideRange :</h1>
                <Slider
                    defaultValue={600}
                    aria-labelledby="discrete-slider-small-steps"
                    step={100}
                    onChange={(e,value)=>{this.setState({radius:value})}}
                    min={0}
                    max={10000}
                    valueLabelDisplay="auto"
                />
                <div>ObjectChose</div>
            </Col>
                <Col>
                    <Map google={this.props.google}
                        initialCenter={{
                        lat: this.state.latitude,
                        lng: this.state.longitude
                        }}
                        style={{width:"98vw",height:"90vh"}}
                    >


                        <Circle
                        radius={this.state.radius}
                        center={
                            {lat: this.state.latitude,
                            lng: this.state.longitude}}
                        strokeColor='transparent'
                        strokeOpacity={0}
                        strokeWeight={5}
                        fillColor='#FF0000'
                        fillOpacity={0.2}/>
                    </Map>
           </Col>
            </Row>
            </>
    }

}



export default GoogleApiWrapper({
    apiKey: ('AIzaSyAK3voBTqcjwJcxgE16blYzeYFGmNuXLk8')
})(GoogleMaps)