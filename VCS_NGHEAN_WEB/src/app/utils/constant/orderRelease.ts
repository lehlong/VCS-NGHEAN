import {COLOR_STEP} from './constant';

export const EORDER_RELEASE_STEPS = {
  KHOI_TAO: 'KHOI_TAO',
  DA_HOAN_THANH: 'DA_HOAN_THANH',
  DA_BI_HUY: 'DA_BI_HUY',
};

export const ORDER_RELEASE_STATES = [
  {
    name: 'Khởi tạo',
    value: EORDER_RELEASE_STEPS.KHOI_TAO,
    color: COLOR_STEP.BLACK,
  },
  {
    name: 'Đã hoàn thành',
    value: EORDER_RELEASE_STEPS.DA_HOAN_THANH,
    color: COLOR_STEP.GREEN,
  },
  {
    name: 'Đã bị huỷ',
    value: EORDER_RELEASE_STEPS.DA_BI_HUY,
    color: COLOR_STEP.RED,
  },
];

export const LIST_ORDER_RELEASE: {[key: string]: {name: string; value: string; color: string}} = {
  KHOI_TAO: {
    name: 'Khởi tạo',
    value: EORDER_RELEASE_STEPS.KHOI_TAO,
    color: COLOR_STEP.GRAY,
  },
  DA_HOAN_THANH: {
    name: 'Đã hoàn thành',
    value: EORDER_RELEASE_STEPS.DA_HOAN_THANH,
    color: COLOR_STEP.GREEN,
  },
  DA_BI_HUY: {
    name: 'Đã bị hủy',
    value: EORDER_RELEASE_STEPS.DA_BI_HUY,
    color: COLOR_STEP.RED,
  },
};

export const ACTION_ORDER_RELEASE: {[key: string]: {name: string; value: string}} = {
  TAO_MOI: {
    name: 'Tạo mới',
    value: 'TAO_MOI',
  },
  CAN_HANG: {
    name: 'Cân hàng',
    value: 'CAN_HANG',
  },
  HOAN_THANH: {
    name: 'Hoàn thành',
    value: 'HOAN_THANH',
  },
  HUY: {
    name: 'Huỷ',
    value: 'HUY',
  },
};
