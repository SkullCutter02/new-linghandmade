import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { MutableRefObject } from "react";
import { useQueryClient } from "react-query";
import { useRouter } from "next/router";

import HOST from "../constants/host";
import getMe from "../queries/getMe";

export default function useGoogleAuthentication(
  errMsgRef: MutableRefObject<HTMLParagraphElement>,
  redirectUrn: string
) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleSuccess = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ("accessToken" in response) {
      const accessToken = response.accessToken;

      try {
        const res = await fetch(`${HOST}/auth/google`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: accessToken,
          }),
        });
        const data = await res.json();

        if (res.ok) {
          await queryClient.prefetchQuery("user", getMe);
          await router.push(redirectUrn);
        } else if (!res.ok) {
          errMsgRef.current.innerText = data.message;
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return { handleSuccess };
}
