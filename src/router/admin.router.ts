import { Router } from "express";
import * as adminController from "../modules/admin/admin.controller";
import { DtoValidationMiddleware } from "../infra/validation";
import { CreateAdminDto, UpdateAdminDto } from "../modules/admin/dto";

const router = Router();

router
  .get("/user", adminController.getAll)
  .get("/user/:id", adminController.getById)
  .get("/user/filial/:id", adminController.getByFilialId)
  .post(
    "/user",
    // DtoValidationMiddleware(CreateAdminDto),
    adminController.create,
  )
  .put(
    "/user/:id",
    DtoValidationMiddleware(UpdateAdminDto, true),
    adminController.update,
  )
  .delete("/user/:id", adminController.deleteData);

module.exports = router;
