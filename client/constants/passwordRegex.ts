const passwordRegex = {
  regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  message:
    "password must be at least 8 characters long, and have at least one letter and one number",
};

export default passwordRegex;
