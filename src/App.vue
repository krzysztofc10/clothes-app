<template>
  <div id="app">
    <Navbar v-if="$route.name !== 'Login'"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
export default {
  name: 'App',
  components: { Navbar }
}
</script>

<style lang="scss">
html {
    overflow-y: scroll;
}

.overflow-y-hidden {
    overflow-y: hidden;
}

body {
    background: white;
}

html, 
body,
html *,
body * {
    font-family: 'Alkatra' !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; 
    text-rendering: optimizeLegibility;
    image-rendering: -webkit-optimize-contrast !important;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    word-break: break-word;
}

body * {
    scrollbar-width: thin;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        border-radius: 24px; 
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 24px;
    }
}
</style>
