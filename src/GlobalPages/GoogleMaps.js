import Slider from '@material-ui/core/Slider';
import {Col, Form, FormControl, Image, Modal, Row, Spinner} from "react-bootstrap";
import React from "react";
import {Map, InfoWindow, Marker,Circle, GoogleApiWrapper} from 'google-maps-react';
import Axios from "axios";
import LocationSearchInput from "../Connexion/LocationSearchInput";



class GoogleMaps extends React.Component
{
    imagePath = null;
    constructor(props) {
        super(props);
        this.state = {object:null,Loading:true,latitude:0,longitude:0,categorie:null,LoadingMap:true,radius:600,categorieList:null,subCategorie:null,subCatList:null,listOfObject:null,objet:null}
        this.recupCoord()
    }
    async recupCoord()
    {

        var data = await Axios.get(this.props.URL+"/getCoord",{withCredentials:true})
        this.setState({latitude:data.data.latitude,longitude:data.data.longitude,connected:this.props.connected})
        this.setState({Loading:false})
        this.getCategorie()
        this.setState({LoadingMap:false})
    }

    async callNewList()
    {
        if(this.state.subCategorie == "")
        {
            this.setState({listOfObject:[]})
            return ;
        }
        this.setState({LoadingMap:true})
        var List =await Axios.post(this.props.URL + "/getListObjectFromCordinate",{radius:this.state.radius,lat:this.state.latitude,
            lon:this.state.longitude,cat:this.state.categorie,subCat:this.state.subCategorie},{withCredentials:true})
        this.setState({listOfObject:List.data?.data,LoadingMap:false})
    }

    async getCategorie()
    {
        var data = await Axios.get(this.props.URL + '/recupAllCategorie',{withCredentials:true});
        if(data.data?.tabOfCat?.length > 0)
        {
            this.setState({categorieList : data.data?.tabOfCat,categorie:data.data?.tabOfCat[0]})
            this.getSubCategorie(data.data?.tabOfCat[0])
        }
    }
    async getSubCategorie(nameSup)
    {
        await this.setState({categorie:nameSup});
        var data = await Axios.post(this.props.URL + '/recupAllSubCatFromSup',{nameSupCat: this.state.categorie},{withCredentials:true});
        if(data.data?.tabOfSubCat?.length > 0)
        {
            // eslint-disable-next-line no-unused-expressions
            data.data?.tabOfSubCat.unshift("")
            this.setState({subCatList : data.data?.tabOfSubCat,subCategorie:data.data?.tabOfSubCat[0]})
        }

    }
    async getObject()
    {
        var Marker = await Axios.post(this.props.URL+"/getObjectFromCoordinate",{latitude:this.state.latitude,longitude:this.state.longitude},{withCredentials:true})
    }

    render()
    {
        if(this.state.connected)
        {
            this.imagePath = this.props.user?.flagImage ? this.props.URL + this.props.user?.imagePath : this.props.user?.urlImagePath;
        }
        return this.state.Loading ? <Spinner animation="grow" variant="success" /> :
            <><Row> <Col md={3} style={{backgroundColor:"black",height:"90vh",marginLeft:"2vw"}}>
                <h1 style={{color:"white"}}>SlideRange :</h1>
                <Slider
                    defaultValue={600}
                    aria-labelledby="discrete-slider-small-steps"
                    step={100}
                    onChange={(e,value)=>{this.setState({radius:value});}}
                    onChangeCommitted={(e,value)=>{this.callNewList()}}
                    min={0}
                    max={10000}
                    valueLabelDisplay="auto"
                />
                <Form.Label style={{color:"white"}}>Category</Form.Label>
                <Form.Control as="select" onChange={(e)=>{this.setState({categorie:e.target.value});this.getSubCategorie(e.target.value)}}  defaultValue="i.e: Computer">
                    {this.state.categorieList?.map(value=>{return <option>{value}</option>})}
                </Form.Control>
                <Form.Label style={{color:"white"}}>Sub-Category</Form.Label>
                <Form.Control as="select" onChange={(e)=>{this.setState({subCategorie:e.target.value});setTimeout(()=>{this.callNewList()},100)}}  defaultValue="i.e: Computer">
                    {this.state.subCatList?.map(value=>{return <option>{value}</option>})}
                </Form.Control>
                <div style={{color:"white"}}>
                    {this.state.object && <> <Form.Label>item</Form.Label>
                        <Form.Control
                        required
                        disabled={true}
                        type="text"
                        defaultValue={this.state.object?.name}
                        />
                        <Form.Label>Picture of the Item</Form.Label>
                        <Image style={{height:"171px",width:"180px"}} src={this.props.URL + '/image/ItemsImage/' + this.state.object?.imagePath } />
                        <Form.Label>Address</Form.Label>
                        <FormControl disabled={true} value={this.state.object?.address}></FormControl></>}
                </div>
            </Col>
                <Col>
                    { this.state.LoadingMap ? <Spinner animation="border" variant="primary" />: <Map google={this.props.google}
                        initialCenter={{
                        lat: this.state.latitude,
                        lng: this.state.longitude
                        }}
                        style={{width:"98vw",height:"90vh"}}
                    >
                        {this.state.listOfObject?.map((value)=>{
                            var coo = {
                                lat: value.lat,
                                lng: value.lon
                            }
                            return <Marker
                                onClick={()=>{this.setState({object:value.objet})}}
                                title={value.objet.name}
                                position={coo}
                                />
                        })}
                        <Marker
                            title="You"
                            icon={this.state.connected ? {url:this.imagePath,scaledSize: new this.props.google.maps.Size(128,128)}:{}}
                            position={{
                                lat: this.state.latitude +0.0001,
                                lng: this.state.longitude+0.0001
                            }}>
                        </Marker>
                        <Circle
                        onCha
                        radius={this.state.radius}
                        center={
                            {lat: this.state.latitude,
                            lng: this.state.longitude}}
                        strokeColor='transparent'
                        strokeOpacity={0}
                        strokeWeight={5}
                        fillColor='#FF0000'
                        fillOpacity={0.2}/>
                    </Map>}
           </Col>
            </Row>
            </>
    }

}



export default GoogleApiWrapper({
    apiKey: ('AIzaSyAK3voBTqcjwJcxgE16blYzeYFGmNuXLk8')
})(GoogleMaps)