<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {
	public function index() {
		$this->load->view('home');
	}

  public function 2014() {
    $this->load->view('home');
  }
}
