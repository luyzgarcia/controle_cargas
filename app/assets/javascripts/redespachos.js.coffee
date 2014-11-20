# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
jQuery ->
  $('#registros_table').find('tbody > tr').click ->
    linha = $(this).attr('id')
    alert('o id da linha clicada é ['+linha+']')

jQuery ->
  $('.currency').maskMoney();
  $('.datepicker').datepicker();
