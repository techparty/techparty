<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Palestrantes extends CI_Controller {
	public function index() {
		$this->load->view('palestrantes');
	}
}