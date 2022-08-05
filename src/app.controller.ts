import { Query, Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { UsuarioDTO } from './usuarioDTO';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,) {}

  @Get('/test')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/rappi/obtenerUsuario?')
  async obtenerUsuario(@Res() response, @Query('dni') dni){
    console.log(dni)
      try {
        let usuario = await this.appService.obtenerUsuario(dni);
        return response.status(HttpStatus.OK).json({
        message: 'Usuario ha sido obtenido',usuario});
      } catch (err) {
          return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
          message: 'Error: No se ha encontrado el usuario',
          error: 'Bad Request'
      });
    }
  }

  @Get('/rappi/borrarUsuario?')
  async desactivateID(@Res() response, @Query('dni') dni){
    console.log(dni)
    try {
        await this.appService.borrarUsuario(dni);
        return response.status(HttpStatus.OK).json({
        message: 'Usuario ha sido eliminado con exito',dni});
    } catch (err) {
          return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
          message: 'Error: No se ha eliminado el usuario',
          error: 'Bad Request'
      });
    }
  }

  @Post('/rappi/agregarUsuario')
  async agregaUsuario(@Res() response, @Body() usuarioDTO: UsuarioDTO){
      console.log(usuarioDTO)
      try {
        this.appService.agregarUsuario(usuarioDTO);
        return response.status(HttpStatus.CREATED).json({
        message: 'Usuario ha sido creado con exito',usuarioDTO});
      } catch (err) {
          return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
          message: 'Error: No se ha creado el usuario',
          error: 'Bad Request'
      });
    }
  }

  @Post('/rappi/modificarUsuario')
  async borrarUsuario(@Res() response, @Body() usuarioDTO: UsuarioDTO){
    console.log(usuarioDTO)
      try {
        await this.appService.modificarUsuario(usuarioDTO);
        return response.status(HttpStatus.OK).json({
        message: 'Usuario ha sido modificado con exito',usuarioDTO});
      } catch (err) {
          return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
          message: 'Error: No se ha modificado el usuario',
          error: 'Bad Request'
      });
    }
  }
}
