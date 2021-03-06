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
  refresh_token: string;
}

interface IAuthenticatePayload {
  sub: string;
}

export { IAuthenticateRequest, IAuthenticateResponse, IAuthenticatePayload };
