import React from 'react';

function Music() {
  // Replace the src attribute with your actual Spotify playlist embed URL
  const spotifyEmbedUrl = "https://open.spotify.com/embed/playlist/0fUuOsWs3ZgVaFAU6Mj5wI?utm_source=generator";
 
  return (
    <div>
      <h2>Music</h2>
      <iframe
        src={spotifyEmbedUrl}
        width="300"
        height="380"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
  );
}

export default Music;
