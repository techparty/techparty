<?php //print_r($names); ?>

<ul>
  <?php foreach ($names as $n): ?>
    <li class="resp-list-item">
      <input type="checkbox" id="user-<?php echo $n->id; ?>" data-name="<?php echo ucwords(strtolower($n->name)); ?>" data-days="<?php echo $n->times; ?>" onchange="Search.bindCheckbox(this);">
      <label for="user-<?php echo $n->id; ?>"><?php echo ucwords(strtolower($n->name)); ?> - <span class="bold">Número de dias: <?php echo $n->times; ?></span></label>
    </li>
  <?php endforeach; ?>
</ul>