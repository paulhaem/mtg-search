import $ from 'jquery'
import router from 'page'
import Handlebars from 'hbsfy/runtime'

// templates
import homeTpl from './templates/home.hbs'
import notFoundTpl from './templates/not-found.hbs'
import resultTpl from './templates/result.hbs'
const $app = $('#app')

function index() {
  $app.html(homeTpl())
  $('#solr-query').submit(function() {
    let helper = $('#title-field').val()
    helper = helper.split(' ')
    let queryString = ''
    for (const str of helper) {
      queryString += `setName_txt_en:${str} OR `
      queryString += `artist_txt_en:${str} OR `
      queryString += `name_txt_en:${str} OR `
      queryString += `text_txt_sort:${str}`
    }
    console.log($('#title-field').val().split(' '));

    let filter = [...filter]
    let queryFilter = ''
    if (filter[0]) {
      for (const str of filter) {
        queryFilter += str + ','
      }
      queryFilter.substring(0,queryFilter.length -1)
    }
    else{
      queryFilter = '*'
    }


    fetch(`http://127.0.0.1:8983/solr/gettingstarted/select?fl=${queryFilter}&q=${queryString}`)
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
