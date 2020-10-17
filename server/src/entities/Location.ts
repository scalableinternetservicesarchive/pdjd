import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Events } from './Events'
@Entity()
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100
  })
  buildingName: string

  @Column()
  room: number

  @OneToMany(() => Events, events => events.location)
  events: Events[]
}
