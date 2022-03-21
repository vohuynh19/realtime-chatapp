import fs from "fs";
import path from "path";

export class UtilsHelper {
  constructor() {}
  // Scan all files in folder
  static walkSyncFiles(dir: string, filelist: string[] = []) {
    const files = fs.readdirSync(dir);
    files.forEach(function (file: any) {
      if (fs.statSync(path.join(dir, file)).isDirectory()) {
        filelist = UtilsHelper.walkSyncFiles(path.join(dir, file), filelist);
      } else {
        filelist.push(path.join(dir, file));
      }
    });
    return filelist;
  }
  //
}
