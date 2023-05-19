import { TypeOrmDataSource } from "../../config";

import { FilialService } from "./filial.service";
import { Filial } from "./filial.entity";

export const repository = TypeOrmDataSource.getRepository(Filial);

export const filialService = new FilialService(repository);
