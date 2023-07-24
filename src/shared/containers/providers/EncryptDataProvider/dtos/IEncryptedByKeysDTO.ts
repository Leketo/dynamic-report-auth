export default interface IEncryptedByKeysDTO<T> {
  keys: Array<keyof T>;
  data: any;
  publicKey: string;
}
