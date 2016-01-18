// load your environmental variables
var config = getConfig();

function fetchGenrePlaylist(genre) {
  // construct echonest standard playlisting api request http://developer.echonest.com/docs/v4/standard.html
  // use 'bucket=id:spotify&bucket=tracks' to request spotify ids
  var url = config.echoNestHost + 'api/v4/playlist/static?api_key=' + config.apiKey + '&bucket=id:spotify&bucket=tracks&genre=' +
    genre + '&format=json&results=20&type=genre-radio';

  // asynchronously load requested data with XMLHttpRequest
  d3.json(url, function(error, data) {
    if (error) return console.warn(error);
    var dataset = data.response;
    var spotifyWidget = generateSpotifyWidget(genre, dataset.songs);
    $('.player').append(spotifyWidget);
  });
}

// refresh player based on user input
function refreshGenrePlaylist(genre) {
  // construct echonest standard playlisting api request http://developer.echonest.com/docs/v4/standard.html
  // use 'bucket=id:spotify&bucket=tracks' to request spotify ids
  var url = config.echoNestHost + 'api/v4/playlist/static?api_key=' + config.apiKey + '&bucket=id:spotify&bucket=tracks&genre=' +
    genre + '&format=json&results=20&type=genre-radio';

  // asynchronously load requested data with XMLHttpRequest
  d3.json(url, function(error, data) {
    if (error) return console.warn(error);
    var dataset = data.response;
    var spotifyWidget = generateSpotifyWidget(genre, dataset.songs);
    d3.select('iframe').remove();
    $('.player').append(spotifyWidget);
  });
}

// adapted from enspex https://github.com/plamere/enspex/blob/master/web/common/spotify_en_tools.js
function generateSpotifyWidget(title, playlist) {
  // spotify iframe widget
  var widget = '<iframe src="https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:TRACKS" width="640" height="520"' +
    'frameborder=0 allowtransparency="true"></iframe>';
  var tracks = [];
  playlist.forEach(function(song) {
    // skip tracks if no spotify track id is found
    if (song.tracks[0] !== undefined) {
      var trackId = fidToSpid(song.tracks[0].foreign_id);
      tracks.push(trackId);
    }
  });
  tracks = tracks.join(',');
  var embeddedTracks = widget.replace('TRACKS', tracks);
  embeddedTracks = embeddedTracks.replace('PREFEREDTITLE', 'Genre radio for ' + title);
  var li = $('<span>').html(embeddedTracks);
  return $('<span>').html(embeddedTracks);
}

// from enspex https://github.com/plamere/enspex/blob/master/web/common/spotify_en_tools.js
function fidToSpid(fid) {
  var fields = fid.split(':');
  return fields[fields.length - 1];
}

// initialize player
fetchGenrePlaylist('pop');
