import { Context } from "../graphql/context";
import { ErrorHelper } from "../helpers";
import bcrypt from "bcrypt";
import { UserModel } from "../graphql/modules/user/user.model";
export enum UserRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}
export class AuthHelper {
  constructor() {}
  static rolePermission(context: Context, role: UserRole[]) {
    try {
      if (role.includes(<UserRole>context.tokenData.role)) {
        return true;
      }
    } catch (e) {
      throw ErrorHelper.badToken();
    }

    throw ErrorHelper.permissionDeny();
  }

  static async encodePassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const encodedPassword: string = await bcrypt.hash(password, salt);
    return encodedPassword;
  }
  static async comparePassword(password: string, hashPassword: string) {
    const same: boolean = await bcrypt.compare(password, hashPassword);
    if (!same) {
      throw ErrorHelper.passwordNotCorrect();
    }
    return same;
  }

  static async validateEmail(email: string) {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      throw ErrorHelper.unavalableEmailError();
    }
    return true;
  }
}
