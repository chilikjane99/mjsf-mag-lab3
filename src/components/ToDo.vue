<template>
  <div class="todo">
    <div class="card text-left">
      <div class="card-header">
        ToDo Component
        <a-button @click="setCreatingModalVisible(true)">Create TODO</a-button>
      </div>
      <div class="card-body">
        <h5 class="card-title">My tasks</h5>
        <div class="card-text">
          <a-skeleton v-show="isLoading" active/>
          <ul class="pt-3">
            <li v-for="(item, index) in filteredTaskList" :key="index" class="d-flex justify-content-between mb-3">
              <div>
                <h4 v-if="item.status === 'completed'"><s>{{ item.title }}</s></h4>
                <h4 v-else>{{ item.title }}</h4>
                <p>{{ item.description }}</p>
              </div>
              <button class="btn btn-primary" @click="toggleTaskStatus(item.id, 'completed')">Compled</button>
            </li>
          </ul>
        </div>
        <div class="card-footer">
          <button class="btn" :class="{'btn-primary':!filterStatus}" @click="filterStatus = ''">All</button>
          <button class="btn" :class="{'btn-primary': filterStatus === 'completed'}"
                  @click="filterStatus = 'completed'">Completed
          </button>
          <button class="btn" :class="{'btn-primary': filterStatus === 'incompleted'}"
                  @click="filterStatus = 'incompleted'">InCompleted
          </button>
          Active tasks count: {{ taskList.length }}
        </div>
      </div>
    </div>
    <CreateTodoModal :visible="isCreatingModalVisible" @create="onCreateTodo"/>
    <UpdateTodoModal
        :visible="isUpdatingModalVisible"
        :todo="editingTodo"
        :isUpdated="updateEditingTodoFlag"
        @update="onUpdateTodo"/>
  </div>
</template>

<script>
import * as constants from "../constants"
import services from "../services"
import {Task} from '../models/task';
import CreateTodoModal from "./CreateTodoModal";
import UpdateTodoModal from "./UpdateTodoModal";

export default {
  name: "ToDo",
  props: {},
  components: {
    CreateTodoModal,
    UpdateTodoModal
  },
  data: () => {
    return {
      constants,
      isCreatingModalVisible: false,
      isUpdatingModalVisible: false,
      updateEditingTodoFlag: false,
      renderFlag: false,
      isLoading: false,
      taskList: [],
      filterStatus: "",
      editingTodo: {
        title: '',
        priority: 'basic',
        description: ''
      },
    }
  },
  async created() {
    await this.fetchAndSetTodos()
  },
  methods: {
    render() {
      this.renderFlag = !this.renderFlag
    },
    async onCreateTodo(todo) {
      const newTask = new Task({
        ...todo,
        status: this.constants.TASK_STATUS.TS_INCOMPLETED
      })
      await services.todo.save(newTask)
      await this.fetchAndSetTodos()
      this.setCreatingModalVisible(false)
    },
    setCreatingModalVisible(visible) {
      this.isCreatingModalVisible = visible
    },
    async toggleTaskStatus(id, status) {
      const taskIndex = this.getTaskIndexById(id)
      if (taskIndex === -1) {
        return;
      }
      const updatedItem = this.taskList[taskIndex]
      updatedItem.setStatus(status)
      await services.todo.update(id, updatedItem)

      await this.fetchAndSetTodos()
    },
    setUpdatingModalVisible(visible) {
      this.isUpdatingModalVisible = visible
    },
    getTaskIndexById(id) {
      if (!this.taskList.length) {
        return -1
      }
      for (let i = 0; i < this.taskList.length; i++) {
        const task = this.taskList[i]
        if (task.id === id) {
          return i
        }
      }
      return -1
    },
    async onUpdateTodo(id, todo) {
      this.setUpdatingModalVisible(false)
      await services.todo.update(id, todo)
      await this.fetchAndSetTodos()
    },
    enableTaskEditing(todo) {
      console.log("enable editing");
      this.editingTodo = todo
      this.updateEditingTodoFlag = !this.updateEditingTodoFlag
      this.setUpdatingModalVisible(true)
    },
    async fetchAndSetTodos() {
      this.isLoading = true
      const fetchedTodos = await services.todo.fetch()
      this.taskList = fetchedTodos.map(todo => new Task(todo))
      this.isLoading = false
    },
  },
  computed: {
    filteredTaskList() {
      // just for trigger
      if (this.renderFlag == 'boolean') {
        return []
      }

      return this.taskList
          .map((item, index) => {
            item.idx = index

            if (!this.filterStatus || !item.status) return item;
            if (item.status !== this.filterStatus) {
              return null
            }
            return item
          })
          .filter((item) => !!item);
    }
  }

}
</script>

<style scoped>
.todo {
  background-color: aqua;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: 0 auto;

}
.card > div {
  width: 100%;
}
.card-header {
  display: flex;
  justify-content: space-between;
}
h5 {
  margin: 0 20px 0 25px;
}

.card-text {
  margin: 20px 0 0 0;
}

ul li {
  display: flex;
  justify-content: space-between;
}
</style>
