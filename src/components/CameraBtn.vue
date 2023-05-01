<template>
    <div class="camera-btn">
        <RoundButton :img="cameraIcon"/>
        <input
            class="camera-btn__input"
            type="file"
            name='file'
            ref="inputEl"
            @change="uploadFile"
            id="input_file"
            accept=".jpg,.jpeg,.png,.heif,.heic,.webp"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import RoundButton from '@/components/RoundButton';
import cameraIcon from '@/assets/img/camera.svg';

export default {
    name: 'CameraBtn',
    components: { RoundButton },
    data() {
        return {
            cameraIcon
        }
    },
    mounted() {
        this.$bus.$on('cameraClick', () => this.$refs.inputEl.click());
    },
    computed: {
        ...mapGetters(['getUserId'])
    },
    methods: {
        async uploadFile(e) {
            if (!this.getUserId) return;

            const formData = new FormData();

            formData.append("file", e.target.files[0]);
            formData.append("fileName", e.target.files[0].name);
            formData.append("userId", this.getUserId);

            try {
                const res = await axios.post(
                    `${ process.env.VUE_APP_SERVER_API }/api/uploadImage`,
                    formData
                );

                this.$bus.$emit('showPhotoModal', res?.data[0]);
            } catch (ex) {
                console.log(ex);
            }
        }
    }
}
</script>

<style lang="scss">
.camera-btn {
    &__input {
        display: none;
    }
}
</style>
