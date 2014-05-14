<!doctype html>
<html lang="en">
<head>
	
  <base href="<?php echo base_url(); ?>">

  <meta charset="UTF-8">
  <title>Certificados - TechParty</title>

  <link rel="stylesheet" href="assets/css/style.css">

  <style type="text/css" media="print">
    @page { size: landscape; }
  </style>
</head>
<body>
	
  <?php 
    $speakers = array(
      array('id' => 1, 'name' => 'Fernando de Siqueira Porazzi', 'subject' => 'CSS Media Queries', 'date' => '31/03/2014'),
      array('id' => 2, 'name' => 'Cícero Raupp Rolim', 'subject' => 'Do cabrito ao bode', 'date' => '31/03/2014'),
      array('id' => 3, 'name' => 'Paulo Bridi', 'subject' => 'Do cabrito ao bode', 'date' => '31/03/2014'),
      array('id' => 4, 'name' => 'Santiago Andreuzza', 'subject' => 'Do cabrito ao bode', 'date' => '31/03/2014'),
      array('id' => 5, 'name' => 'Lauro Becker', 'subject' => 'Versatilidade, negócios e nerdices', 'date' => '01/04/2014'),
      array('id' => 6, 'name' => 'Mauricio Baum Jr.', 'subject' => 'Overview AngularJS + Ruby on Rails', 'date' => '01/04/2014'),
      array('id' => 7, 'name' => 'Juliano Selli', 'subject' => 'O que é experiência do usuário?', 'date' => '02/04/2014'),
      array('id' => 8, 'name' => 'Leonardo Dalmina', 'subject' => 'Criando Jogos 2D com Lua + Corona SDK', 'date' => '02/04/2014'),
      array('id' => 9, 'name' => 'Rafael Kellermann Streit', 'subject' => 'Como começar a desenvolver para iOS', 'date' => '03/04/2014'),
      array('id' => 10, 'name' => 'Rodrigo Krummenauer', 'subject' => 'The MEAN Stack: MongoDB, ExpressJS, AngularJS and Node.js', 'date' => '03/04/2014'),
      array('id' => 11, 'name' => 'Giovani Facchini', 'subject' => 'Performance Engineering in a Nutshell', 'date' => '04/04/2014'),
      array('id' => 12, 'name' => 'Maiko Gabriel Kinzel Engelke', 'subject' => 'Web e a criação de Jogos', 'date' => '04/04/2014'),
    );
  ?>

  <div class="content" id="content">
    <header>
      <h1 class="section-title proj-title text-center">Certificados - TechParty</h1>  

      <p class="text-center section-description">
        Palestrou na TechParty(<a href="http://techparty.faccat.br">techparty.faccat.br</a>) e precisa do certificado? <br> 
      </p>
    </header>

    <main class="main">
      <section id="resp">
        <ul>
          <?php foreach ($speakers as $s): ?>
            <li class="resp-list-item">
              <input type="checkbox" id="user-<?php echo $s['id'] ?>" data-name="<?php echo $s['name'] ?>" data-subject="<?php echo $s['subject'] ?>" data-date="<?php echo $s['date'] ?>" data-is-speaker="1" onchange="Search.bindCheckbox(this);">
              <label for="user-<?php echo $s['id'] ?>"><?php echo $s['name'] ?></label>
            </li>
          <?php endforeach; ?>
        </ul>
      </section>
    </main>
  </div>

  <div class="print-area hidden" id="print-area">
    <div class="actions" id="actions">
      <button id="print-button" onclick="Search.print(this);" class="actions-bt">Imprimir</button>
      <a href="" id="download" download="certificado-techparty.png" onclick="Search.download(this);" class="actions-bt">Download PNG</a>
    </div>

    <canvas id="c" width="1170" height="690"></canvas>
  </div>

  <script src="assets/js/main.js"></script>
</body>
</html>