export default interface IHashProvider {
  generateHash(data: string): Promise<string>;
  compareHash(data: string, dataHashed: string): Promise<boolean>;
}
