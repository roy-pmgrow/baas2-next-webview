export interface KakaoNaviLocation {
  longitude: number;
  latitude: number;
}

export interface KakaoNaviRoads {
  distance: number;
  duration: number;
  traffic_speed: number;
  traffic_state: number;
  vertexes: number[];
  points: KakaoNaviLocation[];
}
