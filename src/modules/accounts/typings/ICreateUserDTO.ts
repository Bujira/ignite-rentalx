interface ICreateUserDTO {
  id?: string;
  name: string;
  password: string;
  email: string;
  drivers_license: string;
  avatar?: string;
}

export { ICreateUserDTO };
