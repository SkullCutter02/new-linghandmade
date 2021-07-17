import HOST from "../constants/host";

const getUsers = async (page: number, filter: string) => {
  const res = await fetch(`${HOST}/user?page=${page}&limit=30&filter=${filter}`, {
    credentials: "include",
  });
  return await res.json();
};

export default getUsers;
