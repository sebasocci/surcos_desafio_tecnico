import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioRepository extends Repository<Usuario> {
  async findByUsuario(usuario: string): Promise<Usuario | undefined> {
    return this.findOne({ where: { usuario } });
  }
}
