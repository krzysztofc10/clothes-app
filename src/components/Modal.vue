<template>
    <div class="modal">
        <transition name="modal">
            <div class="modal__mask">
                <div class="modal__wrapper">
                    <div
                        class="modal__container"
                        v-click-outside="() => $emit('hideModal')"
                    >
                        <div class="modal__header">{{ header }}</div>
                        <div class="modal__body">
                            <slot name="body"></slot>
                        </div>
                        <div class="modal__footer">
                            <slot name="footer"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
    name: 'Modal',
    props: ['header'],
    directives: {
        ClickOutside
    }
}
</script>

<style lang="scss">
.modal {
    &__mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
        transition: opacity 0.3s ease;
    }

    &__wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    &__container {
        width: 420px;
        margin: 0px auto;
        background-color: #fff;
        box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 20px 20px rgba(0, 0, 0, 0.08);
        transition: all 0.5s ease;
        border-radius: 16px;
        border: 1px solid #DEE2E6;
        padding: 36px 40px;
        gap: 36px;
    }

    &__header {
        color: #54595E;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
    }

    &__footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 8px;
    }

    &__body {
        margin: 20px 0;
    }

    &__default-button {
        float: right;
    }

    &__enter {
        opacity: 0;
    }

    &__leave-active {
        opacity: 0;
    }

    &__enter &__container,
    &__leave-active &__container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
}
</style>
