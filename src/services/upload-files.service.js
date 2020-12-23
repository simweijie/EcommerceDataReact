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
}

export default new UploadFilesService();