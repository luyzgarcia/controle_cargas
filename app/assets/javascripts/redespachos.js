var theme = 'controllog';

$(document).ready(function() {
	geraGrid($("#grid_redespachos"));	
	
	
	$('#new_register_window').jqxWindow({
	     theme: theme,
	     autoOpen: false,
	     position: {
				x:  60, 
				y:  60
			},
		showCollapseButton: false,
		resizable: false, 
		height: 690, 
		width: 1400,
		maxWidth: 1400,
		maxHeight: 690,
		isModal: true,
		dragArea: { left: 0, top: 45, width: 0, height: 0 }
	 });
	 
});

var grid = '';

function geraGrid(div) {
    grid = div;
    
    var url = "/redespachos.json";
	var source = {
		datatype: "json",
		datafields: [
			{name: 'id', type: 'string'},
			{name: 'fornecedor', map: 'fornecedor>nome'},
			{name: 'fornecedor_id', map: 'fornecedor>id', type: 'hidden'},
			{name: 'status', type: 'hidden'},
			{name: 'status_label', type: 'string'},
			{name: 'tipo_redespacho', type: 'hidden'},
			{name: 'tipo_redespacho_label', type: 'string'},
			{name: 'remetente', type: 'string'},
			{name: 'remetente_cidade', type: 'string'},
			{name: 'destinatario', type: 'string'},
            {name: 'destinatario_cidade', type: 'string'},
            {name: 'valor_frete',type: 'number'} ,
            {name: 'valor_redespacho', type: 'number'},
            {name: 'valor_comissao', type: 'number'},
            {name: 'forma_pagamento', type: 'number'},
            {name: 'volume', type: 'string'},
            {name: 'peso', type: 'string'},
            {name: 'nf_valor', type: 'number'},
            {name: 'nf_numero', type: 'number'},
            {name: 'data_envio', type: 'date'},
            {name: 'data_entrega', type: 'date'},
            {name: 'recebido_por', type: 'string'},
            {name: 'jadlog_lista_numero', type: 'number'},
            {name: 'jadlog_conhecimento_numero', type: 'number'}
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
    localizationobj.pagershowrowsstring = "Anterior:";
    localizationobj.currencysymbol = "R$";
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
			container.append("<input id='addnewregister' class='addnewregister' type='button' value='Nova Redespacho' />");
	  		$('.addnewregister').jqxButton({theme: theme});
	  		$(".addnewregister").on('click', function () {
	  		    console.log('vai limpar');
	  			document.getElementById('new_register').reset();
	  			//$('#new_empresa').get(0).setAttribute('action', '/empresas); //this works
				
	  			$("#new_register_window").jqxWindow({
  		 			title: 'Novo Redespacho'
  		 		});
  		 		$( "#new_register" ).unbind("submit");
  		 		$('#new_register').submit(function() {
  		 		    $.ajax({
                      type: "POST",
                      url: "/redespachos",
                      data: $('#new_register').serialize(),
                      success: function(event, request, settings ) {
                          //console.log(event);
                          //$(div).jqxGrid('addrow', null, event);
                          $("#new_register_window").jqxWindow('hide');
                          $("#new_register_window input[type='text']").val('');
                          $(div).jqxGrid('updatebounddata');
                      },
                      error: function(e){
                      }
                    });
					return false;					
				});
  		 		$("#new_register_window").jqxWindow('open');
  		 		$('.btn_fechar').click(function () {
                    $('#new_register_window').jqxWindow('close');
                });
	  		});
	  		/*container.append("<input id='editregister' class='editregister' type='button' value='Editar registro selecionado' />");
            $('.editregister').jqxButton();
            $(".editregister").on('click', function () {
                var editrow = $(div).jqxGrid('getselectedrowindexes');
                
                var dataRecord = $(div).jqxGrid('getrowdata', editrow);
                
                editar_registro(dataRecord);
                
                
            });*/
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
		      { text: 'Excluir', datafield: 'Excluir', columntype: 'button', width: '100px',align:'center', cellsrenderer: function () {
                     return "Excluir";
                  }, buttonclick: function (row) {
                      
                    var dataRecord = $(div).jqxGrid('getrowdata', row);
                    excluir_registro(dataRecord);
                  }
            },
		    { text: 'Editar', datafield: 'Edit', columntype: 'button', width: '100px',align:'center', cellsrenderer: function () {
                     return "Editar";
                  }, buttonclick: function (row) {
                    var dataRecord = $(div).jqxGrid('getrowdata', row);
                    editar_registro(dataRecord);
                  }
            },
		    {text: 'Codigo', columngroup: 'dados', datafield: 'id', width: '100px', editable: false},
			{text: 'Fornecedor', columngroup: 'dados', datafield: 'fornecedor', width: '150px', editable: false},
			{text: 'Status', columngroup: 'dados', datafield: 'status_label', width: '150px', columntype: 'dropdownlist' ,
			     createeditor: function (row, column, editor) {
			         var list = [{value: "AND", label: 'Andamento'},{value: "FIN", label: 'Finalizado'}];
			         editor.jqxDropDownList({autoDropDownHeight: true, source: list });
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
			{text: 'Tipo', columngroup: 'dados', datafield: 'tipo_redespacho_label', width: '150px', columntype: 'dropdownlist' ,
                 createeditor: function (row, column, editor) {
                     var list = [{value: "ENT", label: 'Entrega'},
                                 {value: "COL", label: 'Coleta'},
                                 {value: "RED", label: 'Redespacho'},
                                 {value: "OUT", label: 'Outros'}];                     
                     editor.jqxDropDownList({autoDropDownHeight: true, source: list});
                 },
                 cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                    if (newvalue != oldvalue) { 
                        var dataRecord = $(div).jqxGrid('getrowdata', row);
                        var obj = {
                           id: dataRecord.id,
                           dados: {tipo_redespacho: newvalue}  
                        };
                        atualiza_servidor(obj);
                    }
                 }
            },
			{text: 'Rementente', columngroup: 'dados', datafield: 'remetente', width: '150px',
			  cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                    if (newvalue != oldvalue) { 
                        var dataRecord = $(div).jqxGrid('getrowdata', row);
                        var obj = {
                           id: dataRecord.id,
                           dados: {remetente: newvalue}  
                        };
                        atualiza_servidor(obj);                        
                    }
                 }
            },
			{text: 'Cidade do remetente', columngroup: 'dados', datafield: 'remetente_cidade', width: '150px',
              cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                    if (newvalue != oldvalue) { 
                        var dataRecord = $(div).jqxGrid('getrowdata', row);
                        var obj = {
                           id: dataRecord.id,
                           dados: {remetente_cidade: newvalue}  
                        };
                        atualiza_servidor(obj);                        
                    }
                 }
            },
			{text: 'Destinatario', columngroup: 'dados', datafield: 'destinatario', width: '150px',
              cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                    if (newvalue != oldvalue) { 
                        var dataRecord = $(div).jqxGrid('getrowdata', row);
                        var obj = {
                           id: dataRecord.id,
                           dados: {destinatario: newvalue}  
                        };
                        atualiza_servidor(obj);                        
                    }
                 }
            },
			{text: 'Cidade do destinatario', columngroup: 'dados', datafield: 'destinatario_cidade', width: '150px',
              cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                    if (newvalue != oldvalue) { 
                        var dataRecord = $(div).jqxGrid('getrowdata', row);
                        var obj = {
                           id: dataRecord.id,
                           dados: {destinatario_cidade: newvalue}  
                        };
                        atualiza_servidor(obj);                        
                    }
                 }
            },
			{text: 'Valor do frete', columngroup: 'valores', columntype: 'numberinput', datafield: 'valor_frete', cellsformat: "c2", width: '150px',
			  cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                  
                    if(newvalue < 0) {
                        alert('Não é permitido valores negativos');
                        return oldvalue;
                    }
                    console.log('newvalue>'+newvalue);
                    if (newvalue != oldvalue && newvalue > 0) { 
                        var dataRecord = $(div).jqxGrid('getrowdata', row);
                        var obj = {
                           id: dataRecord.id,
                           dados: {valor_frete: newvalue}  
                        };
                        atualiza_servidor(obj);                        
                    }
                 },
                 createeditor: function (row, cellvalue, editor) {
                      editor.jqxNumberInput({ digits: 3 });
                  }
            },
			{text: 'Valor do redespacho', columngroup: 'valores', datafield: 'valor_redespacho',  columntype: 'numberinput', cellsformat: "c2", width: '150px',
              cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                  
                    if(newvalue < 0) {
                        alert('Não é permitido valores negativos');
                        return oldvalue;
                    }
                    if (newvalue != oldvalue && newvalue > 0) { 
                        var dataRecord = $(div).jqxGrid('getrowdata', row);
                        var obj = {
                           id: dataRecord.id,
                           dados: {valor_redespacho: newvalue}  
                        };
                        atualiza_servidor(obj);                        
                    }
                 },
                 createeditor: function (row, cellvalue, editor) {
                      editor.jqxNumberInput({ digits: 3 });
                  }
            },
			{text: 'Valor da comissão', columngroup: 'valores', datafield: 'valor_comissao',  columntype: 'numberinput', cellsformat: "c2", width: '150px',
              cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                  
                    if(newvalue < 0) {
                        alert('Não é permitido valores negativos');
                        return oldvalue;
                    }
                    if (newvalue != oldvalue && newvalue > 0) { 
                        var dataRecord = $(div).jqxGrid('getrowdata', row);
                        var obj = {
                           id: dataRecord.id,
                           dados: {valor_comissao: newvalue}  
                        };
                        atualiza_servidor(obj);                        
                    }
                 },
                 createeditor: function (row, cellvalue, editor) {
                      editor.jqxNumberInput({ digits: 3 });
                  }
            },
			{text: 'Forma de pagamento', columngroup: 'valores', datafield: 'forma_pagamento',width: '150px',columntype: 'dropdownlist' ,
                 createeditor: function (row, column, editor) {
                     var list = ['Boleto', 'Dinheiro','A Vista','A Prazo','Depósito'];                     
                     editor.jqxDropDownList({autoDropDownHeight: true, source: list, promptText: "Selecione um:" });
                 },
                 cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                    if (newvalue != oldvalue) { 
                        var dataRecord = $(div).jqxGrid('getrowdata', row);
                        var obj = {
                           id: dataRecord.id,
                           dados: {forma_pagamento: newvalue}  
                        };
                        atualiza_servidor(obj);
                    }
                 }
            },
			{text: 'Quantidade (Volume)', columngroup: 'informacoes', datafield: 'volume', width: '150px', columntype: 'numberinput',
    			 cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                     
                        if(newvalue < 0) {
                            alert('Não é permitido valores negativos');
                            return oldvalue;
                        }
                        if (newvalue != oldvalue && newvalue > 0) { 
                            var dataRecord = $(div).jqxGrid('getrowdata', row);
                            var obj = {
                               id: dataRecord.id,
                               dados: {quantidade: newvalue}  
                            };
                            atualiza_servidor(obj);                        
                        }
                     },
                     createeditor: function (row, cellvalue, editor) {
                          editor.jqxNumberInput({ decimalDigits: 0, digits: 3 });
                      }
			},
			{text: 'Peso', columngroup: 'informacoes', datafield: 'peso', width: '150px',columntype: 'numberinput',
                 cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                     
                        if(newvalue < 0) {
                            alert('Não é permitido valores negativos');
                            return oldvalue;
                        }
                        if (newvalue != oldvalue && newvalue > 0) { 
                            var dataRecord = $(div).jqxGrid('getrowdata', row);
                            var obj = {
                               id: dataRecord.id,
                               dados: {peso: newvalue}  
                            };
                            console.log(obj);
                            atualiza_servidor(obj);                        
                        }
                     },
                     createeditor: function (row, cellvalue, editor) {
                          editor.jqxNumberInput({ decimalDigits: 2, digits: 5 });
                      }
            },
			{text: 'Valor da NF', columngroup: 'nf', datafield: 'nf_valor', columntype: 'numberinput', cellsformat: "c2", width: '150px',
              cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                  
                    if(newvalue < 0) {
                        alert('Não é permitido valores negativos');
                        return oldvalue;
                    }
                    if (newvalue != oldvalue && newvalue > 0) { 
                        var dataRecord = $(div).jqxGrid('getrowdata', row);
                        var obj = {
                           id: dataRecord.id,
                           dados: {nf_valor: newvalue}  
                        };
                        atualiza_servidor(obj);                        
                    }
                 },
                 createeditor: function (row, cellvalue, editor) {
                      editor.jqxNumberInput({ digits: 3 });
                  }
            },
			{text: 'Número da NF', columngroup: 'nf', datafield: 'nf_numero', width: '150px', columntype: 'numberinput',
                 cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                       if(newvalue < 0) {
                            alert('Não é permitido valores negativos');
                            return oldvalue;
                        }
                        if (newvalue != oldvalue && newvalue > 0) { 
                            var dataRecord = $(div).jqxGrid('getrowdata', row);
                            var obj = {
                               id: dataRecord.id,
                               dados: {nf_numero: newvalue}  
                            };
                            atualiza_servidor(obj);                        
                        }
                 },
                 createeditor: function (row, cellvalue, editor) {
                      editor.jqxNumberInput({ digits: 12 });
                  }
            },
			{text: 'Data de envio', columngroup: 'datas', datafield: 'data_envio', cellsformat: 'd', width: '150px', columntype: 'datetimeinput', 
    			cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                           if (newvalue != oldvalue) { 
                                var dataRecord = $(div).jqxGrid('getrowdata', row);
                                var obj = {
                                   id: dataRecord.id,
                                   dados: {data_envio: newvalue}  
                                };
                                atualiza_servidor(obj);                        
                            }
                         }
			
			},
			{text: 'Data de entrega', columngroup: 'datas', datafield: 'data_entrega', cellsformat: 'd', width: '150px', columntype: 'datetimeinput', 
                cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                           if (newvalue != oldvalue) { 
                                var dataRecord = $(div).jqxGrid('getrowdata', row);
                                var obj = {
                                   id: dataRecord.id,
                                   dados: {data_entrega: newvalue}  
                                };
                                atualiza_servidor(obj);                        
                            }
                         }
            
            },
			{text: 'Recebido por ', columngroup: 'datas', datafield: 'recebido_por', width: '150px',
                 cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                       if (newvalue != oldvalue) { 
                            var dataRecord = $(div).jqxGrid('getrowdata', row);
                            var obj = {
                               id: dataRecord.id,
                               dados: {recebido_por: newvalue}  
                            };
                            atualiza_servidor(obj);                        
                        }
                     }
            },
			{text: '(JadLog) Numero da lista', columngroup: 'jadlog', datafield: 'jadlog_lista_numero', width: '150px',columntype: 'numberinput',
                 cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                      if (newvalue != oldvalue) { 
                            var dataRecord = $(div).jqxGrid('getrowdata', row);
                            var obj = {
                               id: dataRecord.id,
                               dados: {jadlog_lista_numero: newvalue}  
                            };
                            atualiza_servidor(obj);                        
                        }
                     }
            },
			{text: '(JadLog) Numero de conhecimento', columngroup: 'jadlog', datafield: 'jadlog_conhecimento_numero', width: '150px',columntype: 'numberinput',
                 cellvaluechanging: function (row, column, columntype, oldvalue, newvalue) {
                       if (newvalue != oldvalue) { 
                            var dataRecord = $(div).jqxGrid('getrowdata', row);
                            var obj = {
                               id: dataRecord.id,
                               dados: {jadlog_conhecimento_numero: newvalue}  
                            };
                            atualiza_servidor(obj);                        
                        }
                     }
            },
		]
		,
		columngroups: [
			{text: 'Dados do Item', align: 'center', name: 'dados'},
			{text: 'Valores', align: 'center', name: 'valores'},
			{text: 'Informações', align: 'center', name: 'informacoes'},
			{text: 'Nota fiscal', align: 'center', name: 'nf'},
			{text: 'Datas', align: 'center', name: 'datas'},
			{text: 'Valores', align: 'center', name: 'jadlog'}
		]
	});
    
    //$("#Cancel").jqxButton({ theme: 'arctic' });
    //$("#Save").jqxButton({ theme: 'arctic' });
    //$(".input_class").jqxInput({ theme: theme });
    $(".combo").jqxComboBox({ theme: theme });
    $(".dinheiro").maskMoney({prefix:'R$ ',affixesStay:false, allowNegative: true, thousands:'.', decimal:'.'});
    //$(".currency").maskMoney({ allowNegative: true, thousands:'.', decimal:','});
    $(".calendar").jqxDateTimeInput({theme: theme, culture: 'pt-BR'});
}

