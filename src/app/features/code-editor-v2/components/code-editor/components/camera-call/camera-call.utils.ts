// function to add a user to a map:
export const addUserToMap = (
  map: Map<
    string,
    { peerConnection: any | null; iceCandidateFromCaller: RTCIceCandidate[] }
  >,
  username: string,
  rtcPeerConnection: any | null,
  iceCandidateFromCaller: RTCIceCandidate[]
) => {
  if (!map.has(username)) {
    map.set(username, {
      peerConnection: rtcPeerConnection,
      iceCandidateFromCaller
    });
  }
};
