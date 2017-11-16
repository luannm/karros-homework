import axios from 'axios';
import qs from 'query-string';

const request = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/'
});

class YelpApi {
  constructor() {
    this.clientId = process.env.REACT_APP_YELP_CLIENT_ID;
    this.clientSecret = process.env.REACT_APP_YELP_CLIENT_SECRET;
    this.accessToken = '';
  }

  getAccessToken() {
    if (this.accessToken) {
      return Promise.resolve(this.accessToken);
    }
    return request.post('/oauth2/token', qs.stringify({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'client_credentials'
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
      this.accessToken = response.data.access_token;
      return this.accessToken;
    });
  }

  get(resource, params = {}) {
    return this.getAccessToken().then((token) => {
      return request.get(`/v3/${resource}`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response)
        .catch((err) => {
          if (err.statusCode === 401) {
            this.accessToken = null;
            return this.get(resource, params);
          }
          throw err;
        });
    });
  }

  search(params) {
    return this.get('businesses/search', params);
  }

  autocomplete(params) {
    return this.get('autocomplete', params);
  }
}

export default new YelpApi();
