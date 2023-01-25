import { MaybeDocument } from 'nano-new';
export interface AccountDb extends MaybeDocument {
  propertyid: string;
  propertyname: string;
  hsaccount: string;
  timezone: string;
  phone: string;
  type: string;
  units: string;
  hscustomer: boolean;
  companyid: string;
  callflowdata: any;
  callflows: any;
  bussinesshours: any;
  liveEscalation: boolean;
  reset: boolean;
  kazoopropertyname: string;
  pvt_type: string;
  enabled: boolean;
  schedule_type: string;
  reset_time: number;
}
