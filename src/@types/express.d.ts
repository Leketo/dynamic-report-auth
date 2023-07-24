interface IContextData {
  id_user: string;
  rol_name: string;
}

declare namespace Express {
  export interface Request {
    context: IContextData;
  }
}
