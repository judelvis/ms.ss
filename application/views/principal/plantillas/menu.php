<body>

<nav>
    <div class="nav-wrapper indigo accent-3">
        <a href="#" data-activates="mobile-demo" class="button-collapse"><i
                class="mdi-action-toc"></i></a>
        <ul class="right hide-on-med-and-down">
            <li><a href="<?php echo site_url("Principal/index");?>"><i class="mdi-action-home"></i></a></li>
            <li><a href="<?php echo site_url("Principal/flujoPrecios");?>" >Flujo De Precios</a></li>
            <li><a href="<?php echo site_url("Principal/reddis");?>" >RedDis</a></li>
        </ul>
        <ul class="side-nav" id="mobile-demo">
            <li><a href="<?php echo site_url("Principal/index");?>"><i class="mdi-action-home"></i></a></li>
            <li><a href="<?php echo site_url("Principal/flujo");?>" >Flujo De Preccios</a></li>
            <li><a href="<?php echo site_url("Principal/reddis");?>" >RedDis</a></li>
        </ul>
    </div>
</nav>