$(function () {
    $('img[usemap]').rwdImageMaps();
    estadistica();
});

function mapa(id,est){
    alert(id+":"+est);
}

function estadistica(){
    $("#estadistica1").insertFusionCharts({
        type: "msline",
        width: "90%",
        height: "400",
        dataFormat: "json",
        dataSource: {
            chart: {
                caption: "Productos",
                subCaption: "Por Estado",
                numberPrefix: "KLG ",
                //theme: "carbon",
                "placevaluesInside": "1",
                showlegend: "1",
                showlabels: "1",
                "formatNumberScale": "0",
                "decimalSeparator": ",",
                "thousandSeparator": "."
            },
            "categories": [
                {
                    "category": [
                        {
                            "label": "Lun"
                        },
                        {
                            "label": "Mar"
                        },
                        {
                            "label": "Mie"
                        },
                        {
                            "label": "Jue"
                        },
                        {
                            "label": "Vie"
                        },
                        {
                            "label": "Sab"
                        },
                        {
                            "label": "Dom"
                        }
                    ]
                }
            ],
            "dataset": [
                {
                    "seriesname": "Arroz",
                    data: [
                        {
                            "value": "44200"
                        },
                        {
                            "value": "88100"
                        },
                        {
                            "value": "77200"
                        },
                        {
                            "value": "55500"
                        },
                        {
                            "value": "99100"
                        },
                        {
                            "value": "51000"
                        },
                        {
                            "value": "68000"
                        },
                        {
                            "value": "62000"
                        },
                        {
                            "value": "61000"
                        },
                        {
                            "value": "49000"
                        },
                        {
                            "value": "90000"
                        },
                        {
                            "value": "73000"
                        }
                    ]
                },{
                    "seriesname": "Caraotas",
                    data: [
                        {
                            "value": "22000"
                        },
                        {
                            "value": "61000"
                        },
                        {
                            "value": "33000"
                        },
                        {
                            "value": "25000"
                        },
                        {
                            "value": "81000"
                        },
                        {
                            "value": "91000"
                        },
                        {
                            "value": "78000"
                        },
                        {
                            "value": "82000"
                        },
                        {
                            "value": "61000"
                        },
                        {
                            "value": "29000"
                        },
                        {
                            "value": "80000"
                        },
                        {
                            "value": "93000"
                        }
                    ]

                }
            ]
        }
    });
}

