import HOST from "../constants/host";

const getProduct = async (id: string) => {
  const res = await fetch(`${HOST}/product/${id}`);
  return await res.json();
};

export default getProduct;
