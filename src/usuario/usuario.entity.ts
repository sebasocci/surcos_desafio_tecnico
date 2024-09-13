import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Tarea } from '../tarea/tarea.entity'; 

@Entity('user')
export class Usuario {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  apellido: string;

  @Column({ type: 'varchar', length: 50 })
  usuario: string;

  @Column({ type: 'varchar', length: 100 })
  @Exclude() // Esto excluye el campo clave de la serialización
  clave: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  mail: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  telefono: string;

  // Relación OneToMany con Tarea
  @OneToMany(() => Tarea, (tarea) => tarea.usuario)
  tareas: Tarea[];
}
