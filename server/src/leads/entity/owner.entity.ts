import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { SalesLead } from './lead.entity';

@Table({ underscored: true })
export class SalesOwner extends Model<SalesOwner> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'The sales owner name',
  })
  name: string;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

  @HasMany(() => SalesLead)
  salesLead: SalesLead[];
}
