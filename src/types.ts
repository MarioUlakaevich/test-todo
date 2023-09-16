export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}  

export enum FilterType {
    All,
    Active,
    Completed,
}
  