<template>
    <div id="tinderCards">
        <Tinder 
            ref="tinder" 
            key-name="photo_id" 
            :queue.sync="queue"
            @submit="onSubmit"
        >
            <template slot-scope="scope">
                <div
                    class="pic"
                    :style="{ 'background-image': `url(${ scope.data.src })` }"
                />
                <div class="overlay" v-if="scope.data.category">
                    <span class="title">{{ scope.data.category }}</span>
                    <span class="subtitle">{{ scope.data.info }}</span>
                </div>
            </template>
            <img class="like-pointer" slot="like" :src="favoriteIcon">
            <img class="nope-pointer" slot="nope" :src="closeIcon">
        </Tinder>
        <div class="btns">
            <RoundButton :img="closeIcon" @click.native="decide('nope')"/>
            <CameraBtn/>
            <RoundButton @click.native="handleShowCommentModal" :img="commentIcon"/>
            <RoundButton :img="favoriteIcon" @click.native="decide('like')"/>
        </div>
        <Modal v-if="isModal && type==='comment'" @hideModal="hideModal" :header="$t('modal.comment')">
            <template v-slot:body>
                <Textarea @onText="handleText"/>
                <span class="textarea-text">{{ $t('modal.character-number', { number: `${ comment.length }` }) }}</span>
            </template>
            <template v-slot:footer>
                <Button 
                    @click.native="handleSendComment('nope')" 
                    class="btn--close" 
                    :text="$t('modal.dislike')" 
                    :icon="closeSmallIcon"
                />
                <Button 
                    @click.native="handleSendComment('like')" 
                    class="btn--like" 
                    :text="$t('modal.like')" 
                    :icon="favoriteSmallIcon"
                />
            </template>
        </Modal>
        <Modal v-else-if="isModal && type==='uploadedPhoto'" @hideModal="hideUploadPhotoModal" :header="$t('modal.wchich-to-look')">
            <template v-slot:body>
                <div class="garment-wrapper">
                    <img class="img" :src="photo.url"/>
                    <select class="select" v-model="selectedOutfit">
                        <option value="" disabled hidden>{{ $t('modal.choose-outfit') }}</option>
                        <option v-for="outfit in outfits" :key="outfit.outfit_id">{{ outfit[`name_${ $i18n.locale }`] }}</option>
                    </select>
                    <div class="textarea-wrapper">
                        <Textarea @onText="handleInfoText"/>
                        <span class="textarea-text">{{ $t('modal.character-number', { number: `${ info.length }` }) }}</span>
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <Button 
                    @click.native="hideUploadPhotoModal" 
                    class="btn--close" 
                    :text="$t('modal.cancel')"
                />
                <Button 
                    @click.native="handleUploadPhoto" 
                    class="btn--like" 
                    :text="$t('modal.upload')" 
                />
            </template>
        </Modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { v4 as uuidv4 } from 'uuid';
import Tinder from "vue-tinder";
import RoundButton from '@/components/RoundButton';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import Textarea from '@/components/Textarea';
import ModalMixin from '@/mixins/ModalMixin';
import {
    getPhotos,
    ratePhoto,
    getPhoto,
    deletePhoto,
    addPhotoInfo,
    getOutfits
} from '@/api/index';
import CameraBtn from '@/components/CameraBtn';
import favoriteIcon from '@/assets/img/favorite.svg';
import closeIcon from '@/assets/img/close.svg';
import swipeCard from '@/assets/img/swipe_card.svg';
import commentIcon from '@/assets/img/comment.svg';
import favoriteSmallIcon from '@/assets/img/favorite_small.svg';
import closeSmallIcon from '@/assets/img/close_small.svg';

