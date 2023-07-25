import {BaseFilter} from '../Common/base-filter.model';

export class CustomerCareFilter extends BaseFilter {
    orderCode!: string ;
    careDate!: string ;
    careContent!: string ;
    PartnerCode!: string;
}
export class CustomerCareEditFilter extends BaseFilter {
    orderCode!: string ;
    careDate!: string ;
    careContent!: string ;
    PartnerCode!: string;
    id!:string;
}
