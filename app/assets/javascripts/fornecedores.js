var theme = 'controllog';

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
		height: 620, 
		width: 850,
		maxWidth: 850,
		maxHeight: 620,
		isModal: true,
		dragArea: { left: 0, top: 45, width: 0, height: 0 }
	 }).on('close', function (event) {
        limpar_mensagens($('#new_fornecedor'));
    });
});
var grid = '';

function geraEmpresas(div) {
	grid = div;
	
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
			{name: 'cidade', type: 'string'},
			{name: 'cnpj'}
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
		width: '100%',
		theme: theme,
		source: dataAdapter,
		pageable: true,
		autoheight: true,
		sortable: true,
		altrows: true,
		pagesize: 50,
		columnsresize: true,
		showtoolbar: true,
		rendertoolbar: function (toolbar) {
			var me = this;
			var container = $("<div class='botoes_grid' style='margin: 5px'></div>");
			toolbar.append(container);
			container.append("<input id='addnewregister' class='addnewregister' type='button' value='Novo fornecedor' />");
	  		$('.addnewregister').jqxButton({theme: theme});
	  		$(".addnewregister").on('click', function () {
	  			$("#nova_empresa_window input[type='text']").val('');
	  			//$('#new_empresa').get(0).setAttribute('action', '/empresas); //this works
				
	  			$("#nova_empresa_window").jqxWindow({
  		 			title: 'Novo fornecedor'
  		 		});
  		 		$("#new_fornecedor").unbind( "submit");
  		 		$('#new_fornecedor').submit(function() {
					$.ajax({
					  type: "POST",
					  url: "/fornecedores",
					  data: $('#new_fornecedor').serialize(),
					  success: function(event, request, settings ) {
					  	$(div).jqxGrid('addrow', null, event	);
						$("#nova_empresa_window").jqxWindow('hide');
						$("#nova_empresa_window input[type='text']").val('');
					  },
					  error: function(e){
						  var data = JSON.parse(xhr.responseText);
			              mostrar_errors($('#new_fornecedor'), data);
					  }
					});
					return false;
					
				});
  		 		$("#nova_empresa_window").jqxWindow('open');
  		 		$('.btn_fechar').click(function () {
                    $('#nova_empresa_window').jqxWindow('close');
                });
	  		});
	  		container.append("<input id='refresh' class='refresh' type='button' value='Atualizar' />");
	            $('.refresh').jqxButton({theme: theme});
	            $(".refresh").on('click', function () {
	                $(div).jqxGrid('updatebounddata');
	        });
	  	}, 
		enabletooltips:  true,
		editable: true,
		selectionmode: "multiplecells",
		columns: [
			{text: 'Editar', datafield: 'Editar', columntype: 'button', width: '100px', cellsrenderer: function() {
                return 'Editar';
                }, buttonclick: function(row) {
                    var dataRecord = $(div).jqxGrid('getrowdata', row);
                    editar_registro(dataRecord);
                        
                }
            },
             { text: 'Excluir', datafield: 'Excluir', columntype: 'button', width: '100px',align:'center', cellsrenderer: function () {
                     return "Excluir";
                  }, buttonclick: function (row) {
                      
                    var dataRecord = $(div).jqxGrid('getrowdata', row);
                    excluir_registro(dataRecord);
                  }
            },
			{text: 'Nome', columngroup: 'dados', width: '150px', datafield: 'nome'},
			{text: 'Razão Social', columngroup: 'dados', datafield: 'razao_social'},
			{text: 'Email', columngroup: 'dados', datafield: 'email'},
			{text: 'Telefone', columngroup: 'dados', datafield: 'telefone'},
			{text: 'Responsavel', columngroup: 'dados', datafield: 'responsavel'},
			{text: 'Cidade', columngroup: 'dados', datafield: 'cidade'},
			
		]
		,
		columngroups: [
			{text: 'Dados da empresa', align: 'center', name: 'dados'}
		]
	});
    
}

function excluir_registro(dataRecord) {
    var r = confirm("Tem certeza?");
	    if(r == true) {
	        $.ajax({
	          type: "DELETE",
	          url: "/fornecedores/"+dataRecord.id,
	          success: function(event, request, settings ) {
	              },
	              error: function(e){
	                  
	              }
	            });
	       $(grid).jqxGrid('updatebounddata');
	} 
}
function editar_registro(dataRecord) {
	
	$('#fornecedor_nome').val(dataRecord.nome);
	$('#fornecedor_razao_social').val(dataRecord.razao_social);
	$('#fornecedor_cnpj').val(dataRecord.cnpj);
	$('#fornecedor_email').val(dataRecord.email);
	$('#fornecedor_telefone').val(dataRecord.telefone);
	$('#fornecedor_responsavel').val(dataRecord.responsavel);
	$('#fornecedor_cidade').val(dataRecord.cidade);
	
	//Abrea a janela
	$("#nova_empresa_window").jqxWindow({
			title: 'Editar empresa' 
		});
	$("#nova_empresa_window").jqxWindow('open');
	
	$('.btn_fechar').click(function () {
        $('#nova_empresa_window').jqxWindow('close');
    });
	//$('#new_empresa').get(0).setAttribute('action', '/empresas/'+dataRecord.id); //this works
	$('#new_fornecedor').unbind( "submit");
	$('#new_fornecedor').submit(function() {
		$.ajax({
		  type: "PATCH",
		  url: "/fornecedores/"+dataRecord.id,
		  data: $('#new_fornecedor').serialize(),
		  success: function(e) {
			  $("#nova_empresa_window").jqxWindow('hide');
              $(grid).jqxGrid('updatebounddata');
              $("#nova_empresa_window input[type='text']").val('');
		  },
		  error: function(e){
			  var data = JSON.parse(xhr.responseText);
              mostrar_errors($('#new_fornecedor'), data);
		  }
		});
		
		return false;
		
	});
}