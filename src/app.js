import $ from 'jquery'
import router from 'page'
import Handlebars from 'hbsfy/runtime'

// templates
import homeTpl from './templates/home.hbs'
import notFoundTpl from './templates/not-found.hbs'

const $app = $('#app')

function index() {
  $app.html(homeTpl())
  $('#solr-query').submit(function() {

    fetch('http://78.104.86.90:8983/solr/gettingstarted/select?q=*:*')
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then(res => {
        console.log(res);

        //$('#results').text(json)
      })
      .catch(err => {
        console.error(err)
      })

    return false
  })

}

function notFound() {
  $app.html(notFoundTpl())
}

router('/', index)
router('*', notFound)
router()
