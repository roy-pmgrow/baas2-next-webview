import { httpRequest } from "./../httpRequest";

/**
 * 주소 API 키
 */
const confirmKey = "U01TX0FVVEgyMDIyMDUwOTEzMjcyMzExMjU0MTM=";

const addressApi = {
  /**
   * 주소 검색
   * @param keyword 검색 키워드
   */
  search(keyword: string) {
    return httpRequest.get(
      `/addrlink/addrLinkApi.do?confmKey=${confirmKey}&resultType=json&currentPage=0&countPerPage=30&keyword=${keyword}`,
    );
  },
};

export default addressApi;
