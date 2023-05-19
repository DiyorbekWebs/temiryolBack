import { Router } from "express";
import * as filialController from "../modules/filial/filial.controller";
import { DtoValidationMiddleware } from "../infra/validation";
import { CreateFilialDto, UpdateFilialDto } from "../modules/filial/dto";

const router = Router();

router
  .get("/filial", filialController.getAll)
  .get("/filial/:id", filialController.getById)
  .post("/filial/login", filialController.getByLoginANdPassword)
  .post(
    "/filial",
    DtoValidationMiddleware(CreateFilialDto),
    filialController.create,
  )
  .put(
    "/filial/:id",
    DtoValidationMiddleware(UpdateFilialDto, true),
    filialController.update,
  )
  .delete("/filial/:id", filialController.remove);

module.exports = router;
