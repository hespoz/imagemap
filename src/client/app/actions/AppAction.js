import AppDispatcher from '../dispatchers/AppDispatcher';

var AppAction = {

  getPictures: function(location,authToken) {
      AppDispatcher.dispatch({
        actionName: 'getPictures',
        data: {lat:location.lat(),lng:location.lng(),authToken:authToken}
      });
  },

  likePicture: function(media,authToken) {
      AppDispatcher.dispatch({
        actionName: 'likePicture',
        data: {mediaId:media,authToken:authToken}
      });
  },

  dislikePicture: function(media,authToken) {
      AppDispatcher.dispatch({
        actionName: 'dislikePicture',
        data: {mediaId:media,authToken:authToken}
      });
  }

}

module.exports = AppAction;