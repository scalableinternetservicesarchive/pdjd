import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { RequestStatus } from '../graphql/schema.types'
import { Events } from './Events'
import { User } from './User'

@Entity()
export class Request extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => Events, event => event.requests)
  event: Events

  @OneToMany(() => User, host => host.hostRequests)
  host: User

  @OneToMany(() => User, guest => guest.guestRequests)
  guest: User

  @Column({
    type: 'enum',
    enum: RequestStatus,
    default: RequestStatus.Pending,
  })
  requestStatus: RequestStatus
}