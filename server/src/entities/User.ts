import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User as GraphqlUser, UserType } from '../graphql/schema.types'
import { Event } from './Event'
import { Request } from './Request'

@Entity()
export class User extends BaseEntity implements GraphqlUser {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    length: 100,
  })
  email: string

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.User,
  })
  userType: UserType

  @Column({
    length: 100,
  })
  password: string

  @Column({
    length: 100,
  })
  name: string

  @Column({
    nullable: true,
  })
  bio: string

  @Column({
    length: 20,
    nullable: true,
  })
  phoneNumber: string

  @OneToMany(() => Event, event => event.host)
  @JoinTable()
  hostEvents: Event[]

  @ManyToMany(() => Event)
  @JoinTable()
  guestEvents: Event[]

  @OneToMany(() => Request, request => request.host)
  hostRequests: Request[]

  @OneToMany(() => Request, request => request.guest)
  guestRequests: Request[]
}
