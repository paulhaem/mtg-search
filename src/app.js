import $ from 'jquery'
import router from 'page'
import Handlebars from 'hbsfy/runtime'

// templates
import homeTpl from './templates/home.hbs'
import notFoundTpl from './templates/not-found.hbs'
import resultTpl from './templates/result.hbs'
const $app = $('#app')

Handlebars.registerHelper('checker', function(data){
  return data < 0 ? '*': data
})


function search(){
  $('#solr-query').submit(function() {
    let input = $('#title-field').val()
    input = input.split(' ')
    let queryString = ''

    if (input[0]) { // empty check
      for (const str of input) {
        queryString += `setName_txt_en:*${str}*^1 artist_txt_en:*${str}*^1.5 name_txt_en:*${str}*^2 text_txt_sort:*${str}*^1 `
        queryString += `setName_txt_en:${str}^1 artist_txt_en:${str}^1.5 name_txt_en:${str}^2 text_txt_sort:${str}^1 `
      }
    }
    // query mit filter ??
    let choosen = []
    $('.form-check-input').each(function(index, el) {
      if(el.checked) choosen.push(el.value)
    })
    if(choosen.length > 0 ) {
      queryString += ` AND colors_txt_sort:`
      choosen.forEach(color => {
        queryString += color + '+OR+'
      })
      queryString = queryString.substring(0,(queryString.length - 4))

    }
    //console.log(queryString);
    input['colors'] = []
    input['colors'] = choosen
    fetch(`http://127.0.0.1:8983/solr/gettingstarted/select?q=${queryString}&rows=100`)
      .then(res => {
        return res.json()
      })
      .then(res => {
        results(res, input)
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

function results(obj, input){
  console.log(obj.response)
  $app.html(resultTpl(obj.response))
  $('h2 > #results-found').text(obj.response.numFound)
  $('h2 > #query-string').text(input)
  input['colors'].forEach(el => {
    $(`.form-check-input[value='${el}']`).prop('checked', true)
  })
  search()
}

function notFound() {
  $app.html(notFoundTpl())
}

router('/', index)
router('*', notFound)
router()
