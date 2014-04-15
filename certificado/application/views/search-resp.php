<ul>
  <?php foreach ($names as $n): ?>
    <li class="resp-list-item">
      <input type="checkbox" id="user-3" data-days="5">
      <label for="user-3"><?php echo $n->name; ?></label>
    </li>
  <?php endforeach; ?>
</ul>