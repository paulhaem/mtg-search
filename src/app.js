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
    return false

    let queryString = $('#title-field').val()
    fetch(`http://78.104.197.112:8983/solr/gettingstarted/select?q=${queryString}`)
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then(json => {
        console.log(json)
        //$('#results').text(json)
      })
      .catch(err => {
        console.error(err)
      })

  })
}

function notFound() {
  $app.html(notFoundTpl())
}

router('/', index)
router('*', notFound)
router()
