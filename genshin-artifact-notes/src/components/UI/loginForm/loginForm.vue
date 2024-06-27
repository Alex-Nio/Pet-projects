<template>
  <form @submit.prevent="handleSubmit" class="form">
    <div class="form-group">
      <label for="email">Email</label>
      <input
        class="form__input"
        @blur="$v.email.$touch()"
        @input="$v.email.$reset()"
        id="email"
        v-model.trim="$v.email.$model"
      />
      <div v-if="$v.email.$error" class="error">
        <p>Поле должно содержать корректный email</p>
      </div>
    </div>
    <div class="form-group">
      <label for="password">Пароль</label>
      <input
        class="form__input"
        @blur="$v.password.$touch()"
        @input="$v.password.$reset()"
        type="password"
        id="password"
        v-model.trim="$v.password.$model"
      />
      <div v-if="$v.password.$dirty && $v.password.$error" class="error">
        Пароль должен содержать минимум
        {{ $v.password.minLength.$params.min }} символов Осталось:
        {{ $v.password.minLength.$params.min - $v.password.$model.length }}
        {{
          $v.password.minLength.$params.min - $v.password.$model.length <= 4
            ? "символа"
            : "символов"
        }}
      </div>
    </div>
    <div class="form__actions">
      <button
        @click="handleLogin"
        class="form__btn"
        type="submit"
        :disabled="$v.$invalid"
      >
        Войти
      </button>
      <button class="form__btn" type="button" @click="handleRegister">Регистрация</button>
    </div>
  </form>
</template>

<script setup>
  import { reactive } from "vue";
  import { useRouter } from "vue-router";
  import { required, minLength, email } from "@vuelidate/validators";
  import { useVuelidate } from "@vuelidate/core";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { useStore } from "vuex";

  const emit = defineEmits(["loginError", "requestsError"]);
  const store = useStore();
  const router = useRouter();

  store.dispatch("Authorization");

  const state = reactive({
    email: "",
    password: "",
  });

  const rules = {
    email: { required, email },
    password: { required, minLength: minLength(6) },
  };

  const params = {
    password: {
      minLength: { min: 6 },
    },
    minLength: { min: 6 },
  };

  const validations = useVuelidate(rules, state, { params });
  const $v = validations;

  const handleLogin = () => {
    signInWithEmailAndPassword(getAuth(), state.email, state.password)
      .then((data) => {
        // console.log("Login successful");
        router.push("/");
      })
      .catch((error) => {
        // console.log(error.code);
        if (error.code === "auth/wrong-password") {
          emit("loginError");
        }

        if (error.code === "auth/too-many-requests") {
          emit("requestsError");
        }
      });
  };

  const handleRegister = () => {
    router.push("/registration");
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/imports.scss";
  .form {
    @include fdcjc_aic;
    width: 100%;
    max-width: 400px;
    padding: 15px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(1.9px);
    -webkit-backdrop-filter: blur(1.9px);
    border: 1px solid rgba(255, 255, 255, 0.59);

    &__input {
      width: 100%;
    }

    &__actions {
      @include fdrjsb_aic;
      width: 100%;
    }

    &__btn {
      font-size: 1.6rem;
      padding: 10px 35px;
      margin: 0 10px;
      background-color: $white;
      color: $black;
      border: 2px solid transparent;
      transition: all 0.2s linear;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }

      &:hover {
        color: $white;
        border: 2px solid rgba(36, 226, 229, 0.3);
        background-color: rgba(36, 226, 229, 0.8);
        transition: all 0.2s linear;
      }
      &:active {
        border: 2px solid rgba(36, 226, 229, 0.3);
        background-color: rgba(0, 0, 0, 0.8);
        transition: all 0.2s linear;
      }
      &:disabled {
        color: #c3c3c3a4;
        border: 2px solid rgba(132, 134, 134, 0.3);
        background-color: rgba(110, 109, 109, 0.5);

        &:hover {
          pointer-events: none;
        }
      }
    }
  }

  .form-group {
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-bottom: 20px;
  }

  label {
    font-size: 2.2rem;
    font-weight: bold;
    margin-bottom: 5px;
  }

  input {
    background-color: white;
    border: 1px solid white;
    border-radius: 4px;
    color: #555;
    font-size: 16px;
    padding: 10px;
    width: 100%;
    outline: none;

    &:focus {
      border-color: #30c7cf;
      box-shadow: 0 0 0 2px #30c7cf;
      outline: none;
    }
  }

  .error {
    color: red;
    margin-top: 5px;
  }

  @media screen and (max-width: 352px) {
    .form__actions {
      flex-wrap: wrap;
      justify-content: center;
    }

    .form__btn:first-child {
      margin-bottom: 20px;
    }
  }
</style>
