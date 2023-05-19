import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";
class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  experience: string;

  @IsNotEmpty()
  @IsString()
  job: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  passport: string;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsString()
  filial: string;
}

export default CreateAdminDto;
