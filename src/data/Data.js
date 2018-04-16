import Auth from '../components/users/Auth'
const baseUrl = 'http://localhost:5000/'

const getOptions = () => ({
  mode: 'cors',
  headers: {
    'Accept': 'application/json',
    'Content-Type' : 'application/json'
  }
})

const handleJsonResponse = res => res.json()

class Data {
  static post(url, data, authenticated) {
    let options = getOptions()

    options.method = 'POST'
    options.body = JSON.stringify(data)

    if(data == null) {
      options.body = ''
    }

    if(authenticated) {
      options.headers.Authorization = `beared ${Auth.getToken()}`
    }

    return window.fetch(`${baseUrl}${url}`,
    options)
    .then(handleJsonResponse)
  }
  static get(url, authenticated) {
    let options = getOptions()
    options.method = 'GET'
    if(authenticated) {
      options.headers.Authorization = `beared ${Auth.getToken()}`
    }

    return window.fetch(`${baseUrl}${url}`,
    options)
    .then(handleJsonResponse)
  }
}

export default Data