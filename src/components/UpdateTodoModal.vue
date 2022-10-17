<template>
    <a-modal v-model="isModalVisible" title="Create a new todo" ok-text="Update" cancel-text="Cancel" @ok="onOk">
        <div class="priority__container">
            <div class="flex">
                <span>Priority: </span>
                <a-select v-model="priority" class="priority__select">
                    <!-- @change="handleChange" -->
                    <a-select-option value="asap" class="asap opt">
                        ASAP
                    </a-select-option>
                    <a-select-option value="important" class="important opt">
                        Important
                    </a-select-option>
                    <a-select-option value="basic" class="basic opt">
                        Basic
                    </a-select-option>
                    <a-select-option value="insignificant" class="insignificant opt">
                        Insignificant
                    </a-select-option>
                </a-select>
            </div>

        </div>
        <a-input placeholder="Title" v-model="title" />
        <a-textarea v-model="description" placeholder="Description" :auto-size="{ minRows: 3, maxRows: 10 }" />
    </a-modal>
</template>

<script>
import * as constants from "@/constants"
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        isUpdated: {
            type: Boolean,
            default: false
        },
        todo: {
            type: Object,
            default: () => ({
                title: '',
                priority: constants.PRIORITY.BASIC,
                description: ''
            })
        }
    },
    emits: ["update"],
    data() {
        return {
            ...constants,
            priority: this.todo.priority,
            title: this.todo.title,
            description: this.todo.description
        }
    },
    methods: {
        onOk() {
            if (!this.title) {
                return this.$message.warning('Enter title of task');
            }

            // TODO validate fields and add
            this.$emit("update", this.todo.id, {
                ...this.todo,
                priority: this.priority,
                title: this.title,
                description: this.description
            })
            this.title = ""
            this.priority = "basic"
            this.description = ""
        }
    },
    computed: {
        isModalVisible() {
            return this.visible
        }
    },
    watch: {
        isUpdated() {
            console.log("updateEditingTodoFlag", this.todo);
            this.priority = this.todo.priority
            this.title = this.todo.title
            this.description = this.todo.description
        }
    }
}
</script>
<style>
.priority__container {
    width: 200px
}

.priority__select {
    width: 100%;
}

.priority__select {
    margin: 0 0 0 15px !important;
}

.ant-input {
    margin: 10px 0 !important;
    max-width: 150px;
}

.opt {
    color: #fff !important
}
</style>