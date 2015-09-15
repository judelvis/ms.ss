function verificarEditable(identificador,obj){
    //alert(JSON.stringify(obj));
    //eval("alert(obj."+identificador+".datos.cuerpo[2][2]);");
    var enume = 0;
    var posCol = 0;
    var posFila = 0;
    var numera = eval('obj.'+identificador+'.config.enumera;');
    if(numera == true)enume = 1;
    var attColumna='';
    var attFila ='';
    var celdaActual=null;
    var params = {startPosition:{x:2,y:2}};
    var $hTable = $('#cuerpo-'+identificador),
        i = 0,
        x = params.startPosition.x,
        y = params.startPosition.y,
        yv= 1,
        xv= 1,
        max = {
            y: $hTable.find('tr').length,
            x:$hTable.find('tr:last td').length
        };
    selecionarCelda();

    function evaluarHijos(){
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
        celdaActual.html(contenido);
    }

    function restaurarElemento(tipoHijo){
        var contenido = '';
        obtenerPosicion();
        switch (tipoHijo){
            case "<input":
                contenido = $hTable.find('.selected input').val();eval("obj."+identificador+".datos.cuerpo["+posFila+"]["+posCol+"]='"+contenido+"';");
                break;
            case "<selec":
                valor = $("select option:selected").text();contenido = valor;eval("obj."+identificador+".datos.cuerpo["+posFila+"]["+posCol+"]='"+celdaActual.children().val()+"';");
                break;
            case "<texta":
                contenido = $hTable.find('.selected textarea').val();eval("obj."+identificador+".datos.cuerpo["+posFila+"]["+posCol+"]='"+contenido+"';");
                break;
        }
        return contenido;
    }

    function obtenerPosicion(){
        $.each(celdaActual,function(){
            attColumna = this.getAttribute('columna').split('-');
            attFila = this.getAttribute('fila').split('-');
        });
        posCol = attColumna[1]-1;
        posFila = attFila[1]-1;
    }


    function selecionarCelda(){
        if ( y > max.y ) y = max.y;
        if ( x > max.x ) x = max.x;
        if ( y < 1 ) y = 1;
        if ( x < 1 ) x = 1;
        celdaActual = $hTable.find('tr:nth-child('+(y)+')').find('td:nth-child('+(x+enume)+')');
        celdaActual.toggleClass('selected');
        if(numera == true)$("#btn-"+identificador+'-'+y).focus();
        else $("#btnEditar-"+identificador).focus();
        return celdaActual;
    }

    function edit (elementoActual) {
        $.each(celdaActual,function(){
            attColumna = this.getAttribute('columna');
        });
        var attPicado = attColumna.split('-');
        var objAux = eval("obj."+identificador+".config.editable.c"+attPicado[1]);
        if(objAux != undefined)crearElemento(elementoActual,objAux);
    }

    $hTable.find('td').dblclick( function () {
        evaluarHijos();
        xv = x;
        yv = y;
        x = ($hTable.find('td').index(this) % (max.x) + 1);
        y = ($hTable.find('tr').index($(this).parent()) + 1);
        edit(selecionarCelda());
    });

    $hTable.find('td').hover( function () {
        xv = x;
        yv = y;
        xs = ($hTable.find('td').index(this) % (max.x) + 1);
        ys = ($hTable.find('tr').index($(this).parent()) + 1);
        currentCell = $hTable.find('tr:nth-child('+(ys)+')').find('td:nth-child('+(xs+enume)+')');
        currentCell.toggleClass('sobre');
    });

    $('#tbl-'+identificador).keydown(function(e){
        xv = x;
        yv = y;
        if (e.keyCode == 13) {
            if(celdaActual.children().size() == 0){
                evaluarHijos()
                edit(celdaActual);
            }else{
                evaluarHijos()
                selecionarCelda()
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
            selecionarCelda();
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
    var combo = $('<select>');
    $.each(tipo,function(clave,valor){
        combo.append( new Option(valor,clave) );
    });
    elementoActual.html(combo);
}