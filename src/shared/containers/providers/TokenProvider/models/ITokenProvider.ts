import ISignDTO from '../dtos/ISignDTO';
import IVerifyDTO from '../dtos/IVerifyDTO';

export default interface ITokenProvider {
  sign(params: ISignDTO): string;
  verify<T>(params: IVerifyDTO): T;
}
