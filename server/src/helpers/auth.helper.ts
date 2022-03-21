import { Context } from "../graphql/context";
import { ErrorHelper } from "../helpers";
import bcrypt from "bcrypt";
import { UserModel } from "../graphql/modules/user/user.model";

export class AuthHelper {
  constructor() {}
  static authorize(context: Context) {
    if (!context.isAuth) {
      throw ErrorHelper.unauthorized();
    }
    return true;
  }

  static async encodePassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const encodedPassword: string = await bcrypt.hash(password, salt);
    return encodedPassword;
  }
  static async comparePassword(password: string, hashPassword: string) {
    const same: boolean = await bcrypt.compare(password, hashPassword);
    if (!same) {
      throw ErrorHelper.userPasswordNotCorrect();
    }
    return same;
  }

  static async validateEmail(email: string) {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      throw ErrorHelper.createUserError("Email is used by another account");
    }
    return true;
  }
}
