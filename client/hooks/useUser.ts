import { useQuery } from "react-query";

import getMe from "../queries/getMe";

export default function useUser() {
  const { data: user } = useQuery("user", getMe);

  if (user?.statusCode === 401) {
    return null;
  } else {
    return user;
  }
}
