import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { SalesClient } from './client.entity';
import { SalesOwner } from './owner.entity';

@Table({ underscored: true })
export class SalesLead extends Model<SalesLead> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'The sales lead name',
  })
  name: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    comment: 'The value of the sales lead',
  })
  value: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

  @ForeignKey(() => SalesClient)
  @Column
  salesClientId: number;

  @BelongsTo(() => SalesClient)
  salesClient: SalesClient;

  @ForeignKey(() => SalesOwner)
  @Column
  salesOwnerId: number;

  @BelongsTo(() => SalesOwner)
  salesOwner: SalesOwner;
}
