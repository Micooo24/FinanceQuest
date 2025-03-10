import { Platform } from 'react-native'


let baseURL = '';

{Platform.OS == 'android'
? baseURL = 'http://172.20.10.2:8081'
: baseURL = 'http://172.20.10.3:8081'
}

export default baseURL;