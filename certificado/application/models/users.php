<?php 

class Users extends CI_Model {

  public function __construct() {
    parent::__construct();
  }

  public function getNames ($val) {


    $this->db->like('name', $val); // like na coluna `name`

    $names = $this->db->get('names'); // escolhe a tabela `names`

    return $names->result();
  }

}