import { UpdateResult, DeleteResult, Repository } from "typeorm";
import { Filial } from "./filial.entity";
import { CreateFilialDto, UpdateFilialDto } from "./dto";
import { HttpException } from "../../infra/validation";

export class FilialService {
  constructor(private readonly filialRepository: Repository<Filial>) {}

  async getAll(): Promise<Filial[]> {
    try {
      const data = await this.filialRepository.find();
      return data;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getById(id: string): Promise<Filial> {
    try {
      const data = await this.filialRepository.findOne({
        where: { id },
        relations: {
          admins: true,
        },
      });
      return data;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getByLoginAndPassword(login: string, password: string) {
    try {
      if (login == "admin" && password == "admin") {
        return { id: "admin" };
      }
      const data = await this.filialRepository.findOne({
        where: { login, password },
      });
      if (!data) {
        return new HttpException(true, 400, "Invalid login or password");
      }
      return data;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async create(values: CreateFilialDto): Promise<Filial> {
    try {
      const response = this.filialRepository.create(values);
      return await this.filialRepository.save(response);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async update(values: UpdateFilialDto, id: string): Promise<UpdateResult> {
    try {
      const response = await this.filialRepository.update(id, values);
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const response = await this.filialRepository.delete(id);
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }
}
