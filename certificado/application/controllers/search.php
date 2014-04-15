<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Search extends CI_Controller {
  public function index() {
    $username = $this->input->post('username');

    $data['username'] = $username;
    $data['status'] = 'ok';
    $data['message'] = ' server status';

    $this->load->view('search-resp', $data);
  }
}