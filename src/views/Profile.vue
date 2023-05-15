<template>
    <div class="photo-tiles">
        <div v-if="photos.length" class="photo-tiles__wrapper">
            <div
                v-for="photo in photos"
                @click="$router.push({ path: `/profile-photo/${ photo.photo_id }` })"
                :key="photo.photo_id"
                class="tile"
                :style="{ 'background-image': `url(${ photo.src })` }"
            >
            <div class="overlay" v-if="photo.category">
                <span class="title">{{ photo.category }}</span>
                <span class="subtitle">{{ photo.info }}</span>
            </div>
            </div>
        </div>
        <span class="photo-tiles__title" v-else>{{ $t('profile.no-photos') }}</span>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getMyPhotos } from '@/api/index';

export default {
    name: 'Profile',
    data() {
        return {
            photos: []
        }
    },
    async mounted() {
        const data = await getMyPhotos(this.getUserId);

        this.photos = data?.data;
    },
    computed: {
        ...mapGetters(['getUserId'])
    }
}
</script>

<style lang="scss">
.photo-tiles {
    &__wrapper {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;

        @media screen and (max-width:300px) {
            grid-template-columns: 1fr;
        }

        @media screen and (min-width:460px) {
            grid-template-columns: 1fr 1fr 1fr;
        }

        @media screen and (min-width:720px) {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }

        @media screen and (min-width:1024px) {
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        }

        .tile {
            height: 300px;
            background-size: cover;
            position: relative;
            cursor: pointer;
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

    &__title {
        display: flex;
        justify-content: center;
        width: 100%;
        font-weight: 600;
        font-size: 32px;
        line-height: 24px;
        margin-top: 20%;
    }
}
</style>
