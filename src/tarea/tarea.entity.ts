import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity('task')
export class Tarea {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  titulo: string;

  @Column({ type: 'varchar', length: 250 })
  descripcion: string;

  @Column({ type: 'date' })
  fechaLimite: Date;

  @Column({ type: 'boolean', default: false })  
  completada: boolean;  

  // Relación ManyToOne con Usuario
  @ManyToOne(() => Usuario, (usuario) => usuario.tareas, { onDelete: 'CASCADE' })
  usuario: Usuario;
}
