import HOST from "../constants/host";

const getProducts = async (page: number, filter: string) => {
  const res = await fetch(`${HOST}/product?page=${page}&limit=30&filter=${filter}`);
  return await res.json();
};

export default getProducts;
