import $ from 'jquery'
import router from 'page'
import Handlebars from 'hbsfy/runtime'

// templates
import homeTpl from './templates/home.hbs'
import notFoundTpl from './templates/not-found.hbs'

const $app = $('#app')

function index() {
  $app.html(homeTpl())
}

function notFound() {
  $app.html(notFoundTpl())
}

router('/', index)
router('*', notFound)
router()
