import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { User as GraphqlUser, UserType } from '../graphql/schema.types'
import { Events } from './Events'
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
    nullable: true,
  })
  name: string

  @Column({
    nullable: true
  })
  bio: string

  @Column({
    length: 20,
    nullable: true
  })
  phoneNumber: string

  @ManyToMany(() => Events)
  @JoinTable()
  events: Events[]

  @ManyToOne(() => Request)
  hostRequests: Request[]

  @ManyToOne(() => Request)
  guestRequests: Request[]
}
