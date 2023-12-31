export interface CheckInModel {
    id: string;
    timeCheckIn?: Date;
    timeCheckOut?: Date;
    notes?: string;
    status?: string;
    vehicle?: string;
    driver?: string;
    doSap?: string;
    areaCode?: string;
    isActive?: boolean;
  }
  