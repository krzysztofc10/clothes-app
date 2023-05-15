<template>
    <div class="navbar">
        <RoundButton
            v-if="isDashboard"
            :class="{ 'navbar__right-btn' : !isDashboard }"
            @click.native="$router.push({ path: '/settings' })"
            :img="settingsIcon"
            nav
        />
        <RoundButton
            v-else
            @click.native="handleArrowClick"
            :img="arrowIcon"
            nav
        />
        <img
            class="navbar__logo"
            :src="logo"
        />
        <RoundButton
            @click.native="$router.push({ path: '/profile' })"
            :img="getUserAvatar || personIcon"
            :avatar="Boolean(getUserAvatar)"
            nav
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RoundButton from './RoundButton';
import personIcon from '@/assets/img/person.svg';
import settingsIcon from '@/assets/img/settings.svg';
import arrowIcon from '@/assets/img/arrow_left.svg';
import logo from '@/assets/img/logo.svg';

export default {
  components: { RoundButton },
  name: 'Navbar',
    data() {
        return {
            personIcon,
            settingsIcon,
            arrowIcon,
            logo
        }
    },
    created() {
        if (!this.$store.state.user.userId) {
            this.$router.push({ path: '/' });
            this.$store.commit('reset');
        };
    },
    computed: {
        ...mapGetters(['getUserAvatar']),
        isDashboard() {
            return this.$route.name === 'Dashboard';
        }
    },
    methods: {
        handleArrowClick() {
            return this.$route.name === 'ProfilePhoto'
                ? this.$router.back()
                : this.$router.push({ path: '/dashboard' });
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 92px;
    border-bottom: 1px solid #f9f9f9;
    padding: 0 16px;

    &__logo {
        margin-top: 5px;
        width: 80px;
    }

    &__right-btn {
        visibility: hidden;
    }
}
</style>
