import { Platform } from "react-native";

let baseURL = "";

if (Platform.OS == "android") {
  baseURL = "http://172.20.10.4:8081";
} else {
  baseURL = "http://172.20.10.4:8081";
}

export default baseURL;
