function query(field, qString) {
  fetch(`http://127.0.0.1:8983/solr/gettingstarted/select?q=*:*`)
  .then((res) => {
    console.log(res)
  })
}
export {query}
