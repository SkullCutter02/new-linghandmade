const getRedirectQuery = (pathname: string, asPath: string, redirectUrn: string) => {
  return !(pathname === "/auth/login" || pathname === "/auth/signup")
    ? `?redirect=${asPath}`
    : redirectUrn
    ? `?redirect=${redirectUrn.substring(1)}`
    : "";
};

export default getRedirectQuery;
