import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { EventStatus } from '../graphql/schema.types'
import { Location } from './Location'
import { Request } from './Request'
import { User } from './User'

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100,
  })
  title: string

  @Column()
  description: string



  @Column()
  startTime: Date

  @Column()
  endTime: Date

  @Column()
  maxGuestCount: number

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.Open,
  })
  eventStatus: EventStatus

  @ManyToOne(() => Location, location => location.events)
  location: Location

  @ManyToOne(() => User, user => user.hostEvents)
  host: User

  @ManyToMany(() => User, user => user.guestEvents)
  guests: User[]

  @OneToMany(() => Request, request => request.event)
  requests: Request[]

  get isStarted() {
    const timestamp = new Date().getTime()
    return this.startTime.getTime() < timestamp && timestamp < this.endTime.getTime()
  }

  get isCompleted() {
    const timestamp = new Date().getTime()
    return this.endTime.getTime() > timestamp
  }

  @Column({
    default: 1,
  })
  guestCount: number
}
