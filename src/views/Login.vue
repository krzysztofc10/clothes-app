<template>
    <div class="login">
        <div class="login__wrapper">
            <img class="login__logo" :src="logo"/>
            <h1 class="login__title">{{ mode === 'login' ? $t('login') : $t('register') }}</h1>
            <div v-if="showGoogleLogin" class="google-login-btn" id="googleLoginBtn"></div>
            <div v-if="mode === 'login'" class="login-block">
                <Input @onText="handleLoginEmail" :placeholder="$t('login.placeholder.email')"/>
                <span v-if="showErrorMsg" class="error-msg">{{ $t('login.error-msg') }}</span>
                <Button class="btn--primary" :text="$t('login.btn')" @click.native="handleLogin"/>
                <a class="link" @click="mode = 'register'">{{ $t('register.btn') }}</a>
            </div>
            <div v-if="mode === 'register'" class="register-block">
                <Input @onText="(e) => handleRegister('name', e)" :placeholder="$t('login.placeholder.name')"/>
                <span v-if="validationErrors.name" class="error-msg">{{ $t('registration.incorrect.name') }}</span>
                <Input @onText="(e) => handleRegister('surname', e)" :placeholder="$t('login.placeholder.surname')"/>
                <span v-if="validationErrors.surname" class="error-msg">{{ $t('registration.incorrect.surname') }}</span>
                <Input @onText="(e) => handleRegister('email', e)" :placeholder="$t('login.placeholder.email')"/>
                <span v-if="validationErrors.email" class="error-msg">{{ $t('registration.incorrect.email') }}</span>
                <Button class="btn--primary" :text="$t('register.btn')" @click.native="handleRegisterBtn"/>
                <a class="link" @click="mode = 'login'">{{ $t('login.link.btn') }}</a>
            </div>
        </div>
    </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import { setUser, getUser } from '@/api/index';
import Button from '@/components/Button';
import Input from '@/components/Input';
import logo from '@/assets/img/logo.svg';

export default {
    name: 'Login',
    components: { Button, Input },
    data() {
        return {
            interval: 0,
            showGoogleLogin: false,
            loginEmail: '',
            register: {
                name: '',
                surname: '',
                email: '',
                avatar: ''
            },
            validationErrors: {
                name: false,
                surname: false,
                email: false
            },
            showErrorMsg: false,
            mode: 'login',
            logo
        }
    },
    async mounted() {
        if (process.env.NODE_ENV !== 'development') return;

        this.showGoogleLogin = true;

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
        },
        handleLoginEmail(text) {
            this.loginEmail = text;
        },
        handleRegister(type, text) {
            this.register[type] = text;
        },
        async handleRegisterBtn() {
            this.validationErrors.name = !this.register.name;
            this.validationErrors.surname = !this.register.surname;
            this.validationErrors.email = !this.register.email;

            if (this.validationErrors.name || this.validationErrors.surname || this.validationErrors.email) return;

            const resp = await setUser(this.register.surname, this.register.name, this.register.avatar, this.register.email);

            this.$store.commit('setName', this.register.surname);
            this.$store.commit('setSurname', this.register.name);
            this.$store.commit('setEmail', this.register.email);
            this.$store.commit('setAvatar', this.register.avatar);

            this.$store.commit('setUserId', resp?.data[0]);
            this.$router.push({ path: '/dashboard' });
        },
        async handleLogin() {
            const resp = await getUser(this.loginEmail);

            if (!resp?.data.length) {
                this.showErrorMsg = true
            } else {
                this.$store.commit('setUserId', resp?.data[0]);
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

    .login-block {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 12px;
    }

    .register-block {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 12px;
    }

    .error-msg {
        color: red;
        font-size: 12px;
    }

    .link {
        align-self: center;
        cursor: pointer;
    }
}
</style>
