<template>
    <div class="settings">
        <span class="settings__title">{{ $t('settings.lang') }}</span>
        <select class="settings__locale-changer" v-model="chosenLang" @change="setLang">
            <option v-for="(lang, i) in langs" :key="`Lang${ i }`" :value="lang.name">
                {{ lang.name }}
            </option>
        </select>
        <Button
            @click.native="logout"
            :text="$t('settings.logout')"
        />
    </div>
</template>

<script>
import Button from '@/components/Button';

export default {
    name: 'Settings',
    components: { Button },
    data() {
        return {
            langs: [{ key: 'en', name: 'English' }, { key: 'pl', name: 'Polish' }],
            chosenLang: ''
        }
    },
    mounted() {
        const getLocale = this.langs.find(el => el.key === this.$i18n.locale);

        this.chosenLang = getLocale.name;
    },
    methods: {
        setLang() {
            const lang = this.langs.find(el => el.name === this.chosenLang).key;

            localStorage.setItem('lang', lang);
            this.$i18n.locale = lang;
        },
        logout() {
            this.$store.commit('reset');
            this.$router.push({ path: '/' });
        }
    }
}
</script>

<style lang="scss">
.settings {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin: 32px;

    &__locale-changer {
        width: 200px;
        height: 32px;
        border: 1px solid #4F4F4F;
        border-radius: 10px;
    }

    &__title {
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
    }
}
</style>
