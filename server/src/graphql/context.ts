import { Request } from "express";

export class Context {
  req: Request;
  connection: any;
  constructor(params: { req?: Request; connection?: any }) {
    this.req = params.req;
    this.connection = params.connection;
    this.parseToken();
  }

  /**
   * Parse account token every request
   */
  parseToken() {}
}

export async function onContext(params: any) {
  const context: Context = new Context(params);
  return context;
}
