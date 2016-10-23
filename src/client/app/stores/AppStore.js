import AppDispatcher from '../dispatchers/AppDispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import $ from "jquery";

var CHANGE_EVENT = 'change';

var _Pictures = [];

var AppStore = assign({}, EventEmitter.prototype, {
  
  getPictures: function() {
    return _Pictures;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  updatePictures : function(mediaId,status){
    for (var i=0;i<_Pictures.length;i++) {
      if(_Pictures[i].id==mediaId){
        _Pictures[i].user_has_liked=status;
      }
    }
  },

  likeAPI : function(restOp,mediaId,authToken,status){
    $.ajax({
        method: restOp,
        url: "/like/" + mediaId + "/" + authToken,
        dataType: "json",
        jsonp: "callback",
        jsonpCallback: "jsonpcallback",
        success: function(data) {
            console.log(data);
            AppStore.updatePictures(mediaId,status);
            AppStore.emitChange();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            AppStore.emitChange();
        }
    });
  },
  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }


});

AppDispatcher.register( function( payload ) {
    switch( payload.actionName ) {

        // Do we know how to handle this action?
        case 'getPictures':

            /*_Pictures = temp.data;
            AppStore.emitChange();*/
            console.log(payload.data)
            $.ajax({
                method: "GET",
                url: "https://api.instagram.com/v1/media/search?distance=3000&lat=" + payload.data.lat + "&lng=" + payload.data.lng + "&access_token=" + payload.data.authToken,
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback: "jsonpcallback",
                success: function(data) {
                    console.log(data);
                    _Pictures = data.data;
                    AppStore.emitChange();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    //alert("Check you internet Connection");
                    alert("Error");
                    AppStore.emitChange();
                }
            });

            
            break;

        case 'likePicture':

            AppStore.likeAPI("POST",payload.data.mediaId,payload.data.accesToken,true);



            break;

        case 'dislikePicture':

          AppStore.likeAPI("DELETE",payload.data.mediaId,payload.data.accesToken,false);

            break;

    }

});

module.exports = AppStore;