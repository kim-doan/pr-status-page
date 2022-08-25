import { FirebaseError } from "@firebase/util";
import { signInWithPopup } from "firebase/auth";

import { FirebaseAuth, GithubAuth, GoogleAuth } from "core/Firebase";

export default class FirebaseLoginService {
  // eslint-disable-next-line class-methods-use-this
  public login = async (type: string) => {
    try {
      switch (type) {
        case "google":
          await signInWithPopup(FirebaseAuth, GoogleAuth);
          break;
        case "github":
          await signInWithPopup(FirebaseAuth, GithubAuth);
          break;
        default:
          break;
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/account-exists-with-different-credential":
            // this.core.dialog.openAlert({
            //   title: "오류",
            //   message: "이미 계정이 존재합니다. 다른 계정으로 로그인하세요.",
            // });
            break;
          case "auth/popup-blocked":
            // this.core.dialog.openAlert({
            //   title: "오류",
            //   message: "차트를 열려면 팝업을 허용해주세요.",
            // });
            break;
          case "auth/popup-closed-by-user":
            // this.core.dialog.openAlert({
            //   title: "오류",
            //   message: "차트를 열려면 팝업을 허용해주세요.",
            // });
            break;
          default:
            // this.core.dialog.openAlert({
            //   title: "오류",
            //   message: "알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.",
            // });
            break;
        }
      }
    }
  };
}
