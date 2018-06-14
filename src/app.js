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

let input
function search(){
  $('#solr-query').submit(function() {
    input = $('#title-field').val()
    input = input.split(' ')
    let queryString = ''

    if (input[0]) { // empty check
      queryString = creatQueryString(input)
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
    // http://127.0.0.1:8983/solr/gettingstarted/spell?q=${queryString}&rows=100
    // spellchecker http://127.0.0.1:8983/solr/gettingstarted/spell?q=${input}&rows=100
    request(queryString)
    return false
  })
}

function creatQueryString(inputs){
  let queryString = ''
  for (const str of inputs) {
    queryString += `setName_txt_en:*${str}*^1 artist_txt_en:*${str}*^1.5 name_txt_en:*${str}*^2 text_txt_sort:*${str}*^1 `
    queryString += `setName_txt_en:${str}^1 artist_txt_en:${str}^1.5 name_txt_en:${str}^2 text_txt_sort:${str}^1 `
  }
  console.log(queryString);
  return queryString
}

function request(queryString){
  fetch(`http://127.0.0.1:8983/solr/gettingstarted/spell?q=${queryString}&rows=100`)
  .then(res => {
    return res.json()
  })
  .then(res => {
    results(res, input)
  })
  .catch(err => {
    console.error(err)
  })
}

function index() {
  $app.html(homeTpl())
  search()
}

function results(obj, input){
  console.log(obj)
  $app.html(resultTpl(obj.response))
  if (obj.response.numFound > 0) {
    $('h2 > #results-found').text(obj.response.numFound)
    $('h2 > #query-string').text(input)
    input['colors'].forEach(el => {
      $(`.form-check-input[value='${el}']`).prop('checked', true)
    })
  }
  else{
    let word = obj.spellcheck.suggestions[1].suggestion[0].word.split(' ')
    request(creatQueryString(word))
  }

  search()
}

function notFound() {
  $app.html(notFoundTpl())
}

router('/', index)
router('*', notFound)
router()
