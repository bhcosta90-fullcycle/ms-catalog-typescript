import { v4 as uuid } from "uuid";

export class CategoryEntity {
  private _id: string;
  private _name: string;
  private _description?: string;
  private _is_active: boolean;
  private _created_at?: Date;

  constructor(protected readonly props: CategoryProps, id?: string) {
    this._id = id ?? uuid();
    this._name = props.name;
    this._description = props.description ?? null;
    this._is_active = props.is_active ?? true;
    this._created_at = props.created_at ?? new Date();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get is_active(): boolean {
    return this._is_active;
  }

  get created_at(): Date {
    return this._created_at;
  }
}

export type CategoryProps = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};
