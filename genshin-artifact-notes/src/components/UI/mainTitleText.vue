<template>
  <div class="text-container">
    <div class="main-title">
      <h1>GAN</h1>
      <p>Genshin Artifact Notes</p>
    </div>
    <div class="main-text">
      <p>
        Приложение GAN - это справочник артефактов для игры Genshin Impact. В приложении
        вы можете найти информацию о различных наборах артефактов и их местоположении.
      </p>
      <p>
        Используйте меню выбора наборов артефактов, чтобы найти нужный набор, а затем
        выберите свойства артефактов, чтобы получить информацию о его бонусах.
      </p>
      <p>
        GAN позволяет игрокам легко найти, узнать доступное время для фарма и собрать
        лучшие наборы артефактов для своих персонажей в игре Genshin Impact.
      </p>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  @import "@/assets/scss/imports.scss";
  .text-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 88.2vh;
  }
  .main-title {
    width: 100%;
    text-align: center;
    margin: 45px 0 65px 0;
    & h1 {
      font-family: $ff_MainTitle;
      font-size: calc(40px + 200 * (100vw / 1920));
    }

    p {
      position: relative;

      font-family: $ff_MainText;
      line-height: 140%;
      font-size: calc(22px + 89 * (100vw / 1920));

      &:after {
        content: "";
        position: absolute;
        border-bottom: 1.5rem solid $white;
        border-radius: 3rem;
        opacity: 0.2;
        width: 10vw;
        left: 50%;
        bottom: -45px;
        transform: translateX(-50%);
      }
    }
  }

  .main-text {
    @include fdrjc_ais;

    & p {
      font-family: $ff_R;
      font-size: calc(12px + 6 * (100vw / 1920));
      padding: 10px;
      margin: 0 10px;
      width: calc(100% / 4);
    }
  }

  @media screen and (max-width: 1198px) {
    .main-text p {
      width: calc(100% / 3);
    }
  }
  @media screen and (max-width: 867px) {
    .main-text p {
      width: 75%;
    }
    .main-text {
      text-align: center;
      flex-direction: column;
      align-items: center;
    }
  }
</style>
