import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";

import HOST from "../constants/host";

export default function useGoogleAuthentication() {
  const handleSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ("accessToken" in response) {
      const accessToken = response.accessToken;

      fetch(`${HOST}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: accessToken,
        }),
      }).catch((err) => console.log(err));
    }
  };

  return { handleSuccess };
}
