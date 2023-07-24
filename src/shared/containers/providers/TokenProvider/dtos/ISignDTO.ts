export default interface ISignDTO {
  data: object | string;
  secret_key: string;
  expires_in?: string;
}
