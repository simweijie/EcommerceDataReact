import http from "../http-common";

class DataSetService {
  getAll(params) {
    return http.get("/api/csv/datasets/findByInvoiceNo", { params });
  }

  // other CRUD methods
}

export default new DataSetService();
