import axios from "axios";

const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const encodedValue = btoa(`${clientId}:${clientSecret}`);

const data = "grant_type=client_credentials";

const getAccessToken = async () => {
  const accessToken = await axios.post(
    `https://accounts.spotify.com/api/token`,
    data,
    {
      headers: {
        Authorization: `Basic ${encodedValue}`
      }
    }
  );
  console.log(accessToken);

  return accessToken;
};

export const accessToken = async () =>
  await getAccessToken().then(statusCode => {
    return statusCode.data.access_token;
  });
