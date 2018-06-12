function query(field, qString) {
  fetch('http://78.104.86.90:8983/solr/gettingstarted/select?q=*:*')
  .then((res) => {
    console.log(res)
  })
}
