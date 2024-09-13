import { Injectable, NotFoundException, BadRequestException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './tarea.entity';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';

@Injectable()
export class TareaService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
  ) {}

  async findAll(): Promise<Tarea[]> {
    try {
      return this.tareaRepository.find();
    } catch (error) {      
      console.log('Ocurrió un error al obtener listado de tareas. Error:', error);
      throw new BadRequestException(`Ocurrió un error al obtener listado de tareas.`);
    }
  }

  async findOne(id: number): Promise<Tarea> {
    try {
      return this.tareaRepository.findOneBy({ id });
    } catch (error) {
      console.log('Ocurrió un error al buscar tarea. Error:', error);
      throw new BadRequestException(`Ocurrió un error al buscar tarea.`);
    }
  }

  async create(createTareaDto: CreateTareaDto): Promise<Tarea> {
    const tarea = this.tareaRepository.create(createTareaDto);
    try {
        return this.tareaRepository.save(tarea);
    } catch (error) {
      console.log('Ocurrió un error al crear la tarea. Error:', error);
      throw new BadRequestException(`Ocurrió un error al crear la tarea.`);
    }
  }

  async update(id: number, updateTareaDto: UpdateTareaDto): Promise<Tarea> {
    // Verifica si existe la tarea
    const tarea = await this.findOne(id);
    if (!tarea) {
      console.log('No se encontro tarea con ID:', id);
      throw new NotFoundException(`No se encontró Tarea con ID ${id}`);
    }

    // actualizo solo los datos correspondientes al dto
    const updatedTarea = {
        ...tarea,
        ...updateTareaDto,
      };    

    try {
        return await this.tareaRepository.save(updatedTarea);
    } catch (error) {
      console.log('Ocurrió un error al actualizar la tarea. Error:', error);
      throw new BadRequestException(`Ocurrió un error al actualizar la tarea.`);
    }
  }

  async completeTask(id: number): Promise<Tarea> {
    // Verifica si existe la tarea
    const tarea = await this.findOne(id);
    if (!tarea) {
      console.log('completeTask: No se encontró Tarea con ID:', id);
      throw new NotFoundException(`No se encontró Tarea con ID ${id}`);
    }

    // actualizo el registro cambiado solo su campo completada a true
    tarea.completada = true;

    try {
        return this.tareaRepository.save(tarea);
    } catch (error) {
      console.log('Ocurrió un error al completar la tarea. Error:', error);
      throw new BadRequestException(`Ocurrió un error al completar la tarea.`);
    }
  }

  async remove(id: number): Promise<void> {
    // Verifica si existe la tarea
    const tarea = await this.findOne(id);
    try {
      await this.tareaRepository.remove(tarea);    
    } catch (error) {
      console.log('Ocurrió un error al eliminar la tarea. Error:', error);
      throw new BadRequestException(`Ocurrió un error al eliminar la tarea.`);
    }
  }
}
