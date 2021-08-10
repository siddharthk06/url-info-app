import http from "../http-common";


class WordProcessorDataService {
  getAll() {
    return http.get("/wordprocessor/history");
  }

  fetchForUrl(url: string) {
    return http.get("/wordprocessor?url="+url);
  }

}

export default new WordProcessorDataService();