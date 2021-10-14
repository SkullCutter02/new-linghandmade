const buildRedirectUrn = (query: object) => {
  let s = "";

  if (Object.keys(query).length === 0) return "/";

  for (const [key, value] of Object.entries(query)) {
    if (key === "redirect") s += value;
    else s += `&${key}=${value}`;
  }

  return s;
};

export default buildRedirectUrn;
