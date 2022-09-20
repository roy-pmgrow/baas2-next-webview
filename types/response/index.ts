export interface ResponseEV {
  ev_id: string;
  ev_mnfct: string;
  ev_type: string;
  ev_model: string;
  ev_detl_model: string;
  ev_volt: string;
  ev_ahmp: string;
  m_pcr: string;
  d_pcr: string;
  x_pcr: string;
  bat_pow: string;
  m_mileage: string;
  d_mileage: string;
  x_mileage: string;
  w_mileage: string;
  chrg_speed: string;
  high_chrg_min: string;
  row_chrg_hr: string;
  bat_mnfct: string;
  ev_img: string;
}

export interface ResponseAddress {
  bdNm: string;
  roadAddr: string;
  roadAddrPart1: string;
}
