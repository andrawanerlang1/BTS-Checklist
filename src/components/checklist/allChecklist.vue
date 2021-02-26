<template>
  <div>
    <div style="margin:50px 0px 50px 0px;text-align:center">
      All available checklist
    </div>
    <div>
      <button
        @click="newChecklist === 0 ? (newChecklist = 1) : (newChecklist = 0)"
      >
        Buat checklist baru
      </button>
    </div>
    <div v-if="newChecklist === 1">
      <div class="checklistBox">
        <div style="display:flex; justify-content: space-between;padding:20px;">
          <div>
            <input
              type="text"
              placeholder="ChecklistName"
              v-model="checklistData.name"
            />
          </div>
          <div>
            <button @click="saveChecklist">save</button>
          </div>
        </div>
      </div>
    </div>
    <div v-for="(item, index) in checklist" :key="index">
      <div :class="item.checklistCompletionStatus ? 'done' : 'notDone'">
        <div style="display:flex; justify-content: space-between;padding:20px;">
          <div>{{ item.name }}</div>
          <div>
            <button @click="deleteChecklist(item.id)">delete</button>
          </div>
        </div>
        <div v-if="item.items" class="checklistBox">
          <div
            v-for="(value, index) in item.items"
            :key="index"
            :class="value.itemCompletionStatus ? 'green' : 'red'"
            style="display:flex; justify-content: space-between;padding:20px; border-bottom:1px solid black"
          >
            <div v-if="value.name">
              {{ value.name }}
            </div>
            <div v-else>Empty name item</div>
            <div>
              <input
                type="checkbox"
                id="boxItem"
                v-model="value.itemCompletionStatus"
              />
            </div>
          </div>
        </div>
        <div v-else>
          Checklist items are empty
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'allChecklist',
  data() {
    return {
      newChecklist: 0,
      checklistData: {
        name: ''
      }
    }
  },
  created() {
    this.getAllChecklist()
  },
  computed: {
    ...mapGetters({ checklist: 'GetterAllChecklist' })
  },
  methods: {
    ...mapActions(['getAllChecklist', 'deleteChecklists', 'saveChecklists']),
    async deleteChecklist(id) {
      await this.deleteChecklists(id)
        .then(result => {
          this.getAllChecklist()
          alert(result.data.message)
        })
        .catch(error => {
          console.log(error)
          this.$toasted.error(error.data.msg)
        })
    },
    async saveChecklist() {
      console.log(this.checklistData)
      await this.saveChecklists(this.checklistData)
        .then(result => {
          this.getAllChecklist()
          this.checklistData = { name: '' }
          alert(result.data.message)
        })
        .catch(error => {
          console.log(error)
          this.$toasted.error(error.data.msg)
        })
    }
  }
}
</script>

<style scoped>
.checklistBox {
  border: 2px solid black;
  padding: 2px;
  margin: 10px;
}
.green {
  background-color: rgba(152, 243, 152, 0.699);
}
.red {
  background-color: rgba(245, 127, 127, 0.836);
}
.done {
  border: 2px solid black;
  padding: 2px;
  margin: 10px;
  background-color: rgba(152, 243, 152, 0.699);
}
.notDone {
  border: 2px solid black;
  padding: 2px;
  margin: 10px;
}
</style>
