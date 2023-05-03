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
    </div>
</template>

<script>
import { getPhoto } from '@/api/index';

export default {
    name: 'Profile',
    data() {
        return {
            photo: {}
        }
    },
    async mounted() {
        const id = this.$route.params.id;
        const data = await getPhoto(id);

        this.photo = data?.data[0];

        console.log(this.photo);
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
