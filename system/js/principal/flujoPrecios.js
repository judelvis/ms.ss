$(function () {
    estadistica();
});

function estadistica(){
    var sUrl = 'http://' + window.location.hostname + '/ms.ss';
    var sUrlP = sUrl + '/index.php/Principal/';

    $.ajax({url : "generaFlujoPrecio",
        type : "POST",
        dataType : "json",
        async:false,
        success : function(resp) {
           json = resp;
        }
    });
    //alert(JSON.stringify(json.categories));
    $("#estadistica1").insertFusionCharts({
        type: "msline",
        width: "90%",
        height: "400",
        dataFormat: "json",
        dataSource: {
            chart: {
                caption: "Precio de Productos",
                subCaption: "Por Dia",
                numberPrefix: "BS.  ",
                //theme: "carbon",
                "placevaluesInside": "1",
                showlegend: "1",
                showlabels: "1",
                "formatNumberScale": "0",
                "decimalSeparator": ",",
                "thousandSeparator": ".",
                "showAlternateHGridColor": "0",
                "divlineAlpha": "100",
                "divlineThickness": "1",
                "divLineDashed": "1",
                "divLineDashLen": "1",
                "divLineGapLen": "1",
                "lineThickness": "3",
                "flatScrollBars": "1",
                "scrollheight": "5",
                "numVisiblePlot": "12",
                "showHoverEffect": "1"
            },
            "categories": json.categories,
            "dataset": json.dataset
        }
    });
}
