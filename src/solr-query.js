// solr at 127.0.0.1:8983
const solr = require('solr')
const client = solr.createClient()
var doc1 = {
  id: '1',
  title_t: 'Foo bar',
  text_t: 'Fizz buzz frizzle'
}
var doc2 = {
  id: '2',
  title_t: 'Far boo',
  text_t: 'Wuzz fizz drizzle'
}
function query(field, qString) {
  client.commit(function(err) {
    var query = `${field}:${qString}`
    client.query(query, function(err, response) {
      if (err) throw err
      var responseObj = JSON.parse(response)
      console.log('A search for "' + query + '" returned ' +
          responseObj.response.numFound + ' documents.')
      console.log('Response Obj: ' + responseObj)
    })
  })

}
export {query}
