<template>
    <input
        v-model="text"
        class="input"
        @input="$emit('onText', text)"
        :placeholder="placeholder"
    >
</template>

<script>
export default {
    name: 'Input',
    props: {
        placeholder: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            text: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.input {
    width: 100%;
    padding: 4px 22px;
    border-radius: 10px;
    border: 1px solid #4F4F4F;
    resize: none;
    font-weight: 500;
    font-size: 16px;
    line-height: 12px;
}
</style>
