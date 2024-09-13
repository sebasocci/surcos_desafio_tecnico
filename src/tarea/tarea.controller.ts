import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { TareaService } from './tarea.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { Tarea } from './tarea.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiExcludeEndpoint, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Tareas')
@Controller('tarea')
export class TareaController {
  constructor(private readonly tareaService: TareaService) {}

  @Get('list')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todas las tareas' })
  @ApiResponse({ status: 200, description: 'Lista de tareas obtenida exitosamente', type: [Tarea] })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findAll(): Promise<Tarea[]> {
    return this.tareaService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener tarea por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la tarea' })
  @ApiResponse({ status: 200, description: 'Tarea encontrada', type: Tarea })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findOne(@Param('id') id: number): Promise<Tarea> {
    return this.tareaService.findOne(id);
  }

  @Post('crear')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: CreateTareaDto })
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiResponse({ status: 201, description: 'Tarea creada exitosamente', type: Tarea })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() createTareaDto: CreateTareaDto): Promise<Tarea> {
    return this.tareaService.create(createTareaDto);
  }

  @Put(':id/actualizar')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: UpdateTareaDto })
  @ApiOperation({ summary: 'Actualizar una tarea existente' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la tarea' })
  @ApiResponse({ status: 200, description: 'Tarea actualizada exitosamente', type: Tarea })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  update(@Param('id') id: number, @Body() updateTareaDto: UpdateTareaDto): Promise<Tarea> {    
    try {
      return this.tareaService.update(id, updateTareaDto);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(`Error en la solicitud: ${error.message}`);
      }
      throw new HttpException('Error en la solicitud', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id/completada')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Marcar tarea como completada' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la tarea' })
  @ApiResponse({ status: 200, description: 'Tarea marcada como completada', type: Tarea })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  completeTask(@Param('id') id: number): Promise<Tarea> {
    return this.tareaService.completeTask(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una tarea por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la tarea' })
  @ApiResponse({ status: 204, description: 'Tarea eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })  
  remove(@Param('id') id: number): Promise<void> {
    return this.tareaService.remove(id);
  }
}
