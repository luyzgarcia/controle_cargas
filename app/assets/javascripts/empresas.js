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
		height: 535, 
		width: 850,
		maxWidth: 850,
		isModal: true,
		dragArea: { left: 0, top: 45, width: 0, height: 0 },
		
	 }).on('close', function (event) {
        limpar_mensagens($('#new_empresa'));
    });
	 
     //$(".new_empresa").remoteValidation();
});

var grid = '';

function geraEmpresas(div) {
	grid = div;
	
	var url = "/empresas.json";
	var source = {
		datatype: "json",
		datafields: [
			{name: 'id', type: 'hidden'},
			{name: 'nome', type: 'string'},
			{name: 'razao_social', type: 'string'},
			{name: 'cnpj', type: 'string'},
			{name: 'email', type: 'string'},
			{name: 'telefone', type: 'string'},
			{name: 'endereco', type: 'string'},
			{name: 'responsavel'},
			{name: 'cidade', type: 'string'},
			{name: 'estado', type: 'string'},
			{name: 'status', type: 'string'},
			{name: 'supervisor_id', map:'supervisor>id', type: 'hidden'},
			{name: 'supervisor_nome', map: 'supervisor>nome', type: 'string'},
			{name: 'supervisor_email', map: 'supervisor>email', type: 'string'},
			{name: 'supervisor_role', map: 'supervisor>role', type: 'string'}
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
        pageable: true,
        autoheight: true,
        sortable: true,
        altrows: true,
        pagesize: 20,
        showtoolbar: true,
		theme: 'controllog',
		source: dataAdapter,
		rendertoolbar: function (toolbar) {
			var me = this;
			var container = $("<div class='botoes_grid' style='margin: 5px'></div>");
			toolbar.append(container);
			container.append("<input id='addnewregister' class='addnewregister' type='button' value='Nova empresa' />");
	  		
	  		$('.addnewregister').jqxButton({theme: theme});
	  		$(".addnewregister").on('click', function () {
	  			$("#nova_empresa_window input[type='text']").val('');
	  			//$('#new_empresa').get(0).setAttribute('action', '/empresas); //this works
				
	  			$("#nova_empresa_window").jqxWindow({
  		 			title: 'Nova empresa'
  		 		});
  		 		$( "#new_empresa" ).unbind( "submit");
  		 		var $this = this;
  		 		$('#new_empresa').submit(function() {
					$.ajax({
					  type: "POST",
					  url: "/empresas",
					  data: $('#new_empresa').serialize(),
					  success: function(event, request, settings ) {
						$("#nova_empresa_window").jqxWindow('hide');
						$("#nova_empresa_window input[type='text']").val('');
                        $(div).jqxGrid('updatebounddata');
					  },
					  error: function(xhr, status, error) {
					    var data = JSON.parse(xhr.responseText);
					    mostrar_errors($this, data);
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
		    {text: 'Nome', columngroup: 'dados', width: '100px',datafield: 'nome'},
		    {text: 'Razao social', columngroup: 'dados', width: '100px', datafield: 'razao_social'},
			{text: 'CNPJ', columngroup: 'dados', width: '100px', datafield: 'cnpj'},
			{text: 'Email', columngroup: 'dados', width: '100px', datafield: 'email'},
			{text: 'Telefone', columngroup: 'dados', width: '150px', datafield: 'telefone'},
			{text: 'Responsavel', columngroup: 'dados', width: '100px', datafield: 'responsavel'},
			{text: 'Endereco', columngroup: 'dados', width: '100px', datafield: 'endereco'},
			{text: 'Cidade', columngroup: 'dados', width: '100px', datafield: 'cidade'},
			{text: 'Estado', columngroup: 'dados', width: '100px', datafield: 'estado'},
			{text: 'Usuario admin', columngroup: 'dados', width: '150px', datafield: 'supervisor_nome'},
			
		]
		,
		columngroups: [
			{text: 'Dados da empresa', align: 'center', name: 'dados'}
		]
	});
    //$("#Cancel").jqxButton({ theme: 'arctic' });
    //$("#Save").jqxButton({ theme: 'arctic' });
    //$(".input_class").jqxInput({ theme: theme });
	 $(".combo").jqxDropDownList({ theme: theme,  width: '100%', height: '35' });
}

function excluir_registro(dataRecord) {
    var r = confirm("Tem certeza?");
    if(r == true) {
        $.ajax({
          type: "DELETE",
          url: "/empresas/"+dataRecord.id,
          success: function(event, request, settings ) {
              },
              error: function(e){
                  
              }
            });
       $(grid).jqxGrid('updatebounddata');
   } 
}


function editar_registro(dataRecord) {
	
	var status_index = $('#empresa_supervisor_attributes_role_jqxDropDownList').jqxDropDownList('getItemByValue', dataRecord.supervisor_role);
	console.log(status_index);
	
    $('#empresa_supervisor_attributes_role_jqxDropDownList').jqxDropDownList({selectedIndex: status_index.index});
    
    
    $('#empresa_nome').val(dataRecord.nome);
    $('#empresa_razao_social').val(dataRecord.razao_social);
    $('#empresa_cnpj').val(dataRecord.cnpj);
    $('#empresa_telefone').val(dataRecord.telefone);
    $('#empresa_endereco').val(dataRecord.endereco);
    $('#empresa_cidade').val(dataRecord.cidade);
    
    $('#empresa_estado').val(dataRecord.estado);
    
    $('#empresa_email').val(dataRecord.email);
    
    $('#empresa_responsavel').val(dataRecord.responsavel);
    
    //Supervisor
    $('#empresa_supervisor_attributes_id').val(dataRecord.supervisor_id);
    $('#empresa_supervisor_attributes_nome').val(dataRecord.supervisor_nome);
    $('#empresa_supervisor_attributes_email').val(dataRecord.supervisor_email);
    
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
              var row = { 
                nome: $("#empresa_nome").val(),
                razao_social: $("#empresa_razao_social").val(),
                cnpj: $("#empresa_cnpj").val(),
                email: $("#empresa_email").val(),
                telefone: $("#empresa_telefone").val(),
                responsavel: $("#empresa_responsavel").val(),
                cidade: $("#empresa_cidade").val(),
            };
               $("#nova_empresa_window").jqxWindow('hide');
               $(grid).jqxGrid('updatebounddata');
               $("#nova_empresa_window input[type='text']").val('');
          },
          error: function(xhr, status, error) {
               var data = JSON.parse(xhr.responseText);
                mostrar_errors($('#new_empresa'), data);
          }
        });
        
        return false;
        
    });

}








