import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Admin } from "../admin/admin.entity";

@Entity("filial")
export class Filial {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  title: string;

  @Column({ type: "text" })
  login: string;

  @Column({ type: "text" })
  password: string;

  @OneToMany(() => Admin, (admin) => admin.filial)
  admins: Admin[];
}
