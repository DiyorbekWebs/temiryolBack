import { IsOptional, IsString } from "class-validator";

class UpdateFilialDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  login: string;

  @IsOptional()
  @IsString()
  password: string;
}

export default UpdateFilialDto;
