import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Building } from './Building'
import { Event } from './Event'
@Entity()
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Building, building => building.locations)
  building: Building

  @Column()
  room: number

  @OneToMany(() => Event, events => events.location)
  events: Event[]
}
