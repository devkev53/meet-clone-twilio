const Video = require('twilio-video');

const startRoom = async(roomName) => {
  // console.log(roomName)
  const url = (`http://localhost:5000/api/v1/room`)
  //   .then(response => response.json())
  //   .then(res => {
  //     console.log(res)
  //   })
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify({roomName: roomName})
  });
  const {token} = await res.json();
  
  // Join the vide room with token
  const room = await joinVideoRoom(roomName, token);
  console.log(room)
  
  // Render the local and remote participants
  handleConnectParticipant(room.localParticipant);
  room.participants.forEach(handleConnectParticipant);
  room.on('participantConnected', handleConnectParticipant);

};

const handleConnectParticipant = (participant) => {
  console.log("participant: ", participant)

  // Iterate through the participants published tracks
  participant.tracks.forEach((trackPublication) => {
    handleTrackPublication(trackPublication, participant);
  })
  
  // Listen for any new track publication
  participant.on('trackPublished', handleTrackPublication);
}

const handleTrackPublication = (trackPublication, participant) => {
  function displayTrack(track) {
    const trackElement = track.attach();
    container.appendChild(trackElement);
  }

  if (trackPublication.track) {
    displayTrack(trackPublication.track);
  }

  trackPublication.on('subscribed', displayTrack);
}

const joinVideoRoom = async(roomName, token) => {
  const room = await Video.connect(token, {
    room: roomName,
  });
  return room;
}

export {startRoom, handleConnectParticipant};