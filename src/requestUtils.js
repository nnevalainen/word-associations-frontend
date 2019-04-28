import axios from 'axios';

const rootUrl = process.env.REACT_APP_ROOT_URL;

class requestClient {

  request(config) {
    return axios.request(config);
  };

  get(url, params=null) {
    const config = {...{
      method: 'get',
      url: `${rootUrl}/${url}`
    }, params};
    return this.request(config)
  }

  post(url, data, options=null) {
    const config = {...{
      method: 'post',
      url: `${rootUrl}/${url}`,
      data: data
    }, options};
    return this.request(config)
  }

}

export default requestClient;