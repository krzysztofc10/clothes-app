<template>
    <button class="btn">
        {{ text }}
        <img :src="icon">
    </button>
</template>

<script>

export default {
    name: 'Button',
    props: ['text', 'icon']
}
</script>

<style lang="scss" scoped>
.btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    padding: 7px 10px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    border: 1px solid transparent;

    &--outline {
        border: 1px solid #4F4F4F;
        color: #4F4F4F;
    }

    &--primary {
        background: #4F4F4F;
        color: #F5F5F5;
    }

    &--close {
        background: #faa89b;
        border: 1px solid #FB735F;
    }

    &--like {
        background: #81f7c2;
        border: 1px solid #4ACD91;
    }
}
</style>
