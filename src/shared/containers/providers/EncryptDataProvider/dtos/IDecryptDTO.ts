export interface IDecryptDTO {
  passphrase?: string;
  privateKey: string;
  data: Buffer;
}
