(function ( $ ) {
    var defecto = {
        rutaejecucion:'',
        titulo: '',
        excel:false,
        exceldetalle:false,
        enumera:false,
        clase:false,
        editable:false,
    };

    /*
     * Funcion para verificar el origen de datos
     * parametro; origen= puede tomas los siguientes valores:
     * 						var: cuando es una varible javascript local.
     * 						script: cuando es una varible obtenida de otro archivo *.js o script
     * 						php: cuando el origen de datos se obtiene de la ejecucion de alguna funcion php
     */
    var construir = function(obj,div){
        verificarConfiguracion(obj);
        switch (obj.origen.tipoOrigen) {
            case 'var':
                obj.objeto = obj.origen.rutaObjeto;
                construirDom(obj, div);
                break;
            case 'php':obtenerPhp(obj,div);
                break;
            case 'script':obtenerScript(obj, div);
                break;
            default:alert('no es un origen de datos valido');
                break;
        }
    }


    /*
     * Funcion que asocia la configuracion por defecto o la asignada en el constructor a los distintos dtgrid que se vallan a crear
     * parametro: optUsuario=arreglo de configuracion asignado en el constructor
     */
    var verificarConfiguracion = function(obj,div){
        if (obj.opciones instanceof Array) {
            var i = 0;
            $.each(obj.opciones,function(){
                var nuevoConfig = {};
                nuevoConfig = this;
                obj.config.push(nuevoConfig);i++;
            });
        } else {
            var nuevoConfig = {};
            nuevoConfig = obj.opciones;
            obj.config.push(nuevoConfig);
        }
    };

    /*
     * Obtiene el json a asignar a la variable objeto en caso de ser de origen script
     * parametro: ruta = ruta del script del cual se va a tomar la variable
     */
    var obtenerScript = function(obj,div){
        $.getScript( obj.origen.rutaObjeto,function () {
            obj.objeto = eval(obj.origen.parametro);
            construirDom(obj,div);
        });
    }

    /*
     * Obtiene el json a asignar a la variable objeto en caso de ser de origen php
     * parametro: ruta = ruta del archivo php del cual se va a tomar la variable json
     */
    var obtenerPhp = function(obj,div){
        if(obj.origen.parametro == ''){
            $.getJSON( obj.origen.rutaObjeto ,function (resp) {
                obj.objeto = resp;
                construirDom(obj,div);
            });
        }else{
            $.ajax({url : obj.origen.rutaObjeto,type : "POST",data : obj.origen.parametro,dataType : "json",
                success : function(resp) {
                    obj.objeto = resp;
                    construirDom(obj,div);
                }
            });
        }
    }

    var construirDom = function(obj,div){
        for(var i=0 ; i< obj.objeto.length ; i++) {
            var domTbl = {};
            var obtTbl = obj.objeto[i];
            if (obj.config[i] != undefined) {
                domTbl = {'config': obj.config[i], 'datos': obtTbl};
            } else {
                domTbl = {'config': defecto, 'datos': obtTbl};
            }
            obj.domTabla[div.id + i] = domTbl;
        }
        iniciar(obj,div);
    }


    //var cmpOculto = ["columna3","columna5"];

    /*
     * crea estructura base de la tabla,Asigna la tabla al objeto div seleccionado
     * param= elemento: Elemento dom en el cual se va a construir la tabla
     */
    var iniciar = function(obj,div){
        $.each(obj.domTabla,function(identificador,arreglo){
            crearTabla(identificador,arreglo,div);
            var detalle = "";
            if(arreglo.config.detalle != undefined){
                detalle = arreglo.config.detalle;
                arreglo.config.enumera = true;
            }
            var numera = false;
            if(arreglo.config.enumera != undefined) numera=arreglo.config.enumera;
            crearCabecera(identificador,arreglo.datos.cabecera,numera,arreglo.config.accion);
            crearCuerpo(identificador,arreglo.datos,numera,detalle,arreglo.config.accion,arreglo.config.clase,arreglo.config.paginador);
            if(arreglo.config.paginador != undefined)construirPaginador(identificador,arreglo.datos.cuerpo.length,arreglo.config.paginador);
            if(arreglo.config.boton != undefined)construirBoton(arreglo.config.boton,identificador,arreglo,arreglo.config.clase);
            if(arreglo.config.filtro != undefined)construirFiltro(identificador,arreglo.config.filtro);
            if(arreglo.config.enlace != undefined)construirEnlace(identificador,arreglo.config.enlace);
            if(arreglo.config.editable != undefined)btnEditable(identificador,obj);
        });
        verificarOculto(obj);
    }

    var btnEditable = function(identificador,obj){
        if (typeof verificarEditable == 'function') {
            var icoEditar = document.createElement('button');
            icoEditar.id='btnEditar__'+identificador;
            icoEditar.style.cssText='background-color: transparent !important;border:0px;';
            var imgEditar = document.createElement('i');
            imgEditar.className = "mdi-content-create";
            imgEditar.style.cssText='width:15px;';
            imgEditar.id = 'imgEditar__'+identificador;
            icoEditar.appendChild(imgEditar);
            $("#titulo__"+identificador).append(icoEditar);
            verificarEditable(identificador,obj.domTabla);
        }
    }

    var crearTabla = function(identificador, arreglo,div){
        var tabla = document.createElement('table');//crea la tabla
        tabla.id = 'tbl__'+identificador;
        tabla.className = 'hoverable';
        //tabla.style.cssText='position: relative;heigth:100px:';
        var titulo = tabla.createCaption();//crea caption
        titulo.id='titulo__'+identificador;
        if(arreglo.config.titulo != undefined)titulo.innerHTML = arreglo.config.titulo;
        else titulo.innerHTML = 'tbl__'+defecto.titulo;
        var domCabecera = tabla.createTHead();//crea thead
        domCabecera.id = 'cabecera__'+identificador;
        var domCuerpo = tabla.createTBody();//crea tbody
        domCuerpo.id = 'cuerpo__'+identificador;
        var domPie = tabla.createTFoot();//crea tfoot
        domPie.id = 'pie__'+identificador;
        if(arreglo.config.clase != undefined) domCabecera.className = arreglo.config.clase;
        div.appendChild(tabla);
        if(arreglo.config.accion != undefined || arreglo.config.boton != undefined){
            var respuestas = document.createElement("div");
            respuestas.id ="respuestas__"+identificador;
            respuestas.className ="modal";
            div.appendChild(respuestas);
        }

    }
    /*
     * Funcion que construye la cabecera
     */
    var crearCabecera = function(identificador,datosCabecera,numera,accion){
        var cabeceraInicial = document.getElementById('cabecera__'+identificador);
        var filaCabecera = cabeceraInicial.insertRow(0);//crea fila de la cabecera
        filaCabecera.id = 'fila__cabecera-'+identificador;
        if(numera){
            var thNumera = document.createElement('th');//crea th para la numeracion
            thNumera.id='th__numera__'+identificador;
            thNumera.style.cssText='width:15px';
            filaCabecera.appendChild(thNumera);
        }
        var i=1;
        crearCeldaCabecera(datosCabecera,identificador,filaCabecera,accion);
    }
    /*
     * Crea el cuerpo inicial del grid
     * param = 	identificador: determina la tabla a la cual se le va a agregar el cuerpo
     * 			datosCuerpo:arreglo con datos para contruir el cuerpo de la tabla
     */
    var crearCuerpo= function(identificador,datosCuerpo,numera,detalle,accion,clase,paginador){
        var cuerpoInicial = document.getElementById('cuerpo__'+identificador);
        var i = 1;
        //var btnFocoFila = document.createElement('button');
        var btnFocoFila = document.createElement('button');
        btnFocoFila.style.cssText = 'background-color: transparent !important;border:0px;';
        btnFocoFila.className ="waves-effect";
        if(accion != undefined){
            if(accion.length > 1){
                var ul = document.createElement("ul");
                ul.className = "dropdown-content";
                $.each(accion,function(){
                    var li = document.createElement('li');
                    li.href="#!";
                    var item = document.createElement('i');
                    if(this.clase != undefined) item.className=this.clase;
                    if(this.texto != undefined) item.innerHTML=this.texto;

                    li.appendChild(item);
                    li.setAttribute("ejecuta",this.ejecuta);
                    li.setAttribute("parametro",this.parametro);
                    li.setAttribute("tipo",this.tipo);
                    li.setAttribute("identificador",identificador);
                    li.setAttribute("ocultar","no");
                    if(this.ocultar != undefined) li.setAttribute("ocultar","si");
                    li.className=identificador;
                    ul.appendChild(li);
                });
                var enlace = document.createElement("a");
                //enlace.style.cssText ="color:#00b0ff;";
                enlace.className="dropdown-button valign-wrapper";
                if(clase != undefined){
                    var cssTexto = clase.split(" ");
                    var cadena_css = "dropdown-button valign-wrapper ";
                    for(var aux = 0 ; aux < cssTexto.length;aux++){
                        cadena_css += cssTexto[aux]+"-text ";
                    }
                    enlace.className = cadena_css;
                }
                enlace.href="#!";
                var ico = document.createElement('i');
                ico.className = "small mdi-action-toc";
                enlace.appendChild(ico);
            }else{
                var enlace = document.createElement("a");
                var item = document.createElement('i');
                if(accion[0].texto != undefined) enlace.innerHTML=accion[0].texto;

                enlace.appendChild(item);
                item.setAttribute("ejecuta",accion[0].ejecuta);
                item.setAttribute("parametro",accion[0].parametro);
                item.setAttribute("tipo",accion[0].tipo);
                item.setAttribute("identificador",identificador);
                item.setAttribute("ocultar","no");
                if(accion[0].ocultar != undefined) item.setAttribute("ocultar","si");
                item.className =identificador;
                if(accion[0].clase != undefined)item.className += " small "+ accion[0].clase ;
                enlace.href="#!";

            }
        }
        var auxPag = 0;
        var contPag = 1;
        $.each(datosCuerpo.cuerpo,function(){
            var filaCuerpo = cuerpoInicial.insertRow(cuerpoInicial.rows.length);//crea fila del cuerpo de la tabla
            filaCuerpo.id = 'fila__'+identificador+'__'+i;
            if(paginador != undefined){
                auxPag++;
                filaCuerpo.setAttribute("pagina",identificador+contPag);
                if(auxPag == paginador){
                    contPag++;
                    auxPag=0;
                }

            }
            if(numera){
                var btnClon = btnFocoFila.cloneNode(true);
                btnClon.id='btn__'+identificador+'__'+i;
                btnClon.innerHTML=i;
                if(detalle.tipo != "") btnClon.setAttribute("detalle",identificador + '__' +detalle.tipo);
                var thNumera = document.createElement('th');//crea th para la numeracion
                thNumera.id='th__numera__'+identificador+'__'+i;
                thNumera.appendChild(btnClon);
                thNumera.className = "waves-light blue lighten-4 center";
                if(clase != undefined) thNumera.className = clase+" center";
                filaCuerpo.appendChild(thNumera);
            }
            crearCelda(this,filaCuerpo,identificador,cuerpoInicial);
            if(accion != undefined){
                if(accion.length > 1){
                    var ulClon = ul.cloneNode(true);
                    var enlaceClon = enlace.cloneNode(true);
                    ulClon.id = "accion__"+filaCuerpo.id;
                    ulClon.setAttribute("fila",filaCuerpo.id);
                    enlaceClon.setAttribute("data-activates","accion__"+filaCuerpo.id);
                    filaCuerpo.appendChild(ulClon);
                    filaCuerpo.appendChild(enlaceClon);
                }else{
                    var enlaceClon = enlace.cloneNode(true);
                    enlaceClon.id = "accion__"+filaCuerpo.id;
                    enlaceClon.setAttribute("fila",filaCuerpo.id);
                    filaCuerpo.appendChild(enlaceClon);
                }

            }
            i++;
        });
        if(detalle.tipo != ''){
            switch (detalle.tipo){
                case 'pre':fdetpre(datosCuerpo.detalle,identificador);break;
                case 'post': fdetpost(detalle,identificador);break;
                case 'dtgrid': fdetdtgrid(detalle,identificador);break;
            }
        }
        if(accion != undefined) {
            $.getScript("/DTGrid/md/js/materialize.js");
            evaluaAccion(datosCuerpo,identificador);
        }
    }

    var crearCelda = function(obj,filaCuerpo,identificador,cuerpoInicial){
        var j = 1;
        $.each(obj,function(claveColumna,valorColumna){//Recorrido De los datos de la fila para contruir los td a agregar en la fila del cuerpo
            var tdCuerpo = filaCuerpo.insertCell(filaCuerpo.cells.length);//inserta td en la fila del cuerpo
            tdCuerpo.id='td__'+identificador+'__'+cuerpoInicial.rows.length+'__'+filaCuerpo.cells.length;
            tdCuerpo.innerHTML=valorColumna;
            tdCuerpo.setAttribute('columna',identificador+'__'+j);//crea el atributo columna a elemetos de la cabecera
            tdCuerpo.setAttribute('fila',identificador+'__'+cuerpoInicial.rows.length);
            j++
        });
    }



    var crearCeldaCabecera = function(datosCabecera,identificador,filaCabecera,accion){
        var i = 1;
        $.each(datosCabecera,function(){//Recibe como parametro del repita arreglo con datos de la cabecera
            var thCabecera = document.createElement('th');//crea th a insertar en la fila de la cabecera
            thCabecera.id='th__cabecera__'+identificador+i;
            thCabecera.setAttribute('columna',identificador+'__'+i);//crea el atributo columna a elemetos de la cabecera
            thCabecera.innerHTML=this;
            filaCabecera.appendChild(thCabecera);//agrega el th al final la fila de la cabecera
            i++;
        });
        if(accion != undefined){
            var thCabecera = document.createElement('th');//crea th a insertar en la fila de la cabecera
            thCabecera.style.cssText = "width:50px;";
            thCabecera.innerHTML="#";
            filaCabecera.appendChild(thCabecera);//agrega el th al final la fila de la cabecera
        }
    }

    var verificarOculto=function(obj){
        $.each(obj.domTabla,function(identificador,valor){
            if(valor.config.oculto != undefined){
                $.each(valor.config.oculto,function(id,columna){
                    $("[columna="+identificador+'__'+columna+"]").css("display","none");
                });
            }
        });
    }

    /*
     * Funcion principal del plugin
     * param= option: son los parametros de configuracion de Grid
     */
    $.fn.dtgrid = function( origen,options ) {
        var div = $(this)[0];
        var objDtgrid = {
            'config': [],
            'domTabla': {},
            'objeto':[],
            'origen':origen,
            'opciones':options
        };

        construir(objDtgrid,div);
        return this;
    };


}( jQuery ));
