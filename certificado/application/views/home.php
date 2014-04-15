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
	
  <div class="content" id="content">
    <header>
      <h1 class="section-title proj-title text-center">Certificados - TechParty</h1>  

      <p class="text-center section-description">
        Participou da TechParty(<a href="http://techparty.faccat.br">techparty.faccat.br</a>) e precisa do certificado? <br> 
        Você pode usar o campo abaixo para pesquisar seu nome e imprimir o certificado.
      </p>
    </header>

    <main class="main">
      <input type="text" name="username" id="username-input" placeholder="Nome">

      <section id="resp"></section>
    </main>
  </div>

  <div class="print-area hidden" id="print-area">
    <div class="actions" id="actions">
      <button id="print-button" onclick="Search.print(this);" class="actions-bt">Imprimir</button>
      <a href="" id="download" download="certificado-techparty.png" onclick="Search.download(this);" class="actions-bt">Download</a>
    </div>

    <canvas id="c" width="1170" height="690"></canvas>
  </div>

  <script src="assets/js/main.js"></script>
</body>
</html>