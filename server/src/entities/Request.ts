import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { RequestStatus } from '../graphql/schema.types'
import { Event } from './Event'
import { User } from './User'

@Entity()
export class Request extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Event)
  event: Event

  @ManyToOne(() => User)
  host: User

  @ManyToOne(() => User)
  guest: User

  @Column({
    type: 'enum',
    enum: RequestStatus,
    default: RequestStatus.Pending,
  })
  requestStatus: RequestStatus
}
