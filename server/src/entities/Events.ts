import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { EventStatus } from '../graphql/schema.types'
import { Location } from './Location'
import { Request } from './Request'
import { User } from './User'

@Entity()
export class Events extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100
  })
  title: string

  @Column()
  description: string

  @Column()
  startTime: Date

  @Column()
  endTime: Date

  @ManyToOne(() => Location, location => location.events)
  location: Location

  @ManyToMany(() => User)
  attendees: User[]

  @ManyToOne(() => Request)
  requests: Request[]

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.Open,
  })
  eventStatus: EventStatus

  // TODO: implement these 2 functions
  get isStarted() {
    return false
  }

  get isCompleted() {
    return false
  }
}
