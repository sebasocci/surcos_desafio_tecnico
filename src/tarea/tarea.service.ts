import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './tarea.entity';
import { Usuario } from '../usuario/usuario.entity';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { RedisClientType } from 'redis';

@Injectable()
export class TareaService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
    @Inject('REDIS_CLIENT')
    private readonly redisClient: RedisClientType,
  ) {}

  async findAll( usuarioId: number, paginationQuery: { page: number; pagesize: number }): Promise<{ data: Tarea[]; total: number; page: number; pagesize: number }> {
    const { page, pagesize } = paginationQuery;
    const cacheKey = `tareas_${usuarioId}_${page}_${pagesize}`; // Genera una clave única para el caché

    try {
      // Intentar obtener datos del caché      
      const cachedData = await this.redisClient.get(cacheKey);
      if (cachedData) {
        console.log('Se obtuvieron datos desde cache redis');
        return JSON.parse(cachedData);
      }

      console.log('No existen datos en cache, se busca en BD');
      // Si no están en caché, obtén los datos desde la base de datos
      const [data, total] = await this.tareaRepository.findAndCount({
        where: { usuario: { id: usuarioId } },
        skip: (page - 1) * pagesize,
        take: pagesize,
      });

      const result = {
        data,
        total,
        page,
        pagesize,
      };

      // Almacena los datos en caché
      console.log('Almaceno datos en cache:', result);
      await this.redisClient.set(cacheKey, JSON.stringify(result), {
        EX: 3600, // TTL en segundos (ej. 3600 segundos = 1 hora)
      });

      return result;       

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

  async create(createTareaDto: CreateTareaDto, usuarioId: number): Promise<Tarea> {
    try {
      const tarea = this.tareaRepository.create(createTareaDto);            
      tarea.usuario = { id: usuarioId } as Usuario; // Asignar el ID del usuario autenticado
      return await this.tareaRepository.save(tarea);
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
