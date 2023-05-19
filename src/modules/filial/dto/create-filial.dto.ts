import { IsNotEmpty, IsString } from "class-validator";

class CreateFilialDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export default CreateFilialDto;
