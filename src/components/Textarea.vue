<template>
    <textarea
        v-model="text"
        class="textarea"
        @input="$emit('onText', text)"
    >
    </textarea>
</template>

<script>
export default {
    name: 'Textarea',
    data() {
        return {
            text: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.textarea {
    width: 100%;
    padding: 16px 18px 0;
    border-radius: 10px;
    border: 1px solid #4F4F4F;
    resize: none;
    font-weight: 500;
    font-size: 16px;
    height: 150px;
    line-height: 18px;
}
</style>
