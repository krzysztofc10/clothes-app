<template>
  <div class="dashboard">
    <TinderCards/>
  </div>
</template>

<script>
import TinderCards from '@/components/TinderCards';
export default {
  name: 'Dashboard',
  components: { TinderCards }
}
</script>

<style scoped lang="scss">
.dashboard {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
