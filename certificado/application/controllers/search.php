<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Search extends CI_Controller {
  public function index() {
    $this->load->model('users');

    $username = $this->input->post('username');

    $data['names'] = $this->users->getNames($username);
    //$data['names'] = array('name' => 'fernando');

    #$data['username'] = $username;
    #$data['status'] = 'ok';
    #$data['message'] = ' server status';

    $this->load->view('search-resp', $data);
  }
}