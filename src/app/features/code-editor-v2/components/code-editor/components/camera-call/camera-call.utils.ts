// function to add a user to a map:
export const addUserToMap = (
  map: Map<string, RTCPeerConnection | null>,
  username: string
) => {
  if (!map.has(username)) {
    map.set(username, null);
  }
};
