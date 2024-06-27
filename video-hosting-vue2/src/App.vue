<template>
  <div class="full-wrapper">
    <header>
      <nav class="nav">
        <router-link class="nav-item" to="/">На Главную</router-link>
      </nav>
    </header>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
@import "./assets/scss/imports.scss";
header {
  height: 80px;
}

.main {
  margin: 45px 0 420px 0;
}

.nav {
  @include fdrjs_aic;
  width: 100%;
  padding: 20px 0;
  height: 80px;
}
.nav-item {
  font-size: 2rem;
  font-weight: bold;
  margin: 10px 20px;
}
</style>
