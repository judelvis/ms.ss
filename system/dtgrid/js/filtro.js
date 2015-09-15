function construirFiltro(identificador,columnas){
    $.each(columnas,function(){
        $("#th__cabecera__"+identificador+this).click(function (event) {
            var cantInput =$("#"+this.id+" :input").length;
            if(cantInput == 0)construirBuscar(this,identificador);

        });
    });

}

function construirBuscar(celda,identificador){
    var i = document.createElement("i");
    i.className = "mdi-action-search";
    i.style.cssText="width:10%;";
    var input = document.createElement("input");
    input.type="text";
    input.style.cssText="width:90%;";
    input.onblur = function(){
        quitarBuscar(celda);
    }
    var col = celda.getAttribute("columna");
    input.onkeyup = function () {
        filtrar(col,this.value,identificador)
    }
    div = document.createElement("div");
    div.className ="input-field";
    div.appendChild(input);
    div.appendChild(i);
    celda.appendChild(div);
    input.focus();
}

function quitarBuscar(celda){
    $("#"+celda.id).find("div").remove();

}

function filtrar(idenCol,txt,identificador){
    var celdas =$("#cuerpo__"+identificador).find("[columna="+idenCol+"]");
    $.each(celdas,function(){
        var texto = this.innerHTML.toUpperCase();
        posi = texto.indexOf(txt.toUpperCase());
        this.parentNode.className =(posi == -1)  ? "hide":"";
    });
}