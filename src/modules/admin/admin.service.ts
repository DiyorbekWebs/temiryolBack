import { DeleteResult, Repository, DataSource, EntityManager } from "typeorm";
import { HttpException } from "../../infra/validation";
import { FilialService } from "../filial/filial.service";
import { Admin } from "./admin.entity";
import { CreateAdminDto, UpdateAdminDto } from "./dto";
import removeFile from "../../infra/helper/remove-file";

export class AdminService {
  constructor(
    private readonly adminRepository: Repository<Admin>,
    private readonly filialService: FilialService,
    private readonly connection: DataSource,
  ) {}

  async getAll(): Promise<Admin[]> {
    const admins = await this.adminRepository.find({
      relations: {
        filial: true,
      },
    });
    return admins;
  }

  async getByFilialId(id: string): Promise<Admin[]> {
    const admins = await this.adminRepository.find({
      relations: {
        filial: true,
      },
      where: { filial: { id } },
    });
    return admins;
  }

  async getById(id: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      relations: {
        filial: true,
      },
      where: { id },
    });
    if (!admin) {
      console.log(admin);
      throw new HttpException(true, 404, "Admin not found");
    }
    return admin;
  }

  async create(values: CreateAdminDto) {
    const response = this.adminRepository
      .createQueryBuilder()
      .insert()
      .into(Admin)
      .values(values as unknown as Admin)
      .returning("id")
      .execute();
    return response;
  }

  async update(values: UpdateAdminDto, id: string) {
    const admin = await this.adminRepository.findOne({
      where: { id },
      relations: { filial: true },
    });
    admin.address = values.address ? values.address : admin.address;
    admin.experience = values.experience ? values.experience : admin.experience;
    admin.fullName = values.fullName ? values.fullName : admin.fullName;
    admin.job = values.job ? values.job : admin.job;
    admin.passport = values.passport ? values.passport : admin.passport;
    admin.phone = values.phone ? values.phone : admin.phone;
    if (values.filial) {
      const filial = await this.filialService.getById(values.filial);
      admin.filial = filial;
    }
    if (values.objectiveUrl) {
      removeFile(admin.objectivePath);
      admin.objectiveUrl = values.objectiveUrl;
      admin.objectivePath = values.objectivePath;
    }
    if (values.mehnatUrl) {
      removeFile(admin.mehnatPath);
      admin.mehnatUrl = values.mehnatUrl;
      admin.mehnatPath = values.mehnatPath;
    }
    await this.connection.transaction(async (manager: EntityManager) => {
      await manager.save(admin);
    });

    return admin;
  }

  async remove(id: string): Promise<DeleteResult> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (admin.objectivePath) {
      removeFile(admin.objectivePath);
    }
    if (admin.mehnatPath) {
      removeFile(admin.mehnatPath);
    }
    const response = await this.adminRepository.delete(id);
    return response;
  }
}
