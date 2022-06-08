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
export class SalesClient extends Model<SalesClient> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'The name of the client',
  })
  name: string;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

  @HasMany(() => SalesLead)
  salesLeads: SalesLead[];
}
