import $ from 'jquery'
import router from 'page'
import Handlebars from 'hbsfy/runtime'
//import query from './solr-query'

// templates
import homeTpl from './templates/home.hbs'
import notFoundTpl from './templates/not-found.hbs'

function query(field, qString) {
  fetch(`127.0.0.1:8983/solr/gettingstarted/select?q=*:*`)
  .then((res) => {
    console.log(res)
  })
}

const $app = $('#app')

function index() {
  $app.html(homeTpl())
  query()
  $('#solr-query').submit(function() {
    console.info($('#title-field').val())
    return false
  })

}

function notFound() {
  $app.html(notFoundTpl())
}

router('/', index)
router('*', notFound)
router()
