var theme = 'controllog';

$(document).ready(function() {
    geraGrid($("#grid_users"));   
    
    
    $('#new_register_window').jqxWindow({
         theme: theme,
         autoOpen: false,
         position: {
                x:  60, 
                y:  60
            },
        showCollapseButton: false,
        resizable: false, 
        height: 440, 
        width: 500,
        maxWidth: 500,
        maxHeight: 555,
        isModal: true,
        dragArea: { left: 0, top: 45, width: 0, height: 0 }
     }).on('close', function (event) {
         limpar_mensagens($('#new_user'));
     });
     
});

var grid = '';

function geraGrid(div) {
    grid = div;
    
    var url = "/users.json";
    var source = {
        datatype: "json",
        datafields: [
            {name: 'id', type: 'string'},
            {name: 'nome'},
            {name: 'email'},
            {name: 'status'}          
            
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
    var localizationobj = {};
    //localizationobj.pagershowrowsstring = "Anterior:";
    //localizationobj.currencysymbol = "R$";
    $(div).jqxGrid({
        localization: getLocalization('pt-BR'),
        source: dataAdapter,
        width: '100%',
        pageable: true,
        autoheight: true,
        sortable: true,
        altrows: true,
        pagesize: 20,
        showtoolbar: true,
        theme: 'controllog',
        rendertoolbar: function (toolbar) {
            var me = this;
            var container = $("<div class='botoes_grid' style='margin: 5px'></div>");
            toolbar.append(container);
            container.append("<input id='addnewregister' class='addnewregister' type='button' value='Nova Usuário' />");
            $('.addnewregister').jqxButton({theme: theme});
            $(".addnewregister").on('click', function () {
                //document.getElementById('new_register').reset();
                //$('#new_empresa').get(0).setAttribute('action', '/empresas); //this works
            	$("#new_register_window input[type='text']").val('');
                $("#new_register_window").jqxWindow({
                    title: 'Novo Usuário'
                });
                $( "#new_user" ).unbind("submit");
                var $this = this;
                $('#new_user').submit(function() {
                    $.ajax({
                      type: "POST",
                      url: "/users",
                      data: $('#new_user').serialize(),
                      success: function(event, request, settings ) {
                          //console.log(event);
                          //$(div).jqxGrid('addrow', null, event);
                          $("#new_register_window").jqxWindow('hide');
                          $("#new_register_window input[type='text']").val('');
                          $(div).jqxGrid('updatebounddata');
                      },
                      error: function(xhr, status, error){
                    	  var data = JSON.parse(xhr.responseText);
  					      mostrar_errors($this, data);
                      }
                    });
                    return false;                   
                });
                $("#new_register_window").jqxWindow('open');
                $('.btn_fechar').click(function () {
                    $('#new_register_window').jqxWindow('close');
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
        selectionmode: 'singlerow',
        editmode: 'dblclick',
        enablemousewheel: false,
        columns: [
              { text: 'Excluir', datafield: 'Excluir', columntype: 'button', width: '5%',align:'center', cellsrenderer: function () {
                     return "Excluir";
                  }, buttonclick: function (row) {
                      
                    var dataRecord = $(div).jqxGrid('getrowdata', row);
                    excluir_registro(dataRecord);
                  }
            },
            { text: 'Editar', datafield: 'Edit', columntype: 'button', width: '5%',align:'center', cellsrenderer: function () {
                     return "Editar";
                  }, buttonclick: function (row) {
                    var dataRecord = $(div).jqxGrid('getrowdata', row);
                    editar_registro(dataRecord);
                  }
            },
            {text: 'Codigo', columngroup: 'dados', datafield: 'id', width: '10%', editable: false},
            
            {text: 'Nome', columngroup: 'dados', datafield: 'nome', width: '30%',
              cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                    if (newvalue != oldvalue) { 
                        var dataRecord = $(div).jqxGrid('getrowdata', row);
                        var obj = {
                           id: dataRecord.id,
                           dados: {nome: newvalue}  
                        };
                        atualiza_servidor(obj);                        
                    }
                 }
            },
            {text: 'Email', columngroup: 'dados', datafield: 'email', width: '30%',
              cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                    if (newvalue != oldvalue) { 
                        var dataRecord = $(div).jqxGrid('getrowdata', row);
                        var obj = {
                           id: dataRecord.id,
                           dados: {email: newvalue}  
                        };
                        atualiza_servidor(obj);                        
                    }
                 }
            },
            {text: 'Status', columngroup: 'dados', datafield: 'status', width: '20%', columntype: 'dropdownlist' ,
                 createeditor: function (row, column, editor) {
                     var list = ['Ativo','Inativo'];                     
                     editor.jqxDropDownList({autoDropDownHeight: true, source: list});
                 },
                 cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                    if (newvalue != oldvalue) { 
                        var dataRecord = $(div).jqxGrid('getrowdata', row);
                        var obj = {
                           id: dataRecord.id,
                           dados: {status: newvalue}  
                        };
                        atualiza_servidor(obj);
                    }
                 }
            },
        ]
        ,
        columngroups: [
            {text: 'Dados do Item', align: 'center', name: 'dados'}
        ]
    });
    $(".combo").jqxDropDownList({ theme: theme,  width: '100%', height: '35' });
    
}

function atualiza_servidor(dados) {
    $.ajax({
      type: "PATCH",
      url: "/users/"+dados['id'],
      data: {user: dados['dados']},
      success: function(event, request, settings ) {
          },
          error: function(e){
              
          }
        });
   $(grid).jqxGrid('updatebounddata');
}

function excluir_registro(dataRecord) {
	var r = confirm("Tem certeza?");
    if(r == true) {
	    $.ajax({
	      type: "DELETE",
	      url: "/users/"+dataRecord.id,
	      success: function(event, request, settings ) {
	          },
	          error: function(e){
	              
	          }
	        });
	   $(grid).jqxGrid('updatebounddata');
    }
    
}
function editar_registro(dataRecord) {
    
    $('#user_nome').val(dataRecord.nome);
    $('#user_email').val(dataRecord.email);
    
    var status_index = $('#user_status_jqxDropDownList').jqxDropDownList('getItemByValue', dataRecord.status);
    $('#user_status_jqxDropDownList').jqxDropDownList({selectedIndex: status_index.index});
    
    
    $("#new_register_window").jqxWindow({
        title: 'Editando Redespacho'
    });
    $("#new_register_window").jqxWindow('open');
    $('.btn_fechar').click(function () {
        $('#new_register_window').jqxWindow('close');
    });
    $("#new_user").unbind("submit");
    $('#new_user').submit(function() {
        $.ajax({
          type: "PATCH",
          url: "/users/"+dataRecord.id,
          data: $('#new_user').serialize(),
          success: function(event, request, settings ) {
        	  $("#new_register_window").jqxWindow('hide');
              $(grid).jqxGrid('updatebounddata');
              $("#new_register_window input[type='text']").val('');
          },
          error: function(xhr, status, error){
        	  var data = JSON.parse(xhr.responseText);
              mostrar_errors($('#new_user'), data);
          }
        });
       
       
       return false;                   
    });
}
