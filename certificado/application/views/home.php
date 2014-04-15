<!doctype html>
<html lang="en">
<head>
	
  <base href="<?php echo base_url(); ?>">

  <meta charset="UTF-8">
  <title>Certificados - TechParty</title>

  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
	
  <div class="content">
    <header>
      <h1 class="section-title proj-title text-center">Certificados - TechParty</h1>  

      <p class="text-center section-description">
        Participou da TechParty(<a href="http://techparty.faccat.br">techparty.faccat.br</a>) e precisa do certificado? <br> 
        Você pode usar o campo abaixo para pesquisar seu nome!
      </p>
    </header>

    <main class="main">
      <input type="text" name="username" id="username-input" placeholder="Nome">

      <section id="resp">
        <ul>
          <li class="resp-list-item">
            <input type="checkbox" id="user-1" data-days="2">
            <label for="user-1">Fernando de Siqueira Porazzi</label>
          </li>
          <li class="resp-list-item">
            <input type="checkbox" id="user-2" data-days="1">
            <label for="user-2">Lorem ipsum.</label>
          </li>
          <li class="resp-list-item">
            <input type="checkbox" id="user-3" data-days="5">
            <label for="user-3">Lorem ipsum dolor sit amet.</label>
          </li>
          <li class="resp-list-item">
            <input type="checkbox" id="user-4" data-days="3">
            <label for="user-4">Lorem ipsum dolor.</label>
          </li>
        </ul>
      </section>
    </main>
  </div>

  <script src="assets/js/main.js"></script>
</body>
</html>