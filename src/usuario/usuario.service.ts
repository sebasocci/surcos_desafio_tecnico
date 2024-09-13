import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcryptjs';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {    
    const usuarios = await this.usuarioRepository.find();
    return usuarios.map(usuario => plainToClass(Usuario, usuario));
  }

  async findOne(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOneBy({ id });
  }

  async findOneByUsuario(username: string): Promise<Usuario | undefined> {
    const usuario = await this.usuarioRepository.findOne({ where: { usuario: username } });
    return usuario;
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    try {
      // Genera el salt y hashea la contraseña
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUsuarioDto.clave, salt);

      // Crea una nueva instancia del usuario con la contraseña encriptada
      const usuario = this.usuarioRepository.create({
        ...createUsuarioDto,
        clave: hashedPassword,
      });

      // Guarda el usuario en la base de datos
      await this.usuarioRepository.save(usuario);

      // Retorna el usuario convertido a clase
      return plainToClass(Usuario, usuario);
    } catch (error) {      
      if (error.code === '23505') { // Código de error único para una violación de clave única en PostgreSQL
        throw new BadRequestException('El usuario ya existe.');
      }
      console.log('Ocurrió un error al crear el usuario. Error:', error);
      throw new InternalServerErrorException('Error al crear el usuario.');
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    try {
      // Verifica si el usuario existe
      const existingUser = await this.findOne(id);
      if (!existingUser) {
        throw new NotFoundException(`El usuario con id ${id} no fue encontrado.`);
      }

      // Si se incluye una clave, genera el hash de la nueva contraseña
      if (updateUsuarioDto.clave) {
        const salt = await bcrypt.genSalt();
        updateUsuarioDto.clave = await bcrypt.hash(updateUsuarioDto.clave, salt);
      }

      // Actualiza el usuario
      await this.usuarioRepository.update(id, updateUsuarioDto);

      // Retorna el usuario actualizado
      const usuario = await this.findOne(id);
      return plainToClass(Usuario, usuario);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; 
      }
      console.log('Ocurrió un error al actualizar el usuario. Error:', error);
      throw new InternalServerErrorException('Error al actualizar el usuario');
    }
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
