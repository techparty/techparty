<?php //print_r($names); ?>

<ul>
  <?php foreach ($names as $n): ?>
    <li class="resp-list-item">
      <input type="checkbox" id="user-<?php echo $n->id; ?>" data-days="<?php echo $n->times; ?>">
      <label for="user-<?php echo $n->id; ?>"><?php echo $n->name; ?></label>
    </li>
  <?php endforeach; ?>
</ul>