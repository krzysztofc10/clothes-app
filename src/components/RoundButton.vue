<template>
    <button
        @click="handleClick"
        :class="[
            'btn-round',
            { 'btn-round--no-shadows' : nav,
              'btn-round--disabled' : disabled
            }
        ]"
        :disabled="disabled"
    >
        <img :class="['btn-round__img', { 'btn-round__img--avatar' : avatar }]" :src="img"/>
    </button>
</template>

<script>
export default {
    name: 'RoundButton',
    props: {
        img: {
            type: String
        },
        nav: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        avatar: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClick() {
            this.$emit('roundBtnClick');
        }
    }
}
</script>

<style lang="scss">

.btn-round {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: none;
    padding: 5px;
    box-shadow: 0px 10px 53px 0px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 70%;
    padding: 16px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.04);
    }

    &--no-shadows {
        box-shadow: none;
    }

    &--disabled {
        background-color: transparent;
        cursor: default;

        &:hover {
            background-color: transparent;
        }
    }

    &__img {
        width: 36px;

        &--avatar {
            border-radius: 50%;
        }
    }
}
</style>
