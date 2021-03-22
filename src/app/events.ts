export interface EventsServ {
  created_at: Date;
  id: number;
  name: string;
  pid: number;
  mobile: string;
  updated_at: Date;
}

export interface BranchServ {
  id: number;
  name: string;
  address: any;
}

export interface PersonalServ {
  id: number;
  pid: number;
  name: string;
}
