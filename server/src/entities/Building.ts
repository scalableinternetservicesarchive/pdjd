import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Location } from './Location'
@Entity()
export class Building extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100,
  })
  name: string

  @OneToMany(() => Location, location => location.building)
  locations: Location[]
}
