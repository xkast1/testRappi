import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { UsuarioDTO } from './usuarioDTO';

@Injectable()
export class AppService {

  private mongouri = "mongodb://prueba:prueba@my-release-mongodb.default.svc.cluster.local:27017/rappitest?retryWrites=true&w=majority";
  //private mongouri = "mongodb+srv://root:Nm2245697@mongo/rappiTest?retryWrites=true&w=majority";
  private client;

  getHello(): string {
    return 'Hello World!';
  }

  async obtenerUsuario(dni: string): Promise<any>{
    console.log(dni)
    this.conection();
    await this.client.connect();
    return new Promise((resolve) =>{
        this.client
          .db('rappitest')
          .collection('abm')
          .find({'dni': dni})
          .toArray((error, result) => {
            if (error) throw error;
            for(let idxHits = 0; idxHits<result.length; idxHits++){
              console.log(result[idxHits])
              resolve(result[idxHits]);
            }  
        });
    });
  }

  async borrarUsuario(dni: string): Promise<any>{
    console.log(dni)
    this.conection();
    await this.client.connect();
    return new Promise((resolve) =>{
        this.client
          .db('rappitest')
          .collection('abm')
          .deleteOne({'dni': dni}, (error, result) => {
            if (error) throw error;
            console.log("--------------------------"+result.deletedCount)
            if(result.deletedCount === 1){
              resolve(result)
            }else{
              throw error
            }
        });
    });
  }

  async modificarUsuario(usuarioDTO: UsuarioDTO){
    console.log(usuarioDTO)
    this.conection();
    await this.client.connect();
    return new Promise((resolve) =>{
      this.client
        .db('rappitest')
        .collection('abm')
        .findOneAndReplace({'dni': usuarioDTO.dni}, usuarioDTO, null, (error, res) => {
          if(error) throw error;
          resolve(res);
        });
    });
  }

  async agregarUsuario(usuarioDTO: UsuarioDTO): Promise<any>{
    this.conection();
    await this.client.connect();
    return new Promise((resolve) =>{
      this.client
        .db('rappitest')
        .collection('abm')
        .insertOne(usuarioDTO, (error, res) => {
          if (error) throw error;
          console.log(res)
          return(res);
        });
    });      
}

  private conection() {
      this.client = new MongoClient(this.mongouri,{ useUnifiedTopology: true });
  }
}
