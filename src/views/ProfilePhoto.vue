<template>
    <div class="profile-photo">
        <div
            :key="photo.photo_id"
            class="tile"
            :style="{ 'background-image': `url(${ photo.src })` }"
        >
            <div class="overlay" v-if="photo.category">
                <span class="title">{{ photo.category }}</span>
                <span class="subtitle">{{ photo.info }}</span>
            </div>
        </div>
        <span class="divider">{{ $t('profile.comments') }}</span>
        <div class="container-wrapper">
            <div
                v-for="(comment, index) in comments"
                :class="[
                    'container',
                    {
                        'container--positive' : comment.star === '10',
                        'container--negative' : comment.star === '1'
                    }
                ]"
                :key="`${ index }-${ uuidv4() }`"
            >
                <img src="@/assets/img/person.svg" width="32" alt="Avatar">
                <p>{{ comment.comment }}</p>
                <span class="time-right">11:00</span>
            </div>
        </div>
    </div>
</template>

<script>
import { getPhoto, getRatings } from '@/api/index';
import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'Profile',
    data() {
        return {
            uuidv4,
            photo: {},
            comments: []
        }
    },
    async mounted() {
        const id = this.$route.params.id;
        const data = await getPhoto(id);
        const comments = await getRatings(id);

        this.photo = data?.data[0];
        this.comments = comments?.data;
    }
}
</script>

<style lang="scss">
.profile-photo {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;

    .container-wrapper {
        display: flex;
        width: 100%;
        flex-direction: column;
    }

    .container {
        border: 2px solid #dedede;
        background-color: #f1f1f1;
        border-radius: 5px;
        padding: 10px;
        margin: 10px;

        &--positive {
            background-color: rgba(129,247,194,0.2);
        }

        &--negative {
            background-color: rgba(250,168,154,0.2);
        }
    }

    .divider {
        display: flex;
        justify-content: center;
        width: 100%;
        font-weight: 600;
        font-size: 32px;
        line-height: 24px;
        padding: 16px 0;
        border-top: 1px solid #4F4F4F;
        border-bottom: 1px solid #4F4F4F;
    }

    .tile {
        background-size: contain;
        background-position: center;
        position: relative;
        background-repeat: no-repeat;
        width: 100%;
        height: 400px;
    }

    .overlay {
        bottom: 0px;
        background-color: rgba(179,179,179,0.6);
        height: 80px;
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 8px;

        .title {
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
        }
        .subtitle {
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
        }
    }
}
</style>
