import HOST from "../constants/host";

const getFeaturedProducts = async () => {
  const res = await fetch(`${HOST}/product/featured`);
  return await res.json();
};

export default getFeaturedProducts;
