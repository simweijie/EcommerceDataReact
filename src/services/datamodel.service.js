import http from "../http-common";

class DataSetService {
  getAll(params) {
    return http.get("/tutorials", { params });
  }

  // other CRUD methods
}

export default new TutorialDataService();
