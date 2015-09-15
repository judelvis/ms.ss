function construirPaginador(identificador,total,tam){
    var pagNuevo = document.createElement("ul");
    pagNuevo.id= "pag__"+identificador;
    pagNuevo.className= "pagination";
    var pie = document.getElementById("pie__"+identificador);
    filaPie= pie.insertRow(pie.rows.length);
    celdaPie = filaPie.insertCell(filaPie.cells.length);
    filaCuerpo = document.getElementById('fila__'+identificador+'__1')
    celdaPie.colSpan =  filaCuerpo.cells.length;
    //div.appendChild(pagNuevo);
    celdaPie.appendChild(pagNuevo);
    var paginas = Math.floor(total) / tam;
    var atras = document.createElement("li");
    atras.setAttribute("pag",-1);
    atras.className="disabled waves-effect";
    var i = document.createElement("i");
    i.className = "mdi-hardware-keyboard-arrow-left";
    atras.appendChild(i);
    pagNuevo.appendChild(atras);
    for(var i = 1 ;i<=paginas;i++){
        var li = document.createElement("li");
        li.id = "pag__"+identificador+i;
         $("[pagina="+identificador+i).toggleClass("hide");
        if(i==1){
            li.className ="active";
            $("[pagina="+identificador+i).toggleClass("hide");
        }
        li.className +=" waves-effect";
        li.setAttribute("pag",i);
        pagNuevo.appendChild(li);
        var a = document.createElement("a");
        a.href ="#!";
        a.innerHTML = i;
        li.appendChild(a);
    }
    var adelante = document.createElement("li");
    adelante.setAttribute("pag",-2);
    var ia = document.createElement("i");
    ia.className = "mdi-hardware-keyboard-arrow-right";
    adelante.appendChild(ia);
    pagNuevo.appendChild(adelante);

    cambiarPaginas(identificador,paginas);
}

function cambiarPaginas(iden,total){
    $("#pag__"+iden+" li").click(function (event) {
        var pag = this.getAttribute("pag");
        var paginaActual = $("#pag__"+iden).find(".active").index();
        if(pag == -1) {
            if(paginaActual == 1) return 0;
            pag = paginaActual - 1;

        }
        if(pag == -2) {
            if(paginaActual == total) return 0;
            pag = paginaActual + 1;

        }
        $("#pag__"+iden+paginaActual).toggleClass("active");
        $("#cuerpo__"+iden).find("tr").addClass("hide");
        $("#pag__"+iden+pag).toggleClass("active");
        $("[pagina="+iden+pag).toggleClass("hide");

    });
}

function cambiarPaginasTeclado(paga,pagn,identificador){
    $("#pag__"+paga).toggleClass("active");
    $("#cuerpo__"+identificador).find("tr").addClass("hide");
    $("#pag__"+pagn).toggleClass("active");
    $("[pagina="+pagn).toggleClass("hide");
}