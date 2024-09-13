import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, Length } from 'class-validator';

export class CreateTareaDto {
  @ApiProperty({
    description: 'Título de la tarea',
    example: 'Desafío Surcos',
    maxLength: 255,
  })
  @IsString()
  @Length(1, 255)
  titulo: string;

  @ApiProperty({
    description: 'Descripción de la tarea',
    example: 'Completar API RESTFUL',
    maxLength: 255,
  })
  @IsString()
  @Length(1, 255)
  descripcion: string;

  @ApiProperty({
    description: 'Fecha límite para completar la tarea',
    example: '2024-09-14',
    type: String, 
  })
  @IsDate()
  fechaLimite: Date;
}
