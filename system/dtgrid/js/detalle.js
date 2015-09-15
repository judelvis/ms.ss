function fdetpre(detalles,identificador){
    $("[detalle="+identificador+"__pre]").click(function (event) {
        var identificadores = this.id.split('__');
        var cuerpo = document.getElementById('cuerpo-' + identificadores[1]);
        //var fila = document.getElementById('fila-'+identificadores[1]+'-'+identificadores[2]);
        if(identificadores.length == 3) var fila = document.getElementById('fila__'+identificadores[1]+'__'+identificadores[2]);
        else var fila = document.getElementById('fila__'+identificadores[1]+'__'+identificadores[2]+'__'+identificadores[3]+'-'+identificadores[4]);
        verificarDetalle(fila,detalles,0);
    });
}

function fdetpost(detalle,identificador){
    $("[detalle="+identificador+"__post]").click(function (event) {
        var identificadores = this.id.split('__');
        var cuerpo = document.getElementById('cuerpo__' + identificadores[1]);
        if(identificadores.length == 3) var fila = document.getElementById('fila__'+identificadores[1]+'__'+identificadores[2]);
        else var fila = document.getElementById('fila__'+identificadores[1]+'__'+identificadores[2]+'__'+identificadores[3]+'__'+identificadores[4]);
        //alert(JSON.stringify(detalle));
        verificarDetalle(fila,detalle,1);
    });
}

function fdetdtgrid(detalle,identificador){
    $("[detalle="+identificador+"__dtgrid]").click(function (event) {
        var identificadores = this.id.split('__');
        var cuerpo = document.getElementById('cuerpo__' + identificadores[1]);
        if(identificadores.length == 3) var fila = document.getElementById('fila__'+identificadores[1]+'__'+identificadores[2]);
        else var fila = document.getElementById('fila__'+identificadores[1]+'__'+identificadores[2]+'__'+identificadores[3]+'__'+identificadores[4]);
        verificarDetalle(fila,detalle,2);
    });
}

var crearDetalle = function(id){
    var tds=$("#"+id+":first td").length;
    var idPicado = id.split('__');
    var tr = document.createElement("tr");
    var pagi = document.getElementById(id).getAttribute("pagina");
    tr.setAttribute("pagina",pagi);
    if(idPicado.length==3)tr.id=idPicado[1]+'__'+idPicado[2]+'__detalle';
    else tr.id=idPicado[1]+'__'+idPicado[2]+'__'+idPicado[3]+'__'+idPicado[4];
    var tdespacio = tr.insertCell(0);
    tdespacio.id = tr.id+'_celdaEspacio';
    var td = tr.insertCell(0);
    td.id = tr.id+'_celda';
    td.colSpan = tds;
    $("#"+id).after(tr);
    tr.appendChild(td);
}



var verificarDetalle = function(fila,detalles,tipo){//alert(detalles);
    var idPicado = fila.id.split('__');
    if(idPicado.length == 3) var fDetalle = document.getElementById(idPicado[1]+'__'+idPicado[2]+'__detalle');
    else var fDetalle = document.getElementById(idPicado[1]+'__'+idPicado[2]+'__'+idPicado[3]+'__'+idPicado[4]);
    if(fDetalle == null) {
        crearDetalle(fila.id);
        switch (tipo){
            case 0:asignarDetalle(fila.id,detalles);break;
            case 1:asignarDetallePost(fila.id,detalles);break;
            case 2:asignarDetalleGrid(fila.id,detalles);break;
        }

    }
    else verificarVisibilidad(fDetalle.id);
}

var verificarVisibilidad = function(id){
    var filaDetalle = document.getElementById(id);
    var visible = filaDetalle.style.display;
    //alert("visibilidad" + visible);
    if(visible == '' || visible == 'table-row'){
        ocultarDetalle(id);
    }else if(visible == 'none'){
        mostrarDetalle(id);
    }

}

var ocultarDetalle = function(id){
    $("#"+id).hide();
}

var mostrarDetalle = function(id){
    $("#"+id).show();
}

var asignarDetalle = function(id,contenido){
    var iden = id.split('__');
    var html = contenido;
    if(iden.length == 3){
        if(contenido.length > 1) html = contenido[iden[2]-1];
        $("#"+iden[1]+"__"+iden[2]+"__detalle_celda").html(html);
    }else{
        if(contenido.length > 1) html = contenido[iden[4]-1];
        $("#"+iden[1]+"__"+iden[2]+"__"+iden[3]+"__"+iden[4]+'_celda').html(html);
    }
}

var asignarDetallePost = function(id,objDetalle){
    var iden = id.split('__');
    var para = [];
    if(iden.length == 3){
        $.each(objDetalle.parametro, function(pos,valor){
            para.push($("#"+id).find("[columna="+iden[1]+'__'+valor+"]").html());
        });
        $.ajax({url : objDetalle.ruta,type : "POST",data : "datos="+JSON.stringify(para),//dataType : "json",
            success : function(resp) {
                $("#"+iden[1]+'__'+iden[2]+"__detalle_celda").html(resp);
            }
        });
    }else{
        $.each(objDetalle.parametro, function(pos,valor){
            para.push($("#"+id).find("[columna="+iden[1]+"__"+iden[2]+"__"+iden[3]+"__"+valor+"]").html());
        });
        $.ajax({url : objDetalle.ruta,type : "POST",data : "datos="+JSON.stringify(para),//dataType : "json",
            success : function(resp) {
                $("#"+iden[1]+"__"+iden[2]+"__"+iden[3]+"__"+iden[4]+'_celda').html(resp);
            }
        });

    }
}

var asignarDetalleGrid = function(id,objDetalle){
    var iden = id.split('__');var para = [];
    if(iden.length == 3){
        $.each(objDetalle.parametro, function(pos,valor){para.push($("#"+id).find("[columna="+iden[1]+'__'+valor+"]").html());});
        objDetalle.origen.parametro = "datos="+JSON.stringify(para);
        $("#"+iden[1]+'__'+iden[2]+"__detalle_celda").dtgrid(objDetalle.origen,objDetalle.config);
    }else{
        $.each(objDetalle.parametro, function(pos,valor){para.push($("#"+id).find("[columna="+iden[1]+'__'+iden[2]+'__'+iden[3]+"__"+valor+"]").html());});
        objDetalle.origen.parametro = "datos="+JSON.stringify(para);
        $("#"+iden[1]+'__'+iden[2]+"__"+iden[3]+"__"+iden[4]+'_celda').dtgrid(objDetalle.origen,objDetalle.config);
    }
}