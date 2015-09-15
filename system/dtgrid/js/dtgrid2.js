(function ( $ ) {
    var defecto = {
        rutaejecucion:'',
        titulo: '',
        excel:false,
        exceldetalle:false,
        enumera:false,
        paginador:false,
        clase:false,
        editable:false
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
            var numera = false;
            if(arreglo.config.enumera != undefined) numera=arreglo.config.enumera;
            crearCabecera(identificador,arreglo.datos.cabecera,numera);
            crearCuerpo(identificador,arreglo.datos.cuerpo,numera);
            if(arreglo.config.editable != undefined) {
                btnEditable(identificador,obj);
            }
        });
        verificarOculto(obj);
    }

    var btnEditable = function(identificador,obj){
        if (typeof verificarEditable == 'function') {
            var icoEditar = document.createElement('button');
            icoEditar.id='btnEditar-'+identificador;
            icoEditar.style.cssText='background-color: transparent !important;border:0px;';
            var imgEditar = document.createElement('img');
            imgEditar.src='../img/editable.ico';
            imgEditar.style.cssText='width:15px;';
            imgEditar.id = 'imgEditar-'+identificador;
            icoEditar.appendChild(imgEditar);
            $("#titulo-"+identificador).append(icoEditar);
            verificarEditable(identificador,obj.domTabla);
        }
    }

    var crearTabla = function(identificador, arreglo,div){
        var tabla = document.createElement('table');//crea la tabla
        tabla.id = 'tbl-'+identificador;
        tabla.className = 'heavyTable';
        tabla.style.cssText='position: relative;heigth:100px:';
        var titulo = tabla.createCaption();//crea caption
        titulo.id='titulo-'+identificador;
        if(arreglo.config.titulo != undefined)titulo.innerHTML = arreglo.config.titulo;
        else titulo.innerHTML = 'tbl_'+defecto.titulo;
        var domCabecera = tabla.createTHead();//crea thead
        domCabecera.id = 'cabecera-'+identificador;
        var domCuerpo = tabla.createTBody();//crea tbody
        domCuerpo.id = 'cuerpo-'+identificador;
        var domPie = tabla.createTFoot();//crea tfoot
        domPie.id = 'pie-'+identificador;
        div.appendChild(tabla);
    }
    /*
     * Funcion que construye la cabecera
     */
    var crearCabecera = function(identificador,datosCabecera,numera){
        var cabeceraInicial = document.getElementById('cabecera-'+identificador);
        var filaCabecera = cabeceraInicial.insertRow(0);//crea fila de la cabecera
        filaCabecera.id = 'fila-cabecera-'+identificador;
        if(numera){
            var thNumera = document.createElement('th');//crea th para la numeracion
            thNumera.id='th-numera-'+identificador;
            thNumera.style.cssText='width:35px';
            filaCabecera.appendChild(thNumera);
        }
        var i=1;
        crearCeldaCabecera(datosCabecera,identificador,filaCabecera);
    }
    /*
     * Crea el cuerpo inicial del grid
     * param = 	identificador: determina la tabla a la cual se le va a agregar el cuerpo
     * 			datosCuerpo:arreglo con datos para contruir el cuerpo de la tabla
     */
    var crearCuerpo= function(identificador,datosCuerpo,numera){
        var cuerpoInicial = document.getElementById('cuerpo-'+identificador);
        var i = 1;
        var btnFocoFila = document.createElement('button');
        btnFocoFila.style.cssText = 'background-color: transparent !important;border:0px;'
        $.each(datosCuerpo,function(){
            var filaCuerpo = cuerpoInicial.insertRow(cuerpoInicial.rows.length);//crea fila del cuerpo de la tabla
            filaCuerpo.id = 'fila-'+identificador+'-'+i;
            if(i==1)filaCuerpo.className='first';
            if(numera){
                var btnClon = btnFocoFila.cloneNode(true);
                btnClon.id='btn-'+identificador+i;
                btnClon.innerHTML=i;
                var thNumera = document.createElement('th');//crea th para la numeracion
                thNumera.id='th-numera-'+identificador+'-'+i;
                //thNumera.innerHTML = i;
                thNumera.appendChild(btnClon);
                thNumera.style.cssText='width:10px';
                filaCuerpo.appendChild(thNumera);
            }
            crearCelda(this,filaCuerpo,identificador,cuerpoInicial);
            i++;
        });
    }

    var crearCelda = function(obj,filaCuerpo,identificador,cuerpoInicial){
        var j = 1;
        $.each(obj,function(claveColumna,valorColumna){//Recorrido De los datos de la fila para contruir los td a agregar en la fila del cuerpo
            var tdCuerpo = filaCuerpo.insertCell(filaCuerpo.cells.length);//inserta td en la fila del cuerpo
            tdCuerpo.id='td-'+identificador+'-'+cuerpoInicial.rows.length+'-'+filaCuerpo.cells.length;
            tdCuerpo.innerHTML=valorColumna;
            tdCuerpo.setAttribute('columna',identificador+'-'+j);//crea el atributo columna a elemetos de la cabecera
            tdCuerpo.setAttribute('fila',identificador+'-'+cuerpoInicial.rows.length);
            j++
        });
    }

    var crearCeldaCabecera = function(datosCabecera,identificador,filaCabecera){
        var i = 1;
        $.each(datosCabecera,function(){//Recibe como parametro del repita arreglo con datos de la cabecera
            var thCabecera = document.createElement('th');//crea th a insertar en la fila de la cabecera
            thCabecera.id='th-cabecera-'+identificador+i;
            thCabecera.setAttribute('columna',identificador+'-'+i);//crea el atributo columna a elemetos de la cabecera
            thCabecera.innerHTML=this;
            filaCabecera.appendChild(thCabecera);//agrega el th al final la fila de la cabecera
            i++;
        });
    }

    var verificarOculto=function(obj){
        $.each(obj.domTabla,function(identificador,valor){
            if(valor.config.oculto != undefined){
                $.each(valor.config.oculto,function(id,columna){
                    $("[columna="+identificador+'-'+columna+"]").css("display","none");
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