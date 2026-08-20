export class TaskDto {
  id: string;
  title: string;
  description: string;
  status: string;
  expirationDate: Date;
}

export interface FindALLParameters {
  title: string;
  status: string;
}
