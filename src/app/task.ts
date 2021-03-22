export interface Taskdata {
  id: number;
  name: string;
  age: number;
  personal: any;
}

export class userInput {
  constructor(
    public identification: number,
    public companyName: string,
    public mobile: number,
    public subscribe: boolean
  ) {}
}
