import { Test, TestingModule } from '@nestjs/testing';
import { TareaService } from './tarea.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './tarea.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

// Crear un mock para el repositorio de Tarea
const mockTareaRepository = () => ({
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

describe('TareaService', () => {
  let service: TareaService;
  let tareaRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TareaService,
        {
          provide: getRepositoryToken(Tarea),
          useFactory: mockTareaRepository, // Usamos useFactory para devolver el mock
        },
      ],
    }).compile();

    service = module.get<TareaService>(TareaService);
    tareaRepository = module.get(getRepositoryToken(Tarea));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('debería retornar una lista de tareas', async () => {
      const mockTareas = [{ id: 1, titulo: 'Tarea 1' }, { id: 2, titulo: 'Tarea 2' }];
      tareaRepository.find.mockResolvedValue(mockTareas); // Simulamos find

      const result = await service.findAll();
      expect(result).toEqual(mockTareas);
      expect(tareaRepository.find).toHaveBeenCalledTimes(1);
    });

    it('debería lanzar una excepción si ocurre un error', async () => {
      tareaRepository.find.mockRejectedValue(new Error('Error en la base de datos'));

      await expect(service.findAll()).rejects.toThrow(BadRequestException);
    });
  });

  describe('create', () => {
    it('debería crear una tarea', async () => {
      const createTareaDto = { titulo: 'Nueva Tarea', descripcion: 'Desc 1', fechaLimite: new Date() };
      const mockTarea = { id: 1, ...createTareaDto };
      tareaRepository.create.mockReturnValue(mockTarea);
      tareaRepository.save.mockResolvedValue(mockTarea);

      const result = await service.create(createTareaDto);
      expect(result).toEqual(mockTarea);
      expect(tareaRepository.create).toHaveBeenCalledWith(createTareaDto);
      expect(tareaRepository.save).toHaveBeenCalledWith(mockTarea);
    });

    it('debería lanzar una excepción si ocurre un error al crear', async () => {
      tareaRepository.save.mockRejectedValue(new Error('Error en la base de datos'));

      const createTareaDto = { titulo: 'Nueva Tarea', descripcion: 'Desc 1', fechaLimite: new Date() };
      await expect(service.create(createTareaDto)).rejects.toThrow(BadRequestException);
    });
  });
});
