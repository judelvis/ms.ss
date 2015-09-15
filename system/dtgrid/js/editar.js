function verificarEditable(identificador,obj){
    //alert(JSON.stringify(obj)+'**'+identificador);
    //alert(identificador);
    var objEdicion = eval('obj');
    //alert(JSON.stringify(objEdicion));
    //var objEdicion = {identificador:editarO};
    //eval("alert(obj."+identificador+".datos.cuerpo[2][2]);");
    var enume = 0;
    var posCol = 0;
    var posFila = 0;
    //alert(identificador);
    var numera = eval('obj.'+identificador+'.config.enumera;');
    //alert(numera);
    if(numera == true)enume = 1;
    var attColumna='';
    var attFila ='';
    var celdaActual=null;
    var params = {startPosition:{x:2,y:2}};
    var $hTable = $('#cuerpo__'+identificador),
        i = 0,
        x = params.startPosition.x,
        y = params.startPosition.y,
        yv= 1,
        xv= 1,
        max = {
            y: $hTable.find('tr').length,
            x:$hTable.find('tr:last td').length
        };
    $hTable.find('tr:nth-child(1)').find('td:nth-child(2)').toggleClass('selected');
    existePag = "";
    selecionarCelda();

    function evaluarHijos(){
//        alert(celdaActual.attr("id"));
        if(celdaActual.children().length > 0) {
            restaurarValor();
            cambiarEstilo();
        }else{
            cambiarEstilo();
        }
    }

    function cambiarEstilo(){
        $hTable.find('.selected').toggleClass('selected');
    }

    function restaurarValor(){
        var tipoHijo = celdaActual.html().substr(0,6);
        var contenido = restaurarElemento(tipoHijo);
        if(contenido != '')celdaActual.html(contenido);
    }

    function restaurarElemento(tipoHijo){
        var contenido = '';
        obtenerPosicion();
        //alert(tipoHijo);
        switch (tipoHijo){
            case "<input":
                contenido = $hTable.find('.selected input').val();eval("obj."+identificador+".datos.cuerpo["+posFila+"]["+posCol+"]='"+contenido+"';");
                break;
            case "<selec":
                valor = $("#cmbGridEdit option:selected").text();contenido = valor;eval("obj."+identificador+".datos.cuerpo["+posFila+"]["+posCol+"]='"+celdaActual.children().val()+"';");
                break;
            case "<texta":
                contenido = $hTable.find('.selected textarea').val();eval("obj."+identificador+".datos.cuerpo["+posFila+"]["+posCol+"]='"+contenido+"';");
                break;
        }
        return contenido;
    }

    function obtenerPosicion(){
        $.each(celdaActual,function(){
            attColumna = this.getAttribute('columna').split('__');
            attFila = this.getAttribute('fila').split('__');
        });
        posCol = attColumna[1]-1;
        posFila = attFila[1]-1;
    }
    function selecionarCelda(celda){
        if(celda==undefined){
            celdaActual = $hTable.find(".selected");
            if(numera == true)$("#btn__"+identificador+'__'+1).focus();
            else $("#btnEditar__"+identificador).focus();

        }else{
            celdaActual = $("#"+celda.id);
            celdaActual.toggleClass('selected');
            var iden = celdaActual.attr("fila");
            if(numera == true)$("#btn__"+iden).focus();
            else $("#btnEditar__"+identificador).focus();
        }
        //alert(celdaActual.html());
        existePag = celdaActual.parent().attr("pagina");
        return celdaActual;
    }

    function selecionarCelda2(){
        if ( y > max.y ) y = max.y;
        if ( x > max.x ) x = max.x;
        if ( y < 1 ) y = 1;
        if ( x < 1 ) x = 1;
        var pos = x+enume;
        celdaActual = $hTable.find("[id=td__"+identificador+'__'+y+"__"+pos+"]");
        //alert($("#td__"+identificador+"__"+y+"__"+pos).text());
        celdaActual.toggleClass('selected');
        if(existePag != undefined){
            var pag = celdaActual.parent().attr("pagina");
            if(pag != existePag) {
                cambiarPaginasTeclado(existePag,pag,identificador);
                existePag = pag;
            }
        }
        if(numera == true)$("#btn__"+identificador+'__'+y).focus();
        else $("#btnEditar__"+identificador).focus();
        return celdaActual;
    }

    function edit (elementoActual) {
        //alert(elementoActual);
        $.each(celdaActual,function(){
            attColumna = this.getAttribute('columna');
        });
        var attPicado = attColumna.split('__');
        var objAux = eval("obj."+identificador+".config.editable.c"+attPicado[1]);
        if(objAux != undefined)crearElemento(elementoActual,objAux);
    }

    $hTable.find('td').dblclick( function () {
        evaluarHijos();
        xv = x;
        yv = y;
        x = ($hTable.find('td').index(this) % (max.x) + 1);
        y = ($hTable.find('tr').index($(this).parent()) + 1);
        edit(selecionarCelda(this));
    });

    $hTable.find('td').hover( function () {
        $("#"+this.id).toggleClass('sobre');
    });

    $('#tbl__'+identificador).keydown(function(e){
        xv = x;
        yv = y;
        if (e.keyCode == 13) {
            if(celdaActual.children().size() == 0){
                evaluarHijos()
                edit(selecionarCelda2(celdaActual));
            }else{
                evaluarHijos()
                selecionarCelda2()
            }
        } else if (e.keyCode >= 37 && e.keyCode <= 40  ) {
            evaluarHijos();
            switch (e.keyCode) {
                case 37: x--;
                    break;
                case 38: y--;
                    break;
                case 39: x++;
                    break;
                case 40: y++;
                    break;
            }
            selecionarCelda2();
            return false;
        }
    });
}


function crearElemento(elementoActual,tipo){
    if(tipo instanceof Object){
        crearCombo(elementoActual,tipo);
    }else{
        switch (tipo){
            case 'texto':
                crearTexto(elementoActual);
                break;
            case 'calendario':
                crearCalendario(elementoActual);
                break;
            case 'textArea':
                crearTextArea(elementoActual);
                break;
            default :
                alert('No Definido');
                break;
        }
    }

}

function crearTexto(elementoActual){
    var input = $('<input>', {type: "text"})
        .val(elementoActual.html())
    elementoActual.html(input)
    input.focus();
}

function crearTextArea(elementoActual){
    var input = $('<textarea>')
        .val(elementoActual.html())
    elementoActual.html(input)
    input.focus();
}

function crearCalendario(elementoActual){
    var input = $('<input>', {type: "date"})
        .val(elementoActual.html());
    elementoActual.html(input);
    input.focus();
}

function crearCombo(elementoActual,tipo){
    var combo = $('<select>',{class:"browser-default",id:'cmbGridEdit'});
    $.each(tipo,function(clave,valor){
        combo.append( new Option(valor,clave) );
    });
    elementoActual.html(combo);
}
