interface IUserResponseDTO {
  id: string;
  name: string;
  email: string;
  drivers_license: string;
  avatar: string;
  avatar_url(): string;
}

export { IUserResponseDTO };
