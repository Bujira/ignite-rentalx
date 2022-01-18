interface IAuthenticateRequest {
  email: string;
  password: string;
}

interface IAuthenticateResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export { IAuthenticateRequest, IAuthenticateResponse };
