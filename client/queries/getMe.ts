import HOST from "../constants/host";

const getMe = async () => {
  const res = await fetch(`${HOST}/auth/me`, {
    credentials: "include",
  });
  return await res.json();
};

export default getMe;
