import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// If you want to use the provided css
import 'react-google-places-autocomplete/dist/index.min.css';
// @ts-ignore
import Script from 'react-load-script'

class LocationSearchInput extends React.Component<{changeAdress:any},any> {
    constructor(props:any) {
        super(props);
        this.state = { address: '',ready:0 };
    }


    render() {
        return (<React.Fragment>
            <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAK3voBTqcjwJcxgE16blYzeYFGmNuXLk8&libraries=places"  onS  onError={()=>{alert('error')}} onLoad={()=>{this.setState({ready:1})}} />
            {this.state.ready == 0 ? "" :     <GooglePlacesAutocomplete
                onSelect={console.log}
            />}
        </React.Fragment>
        );
    }

}

export default LocationSearchInput;