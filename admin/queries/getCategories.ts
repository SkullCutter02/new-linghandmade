import HOST from "../constants/host";

const getCategories = async () => {
  const res = await fetch(`${HOST}/category`);
  return await res.json();
};

export default getCategories;
