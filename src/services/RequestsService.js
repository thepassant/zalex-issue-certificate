//services
import { apiService } from "./HttpService";

class RequestsService {
  static fetchRequestsList() {
    return apiService({
      method: "GET",
      url: "/request-list",
    });
  }
}

export default RequestsService;
