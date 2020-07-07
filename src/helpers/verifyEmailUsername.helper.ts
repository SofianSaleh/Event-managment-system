import userController from "../controllers/user.Controller";

export const checkDuplication = async (email?: string, username?: string) => {
  try {
    let errors = [];
    if (email) {
      const emailExists = await userController.getUser({ email });
      if (!!emailExists)
        errors.push({ path: `Email`, msg: `Email Already Exists` });
    }
    if (username) {
      const usernameExists = await userController.getUser({ username });
      if (!!usernameExists)
        errors.push({ path: `Username`, msg: `Username Already Exists` });
    }

    return errors.length === 0
      ? { success: true, errors: null }
      : { success: false, errors };
  } catch (e) {
    throw e;
  }
};
