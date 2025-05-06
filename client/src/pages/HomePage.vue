<script setup>


</script>

<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col-12 bg-img">
        <div class="d-flex flex-column header-card w-50 mt-5 ms-3 rounded-4">
          <h1 class="p-2">Discover events you're interested in</h1>
          <p class="fs-4 mt-3 p-2">Event management for people, by people.</p>
          <div></div>
          <p class="p-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium nam et illo optio numquam
            odit,
            repellendus quaerat perferendis nulla adipisci necessitatibus dicta ducimus ratione minus suscipit corporis
            eligendi a at?</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        events cards here
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.bg-img {
  background-image: url('https://images.unsplash.com/photo-1556913337-57357cda0264?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fHBlb3BsZSUyMGF0JTIwYSUyMGNvbnZlbnRpb258ZW58MHwwfDB8fHwy');
  height: 500px;
  background-size: cover;
  aspect-ratio: 1/1;
  background-position: center;
  object-fit: cover;
  width: 100%;
  image-rendering: smooth;
}

.header-card {
  background-color: rgba(255, 255, 255, 0.54);
}
</style>
