export function request(qString) {
  fetch('localhost:8983/solr/gettingstarted/select?q=*:*',{ headers: {
    'Content-Type': 'application/json'}})
    .then(res => {
      return res
    })
}
