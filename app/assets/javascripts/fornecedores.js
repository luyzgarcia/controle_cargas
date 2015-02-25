var theme = 'arctic';

$(document).ready(function() {
	geraEmpresas($("#grid_empresas"));
	
	
	
	$('#nova_empresa_window').jqxWindow({
	     theme: 'arctic',
	     autoOpen: false,
	     position: {
				x:  60, 
				y:  60
			},
		showCollapseButton: false,
		resizable: false, 
		height: 200, 
		width: 350,
		isModal: true,
		dragArea: { left: 0, top: 45, width: 0, height: 0 }
	 });
});

function geraEmpresas(div) {
	  
	
	var url = "/fornecedores.json";
	var source = {
		datatype: "json",
		datafields: [
			{name: 'id', type: 'hidden'},
			{name: 'nome', type: 'string'},
			{name: 'razao_social', type: 'string'},
			{name: 'email', type: 'string'},
			{name: 'telefone', type: 'string'},
			{name: 'responsavel', type: 'string'},
			{name: 'cidade', type: 'string'}
		],
		addrow: function(rowid, rowdata, position, commit) {
			commit(true);
		},
		id: "id",
		url: url
	};
	
	var dataAdapter = new $.jqx.dataAdapter(source, {
		downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
	});
	
	$(div).jqxGrid({
		width: '98%',
		theme: 'arctic',
		source: dataAdapter,
		pageable: true,
		autoheight: true,
		sortable: true,
		altrows: true,
		pagesize: 50,
		showtoolbar: true,
		rendertoolbar: function (toolbar) {
			var me = this;
			var container = $("<div style='margin: 5px'></div>");
			toolbar.append(container);
			container.append("<input id='addnewregister' class='addnewregister' type='button' value='Nova empresa' />");
	  		$('.addnewregister').jqxButton();
	  		$(".addnewregister").on('click', function () {
	  			$("#nova_empresa_window input[type='text']").val('');
	  			//$('#new_empresa').get(0).setAttribute('action', '/empresas); //this works
				
	  			$("#nova_empresa_window").jqxWindow({
  		 			title: 'Nova empresa'
  		 		});
  		 		$( "#new_empresa" ).unbind( "submit");
  		 		$('#new_empresa').submit(function() {
					$.ajax({
					  type: "POST",
					  url: "/empresas",
					  data: $('#new_empresa').serialize(),
					  success: function(event, request, settings ) {
					  	$(div).jqxGrid('addrow', null, event	);
						$("#nova_empresa_window").jqxWindow('hide');
						$("#nova_empresa_window input[type='text']").val('');
					  },
					  error: function(e){
					  }
					});
					return false;
					
				});
  		 		$("#nova_empresa_window").jqxWindow('open');
  		 		$('.btn_fechar').click(function () {
                    $('#nova_empresa_window').jqxWindow('close');
                });
                /*
                $("#new_empresa").bind('ajax:success', function( event, request, settings ) {
					console.log(event);
				  	console.log(request); // retorna um xml do registro salvo
				  	console.log(settings); //retorna Success
					//Adiciona o novo registro a tabela
					$(div).jqxGrid('addrow', null, request);
					$("#nova_empresa_window").jqxWindow('hide');
					$("#nova_empresa_window input").val('');
				}).bind('ajax:error', function( event, request, settings ) {
				  alert( "<li>Error on Request!</li>" );
				});
                */
	  		});	  		
	  	}, 
		enabletooltips:  true,
		editable: true,
		selectionmode: "multiplecells",
		columns: [
			{text: 'Nome', columngroup: 'dados', datafield: 'nome'},
			{text: 'Razão Social', columngroup: 'dados', datafield: 'razao_social'},
			{text: 'Email', columngroup: 'dados', datafield: 'email'},
			{text: 'Telefone', columngroup: 'dados', datafield: 'telefone'},
			{text: 'Responsavel', columngroup: 'dados', datafield: 'responsavel'},
			{text: 'Cidade', columngroup: 'dados', datafield: 'cidade'},
			{text: 'Editar', datafield: 'Editar', columntype: 'button', cellsrenderer: function() {
				return 'Editar';
			}, buttonclick: function(row) {
				editrow = row;
				var dataRecord = $('#grid_empresas').jqxGrid('getrowdata', editrow);
				
				$('#empresa_nome').val(dataRecord.nome);
				$('#empresa_razao_social').val(dataRecord.razao_social);
				$('#empresa_cnpj').val(dataRecord.cnpj);
				$('#empresa_email').val(dataRecord.email);
				$('#empresa_telefone').val(dataRecord.telefone);
				$('#empresa_responsavel').val(dataRecord.responsavel);
				$('#empresa_cidade').val(dataRecord.cidade);
				
				//Abrea a janela
				$("#nova_empresa_window").jqxWindow({
  		 			title: 'Editar empresa' 
  		 		});
				$("#nova_empresa_window").jqxWindow('open');
				
				$('.btn_fechar').click(function () {
                    $('#nova_empresa_window').jqxWindow('close');
                });
				//$('#new_empresa').get(0).setAttribute('action', '/empresas/'+dataRecord.id); //this works
				$( "#new_empresa" ).unbind( "submit");
				$('#new_empresa').submit(function() {
					$.ajax({
					  type: "PATCH",
					  url: "/empresas/"+dataRecord.id,
					  data: $('#new_empresa').serialize(),
					  success: function(e) {
					  },
					  error: function(e){
					  }
					});
					var row = { 
						nome: $("#empresa_nome").val(),
						razao_social: $("#empresa_razao_social").val(),
						cnpj: $("#empresa_cnpj").val(),
						email: $("#empresa_email").val(),
						telefone: $("#empresa_telefone").val(),
						responsavel: $("#empresa_responsavel").val(),
						cidade: $("#empresa_cidade").val(),
                    };
					var rowID = $('#grid_empresas').jqxGrid('getrowid', editrow);
                    $('#grid_empresas').jqxGrid('updaterow', rowID, row);
					$('#nova_empresa_window').jqxWindow('close');
					return false;
					
				});
				
			}
			}
		]
		,
		columngroups: [
			{text: 'Dados da empresa', align: 'center', name: 'dados'}
		]
	});
    $("#Cancel").jqxButton({ theme: 'arctic' });
    $("#Save").jqxButton({ theme: 'arctic' });
    $(".input_class").jqxInput({ theme: theme });
}