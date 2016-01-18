// load your environmental variables
var config = getConfig();

// TODO handle when spotity track id's come back as undefined
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

// adapted from enspex https://github.com/plamere/enspex/blob/master/web/common/spotify_en_tools.js
function generateSpotifyWidget(title, playlist) {
  // spotify iframe widget
  var widget = '<iframe src="https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:TRACKS" width="640" height="520"' +
    'frameborder=0 allowtransparency="true"></iframe>';
  var tracks = [];
  playlist.forEach(function(song) {
    console.log(song);
    var trackId = fidToSpid(song.tracks[0].foreign_id);
    tracks.push(trackId); 
  });
  tracks = tracks.join(',');
  console.log(tracks);
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

fetchGenrePlaylist('pop');