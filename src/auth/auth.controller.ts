import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Autenticacion')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Inicia sesión con las credenciales del usuario' })
  @ApiBody({
    description: 'Credenciales del usuario para autenticación',
    schema: {
      type: 'object',
      properties: {
        usuario: { type: 'string', example: 'usuario123' },
        clave: { type: 'string', example: 'claveSecreta' }
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
  @ApiResponse({ status: 401, description: 'Datos incorrectos' })
  async login(@Body() loginDto: { usuario: string; clave: string }) {
    const user = await this.authService.validateUser(loginDto.usuario, loginDto.clave);
    if (!user) {
      throw new UnauthorizedException('Datos incorrectos');
    }
    return this.authService.login(user);
  }
}
