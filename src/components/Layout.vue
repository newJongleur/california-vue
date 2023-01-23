<template>
    <el-row>
        <el-col :span="24">
            <slot name="header"></slot>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <slot name="context"></slot>
        </el-col>
    </el-row>
</template>
  
<style >
.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>
  