export default {
    name: 'TinderCards',
    components: { CameraBtn, Tinder, RoundButton, Modal, Button, Textarea },
    mixins: [ModalMixin],
    data() {
        return {
            outfits: [],
            queue: [],
            history: [],
            selectedOutfit: '',
            comment: '',
            info: '',
            photo: {
                url: '',
                id: false
            },
            ratedPhotos: [],
            uuidv4,
            favoriteIcon,
            closeIcon,
            commentIcon,
            favoriteSmallIcon,
            closeSmallIcon,
            swipeCard
        }
    },
    async created() {
        this.mock();
        const data = await getOutfits();
        this.outfits = data?.data;
    },
    mounted() {
        this.$bus.$on('showPhotoModal', (id) => this.handleShowUploadedPhotoModal(id));
    },
    computed: {
        ...mapGetters(['getUserId'])
    },
    methods: {
        async handleUploadPhoto() {
            await addPhotoInfo(this.photo.id, this.selectedOutfit, this.info)
            this.isModal = false;
            this.type = '';
        },
        handleText(text) {
            this.comment = text;
        },
        handleInfoText(text) {
            this.info = text;
        },
        async hideUploadPhotoModal() {
            this.isModal = false;
            this.type = '';
            await deletePhoto(this.photo.id);
        },
        handleSendComment(type) {
            this.hideModal();

            setTimeout(() => type === 'like'
                ? this.decide('like')
                : this.decide('nope'),
            100);
        },
        handleShowCommentModal() {
            setTimeout(() => this.showModal('comment'), 0)
        },
        async handleShowUploadedPhotoModal(id) {
            const data = await getPhoto(id);
            this.photo.url = data?.data[0].src;
            this.photo.id = id;
            setTimeout(() => this.showModal('uploadedPhoto'), 0)
        },
        async mock() {
            const list = [];
            const photos = await getPhotos(this.getUserId);

            const filteredPhotos = photos?.data.filter(photo => !this.ratedPhotos.includes(photo.photo_id));

            list.push(...filteredPhotos);

            if (list.length === 0) {
                list.push({
                    last_one: true,
                    photo_id: `${ uuidv4() }`,
                    src: this.swipeCard
                })
            }

            const uniqueList = list.filter(item => !this.queue.some(q => q.photo_id === item.photo_id));
            this.queue = this.queue.concat(uniqueList);
        },
        async onSubmit({ type, item }) {
            if (item.last_one) {
                this.mock();
                return
            };
            
            if (item.src !== this.swipeCard) {
                this.ratedPhotos.push(item.photo_id);
            }
            
            if (type === 'like') {
                await ratePhoto(item.photo_id, this.getUserId, '10', this.comment);
            }
            if (type === 'nope') {
                await ratePhoto(item.photo_id, this.getUserId, '1', this.comment);
            }
            if (this.queue.length < 3) {
                this.mock();
            }
            this.history.push(item);
            this.comment = '';
        },
        async decide(choice) {
            this.$refs.tinder.decide(choice);
        }
    }
}
</script>

<style lang="scss">

.overlay {
    position: absolute;
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

#tinderCards .vue-tinder {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 110px;
  margin: auto;
  width: calc(100% - 20px);
  height: calc(100% - 60px - 200px);
  min-width: 300px;
  max-width: 355px;
}

.nope-pointer,
.like-pointer {
  position: absolute;
  z-index: 1;
  top: 25%;
  left: 14%;
  width: 256px;
  height: 256px;
}

.super-pointer {
  position: absolute;
  z-index: 1;
  bottom: 80px;
  left: 0;
  right: 0;
  margin: auto;
  width: 112px;
  height: 78px;
}

.rewind-pointer {
  position: absolute;
  z-index: 1;
  top: 20px;
  right: 10px;
  width: 112px;
  height: 78px;
}

.pic {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.btns {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 30px;
  margin: auto;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  max-width: 355px;
}

.textarea-text {
    display: flex;
    justify-content: flex-end;
}

.garment-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 16px;

    .img {
        height: 200px;
        border-radius: 10px;
    }

    .textarea-wrapper {
        .textarea {
            height: 100px;
            min-width: 300px;
        }
    }
    
    .select {
        width: 300px;
        height: 32px;
        border: 1px solid #4F4F4F;
        border-radius: 10px;
        padding: 0 12px;
    }
}
</style>
