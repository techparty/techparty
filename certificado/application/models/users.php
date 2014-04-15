<?php 

class Users extends CI_Model {

  public function __construct() {
    parent::__construct();
  }

  public function getNames ($val) {

    $this->db->select("name, id, count(name) as times");
    $this->db->like('name', $val); // like na coluna `name`
    $this->db->group_by('name');

    $names = $this->db->get('names'); // escolhe a tabela `names`

    return $names->result();
  }

}