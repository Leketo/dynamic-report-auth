import Joi from 'joi';
import IRequestSchemaValidator from '../../models/IRequestSchemaValidator';
import { IRequestValidate } from '../../models/IRequestValidatorProvider';

export default class JoiSchemaValidator implements IRequestSchemaValidator {
  loginAdmin(): IRequestValidate {
    return {
      body: {
        email: Joi.string().required(),
        password: Joi.string().required()
      }
    };
  }

  login(): IRequestValidate {
    return {
      body: {
        user: Joi.string().required(),
        password: Joi.string().required()
      }
    };
  }

  loginClient(): IRequestValidate {
    return {
      body: {
        email: Joi.string().required(),
        password: Joi.string().required()
      }
    };
  }
  createAdminUser(): IRequestValidate {
    return {
      body: {
        rol_name: Joi.string().optional(),
        fname: Joi.string().required(),
        lname: Joi.string().optional(),
        email: Joi.string().optional(),
        password: Joi.string().optional(),
        id_client: Joi.string().uuid().optional()
      }
    };
  }

  createUserClient(): IRequestValidate {
    return {
      body: {
        id_role: Joi.string().uuid().required(),
        fname: Joi.string().required(),
        lname: Joi.string().optional(),
        email: Joi.string().optional(),
        password: Joi.string().optional()
      }
    };
  }

  findUserClientById(): IRequestValidate {
    return {
      params: {
        id_user_client: Joi.string().uuid().required()
      }
    };
  }

  deleteUserClientById(): IRequestValidate {
    return {
      params: {
        id_user_client: Joi.string().uuid().required()
      }
    };
  }

  updateUserClientById(): IRequestValidate {
    return {
      params: {
        id_user_client: Joi.string().uuid().required()
      },
      body: {
        id_role: Joi.string().uuid().optional(),
        status: Joi.string().optional(),
        fname: Joi.string().optional(),
        lname: Joi.string().optional(),
        email: Joi.string().optional(),
        password: Joi.string().optional()
      }
    };
  }

  findUserAdminById(): IRequestValidate {
    return {
      params: {
        id_user_admin: Joi.string().uuid().required()
      }
    };
  }

  deleteUserAdminById(): IRequestValidate {
    return {
      params: {
        id_user_admin: Joi.string().uuid().required()
      }
    };
  }

  updateUserAdminById(): IRequestValidate {
    return {
      params: {
        id_user_admin: Joi.string().uuid().required()
      },
      body: {
        rol_name: Joi.string().optional(),
        status: Joi.string().optional(),
        fname: Joi.string().optional(),
        lname: Joi.string().optional(),
        email: Joi.string().optional(),
        password: Joi.string().optional(),
        id_client: Joi.string().uuid().optional()
      }
    };
  }

  findUsersByAppId(): IRequestValidate {
    return {
      params: {
        id_app: Joi.string().uuid().required()
      }
    };
  }

  createPermissionFromApps(): IRequestValidate {
    return {
      params: {
        id_app: Joi.string().uuid().required()
      },
      body: {
        id_service: Joi.string().uuid().required(),
        inactive_unassigned_users: Joi.array().optional(),
        active_users: Joi.array().optional()
      }
    };
  }

  changePassword(): IRequestValidate {
    return {
      body: {
        first_password: Joi.string().required(),
        second_password: Joi.string().required()
      }
    };
  }
}
