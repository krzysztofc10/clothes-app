<template>
    <div class="photo-tiles">
        <div class="photo-tiles__select-wrapper">
            <span class="text">{{ $t('profile.sort') }}</span>
            <select class="select" v-model="selectedSort" @change="handleChangeSort">
                <option v-for="(sort) in sortOptions" :key="sort" :value="sort">{{ $t(`profile.photo.${ sort }`) }}</option>
            </select>
        </div>
        <div v-if="photos.length" class="photo-tiles__wrapper">
            <div
                v-for="photo in photos"
                @click="$router.push({ path: `/profile-photo/${ photo.photo_id }` })"
                :key="photo.photo_id"
                class="tile"
                :style="{ 'background-image': `url(${ photo.src })` }"
            >
            <div class="overlay">
                <div class="overlay__first-block">
                    <span class="title">{{ photo.category }}</span>
                    <StarRating
                        class="star-rating"
                        :rating="photo.avg"
                        :max-rating="1"
                        :star-size="20"
                        :read-only="true"
                        :show-rating="false"
                    />
                    <span>{{ photo.avg }}</span>
                </div>
                <span class="overlay__subtitle">{{ photo.info }}</span>
            </div>
            </div>
        </div>
        <span class="photo-tiles__title" v-else>{{ $t('profile.no-photos') }}</span>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getMyPhotos } from '@/api/index';
import StarRating from 'vue-star-rating';

export default {
    name: 'Profile',
    components: { StarRating },
    data() {
        return {
            photos: [],
            selectedSort: 'new',
            sortOptions: ['new', 'old']
        }
    },
    async mounted() {
        const data = await getMyPhotos(this.getUserId);

        this.photos = data?.data;

        this.handleChangeSort();
    },
    computed: {
        ...mapGetters(['getUserId'])
    },
    methods: {
        handleChangeSort() {
            if (this.selectedSort === 'new') {
                this.photos.sort((a, b) => parseInt(b.date) - parseInt(a.date));
            } else if (this.selectedSort === 'old') {
                this.photos.sort((a, b) => parseInt(a.date) - parseInt(b.date));
            }
        }
    }
}
</script>

<style lang="scss">
.photo-tiles {
    &__select-wrapper {
        display: flex;
        justify-content: center;
        margin: 10px;
        gap: 8px;
    }

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

            &__first-block {
                display: flex;
                justify-content: space-between;
            }

            .title {
                font-weight: 600;
                font-size: 20px;
                line-height: 24px;
            }

            .star-rating {
                margin-left: auto;
                margin-right: 4px;
            }

            &__subtitle {
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
