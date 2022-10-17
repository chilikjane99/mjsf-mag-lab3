<template>
    <a-modal v-model="visible" title="Create a new todo" ok-text="Create" cancel-text="Cancel" @ok="onOk">
        <div class="priority__container">
            <a-select v-model="priority" class="priority__select">
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
        <a-input placeholder="name" v-model="name" />
        <a-input placeholder="description" v-model="description" />
    </a-modal>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    emits: ["create"],
    data() {
        return {
            priority: "basic",
            name: "",
            description: ""
        }
    },
    methods: {
        onOk() {
            if (!this.name) {
                return this.$message.warning('Enter name of task');
            }

            this.$emit("create", {
                priority: this.priority,
                title: this.name,
                description: this.description
            })
            this.name = ""
            this.priority = "basic"
            this.description = ""
        }
    }
}
</script>
<style>
.priority__container {
    width: 100px
}

.priority__select {
    width: 100%;
}

.opt {
    color: #fff !important
}

.t-white {
  color: #fff
}
.asap {
  background: rgb(89, 0, 0);
}

.important {
  background: rgb(89, 0, 58);
}

.basic {
  background: rgb(0, 58, 1);
}

.insignificant {
  background: rgb(3, 0, 58);
}
</style>
