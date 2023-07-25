export const STATE_ORDER: {[key: string]: {name: string; background: string; color: string; value: string}} = {
  CHUA_XAC_NHAN: {
    name: 'Chưa xác nhận',
    background: '#CCCCCC',
    color: '#ffffff',
    value: 'CHUA_XAC_NHAN',
  },
  DA_XAC_NHAN: {
    name: 'Đã xác nhận',
    background: '#228B22',
    color: '#ffffff',
    value: 'DA_XAC_NHAN',
  },
  DANG_LAY_HANG: {
    name: 'Đang lấy hàng',
    background: '#FFA500',
    color: '#ffffff',
    value: 'DANG_LAY_HANG',
  },
  HOAN_THANH: {
    name: 'Đã hoàn thành',
    background: '#800080',
    color: '#ffffff',
    value: 'DA_HOAN_THANH',
  },
  DA_HOAN_THANH: {
    name: 'Đã hoàn thành',
    background: '#800080',
    color: '#ffffff',
    value: 'DA_HOAN_THANH',
  },
  DA_BI_HUY: {
    name: 'Đã bị huỷ',
    background: '#FF0000',
    color: '#ffffff',
    value: 'DA_BI_HUY',
  },
  DA_TU_CHOI: {
    name: 'Đã từ chối',
    background: '#8B4513',
    color: '#ffffff',
    value: 'DA_TU_CHOI',
  },
};

export const ACTION_ORDER: {[key: string]: {name: string; value: string}} = {
  TAO_MOI: {
    name: 'Tạo mới',
    value: 'TAO_MOI',
  },
  CHINH_SUA: {
    name: 'Chỉnh sửa',
    value: 'CHINH_SUA',
  },
  XAC_NHAN: {
    name: 'Xác nhận',
    value: 'XAC_NHAN',
  },
  TAO_PHIEU_TRON: {
    name: 'Tạo phiếu trộn',
    value: 'TAO_PHIEU_TRON',
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
  TU_CHOI: {
    name: 'Từ chối',
    value: 'TU_CHOI',
  },
};

export const LIST_STATE = [
  {
    name: 'Chưa xác nhận',
    value: 'CHUA_XAC_NHAN',
  },
  {
    name: 'Đã xác nhận',
    value: 'DA_XAC_NHAN',
  },
  {
    name: 'Đang lấy hàng',
    value: 'DANG_LAY_HANG',
  },
  {
    name: 'Đã hoàn thành',
    value: 'DA_HOAN_THANH',
  },
  {
    name: 'Đã bị huỷ',
    value: 'DA_BI_HUY',
  },
  {
    name: 'Đã từ chối',
    value: 'DA_TU_CHOI',
  },
];

export const ORDER_TYPE_ITEM = {
  be_tong: 'BETONG',
  sand: 'SAND',
  stone: 'STONE',
  xebom: 'XEBOM',
};
