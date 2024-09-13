import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Lalo',
    maxLength: 255,
  })
  @IsString()
  @Length(1, 255)
  nombre: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Pérez',
    maxLength: 255,
  })
  @IsString()
  @Length(1, 255)
  apellido: string;

  @ApiProperty({
    description: 'Nombre de usuario único',
    example: 'laloperez',
    maxLength: 50,
  })
  @IsString()
  @Length(1, 50)
  usuario: string;

  @ApiProperty({
    description: 'Clave de usuario para autenticación',
    example: 'claveSecreta123',
    maxLength: 50,
  })
  @IsString()
  @Length(1, 50)
  clave: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan.perez@example.com',
    maxLength: 255,
  })
  @IsString()
  @Length(1, 255)
  mail: string;

  @ApiProperty({
    description: 'Número de teléfono del usuario',
    example: '123456789',
    maxLength: 255,
  })
  @IsString()
  @Length(1, 255)
  telefono: string;
}
