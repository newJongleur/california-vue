<template>
  <Layout>
    <template #header>
      <Menu @on-click="getFalg" />
      <Tabs ref="addTag" />
    </template>
    <template #left>
      <LeftMenu />
    </template>
    <template #context>
      <main>
        首页
        <TMCEE />
      </main>
    </template>
  </Layout>
</template>

<script setup lang='ts'>
import { ref, nextTick, getCurrentInstance } from 'vue'
import Layout from '@/components/Layout.vue'
import Menu from '@/components/Menu.vue'
import Tabs from '@/components/Tabs.vue'
import TMCEE from '@/components/TinyMCEEditor.vue'

const getFalg = () => {
  getCurrentInstance()?.refs.addTag
};
nextTick(() => {
  getFalg()
})
</script>

<style scoped>
main {
  border: 1px solid red;
}
</style>