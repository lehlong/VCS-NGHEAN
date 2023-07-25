import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {ACCESS_RIGHTS} from 'src/app/utils/constant';
import {MODULE_CODES} from 'src/app/utils/constant/index';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public static readonly appVersion: string = '1.0.0';
  public static readonly apiVersion: string = '1.0';
  private loading: BehaviorSubject<boolean>;
  rightSubject: Subject<string> = new Subject<string>();
  rightData: any = [];
  toggleSidebarSubject: Subject<boolean> = new Subject<boolean>();
  toggleSidebar: any = true;

  constructor() {
    this.loading = new BehaviorSubject<boolean>(false);
    this.rightSubject.subscribe((value) => {
      localStorage.setItem('userRights', value);
      this.rightData = value;
    });
    this.toggleSidebarSubject.subscribe((value) => {
      this.toggleSidebar = value;
    });
  }

  setToggleSidebar(value: boolean) {
    this.toggleSidebarSubject.next(value);
  }

  getUserInfo() {
    try {
      const info = localStorage.getItem("UserInfo");
      return info ? JSON.parse(info) : null
    } catch (e) {
      return null
    }
  }

  setUserInfo(value:any) {
    localStorage.setItem("UserInfo", JSON.stringify(value));
  }

  setRightData(data: any) {
    this.rightSubject.next(data);
  }

  getRightData() {
    return this.rightData;
  }

  checkPermissions(permissions: string) {
    try {
      const listPermissions = localStorage.getItem('userRights');
      if (listPermissions) {
        return JSON.parse(listPermissions)?.includes(permissions);
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }
  setLoading(newValue: boolean): void {
    setTimeout(() => {
      this.loading.next(newValue);
    });
  }

  // check permissions

  checkMajorPermissions(module_code: string, type: number = 0) {
    switch (module_code) {
      case MODULE_CODES.DIEU_HANH:
        return {
          editInfomation: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_DIEU_HANH.CHINH_SUA_THONG_TIN.CODE
          ),
          orderConfirmation: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_DIEU_HANH.XAC_NHAN_DON.CODE
          ),
          enterTheGate: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_DIEU_HANH.VAO_CONG.CODE
          ),
          weighIn: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_DIEU_HANH.CAN_VAO.CODE
          ),
          productDelivery: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_DIEU_HANH.XUAT_HANG.CODE
          ),
          weighOut: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_DIEU_HANH.CAN_RA.CODE
          ),
          goOutGate: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_DIEU_HANH.RA_CONG.CODE
          ),
          printTheDeliveryNote: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_DIEU_HANH.IN_PHIEU_XUAT_KHO.CODE
          ),
          printWeightSlip: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_DIEU_HANH.IN_PHIEU_CAN.CODE
          ),
          seeDetail: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_DIEU_HANH.XEM_CHI_TIET.CODE
          ),
          seeList: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_DIEU_HANH.XEM_DANH_SACH.CODE
          ),
        };
      case MODULE_CODES.VAO_RA:
        switch (type) {
          case 0:
            return {
              editInfomation: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_VAO_RA_CHUA_HOAN_THANH
                  .CHINH_SUA_THONG_TIN.CODE
              ),
              orderConfirmation: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_VAO_RA_CHUA_HOAN_THANH
                  .XAC_NHAN_DON.CODE
              ),
              enterTheGate: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_VAO_RA_CHUA_HOAN_THANH.VAO_CONG
                  .CODE
              ),
              weighIn: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_VAO_RA_CHUA_HOAN_THANH.CAN_VAO
                  .CODE
              ),
              productDelivery: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_VAO_RA_CHUA_HOAN_THANH
                  .XUAT_HANG.CODE
              ),
              weighOut: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_VAO_RA_CHUA_HOAN_THANH.CAN_RA
                  .CODE
              ),
              goOutGate: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_VAO_RA_CHUA_HOAN_THANH.RA_CONG
                  .CODE
              ),
              printTheDeliveryNote: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_VAO_RA_CHUA_HOAN_THANH
                  .IN_PHIEU_XUAT_KHO.CODE
              ),
              printWeightSlip: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_VAO_RA_CHUA_HOAN_THANH
                  .IN_PHIEU_CAN.CODE
              ),
              seeDetail: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_VAO_RA_CHUA_HOAN_THANH
                  .XEM_CHI_TIET.CODE
              ),
              seeList: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_VAO_RA_CHUA_HOAN_THANH
                  .XEM_DANH_SACH.CODE
              ),
            };
          case 1:
            return {
              editInfomation: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_VAO_RA_DA_HOAN_THANH
                  .CHINH_SUA_THONG_TIN.CODE
              ),
              orderConfirmation: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_VAO_RA_DA_HOAN_THANH
                  .XAC_NHAN_DON.CODE
              ),
              enterTheGate: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_VAO_RA_DA_HOAN_THANH.VAO_CONG
                  .CODE
              ),
              weighIn: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_VAO_RA_DA_HOAN_THANH.CAN_VAO
                  .CODE
              ),
              productDelivery: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_VAO_RA_DA_HOAN_THANH.XUAT_HANG
                  .CODE
              ),
              weighOut: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_VAO_RA_DA_HOAN_THANH.CAN_RA
                  .CODE
              ),
              goOutGate: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_VAO_RA_DA_HOAN_THANH.RA_CONG
                  .CODE
              ),
              printTheDeliveryNote: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_VAO_RA_DA_HOAN_THANH
                  .IN_PHIEU_XUAT_KHO.CODE
              ),
              printWeightSlip: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_VAO_RA_DA_HOAN_THANH
                  .IN_PHIEU_CAN.CODE
              ),
              seeDetail: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_VAO_RA_DA_HOAN_THANH
                  .XEM_CHI_TIET.CODE
              ),
              seeList: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_VAO_RA_DA_HOAN_THANH
                  .XEM_DANH_SACH.CODE
              ),
            };
          default:
            return {
              editInfomation: false,
              orderConfirmation: false,
              enterTheGate: false,
              weighIn: false,
              productDelivery: false,
              weighOut: false,
              goOutGate: false,
              printTheDeliveryNote: false,
              printWeightSlip: false,
              seeDetail: false,
              seeList: true,
            };
        }
      case MODULE_CODES.TRAM_CAN:
        return {
          editInfomation: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_TRAM_CAN.CHINH_SUA_THONG_TIN.CODE
          ),
          orderConfirmation: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_TRAM_CAN.XAC_NHAN_DON.CODE
          ),
          enterTheGate: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_TRAM_CAN.VAO_CONG.CODE
          ),
          weighIn: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_TRAM_CAN.CAN_VAO.CODE
          ),
          productDelivery: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_TRAM_CAN.XUAT_HANG.CODE
          ),
          weighOut: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_TRAM_CAN.CAN_RA.CODE
          ),
          goOutGate: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_TRAM_CAN.RA_CONG.CODE
          ),
          printTheDeliveryNote: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_TRAM_CAN.IN_PHIEU_XUAT_KHO.CODE
          ),
          printWeightSlip: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_TRAM_CAN.IN_PHIEU_CAN.CODE
          ),
          seeDetail: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_TRAM_CAN.XEM_CHI_TIET.CODE
          ),
          seeList: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_TRAM_CAN.XEM_DANH_SACH.CODE
          ),
          printWeightList: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_TRAM_CAN.IN_BANG_KE_CAN_BOT.CODE
          ),
        };
      case MODULE_CODES.XUAT_HANG:
        switch (type) {
          case 0:
            return {
              editInfomation: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_XUAT_HANG.CHINH_SUA_THONG_TIN
                  .CODE
              ),
              orderConfirmation: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_XUAT_HANG.XAC_NHAN_DON.CODE
              ),
              enterTheGate: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_XUAT_HANG.VAO_CONG.CODE
              ),
              weighIn: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_XUAT_HANG.CAN_VAO.CODE
              ),
              productDelivery: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_XUAT_HANG.XUAT_HANG.CODE
              ),
              weighOut: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_XUAT_HANG.CAN_RA.CODE
              ),
              goOutGate: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_XUAT_HANG.RA_CONG.CODE
              ),
              printTheDeliveryNote: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_XUAT_HANG.IN_PHIEU_XUAT_KHO
                  .CODE
              ),
              printWeightSlip: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_XUAT_HANG.IN_PHIEU_CAN.CODE
              ),
              seeDetail: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_XUAT_HANG.XEM_CHI_TIET.CODE
              ),
              seeList: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_XUAT_HANG.XEM_DANH_SACH.CODE
              ),
              printDailyExportStatistics: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_XUAT_HANG
                  .IN_THONG_KE_XUAT_HANG_NGAY.CODE
              ),
            };
          case 1:
            return this.checkPermissions(
              ACCESS_RIGHTS.NGHIEP_VU.KHO_HANG_XUAT_HANG.CODE
            );
          default:
            return true;
        }
      case MODULE_CODES.NHAP_HANG:
        return {
          editInfomation: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_NHAP_HANG.CHINH_SUA_THONG_TIN.CODE
          ),
          orderConfirmation: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_NHAP_HANG.XAC_NHAN_DON.CODE
          ),
          enterTheGate: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_NHAP_HANG.VAO_CONG.CODE
          ),
          weighIn: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_NHAP_HANG.CAN_VAO.CODE
          ),
          productDelivery: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_NHAP_HANG.XUAT_HANG.CODE
          ),
          weighOut: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_NHAP_HANG.CAN_RA.CODE
          ),
          goOutGate: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_NHAP_HANG.RA_CONG.CODE
          ),
          printTheDeliveryNote: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_NHAP_HANG.IN_PHIEU_XUAT_KHO.CODE
          ),
          printWeightSlip: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_NHAP_HANG.IN_PHIEU_CAN.CODE
          ),
          seeDetail: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_NHAP_HANG.XEM_CHI_TIET.CODE
          ),
          seeList: this.checkPermissions(
            ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_NHAP_HANG.XEM_DANH_SACH.CODE
          ),
        };
      case MODULE_CODES.KINH_DOANH:
        switch (type) {
          case 0:
            return {
              delete: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_XUAT_HANG.XOA.CODE
              ),
              cancel: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_XUAT_HANG.HUY.CODE
              ),
              sendApprove: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_XUAT_HANG.TRINH_PHE_DUYET.CODE
              ),
              roomLevelApproval: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_XUAT_HANG.PHE_DUYET_CAP_PHONG.CODE
              ),
              approve: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_XUAT_HANG.PHE_DUYET_CAP_CONG_TY.CODE
              ),
              update: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_XUAT_HANG.CHINH_SUA.CODE
              ),
              create: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_XUAT_HANG.THEM_MOI.CODE
              ),
              seeDetail: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_XUAT_HANG.XEM_CHI_TIET.CODE
              ),
              seeList: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_XUAT_HANG.XEM_DANH_SACH.CODE
              ),
            };
          case 1:
            return {
              editInfomation: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_KINH_DOANH.CHINH_SUA_THONG_TIN
                  .CODE
              ),
              orderConfirmation: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_KINH_DOANH.XAC_NHAN_DON.CODE
              ),
              enterTheGate: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_KINH_DOANH.VAO_CONG.CODE
              ),
              weighIn: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_KINH_DOANH.CAN_VAO.CODE
              ),
              productDelivery: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_KINH_DOANH.XUAT_HANG.CODE
              ),
              weighOut: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_KINH_DOANH.CAN_RA.CODE
              ),
              goOutGate: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_KINH_DOANH.RA_CONG.CODE
              ),
              printTheDeliveryNote: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_KINH_DOANH.IN_PHIEU_XUAT_KHO
                  .CODE
              ),
              printWeightSlip: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_KINH_DOANH.IN_PHIEU_CAN.CODE
              ),
              seeDetail: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_KINH_DOANH.XEM_CHI_TIET.CODE
              ),
              seeList: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DON_HANG_KINH_DOANH.XEM_DANH_SACH.CODE
              ),
            };
          case 2:
            return {
              delete: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_LAY_HANG.XOA.CODE
              ),
              cancel: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_LAY_HANG.HUY.CODE
              ),
              sendApprove: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_LAY_HANG.TRINH_PHE_DUYET.CODE
              ),
              roomLevelApproval: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_LAY_HANG.PHE_DUYET_CAP_PHONG.CODE
              ),
              approve: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_LAY_HANG.PHE_DUYET_CAP_CONG_TY.CODE
              ),
              update: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_LAY_HANG.CHINH_SUA.CODE
              ),
              create: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_LAY_HANG.THEM_MOI.CODE
              ),
              seeDetail: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_LAY_HANG.XEM_CHI_TIET.CODE
              ),
              seeList: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_LAY_HANG.XEM_DANH_SACH.CODE
              ),
            };
          case 3:
            return {
              delete: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DE_NGHI_XUAT_KHO.XOA.CODE
              ),
              cancel: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DE_NGHI_XUAT_KHO.HUY.CODE
              ),
              sendApprove: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DE_NGHI_XUAT_KHO.TRINH_PHE_DUYET.CODE
              ),
              roomLevelApproval: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DE_NGHI_XUAT_KHO.PHE_DUYET_CAP_PHONG
                  .CODE
              ),
              approve: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DE_NGHI_XUAT_KHO.PHE_DUYET_CAP_CONG_TY
                  .CODE
              ),
              update: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DE_NGHI_XUAT_KHO.CHINH_SUA.CODE
              ),
              create: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DE_NGHI_XUAT_KHO.THEM_MOI.CODE
              ),
              seeDetail: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DE_NGHI_XUAT_KHO.XEM_CHI_TIET.CODE
              ),
              seeList: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DE_NGHI_XUAT_KHO.XEM_DANH_SACH.CODE
              ),
            };
          default:
            return {
              editInfomation: false,
              orderConfirmation: false,
              enterTheGate: false,
              weighIn: false,
              productDelivery: false,
              weighOut: false,
              goOutGate: false,
              printTheDeliveryNote: false,
              printWeightSlip: false,
              seeDetail: false,
              seeList: true,
            };
        }
      case MODULE_CODES.SAN_XUAT:
        switch (type) {
          case 0:
            return {
              delete: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_SAN_XUAT.XOA.CODE
              ),
              cancel: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_SAN_XUAT.HUY.CODE
              ),
              sendApprove: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_SAN_XUAT.TRINH_PHE_DUYET.CODE
              ),
              roomLevelApproval: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_SAN_XUAT.PHE_DUYET_CAP_PHONG.CODE
              ),
              approve: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_SAN_XUAT.PHE_DUYET_CAP_CONG_TY.CODE
              ),
              update: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_SAN_XUAT.CHINH_SUA.CODE
              ),
              create: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_SAN_XUAT.THEM_MOI.CODE
              ),
              seeDetail: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_SAN_XUAT.XEM_CHI_TIET.CODE
              ),
              seeList: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.KH_SAN_XUAT.XEM_DANH_SACH.CODE
              ),
            };
          case 1:
            return {
              delete: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DU_TRU_NGUYEN_LIEU.XOA.CODE
              ),
              cancel: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DU_TRU_NGUYEN_LIEU.HUY.CODE
              ),
              sendApprove: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DU_TRU_NGUYEN_LIEU.TRINH_PHE_DUYET.CODE
              ),
              roomLevelApproval: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DU_TRU_NGUYEN_LIEU.PHE_DUYET_CAP_PHONG
                  .CODE
              ),
              approve: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DU_TRU_NGUYEN_LIEU.PHE_DUYET_CAP_CONG_TY
                  .CODE
              ),
              update: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DU_TRU_NGUYEN_LIEU.CHINH_SUA.CODE
              ),
              create: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DU_TRU_NGUYEN_LIEU.THEM_MOI.CODE
              ),
              seeDetail: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DU_TRU_NGUYEN_LIEU.XEM_CHI_TIET.CODE
              ),
              seeList: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.DU_TRU_NGUYEN_LIEU.XEM_DANH_SACH.CODE
              ),
            };
          case 2:
            return {
              delete: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.CONG_THUC_SAN_PHAM.XOA.CODE
              ),
              cancel: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.CONG_THUC_SAN_PHAM.HUY.CODE
              ),
              sendApprove: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.CONG_THUC_SAN_PHAM.TRINH_PHE_DUYET.CODE
              ),
              roomLevelApproval: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.CONG_THUC_SAN_PHAM.PHE_DUYET_CAP_PHONG
                  .CODE
              ),
              approve: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.CONG_THUC_SAN_PHAM.PHE_DUYET_CAP_CONG_TY
                  .CODE
              ),
              update: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.CONG_THUC_SAN_PHAM.CHINH_SUA.CODE
              ),
              create: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.CONG_THUC_SAN_PHAM.THEM_MOI.CODE
              ),
              seeDetail: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.CONG_THUC_SAN_PHAM.XEM_CHI_TIET.CODE
              ),
              seeList: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.CONG_THUC_SAN_PHAM.XEM_DANH_SACH.CODE
              ),
            };
          case 3:
            return {
              delete: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.BAO_BI_DONG_GOI.XOA.CODE
              ),
              update: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.BAO_BI_DONG_GOI.SUA.CODE
              ),
              create: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.BAO_BI_DONG_GOI.THEM_MOI.CODE
              ),
              seeDetail: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.BAO_BI_DONG_GOI.XEM_CHI_TIET.CODE
              ),
              seeList: this.checkPermissions(
                ACCESS_RIGHTS.NGHIEP_VU.BAO_BI_DONG_GOI.XEM_DANH_SACH.CODE
              ),
            };
          default:
            return {
              delete: false,
              cancel: false,
              sendApprove: false,
              approve: false,
              roomLevelApproval: false,
              update: false,
              create: false,
              seeDetail: false,
              seeList: true,
            };
        }
      default:
        return {
          editInfomation: false,
          orderConfirmation: false,
          enterTheGate: false,
          weighIn: false,
          productDelivery: false,
          weighOut: false,
          goOutGate: false,
          printTheDeliveryNote: false,
          printWeightSlip: false,
          seeDetail: false,
          seeList: true,
        };
    }
  }

  checkCategoryPermissions(module_code: string) {
    switch (module_code) {
      case MODULE_CODES.KHACH_HANG:
        return {
          sync: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.KHACH_HANG.DONG_BO.CODE
          ),
          delete: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.KHACH_HANG.XOA.CODE
          ),
          update: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.KHACH_HANG.SUA.CODE
          ),
          create: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.KHACH_HANG.THEM_MOI.CODE
          ),
          seeDetail: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.KHACH_HANG.XEM_CHI_TIET.CODE
          ),
          seeList: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.KHACH_HANG.XEM_DANH_SACH.CODE
          ),
        };
      case MODULE_CODES.NHA_CUNG_CAP:
        return {
          sync: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.NHA_CUNG_CAP.DONG_BO.CODE
          ),
          delete: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.NHA_CUNG_CAP.XOA.CODE
          ),
          update: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.NHA_CUNG_CAP.SUA.CODE
          ),
          create: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.NHA_CUNG_CAP.THEM_MOI.CODE
          ),
          seeDetail: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.NHA_CUNG_CAP.XEM_CHI_TIET.CODE
          ),
          seeList: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.NHA_CUNG_CAP.XEM_DANH_SACH.CODE
          ),
        };
      case MODULE_CODES.LAI_XE:
        return {
          sync: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.LAI_XE.DONG_BO.CODE
          ),
          delete: this.checkPermissions(ACCESS_RIGHTS.DANH_MUC.LAI_XE.XOA.CODE),
          update: this.checkPermissions(ACCESS_RIGHTS.DANH_MUC.LAI_XE.SUA.CODE),
          create: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.LAI_XE.THEM_MOI.CODE
          ),
          seeDetail: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.LAI_XE.XEM_CHI_TIET.CODE
          ),
          seeList: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.LAI_XE.XEM_DANH_SACH.CODE
          ),
        };
      case MODULE_CODES.PHUONG_TIEN:
        return {
          sync: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.PHUONG_TIEN.DONG_BO.CODE
          ),
          delete: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.PHUONG_TIEN.XOA.CODE
          ),
          update: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.PHUONG_TIEN.SUA.CODE
          ),
          create: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.PHUONG_TIEN.THEM_MOI.CODE
          ),
          seeDetail: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.PHUONG_TIEN.XEM_CHI_TIET.CODE
          ),
          seeList: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.PHUONG_TIEN.XEM_DANH_SACH.CODE
          ),
        };
      case MODULE_CODES.SAN_PHAM:
        return {
          sync: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.SAN_PHAM.DONG_BO.CODE
          ),
          delete: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.SAN_PHAM.XOA.CODE
          ),
          update: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.SAN_PHAM.SUA.CODE
          ),
          create: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.SAN_PHAM.THEM_MOI.CODE
          ),
          seeDetail: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.SAN_PHAM.XEM_CHI_TIET.CODE
          ),
          seeList: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.SAN_PHAM.XEM_DANH_SACH.CODE
          ),
        };
      case MODULE_CODES.KHO_HANG:
        return {
          sync: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.KHO_HANG.DONG_BO.CODE
          ),
          delete: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.KHO_HANG.XOA.CODE
          ),
          update: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.KHO_HANG.SUA.CODE
          ),
          create: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.KHO_HANG.THEM_MOI.CODE
          ),
          seeDetail: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.KHO_HANG.XEM_CHI_TIET.CODE
          ),
          seeList: this.checkPermissions(
            ACCESS_RIGHTS.DANH_MUC.KHO_HANG.XEM_DANH_SACH.CODE
          ),
        };
      default:
        return {
          sync: false,
          delete: false,
          update: false,
          create: false,
          seeDetail: false,
          seeList: true,
        };
    }
  }

  checkReportPermissions(module_code: string) {
    switch (module_code) {
      case MODULE_CODES.SAN_LUONG:
        return {
          seeDetail: this.checkPermissions(
            ACCESS_RIGHTS.BAO_CAO.SAN_LUONG.XEM_CHI_TIET.CODE
          ),
        };
      default:
        return {
          seeDetail: false,
        };
    }
  }

  checkSystemManagementPermissions(module_code: string) {
    switch (module_code) {
      case MODULE_CODES.TAI_KHOAN:
        return this.checkPermissions(
          ACCESS_RIGHTS.QUAN_TRI_HE_THONG.TAI_KHOAN.CODE
        );
      case MODULE_CODES.PHAN_QUYEN:
        return this.checkPermissions(
          ACCESS_RIGHTS.QUAN_TRI_HE_THONG.PHAN_QUYEN.CODE
        );
      default:
        return false;
    }
  }
}
