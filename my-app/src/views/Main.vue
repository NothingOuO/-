<!-- “想让吗喽干活，怎能让吗喽工作不快乐”。吗喽后台管理系统，一个能够随心定制需求板块，富能提供情绪价值的积极正向后台管理系统。 -->
<template>
    <div>
        <el-container>
            <el-aside width="auto">
                <common-aside />
            </el-aside>
            <el-container>
                <el-header>
                    <common-header />
                </el-header>
                <common-tag />
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTag from '@/components/CommonTag.vue';
export default {
    data() {
        return {}
    },
    components: {
        CommonAside,
        CommonHeader,
        CommonTag
    }
}
</script>
<style>
.el-header {
    padding: 0;
}
</style>