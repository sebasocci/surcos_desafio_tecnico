import { PartialType } from '@nestjs/mapped-types';
import { CreateTareaDto } from './create-tarea.dto';
import { ApiProperty, PartialType as ApiPartialType } from '@nestjs/swagger';

export class UpdateTareaDto extends PartialType(CreateTareaDto) {
  @ApiProperty({ description: 'Título de la tarea', example: 'Nueva Tarea', required: false })
  titulo?: string;

  @ApiProperty({ description: 'Descripción de la tarea', example: 'Descripción detallada', required: false })
  descripcion?: string;

  @ApiProperty({ description: 'Fecha límite para la tarea', example: '2024-12-31T23:59:59.999Z', required: false })
  fechaLimite?: Date;
}
