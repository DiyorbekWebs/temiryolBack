import { TypeOrmDataSource } from "../../config";

import { AdminService } from "./admin.service";
import { Admin } from "./admin.entity";
import { filialService } from "../filial";

export const repository = TypeOrmDataSource.getRepository(Admin);

export const adminService = new AdminService(
  repository,
  filialService,
  TypeOrmDataSource,
);
