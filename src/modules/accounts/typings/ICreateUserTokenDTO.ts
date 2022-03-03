interface ICreateUserTokenDTO {
  user_id: string;
  refresh_token: string;
  expiration_date: Date;
}

export { ICreateUserTokenDTO };
