import HOST from "../constants/host";

const getCategory = async (categoryId: string) => {
  const res = await fetch(`${HOST}/category/${categoryId}`);
  return await res.json();
};

export default getCategory;
