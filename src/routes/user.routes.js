import { Router } from "express";
import {
  changecurrentpassword,
  getcurrentuser,
  getuserchannelprofile,
  getwatchhistory,
  loginuser,
  logoutuser,
  refreshaccessToken,
  registeruser,
  updateaccountdetails,
  updateuseravatar,
  updateusercoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

export const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registeruser
);

router.route("/login").post(loginuser);

//secured routes
router.route("/logout").post(verifyJWT, logoutuser);
router.route("/refresh-token").post(refreshaccessToken);
router.route("/change-password").post(verifyJWT, changecurrentpassword);
router.route("/current-user").get(verifyJWT, getcurrentuser);
router.route("/update-details").patch(verifyJWT, updateaccountdetails);
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateuseravatar);
router
  .route("/coverImage")
  .patch(verifyJWT, upload.single("coverImage"), updateusercoverImage);
router.route("/c/:username").get(verifyJWT, getuserchannelprofile);
router.route("/watch-history").get(verifyJWT, getwatchhistory);
