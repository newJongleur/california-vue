<template>
    <el-form :label-position="right" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
        <el-form-item label="邮箱">
            <el-input v-model="formLabelAlign.email" />
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="formLabelAlign.password" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang='ts'>
import { reactive, ref, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import { postLogin } from "@/api/index"
import { AccountStore } from '../stores/AccountStore'
const accountStore = AccountStore()
const formLabelAlign = reactive({
    email: '',
    password: '',
})

const onSubmit = async () => {
    const response = await postLogin(formLabelAlign.email, formLabelAlign.password);
    accountStore.accountemail = response.data.accountemail
    accountStore.token = response.data.token

    const { appContext } = getCurrentInstance()!
    ElMessage(response.data.msg, appContext)
    // let ElMessageType: string = 'message'
    // if (response.status == 500) {
    //     ElMessageType = 'error'
    // }
    // ElMessage({
    //     message: response.data.msg,
    //     type: ElMessageType,
    // })
}
</script>

<style scoped>
.el-form {
    margin-top: 20px;
}
</style>