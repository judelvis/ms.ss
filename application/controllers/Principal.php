<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Principal extends CI_Controller {

    function __construct(){
        parent::__construct();
        $this->load->helper('url');
    }

    public function index(){
        $this->load->view('principal/plantillas/head');
        $this->load->view('principal/plantillas/menu');
        $this->load->view('principal/inicio');
        $this->load->view('principal/plantillas/pie');
    }

    public function flujoPrecios(){
        $this->load->view('principal/plantillas/head');
        $this->load->view('principal/plantillas/menu');
        $this->load->view('principal/flujoPrecios');
        $this->load->view('principal/plantillas/pie');
    }

    public function social(){
        $this->load->view('principal/plantillas/head');
        $this->load->view('principal/plantillas/menu');
        $this->load->view('principal/social');
        $this->load->view('principal/plantillas/pie');
    }
    public function economico(){
        $this->load->view('principal/plantillas/head');
        $this->load->view('principal/plantillas/menu');
        $this->load->view('principal/economico');
        $this->load->view('principal/plantillas/pie');
    }
    public function geografico(){
        $this->load->view('principal/plantillas/head');
        $this->load->view('principal/plantillas/menu');
        $this->load->view('principal/geografico');
        $this->load->view('principal/plantillas/pie');
    }
    public function politico(){
        $this->load->view('principal/plantillas/head');
        $this->load->view('principal/plantillas/menu');
        $this->load->view('principal/politico');
        $this->load->view('principal/plantillas/pie');
    }
    public function militar(){
        $this->load->view('principal/plantillas/head');
        $this->load->view('principal/plantillas/menu');
        $this->load->view('principal/militar');
        $this->load->view('principal/plantillas/pie');
    }
    public function ambiental(){
        $this->load->view('principal/plantillas/head');
        $this->load->view('principal/plantillas/menu');
        $this->load->view('principal/ambiental');
        $this->load->view('principal/plantillas/pie');
    }

    function generaFlujoPrecio(){
        $category = array();
        $dataset = array();
        for($i=1;$i <= 15;$i++){
            $category[] = array("label"=>"dia".$i);
        }
        $categories[] = array("category"=>$category);
        for($i=1 ; $i <= 5;$i++){
            $valore = array();
            for($j=1;$j<=15;$j++){
                $valore[]= array("value"=>rand(10,100));
            }
            $dataset[] = array("seriesname"=>"producto".$i,"data"=>$valore);
        }
        $result = array("categories"=> $categories,"dataset"=>$dataset);
        echo json_encode($result);
    }
}