function atualiza_servidor(dados) {
    $.ajax({
      type: "PATCH",
      url: "/redespachos/"+dados['id'],
      data: {redespacho: dados['dados']},
      success: function(event, request, settings ) {
          },
          error: function(e){
              
          }
        });
   $(grid).jqxGrid('updatebounddata');
}

function excluir_registro(dataRecord) {
    console.log(dataRecord);
    $.ajax({
      type: "DELETE",
      url: "/redespachos/"+dataRecord.id,
      success: function(event, request, settings ) {
          },
          error: function(e){
              
          }
        });
   $(grid).jqxGrid('updatebounddata');
    
}
function editar_registro(dataRecord) {
    var status_index = $('#redespacho_status_jqxComboBox').jqxComboBox('getItemByValue', dataRecord.status);
    $('#redespacho_status_jqxComboBox').jqxComboBox({selectedIndex: status_index.index});
    
    var fornecedor_index = $('#redespacho_fornecedor_id_jqxComboBox').jqxComboBox('getItemByValue', dataRecord.fornecedor_id);
    $('#redespacho_fornecedor_id_jqxComboBox').jqxComboBox({selectedIndex: fornecedor_index.index});
    
    var status_tipo_redespacho = $('#redespacho_tipo_redespacho_jqxComboBox').jqxComboBox('getItemByValue', dataRecord.tipo_redespacho);
    $('#redespacho_tipo_redespacho_jqxComboBox').jqxComboBox({selectedIndex: status_tipo_redespacho.index});
    
    $('#redespacho_remetente').val(dataRecord.remetente);
    $('#redespacho_remetente_cidade').val(dataRecord.remetente_cidade);
    
    $('#redespacho_destinatario').val(dataRecord.destinatario);
    $('#redespacho_destinatario_cidade').val(dataRecord.destinatario_cidade);
    
    $('#redespacho_valor_frete').val(dataRecord.valor_frete);
    $('#redespacho_valor_redespacho').val(dataRecord.valor_redespacho);
    $('#redespacho_valor_comissao').val(dataRecord.valor_comissao);
    
    $('#redespacho_forma_pagamento').val(dataRecord.forma_pagamento);
    
    $('#redespacho_volume').val(dataRecord.volume);
    
    $('#redespacho_peso').val(dataRecord.peso);
    $('#redespacho_nf_valor').val(dataRecord.nf_valor);
    $('#redespacho_nf_numero').val(dataRecord.nf_numero);
    
    $('#redespacho_recebido_por').val(dataRecord.recebido_por);
    
    $('#redespacho_data_envio').jqxDateTimeInput('setDate',dataRecord.data_envio);
    $('#redespacho_data_entrega').jqxDateTimeInput('setDate',dataRecord.data_entrega);
    
    $('#redespacho_jadlog_lista_numero').val(dataRecord.jadlog_lista_numero);
    $('#redespacho_jadlog_conhecimento_numero').val(dataRecord.jadlog_conhecimento_numero);
    
    $("#new_register_window").jqxWindow({
        title: 'Editando Redespacho'
    });
    $("#new_register_window").jqxWindow('open');
    $('.btn_fechar').click(function () {
        $('#new_register_window').jqxWindow('close');
    });
    
    $(".currency").maskMoney({prefix:'R$ ', allowNegative: true, thousands:'.', decimal:','});
    
    $("#new_register").unbind("submit");
    $('#new_register').submit(function() {
        $.ajax({
          type: "PATCH",
          url: "/redespachos/"+dataRecord.id,
          data: $('#new_register').serialize(),
          success: function(event, request, settings ) {
              return false;
          },
          error: function(e){
              return false;
          }
        });
       
       $("#new_register_window").jqxWindow('hide');
       $(grid).jqxGrid('updatebounddata');
       $("#new_register_window input[type='text']").val('');
       return false;                   
    });
}
