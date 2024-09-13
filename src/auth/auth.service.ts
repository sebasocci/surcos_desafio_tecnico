import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(    
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(usuario: string, clave: string): Promise<any> {
    const user = await this.usuarioService.findOneByUsuario(usuario);
    
    if (user && await bcrypt.compare(clave, user.clave)) {
      const { clave, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { usuario: user.usuario, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
