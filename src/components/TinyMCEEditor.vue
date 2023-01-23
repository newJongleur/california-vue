<template>
    <editor id="tinymce" :init="init" />
    <el-button @click="saveContent">保存</el-button>
</template>
  
<script setup lang="ts">
import { reactive, ref, watch, toRefs } from 'vue';
import { postBlog } from "@/api/index";
//TinyMCE
import tinymce from 'tinymce';
import 'tinymce/models/dom';
//TinyMCE-Vue
import Editor from '@tinymce/tinymce-vue';
//外观
import 'tinymce/skins/ui/oxide/skin.css';
import 'tinymce/themes/silver';
//Icon
import 'tinymce/icons/default';
//插件
import 'tinymce/plugins/table'; //表格
import 'tinymce/plugins/quickbars';
//语言包
import 'tinymce/langs/zh-Hans.js'


const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    //插件
    plugins: {
        type: [String, Array],
        default: 'quickbars table',
    },
    //工具栏
    toolbar: {
        type: [String, Array],
        default:
            'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright |bullist numlist |outdent indent blockquote | undo redo | axupimgs | removeformat | table',
        //粗体 斜体 下划线 删除线 | 文本颜色 | 背景颜色 | 左对齐  居中对齐  右对齐 | 减少缩进 增加缩进 | 引文区块 | 撤销 重做 | 清除格式 | 表格
    },
});
const init = reactive({
    language: 'zh-Hans', //语言包
    height: 500, //行高
    menubar: false, //菜单栏
    content_css: false, //内容样式
    skin: false, //外观
    plugins: props.plugins, //插件
    toolbar1: props.toolbar, //工具栏
    toolbar2: 'blocks fontfamily fontsize hr | save restoredraft',
    quickbars_insert_toolbar: false, //快速工具栏_插入工具栏
    branding: false, //TinyMCE-login
});

// 保存
const saveContent = async () => {
    const BlogTitle = '标题'
    const BlogContext = tinymce.get('tinymce').getContent()
    console.log(BlogContext)
    const response = await postBlog(BlogTitle, BlogContext);
    console.log(response)
}
</script>