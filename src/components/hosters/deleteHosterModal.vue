<template>
  <b-modal id="deleteHosterModal" ref="delete-hoster" title="Delete" :no-close-on-backdrop=true :no-close-on-esc=true hide-footer>
    <p class="my-4">Are you sure you want to delete this ?</p>
    <b-form-checkbox v-model="checked">I confirm I want to delete hoster: <strong>{{editInfos.name}}</strong></b-form-checkbox>
    <div class="inputConfirm">
      <b-button variant="outline-dark" @click="hideServerModal('delete-hoster')">Cancel</b-button>
      <b-button :disabled='disabled' variant="outline-danger" @click="deleteHoster()">Delete</b-button>
    </div>  
  </b-modal>
</template>

<script>

import { deleteHoster } from '@/assets/js/deleteMutations/deleteHoster'

export default {
  name: 'DeleteHoster',
  props: {
    editInfos: Object
  },
  data () {
    return {
      checked: false,
    }
  },
  methods: {
    deleteHoster() {
      const id = this.$parent.editInfos.id
      this.$apollo.mutate({
        mutation: deleteHoster,
        variables: {id}
      })
      window.location.reload(true);
      this.$parent.editInfos.id = null;
    },
    hideServerModal: function(modal) {
      this.$refs[modal].hide();
    },
  },
  computed: {
    disabled: function(){
      return !this.checked;
    }
  }
}
</script>

<style>
  #deleteHosterModal {
    background-color:rgba(0, 0, 0, 0.8);
  }
</style>