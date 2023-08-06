<template>
    <div class="profile-photo">
        <div
            :key="photo.photo_id"
            class="tile"
            :style="{ 'background-image': `url(${ photo.src })` }"
        >
            <div class="overlay">
                <div class="overlay__first-block">
                    <span class="title">{{ photo.category }}</span>
                    <StarRating
                        class="star-rating"
                        :rating="rating"
                        :max-rating="1"
                        :star-size="20"
                        :read-only="true"
                        :show-rating="false"
                    />
                    <span>{{ rating }}</span>
                </div>
                <span class="subtitle">{{ photo.info }}</span>
            </div>
        </div>
        <span class="divider">{{ $t('profile.comments') }}</span>
        <div class="profile-photo__select-wrapper">
            <span class="text">{{ $t('profile.sort') }}</span>
            <select class="select" v-model="selectedSort" @change="handleChangeSort">
                <option v-for="(sort) in sortOptions" :key="sort" :value="sort">{{ $t(`profile.photo.${ sort }`) }}</option>
            </select>
        </div>
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
                <div class="star-container">
                    {{ comment.star }}
                    <StarRating
                        class="star-rating"
                        :rating="parseInt(comment.star)"
                        :max-rating="10"
                        :star-size="20"
                        :read-only="true"
                        :show-rating="false"
                    />
                </div>
                <span class="time-right">{{ $moment(parseInt(comment.date)).format("DD-MM-YYYY HH:mm:ss") }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { getPhoto, getRatings } from '@/api/index';
import { v4 as uuidv4 } from 'uuid';
import StarRating from 'vue-star-rating';

export default {
    name: 'Profile',
    components: { StarRating },
    data() {
        return {
            uuidv4,
            photo: {},
            comments: [],
            selectedSort: 'new',
            sortOptions: ['new', 'old'],
            rating: 0
        }
    },
    async mounted() {
        const id = this.$route.params.id;
        const data = await getPhoto(id);
        const comments = await getRatings(id);

        this.photo = data?.data[0];
        this.comments = comments?.data;

        const ratings = this.comments.map(el => parseInt(el.star));
        this.rating = ratings.reduce((x, y) => x + y) / ratings.length;

        this.handleChangeSort();
    },
    methods: {
        handleChangeSort() {
            if (this.selectedSort === 'new') {
                this.comments.sort((a, b) => parseInt(b.date) - parseInt(a.date));
            } else if (this.selectedSort === 'old') {
                this.comments.sort((a, b) => parseInt(a.date) - parseInt(b.date));
            }
        }
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

    &__select-wrapper {
        display: flex;
        margin-top: 8px;
        gap: 8px;

        .select {
            width: 100px;
        }
    }

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

    .star-container {
        display: flex;
        gap: 6px;
    }
}
</style>
