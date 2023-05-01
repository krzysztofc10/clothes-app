<template>
    <textarea
        v-model="text"
        class="input"
        @input="$emit('onText', text)"
    >
    </textarea>
</template>

<script>

export default {
    name: 'Input',
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
    padding: 16px 18px 0;
    border-radius: 10px;
    border: 1px solid #4F4F4F;
    height: 150px;
    resize: none;
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
}
</style>
