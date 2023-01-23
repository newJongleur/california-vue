<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
        @select="handleSelect">
        <el-menu-item index="0">LOGO</el-menu-item>
        <div class="flex-grow" />
        <div class="input__inner">
            <el-input v-model="input" class="" placeholder="搜索" clearable>
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input>
        </div>
        <el-menu-item index="1">
            <RouterLink to="/">首页</RouterLink>
        </el-menu-item>
        <el-sub-menu index="2">
            <template #title>文章</template>
            <el-menu-item index="2-1">
                前端
                <el-button size="small" @click="enitaddTab()">
                    add tab
                </el-button>
            </el-menu-item>
            <el-menu-item index="2-2">后端</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3">
            <el-link href="https://github.com/newJongleur?tab=repositories" target="_blank">
                Github
                <el-icon class="el-icon--right">
                    <Link />
                </el-icon>
            </el-link>
        </el-menu-item>
        <el-menu-item index="4">
            <RouterLink to="/test">Test</RouterLink>
        </el-menu-item>
    </el-menu>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Search } from '@element-plus/icons-vue'

const input = ref('')
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

const emit = defineEmits(['on-click'])
const enitaddTab = () => {
    emit('on-click')
}
</script>
  
<style>
.input__inner {
    line-height: var(--el-menu-item-height);
}

.flex-grow {
    flex-grow: 1;
}
</style>
  