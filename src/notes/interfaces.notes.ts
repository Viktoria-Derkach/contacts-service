type Type = '<' | '>';
interface ICreatedAt {
  type: Type;
  value: number;
}

export interface ICollection {
  ids?: string;
  created_at?: ICreatedAt;
}
