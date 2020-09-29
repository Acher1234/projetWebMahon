import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// If you want to use the provided css
import 'react-google-places-autocomplete/dist/index.min.css';
// @ts-ignore
import Script from 'react-load-script'

class LocationSearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { address: '',ready:0,style:{border:'solid 0.1px black'}};
    }



    render() {
        return (<React.Fragment>
            <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAK3voBTqcjwJcxgE16blYzeYFGmNuXLk8&libraries=places"    onError={()=>{alert('error')}} onLoad={()=>{this.setState({ready:1})}} />
            {this.state.ready == 0 ? "" :     <GooglePlacesAutocomplete
                onSelect={(description)=>{this.setState({style:{border:'solid 0.3px green'},address:description.description,ready:1});this.props.function(description.description,1)}}
                inputStyle = {this.state.style}
            />}
        </React.Fragment>
        );
    }

}

export default LocationSearchInput;