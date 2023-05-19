import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Filial } from "../filial/filial.entity";

@Entity("admin")
export class Admin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", select: false })
  experience: string;

  @Column({ type: "text" })
  phone: string;

  @Column({ type: "text" })
  fullName: string;

  @Column({ type: "text" })
  job: string;

  @Column({ type: "int", default: 1 })
  role: number;

  @Column({ type: "text" })
  passport: string;

  @Column({ type: "text" })
  address: string;

  @Column({ type: "text" })
  objectiveUrl: string;

  @Column({ type: "text" })
  objectivePath: string;

  @Column({ type: "text" })
  mehnatUrl: string;

  @Column({ type: "text" })
  mehnatPath: string;

  @ManyToOne(() => Filial, (position) => position.admins, {
    cascade: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  filial: Filial;
}
