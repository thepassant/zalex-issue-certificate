//services
import { apiService } from "./HttpService";

class CertificateService {
  static sendCertificateData(data) {
    return apiService({
      method: "POST",
      url: "/request-certificate",
      data,
    });
  }
}

export default CertificateService;
