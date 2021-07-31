const buildRedirectUrn = (query: object) => {
  let s = "";

  for (const [key, value] of Object.entries(query)) {
    if (key === "redirect") s += value;
    else s += `&${key}=${value}`;
  }

  return s;
};

export default buildRedirectUrn;
