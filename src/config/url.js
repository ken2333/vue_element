
const devUrl = 'http://127.0.0.1:8081';
const proUrl = 'http://apiUrl.com';

export default {
  apiUrl : process.env.NODE_ENV=='development' ? devUrl : proUrl,
  apiPrefix : "api",
  gitHub : 'https://github.com/xusenlin/ElementUIAdmin2',
    webAppUrl:"http://127.0.0.1:8081"
}


