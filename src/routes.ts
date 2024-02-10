import express from "express";
import { AuthController } from "./controllers/authController";
import { AuthMiddleware } from "./middlewares/auth";
import { ActivityController } from "./controllers/activityController";
import { PdfController } from "./controllers/pdfController";
import { AbilityController } from "./controllers/AbilityController";
import { UsersController } from "./controllers/usersController";
import { ClassHasUserController } from "./controllers/classHasUserController";
import { ClassController } from "./controllers/classController";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

router.get("/user", AuthMiddleware.checkAuth, AuthController.getUser);
router.get("/users", AuthMiddleware.checkAuth, UsersController.get);

router.get("/classes", AuthMiddleware.checkAuth, ClassHasUserController.getAll);
router.post("/class/create", AuthMiddleware.checkAuth, ClassController.create);
router.post("/class/join", AuthMiddleware.checkAuth, ClassHasUserController.joinClass);
router.get("/class/:id", AuthMiddleware.checkAuth, ClassController.getById);

router.post("/download", AuthMiddleware.checkAuth, PdfController.download);
router.post(
  "/download/many",
  AuthMiddleware.checkAuth,
  PdfController.downloadMany
);

router.get("/ability", AuthMiddleware.checkAuth, AbilityController.get);

router.post("/activity", AuthMiddleware.checkAuth, ActivityController.create);
router.get(
  "/activity/:id",
  AuthMiddleware.checkAuth,
  ActivityController.getById
);
router.put(
  "/activity/:activityId",
  AuthMiddleware.checkAuth,
  ActivityController.update
);
router.put(
  "/activity/activate/:activityId",
  AuthMiddleware.checkAuth,
  ActivityController.activate
);
router.put(
  "/activity/deactivate/:activityId",
  AuthMiddleware.checkAuth,
  ActivityController.deactivate
);


export { router };
