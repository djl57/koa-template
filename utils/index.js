class Utils {
  urlToParamArr(str) {
    const search = str.split('?')[1]
    const params = search.split('&')
    return params
  }
}

module.exports = new Utils();
