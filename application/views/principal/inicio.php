<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Sala Situacional</title>
    <!--Import materialize.css-->
    <link type="text/css" rel="stylesheet" href="<?php echo __MATE__;?>css/materialize.min.css" media="screen,projection"/>

    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <!--Import jQuery before materialize.js-->
    <script type="text/javascript" src="<?php echo __JSVIEW__;?>jquery-2.1.3.min.js"></script>
    <script type="text/javascript" src="<?php echo __MATE__;?>js/materialize.min.js"></script>

</head>
<link href="jquery-ui/jquery-ui.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="<?php echo __JSVIEW__;?>jquery-ui/jquery-ui.js"></script>

<script type="text/javascript" src="<?php echo __JSVIEW__;?>fusion/js/fusioncharts.js"></script>
<script type="text/javascript" src="<?php echo __JSVIEW__;?>fusion/js/themes/fusioncharts.theme.carbon.js"></script>
<script type="text/javascript" src="<?php echo __JSVIEW__;?>fusion/js/fusioncharts-jquery-plugin.js"></script>
<script type="text/javascript" src="<?php echo __JSVIEW__;?>jquery.rwdImageMaps.min.js"></script>
<script type="text/javascript" src="<?php echo __JSVIEW__;?>principal/venezuela.js"></script>
<div class="container">
    <div class="row">
        <div class="row" id="f1">
            <div class="col s12 card-panel">
                <h5 class="header center">Mapa</h5>
            </div>
        </div>
        <div class="row" id="venezuela">
            <div class="col s12 card-panel">
                <div class="row">
                    <div class="col s12 center-align">
                        <img src="<?php echo __IMG__;?>Mapa-de-Venezuela.jpg" class="responsive-img" alt=""  width="560" height="430" border="0" usemap="#map1"/>
                        <map name="map1">
                            <!-- #$-:Image map file created by GIMP Image Map plug-in -->
                            <!-- #$-:GIMP Image Map plug-in by Maurits Rijk -->
                            <!-- #$-:Please do not edit lines starting with "#$" -->
                            <!-- #$VERSION:2.3 -->
                            <!-- #$AUTHOR:judelvis -->
                            <area shape="rect" coords="209,248,314,392" estado="amazonas" href="#" onclick="mapa(1,this.getAttribute('estado'))" />
                            <area shape="rect" coords="308,114,365,150" estado="anzoategui" href="#" onclick="mapa(2,this.getAttribute('estado'))" />
                            <area shape="rect" coords="117,164,231,209" estado="apure" href="#" onclick="mapa(3,this.getAttribute('estado'))" />
                            <area shape="poly" coords="246,105,248,93,246,91,244,80,236,78,227,77,225,72,225,66,221,62,214,62,215,69,215,78,215,86,220,88,232,90,237,93,239,98,232,103,239,108,246,107,247,106,247,100,246,103,242,103,246,102" estado="aragua" href="#" onclick="mapa(4,this.getAttribute('estado'))" />
                            <area shape="rect" coords="99,129,202,156" estado="barinas" href="#" onclick="mapa(5,this.getAttribute('estado'))" />
                            <area shape="rect" coords="253,167,444,238" estado="bolivar" href="#" onclick="mapa(6,this.getAttribute('estado'))" />
                            <area shape="rect" coords="182,61,211,86" estado="carabobo" href="#" onclick="mapa(7,this.getAttribute('estado'))" />
                            <area shape="rect" coords="160,85,205,102" estado="cojedes" href="#" onclick="mapa(8,this.getAttribute('estado'))" />
                            <area shape="rect" coords="402,81,488,150" estado="delta amacuro" href="#" onclick="mapa(9,this.getAttribute('estado'))" />
                            <area shape="rect" coords="200,35,239,62" estado="distrito federal" href="#" onclick="mapa(10,this.getAttribute('estado'))" />
                            <area shape="rect" coords="92,28,179,48" estado="falcon" href="#" onclick="mapa(11,this.getAttribute('estado'))" />
                            <area shape="rect" coords="207,110,296,143" estado="guarico" href="#" onclick="mapa(12,this.getAttribute('estado'))" />
                            <area shape="rect" coords="107,55,153,87" estado="lara" href="#" onclick="mapa(13,this.getAttribute('estado'))" />
                            <area shape="rect" coords="58,125,91,141" estado="merida" href="#" onclick="mapa(14,this.getAttribute('estado'))" />
                            <area shape="rect" coords="231,63,285,80" estado="miranda" href="#" onclick="mapa(15,this.getAttribute('estado'))" />
                            <area shape="rect" coords="340,80,398,111" estado="monagas" href="#" onclick="mapa(16,this.getAttribute('estado'))" />
                            <area shape="rect" coords="310,23,386,50" estado="nueva esparta" href="#" onclick="mapa(17,this.getAttribute('estado'))" />
                            <area shape="rect" coords="122,101,174,127" estado="portuguesa" href="#" onclick="mapa(18,this.getAttribute('estado'))" />
                            <area shape="rect" coords="322,53,422,72" estado="sucre" href="#" onclick="mapa(19,this.getAttribute('estado'))" />
                            <area shape="rect" coords="30,153,70,177" estado="tachira" href="#" onclick="mapa(20,this.getAttribute('estado'))" />
                            <area shape="rect" coords="86,94,120,110" estado="trujillo" href="#" onclick="mapa(21,this.getAttribute('estado'))" />
                            <area shape="rect" coords="243,37,282,60" estado="vargas" href="#" onclick="mapa(22,this.getAttribute('estado'))" />
                            <area shape="rect" coords="156,54,182,82" estado="yaracuy" href="#" onclick="mapa(23,this.getAttribute('estado'))" />
                            <area shape="rect" coords="26,51,59,118" estado="zulia" href="#" onclick="mapa(24,this.getAttribute('estado'))" />
                        </map>
                        <map name="Map"><area alt="Pulsar para ver" shape="circle" coords="82,149,20"
                                              href="#" onclick="mapa(">
                    </div>
                </div>
            </div>
        </div>
        <div class="row card-panel center-align" id="">
            <div class="col s12 ">
                <div id="estadistica1"></div>
            </div>
        </div>
    </div>
</div>


</body>

</head>
</html>