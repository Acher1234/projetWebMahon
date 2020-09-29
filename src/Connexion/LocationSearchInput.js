import React from 'react';
import PlacesAutocomplete from "react-places-autocomplete"
import Script from 'react-load-script'
import {Form} from "react-bootstrap";

class LocationSearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { address: '',ready:0,style:{border:'solid 0.1px black'}};
    }

    handleChange = address => {
        this.props.function(address,0)
        this.setState({address:address,style:{border:'solid 0.1px red'}})
    };

    handleSelect = address => {
        this.props.function(address,1)
        this.setState({address:address,style:{border:'solid 0.1px green'}})
    };


    render() {
        return (<React.Fragment>
            <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAK3voBTqcjwJcxgE16blYzeYFGmNuXLk8&libraries=places"    onError={()=>{alert('error')}} onLoad={()=>{this.setState({ready:1})}} />
            {this.state.ready && <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <Form.Control
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input',
                                    style: {...this.state.style, ...this.props.style}
                                })}
                            />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>}
        </React.Fragment>
        );
    }

}

export default LocationSearchInput;