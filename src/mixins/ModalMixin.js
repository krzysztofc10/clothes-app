import ClickOutside from 'vue-click-outside';

export default {
    directives: {
        ClickOutside
    },
    data() {
        return {
            isModal: false,
            type: ''
        }
    },
    methods: {
        hideModal() {
            this.isModal = false
            this.type = ''
        },
        showModal(type) {
            this.isModal = !this.isModal
            this.type = type
        }
    }
}
