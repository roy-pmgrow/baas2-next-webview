import { httpRequest } from "./../httpRequest";
import { httpRequestKakao } from "./../httpRequestKakao";

/**
 * 주소 API 키
 */
const confirmKey = "U01TX0FVVEgyMDIyMDUwOTEzMjcyMzExMjU0MTM=";

const addressApi = {
  /**
   * 주소 검색 API
   * @param keyword 검색 키워드
   */
  search(keyword: string) {
    return httpRequest.get(
      `/addrlink/addrLinkApi.do?confmKey=${confirmKey}&resultType=json&currentPage=0&countPerPage=30&keyword=${keyword}`,
    );
  },
  /**
   * 카카오네비 길찾기 API
   *
   * @param origin 출발지 (lng, lat)
   * @param destination 목적지 (lng, lat)
   */
  kakaoNavi(origin: string, destination: string) {
    return httpRequestKakao.get(`/v1/directions?origin=${origin}&destination=${destination}`);
  },

  /**
   * 카카오맵 키워드 검색 API
   *
   * @param keyword 위치 키워드
   */
  kakaoMap(keyword: string) {
    return httpRequestKakao.get(`/v2/local/search/keyword.json?query=${keyword}&page=1`);
  },
};

export default addressApi;
