import React from 'react';
import {render} from 'react-dom';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import Alert from 'react-bootstrap/lib/Alert';
import { withGoogleMap,GoogleMap,Marker } from "react-google-maps";
import AppStore from '../stores/AppStore';
import AppAction from '../actions/AppAction';

const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

const listContainerStyle = {
  maxHeight:"90%",
  height:"90%",
  overflowY: "auto"
};

function getAppStoreState() {
  return {
    pictures: AppStore.getPictures()
  };
}
var PicturesComponent = React.createClass({

  getInitialState: function() {
	   return {pictures: []}
  },

  componentDidMount : function() {
    AppStore.addChangeListener(this.onChange.bind(this));
  },

  componentWillUnmount : function() {
    AppStore.removeChangeListener(this.onChange.bind(this));
  },

  onChange : function() {
    this.setState(getAppStoreState());
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

  like : function(event) {
  	AppAction.likePicture(event.target.id,this.props.authToken);
  },

  dislike : function(event) {
  	console.log(event);
  	AppAction.dislikePicture(event.target.id,this.props.authToken);
  },

  render : function() {
  	var that=this;

	if (this.state.pictures.length==0) {
		return (
      <Alert bsStyle="warning">
        <strong><h5>Pick a location from the map please!</h5></strong>
      </Alert>
  );
	}


   return (



    	<Grid style={listContainerStyle}>
        <Row>

				{this.state.pictures.map(function(row, i) {
			        return (
			        	<div>
                <Row>
                    <Col xs={6} md={4}>

                  <Thumbnail src={row.images.standard_resolution.url} alt="142x100">
                    <h3>Thumbnail label</h3>
                      { row.user_has_liked == false ? 
                      <Button id={row.id} bsStyle="large" bsSize="large" block onClick={that.like}>Like</Button>
                    
                    : 
                      <Button id={row.id} bsStyle="large" bsSize="large" block onClick={that.dislike}>Dislike</Button>

                     }
                  </Thumbnail>
                  </Col>
                </Row>
    

			    		</div>
    				)
                })}

    				
       </Row>
    	</Grid>
    );
  }

});


export default PicturesComponent;