function construirEnlace(identificador,columnas){
    var enlace = domEnlace();
    $.each(columnas,function(){
        celdas = $("#cuerpo__"+identificador).find("[columna="+identificador+"__"+this.columna+"]");
        var Url = this.url;
        var target = "";
        if(this.target != undefined) target = this.target;
        $.each(celdas,function(){
            var Clon = enlace.cloneNode(true);
            Clon.href = Url+"?valor="+this.innerHTML;
            Clon.setAttribute("target",target);
            this.insertBefore(Clon,this.childNodes[0]);
        });
    });
}

function domEnlace(){
    var i = document.createElement("i");
    i.className = "mdi-content-link";
    i.style.cssText="width:10%;";
    var enlace = document.createElement("a");
    enlace.appendChild(i);
    return enlace;
}
