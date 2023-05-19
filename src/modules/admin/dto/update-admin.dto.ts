import { IsOptional, IsString } from "class-validator";
class UpdateAdminDto {
  @IsOptional()
  @IsString()
  experience: string;

  @IsOptional()
  @IsString()
  job: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  passport: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  objectiveUrl: string;

  @IsOptional()
  @IsString()
  objectivePath: string;

  @IsOptional()
  @IsString()
  mehnatUrl: string;

  @IsOptional()
  @IsString()
  mehnatPath: string;

  @IsOptional()
  @IsString()
  filial: string;
}

export default UpdateAdminDto;
