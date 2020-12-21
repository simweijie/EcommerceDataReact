import http from "../http-common";

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return http.post("/api/csv/upload", formData, {
      headers: {
        "Content-Type": "text/csv",
      },
      onUploadProgress,
    });
  }

  getAll(params) {
    return http.get("/api/csv/tutorials/findByInvoiceNo", { params });
  }
}

export default new UploadFilesService();