type Credentials = {
  email: string;
  password: string;
  role?: string;
};

const validUser: Credentials = {
  email: "lshevchenko@gmail.com",
  password: "Password123",
  role: "admin",
};

function getLoginUrl(env: string): string {
  return `https://${env}.example.com/login`;
}

export { validUser, getLoginUrl };