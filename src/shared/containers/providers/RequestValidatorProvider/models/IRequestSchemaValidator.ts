import { IRequestValidate } from './IRequestValidatorProvider';

export default interface IRequestSchemaValidator {
  login(): IRequestValidate;
  loginAdmin(): IRequestValidate;
  loginClient(): IRequestValidate;
  createAdminUser(): IRequestValidate;
  createUserClient(): IRequestValidate;
  findUserClientById(): IRequestValidate;
  deleteUserClientById(): IRequestValidate;
  updateUserClientById(): IRequestValidate;
  findUserAdminById(): IRequestValidate;
  deleteUserAdminById(): IRequestValidate;
  updateUserAdminById(): IRequestValidate;
  findUsersByAppId(): IRequestValidate;
  createPermissionFromApps(): IRequestValidate;
  changePassword(): IRequestValidate;
}
