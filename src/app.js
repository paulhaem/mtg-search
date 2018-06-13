import $ from 'jquery'
import router from 'page'
import Handlebars from 'hbsfy/runtime'

// templates
import homeTpl from './templates/home.hbs'
import notFoundTpl from './templates/not-found.hbs'
import resultTpl from './templates/result.hbs'
const $app = $('#app')

Handlebars.registerHelper('powers', function(powers){
  return 2018 - parseInt(date.substr(0,4))
})

function search(){
  $('#solr-query').submit(function() {
    let input = $('#title-field').val()
    input = input.split(' ')
    let queryString = ''

    if (input[0]) { // empty check
      for (const str of input) {
        queryString += `setName_txt_en:*${str}* OR artist_txt_en:*${str}* OR name_txt_en:*${str}* OR text_txt_sort:*${str}*`
      }
    }
    // query mit filter ??
    //queryString += ` AND cmc_i:2`

    console.log(queryString);


    let filter = [...filter]
    let queryFilter = ''
    if (filter[0]) { // empty check
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

function index() {
  $app.html(homeTpl())
  search()
}

function results(obj){
  console.log(obj.response);
  $app.html(resultTpl(obj.response))
  search()
}

function notFound() {
  $app.html(notFoundTpl())
}

router('/', index)
router('*', notFound)
router()
