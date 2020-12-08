import { BaseEntity, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { RequestStatus } from '../graphql/schema.types'
import { Event } from './Event'
import { User } from './User'

@Entity()
export class Request extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Event, event => event.requests)
  event: Event

  @ManyToOne(() => User, user => user.hostRequests)
  host: User

  @ManyToOne(() => User, user => user.guestRequests)
  guest: User

  @Column({
    type: 'enum',
    enum: RequestStatus,
    default: RequestStatus.Pending,
  })
  @Index('requestStatus-idx')
  requestStatus: RequestStatus
}
