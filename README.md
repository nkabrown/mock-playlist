This is a small project to test the generation of Spotify playlists from d3 graph interactions

To run the project locally you must add an echonest-config.js file on your local machine to the
`assets/js` folder with this format:

```javascript
function getConfig() {
  return {
    apiKey: 'YOURECHONESTAPIKEY',
    echoNestHost: 'https://developer.echonest.com/'
  }
}
```
