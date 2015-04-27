<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Search extends CI_Controller {

  public function index() {

    // carrega a model de usuários
    $this->load->model('users');

    // recebe nome passado na requisição ajax
    $username = $this->input->post('username');

    // model `users` tem o método getNames() que retorna um array de acordo com o LIKE
    $data['names'] = $this->users->getNames($username, 2015);

    // passa dados pra view
    $this->load->view('search-resp', $data);
  }

  public function 2014() {

    // carrega a model de usuários
    $this->load->model('users');

    // recebe nome passado na requisição ajax
    $username = $this->input->post('username');

    // model `users` tem o método getNames() que retorna um array de acordo com o LIKE
    $data['names'] = $this->users->getNames($username, 2014);

    // passa dados pra view
    $this->load->view('search-resp', $data);
  }

}
