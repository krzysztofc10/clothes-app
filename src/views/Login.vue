<template>
    <div class="login">
        <div class="login__wrapper">
            <img class="login__logo" :src="logo"/>
            <h1 class="login__title">{{ $t('login') }}</h1>
            <div class="google-login-btn" id="googleLoginBtn"></div> 
        </div>
    </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import { setUser, getUser } from '@/api/index';
import logo from '@/assets/img/logo.svg';

export default {
  name: 'Login',
    data() {
        return {
            interval: 0,
            logo
        }
    },
    async mounted() {
        this.interval = setInterval(() => {
            if (!window.google?.accounts) return;

            window.google.accounts.id.initialize({
                client_id: process.env.VUE_APP_GOOGLE_AUTH_KEY,
                callback: (data) => this.onSucess(data)
            });
            
            this.runGoogleSignIn();
            clearInterval(this.interval);
        }, 300);
    },
    methods: {
        runGoogleSignIn() {
            window.google.accounts.id.renderButton( document.getElementById('googleLoginBtn'), { 
                width: document.querySelector('.google-login-btn-wrapper')?.clientWidth || 200,
                type: 'standard', 
                theme: 'outline',
                size: 'medium',
                text: 'signin_with',
                logo_alignment: 'center'
            });

            if (!this.abortGoogleTapFrame) window.google.accounts.id.prompt();
        },
        async onSucess(data) {
          const credentials = jwtDecode(data.credential);

          this.$store.commit('setName', credentials.family_name);
          this.$store.commit('setSurname', credentials.given_name);
          this.$store.commit('setEmail', credentials.email);
          this.$store.commit('setAvatar', credentials.picture);

          const resp = await getUser(credentials.email);

          if (!resp?.data.length) {
            const resp = await setUser(credentials.family_name, credentials.given_name, credentials.picture, credentials.email);

            this.$store.commit('setUserId', resp?.data[0]);
            this.$router.push({ path: '/dashboard' });
          } else {
            this.$store.commit('setUserId', resp?.data[0]?.user_id);
            this.$router.push({ path: '/dashboard' });
          }
        }
    }
}
</script>

<style lang="scss">
.login {
    background-image: url('@/assets/img/login-bg.jpg');
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 100%;
    width: 100%;

    &__logo {
        width: 120px;
        background: transparent;
    }

    &__wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 30px 40px;
        border-radius: 10px;
        background: #f1f1f1;
    }

    &__title {
        color: black;
        margin-bottom: 12px;
        text-align: center;
        margin-bottom: 20px;
        font-weight: 600;
        line-height: 2.75rem;
        font-size: 24px;
    }

    .google-login-btn {
        height: 32px;
        overflow: hidden;
    }
}
</style>
