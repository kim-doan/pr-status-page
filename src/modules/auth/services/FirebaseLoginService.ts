/* eslint-disable class-methods-use-this */
import { FirebaseError } from "@firebase/util";
import { signInWithPopup, updateProfile, User } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  setDoc,
} from "firebase/firestore";

import {
  FirebaseAuth,
  FirebaseStore,
  GithubAuth,
  GoogleAuth,
} from "core/Firebase";

export default class FirebaseLoginService {
  public login = async (type: string) => {
    try {
      let result = null;

      switch (type) {
        case "google":
          result = await signInWithPopup(FirebaseAuth, GoogleAuth);
          // eslint-disable-next-line no-console
          console.log(result);
          break;
        case "github":
          result = await signInWithPopup(FirebaseAuth, GithubAuth);
          break;
        default:
          break;
      }

      if (result && result.user) {
        await this.addUser(result.user);
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

  private addUser = async (newUser: User) => {
    const isActiveUser = await this.checkActiveUser(newUser);

    // eslint-disable-next-line no-console
    console.log("isActiveUser ", isActiveUser);
    if (isActiveUser) {
      return;
    }
    const userRef = collection(FirebaseStore, "Users");

    const docRef = await addDoc(userRef, {
      uid: newUser.uid,
      displayName: newUser.displayName,
      email: newUser.email,
      photoURL: newUser.photoURL,
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: false,
      isActive: true,
    });

    if (docRef && docRef.id) {
      return docRef.id;
    }
  };

  public checkActiveUser = async (currentUser: User) => {
    const userRef = collection(FirebaseStore, "Users");

    const userData = await getDocs(
      query(
        userRef,
        where("uid", "==", currentUser.uid),
        where("isActive", "==", true),
      ),
    );

    return userData && userData.size > 0;
  };

  public changeDisplayName = async (displayName: string) => {
    const user = FirebaseAuth.currentUser;

    if (user) {
      await updateProfile(user, {
        displayName,
      });

      const userRef = collection(FirebaseStore, "Users");

      const userData = await getDocs(
        query(
          userRef,
          where("uid", "==", user.uid),
          where("isActive", "==", true),
        ),
      );

      if (userData.docs.length > 0) {
        await setDoc(
          userData.docs[0].ref,
          {
            displayName,
          },
          { merge: true },
        );
      }
    }
  };
}
