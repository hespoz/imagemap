import AppDispatcher from '../dispatchers/AppDispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import $ from "jquery";
import blockUI from 'block-ui';

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
            switch(data.code){
                case 200:
                  AppStore.updatePictures(mediaId,status);
                  break;
                case 400:
                  alert("Oops the token is invalid, you will be redirected to the main page " + redirectUrl);
                  var redirectUrl = window.location.href.split("#access_token")[0];
                  window.location.href=redirectUrl;
                  break;

            }
            
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

        case 'getPictures':
            
            $.blockUI({ message: '<h1>Loading...</h1>' });
            $.ajax({
                method: "GET",
                url: "https://api.instagram.com/v1/media/search?distance=3000&lat=" + payload.data.lat + "&lng=" + payload.data.lng + "&access_token=" + payload.data.authToken,
                dataType: "jsonp",
                jsonp: "callback",
                jsonpCallback: "jsonpcallback",
                success: function(data) {
                    switch(data.meta.code){
                        case 200:
                          console.log(data.data)
                          _Pictures = data.data;
                          break;
                        case 400:
                          alert("Oops the token is invalid, you will be redirected to the main page " + redirectUrl);
                          var redirectUrl = window.location.href.split("#access_token")[0];
                          window.location.href=redirectUrl;
                          break;

                    }
                    
                    AppStore.emitChange();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    AppStore.emitChange();
                }
            }).done(function(){
              $.unblockUI();
            });

            
            break;

        case 'likePicture':
            AppStore.likeAPI("POST",payload.data.mediaId,payload.data.authToken,true);
            break;

        case 'dislikePicture':
            AppStore.likeAPI("DELETE",payload.data.mediaId,payload.data.authToken,false);
            break;

    }

});

module.exports = AppStore;