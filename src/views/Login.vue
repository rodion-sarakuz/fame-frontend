<template>
  <div class="home">
    <b-container fluid="sm">
      <b-row style="margin: 36px 0 36px">
        <b-col cols="10"><h1 style="text-align: left">Авторизация</h1></b-col>
      </b-row>

      <div style="overflow: hidden; border-radius: 6px; box-shadow: 0 0 40px rgba(0, 0, 0, 0.18);">
        <b-form @submit="onLogin" v-if="isAuth">
          <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Email"
          ></b-form-input>
          <b-form-input
                  id="input-1"
                  v-model="form.password"
                  type="password"
                  required
                  placeholder="Пароль"
          ></b-form-input>
          <b-button type="submit" variant="primary">Войти</b-button>
        </b-form>
      </div>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data(){
    return {
      isAuth: true,
      form: {email: '', password: ''}
    }
  },
  methods:{
    async onLogin(evt) {
      evt.preventDefault()
      const formData = this.form;
      await this.$store.dispatch('login', formData)
    }
  },
  components: {
  },
};
</script>
