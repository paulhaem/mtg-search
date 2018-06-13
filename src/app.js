import $ from 'jquery'
import router from 'page'
import Handlebars from 'hbsfy/runtime'

// templates
import homeTpl from './templates/home.hbs'
import notFoundTpl from './templates/not-found.hbs'
import resultTpl from './templates/result.hbs'
const $app = $('#app')

// 78.104.197.112
function index() {
  $app.html(homeTpl())
  $('#solr-query').submit(function() {
    let queryString = $('#title-field').val()
    fetch(`http://127.0.0.1:8983/solr/gettingstarted/select?q=${queryString}`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        //console.log(res);
        results(res)
        //$('#results').text(json)
      })
      .catch(err => {
        console.error(err)
      })
      return false
  })
}

function results(obj){
  console.log(obj.response);

  $app.html(resultTpl(obj.response))
}

function notFound() {
  $app.html(notFoundTpl())
}

router('/', index)
router('*', notFound)
router()
