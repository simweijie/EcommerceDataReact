import http from "../http-common";

class DataSetService {
  getAll(params) {
    return http.get("/api/csv/tutorials/findByInvoiceNo", { params });
  }

  // other CRUD methods
}

export default new DataSetService();
