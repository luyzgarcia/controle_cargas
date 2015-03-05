// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery2
//= require jquery_ujs
//= require twitter/bootstrap
/* require turbolinks*/
//= require wice_grid
//= require jquery.maskMoney.min.js
// require inputmask.js

//= require jquery.inputmask
//= require jquery.inputmask.extensions
//= require jquery.inputmask.numeric.extensions
//= require jquery.inputmask.date.extensions


// require bootstrap-datepicker.js
//= require tooltip.js
//= require validator.js
//= require jqwidgets/jqx-all
//= require jqwidgets/localization
//= require jqwidgets/globalize
//= require jqwidgets/globalize.culture.pt-BR
// require_tree ../../../vendor/assets/javascripts/.
// require_tree ../../../vendor/assets/javascripts/theme/AdminLTE/plugins/.
//= require_tree ../../../vendor/assets/javascripts/theme/AdminLTE/plugins/morris/.
//= require_tree ../../../vendor/assets/javascripts/theme/AdminLTE/plugins/sparkline/.
//= require_tree ../../../vendor/assets/javascripts/theme/AdminLTE/plugins/jvectormap/.
//= require_tree ../../../vendor/assets/javascripts/theme/AdminLTE/plugins/datepicker/.
//= require_tree ../../../vendor/assets/javascripts/theme/AdminLTE/plugins/daterangepicker/.

// require_tree ../../../vendor/assets/javascripts/theme/AdminLTE/plugins/input-mask/.
// require ../../../vendor/assets/javascripts/theme/AdminLTE/plugins/input-mask/jquery.inputmask
// require ../../../vendor/assets/javascripts/theme/AdminLTE/plugins/input-mask/jquery.inputmask.date.extensions
// require ../../../vendor/assets/javascripts/theme/AdminLTE/plugins/input-mask/jquery.inputmask.extensions
// require jqxgrid
// require empresas
// require redespachos

// require ../../../vendor/assets/javascripts/remote_validation/remote_validation

// require_tree ./global


$(document).ready(function() {
    $(".data-mask").inputmask();
});


settings= {
    messageContainer : '#error_messages',
    messageHtml : "<div id='error_explanation' class='callout callout-danger'><h4>{{NUM_ERRORS}} Erros foram econtrandos:</h4>{{ERRORS}}</div>",
    noErrorClass: 'field',
    errorClass : 'field_with_errors'
};

function mostrar_errors(form, errors) {
  
	limpar_mensagens(form);
	var errorList ="";
	var formFor = $(form).attr('id').replace(/new_|edit_/,"").replace(/_[0-9]+$/,"");
	var numErrors = 0;
	for (var col in errors) {
	    for (var i in errors[col]) {
	    	errorList += "<li> "+errors[col][i]+"</li>";
	    	$("*[name='"+formFor+"["+col+"]']", form).wrap($("<div/>").addClass(settings.errorClass));
	    	$("label[for='"+formFor+"_"+col+"']", form).wrap($("<div/>").addClass(settings.errorClass));
	    	numErrors++;
	    }
	}
	var errorHtml = settings.messageHtml.replace("{{NUM_ERRORS}}", numErrors);
	errorHtml = errorHtml.replace("{{ERRORS}}","<ul>"+errorList+"</ul>");
	$(settings.messageContainer).append(errorHtml);
}

function limpar_mensagens(form) {
	//Reseta as mensagens
	$(settings.messageContainer).empty();
	$("."+settings.errorClass, form).children().unwrap();
}
