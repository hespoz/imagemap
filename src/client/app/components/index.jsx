import React from 'react';
import {render} from 'react-dom';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import {PageHeader} from 'react-bootstrap';
import { withGoogleMap,GoogleMap,Marker } from "react-google-maps";
import MapComponent from '../components/MapComponent';
import PicturesComponent from '../components/PicturesComponent';
import AppAction from '../actions/AppAction';
import AppStore from '../stores/AppStore';

const mapContainerStyle = {
  maxHeight:"90%",
  height:"90%"
};

var access_token = null;
var Index = React.createClass({

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

  onMapLoad : function(){
  	console.log("onMapLoad");
  },

  onChange : function() {
  },

  onMapClick : function(event){
  	AppAction.getPictures(event.latLng, this.urlParam('access_token'));
  },

  onMarkerRightClick:function(event){
  	console.log(event.latLng.lat());
  	console.log(event.latLng.lng());
  },

  render : function() {
    var url = encodeURIComponent(window.location.href);
    var instUrl = "https://api.instagram.com/oauth/authorize/?client_id=41e0929ccea341c28b43377fcf632e72&redirect_uri=" + url + "&response_type=token&scope=public_content";
    access_token = this.urlParam('access_token');
    if(access_token == null){
      return (<div>You need to be logged <a href={instUrl}>Log In</a></div>);	
    }

   return (

    	<Grid>
    		<Row>	
    			<Col md={8} style={mapContainerStyle}>
    				<MapComponent 
    					onMarkerRightClick={this.onMarkerRightClick} 
    					onMapClick={this.onMapClick}
    					onMapLoad={this.onMapLoad}
    				/>
    			</Col>
    			<Col md={4}>
            <PicturesComponent authToken={access_token}/>
    			</Col>
    		</Row>
			

    	</Grid>




    );
  }

});

render(<PageHeader>Images by location <small>API</small></PageHeader>, document.getElementById('menu'));

render(<Index/>, document.getElementById('app'));