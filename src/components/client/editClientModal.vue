<template>
  <div>
    <b-modal id="editClientModal" size="xl" ref="edit-client" title="Edit" :no-close-on-backdrop=true :no-close-on-esc=true hide-footer>
      <b-form @submit.stop.prevent="onSubmit">          
        <div>
          <div class="inputLine">
            <div class="inputField">
              <b-form-group label-cols="3" label="Name" label-for="input-horizontal">
                <b-form-input id="client-edit-name-input" name="client-edit-name-input" v-model="$v.editInfos.name.$model" :state="validateState('name')" aria-describedby="feedback-edit-client-name" autocomplete="off">
                </b-form-input>
                <b-form-invalid-feedback id="feedback-edit-client-name">
                  <span v-if="validName == false">Client already exists!</span>
                  <span v-else>Name can't be blank</span>
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
          </div>
          <div class="inputOffer">
            <b-form-textarea
            id="edit-client-infos"
              v-model="$v.editInfos.infos.$model"
              placeholder="Infos"
              rows="5"
              max-rows="8"
              :state="validateState('infos')"
            ></b-form-textarea>
          </div>
        </div>
        <div class="inputConfirm">
          <b-button class="modalLeftButton" variant="outline-dark" @click="hideServerModal('edit-client')">Cancel</b-button>
          <b-button class="modalRightButton" variant="outline-success" type="submit">Submit</b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { updateClient } from '@/assets/js/updateMutations/updateClient'
import { required } from "vuelidate/lib/validators";
import {CLIENTS_QUERY} from '@/assets/js/query/graphql'


export default {
  name: 'EditClient',
  validations: {
    editInfos: {
      name: {
        required,
        check_name(name) {
          for (let index = 0; index < this.clients.length; index++) {
            if(name && name.toLowerCase() == this.clients[index].name.toLowerCase() && name.toLowerCase() != this.client.name.toLowerCase()) {
              this.validName = false
              return false
            }       
          }
          this.validName = true
          return true
        },
      },
      infos: {
      }
    },
  },
  props: {
    editInfos: Object,
    client: Object
  },
  data() {
    return {
      validName: true
    }
  },
  methods: {
    hideServerModal: function(modal) {
      this.$refs[modal].hide();
    },
    editClient() {
      const id = this.editInfos.id,
      name = this.editInfos.name,
      infos = this.editInfos.infos != null ? this.editInfos.infos : ' ';
      this.$apollo.mutate({
        mutation: updateClient,
        variables: {id, name, infos}
      });
      window.location.reload(true);
    },
    validateState(name) {
    const { $dirty, $error } = this.$v.editInfos[name];
    return $dirty ? !$error : null;
    },
    onSubmit() {
      this.$v.editInfos.$touch();
      if (this.$v.editInfos.$anyError) {
        return;
      }
      this.editClient();
    },
  },
  apollo: {
    clients: {
      query: CLIENTS_QUERY
    }
  }
}
</script>

<style>
  #editClientModal {
    background-color:rgba(0, 0, 0, 0.8);
  }
</style>