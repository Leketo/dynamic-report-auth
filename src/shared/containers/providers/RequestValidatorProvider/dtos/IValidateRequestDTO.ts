export default interface IValidateRequestDTO {
  data: any;
  schema: {
    params?: object;
    headers?: object;
    query?: object;
    cookies?: object;
    signedCookies?: object;
    body?: object;
  };
}
