import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from "class-validator";
export class AccountDto {
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(120)
  @ApiProperty({
    type: String,
    example: "Naimul Hassan",
    minLength: 3,
    maxLength: 120,
  })
  fullName!: string;
  @Transform(({ value }) =>
    typeof value === "string" ? value.trim().toLowerCase() : value,
  )
  @IsEmail()
  @MaxLength(250)
  @ApiProperty({ type: String, example: "naimul@example.com", maxLength: 250 })
  email!: string;
  @IsString()
  @MaxLength(128)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @ApiProperty({
    type: String,
    example: "Sample@12345",
    format: "password",
    writeOnly: true,
    minLength: 8,
    maxLength: 128,
  })
  password!: string;
}
