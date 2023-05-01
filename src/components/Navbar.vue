<template>
    <div class="navbar">
        <RoundButton
            v-if="isDashboard"
            @click.native="$router.push({ path: '/profile' })"
            :img="getUserAvatar || personIcon"
            :avatar="Boolean(getUserAvatar)"
            nav
        />
        <RoundButton
            v-else
            @click.native="$router.push({ path: '/dashboard' })"
            :img="arrowIcon"
            nav
        />
        <img
            class="navbar__logo"
            :src="logo"
        />
        <RoundButton
            :class="{ 'navbar__right-btn' : !isDashboard }"
            @click.native="$router.push({ path: '/chat' })"
            :img="forumIcon"
            nav
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RoundButton from './RoundButton';
import personIcon from '@/assets/img/person.svg';
import forumIcon from '@/assets/img/forum.svg';
import arrowIcon from '@/assets/img/arrow_left.svg';
import logo from '@/assets/img/logo.svg';

export default {
  components: { RoundButton },
  name: 'Navbar',
    data() {
        return {
            personIcon,
            forumIcon,
            arrowIcon,
            logo
        }
    },
    computed: {
        ...mapGetters(['getUserAvatar']),
        isDashboard() {
            return this.$route.name === 'Dashboard';
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
