<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Search extends CI_Controller {

  public function index() {

    // carrega a model de usuários
    $this->load->model('users');

    // recebe nome passado na requisição ajax
    $username = $this->input->post('username');

    $year = $this->uri->segment(2) ?: 2015;

    // model `users` tem o método getNames() que retorna um array de acordo com o LIKE
    $data['names'] = $this->users->getNames($username, $year);

    // passa dados pra view
    $this->load->view('search-resp', $data);
  }

}
