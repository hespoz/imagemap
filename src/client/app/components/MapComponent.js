import React from 'react';
import {render} from 'react-dom';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { withGoogleMap,GoogleMap,Marker } from "react-google-maps";

import AppAction from '../actions/AppAction';
import AppStore from '../stores/AppStore';

const mapContainerStyle = {
  maxHeight:"100%",
  height:"100%",
};

const markers = [{
      position: {
        lat: 48.8583905296204,
        lng: 2.2944259643554688,
      },
      key: `Taiwan`,
      defaultAnimation: 2,
}];

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={10}
    defaultCenter={{ lat: 48.8583905296204, lng: 2.2944259643554688 }}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(index)}
      />
    ))}

  </GoogleMap>
));


var MapComponent = React.createClass({

  componentDidMount : function() {

  },

  componentWillUnmount : function() {

  },

  urlParam : function(name){
	  var results = new RegExp('[\?&#]' + name + '=([^&#]*)').exec(window.location.href);
	  if (results==null){
	     return null;
	  }
	  else{
	     return results[1] || 0;
	  }
  },

  render : function() {

   return (

    	<div style={mapContainerStyle}>

			<GettingStartedGoogleMap
			    containerElement={
			      <div style={{ height: `100%` }} />
			    }
			    mapElement={
			      <div style={{ height: `100%` }} />
			    }
			    onMapLoad={this.props.onMapLoad}
			    onMapClick={this.props.onMapClick}
			    onMarkerRightClick={this.props.onMarkerRightClick}
			    markers={markers}
			/>

    	</div>




    );
  }

});

export default MapComponent;