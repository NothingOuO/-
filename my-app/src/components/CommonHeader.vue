<template>
    <div class="header-container">
        <div class="l-content">
            <el-button @click="handMenu" style="margin-right: 20px" icon="el-icon-menu" size="mini"></el-button>
            <!-- 面包屑 -->
            <el-breadcrumb
                separator="/"><!-- 也是用三元，但是这里是传对象，所以和之前的两个不一样不用加引号。如果不用的话就是null.但是因为首页是/或/home，特殊很烦，所以不用path比较，用name比较了 -->
                <el-breadcrumb-item v-for="item in tabs" :key="item.path"
                    :to="item.name !== $route.name ? { path: item.path } : null">
                    {{ item.label }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/images/user1.jpg" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {}
    },
    methods: {
        handMenu() {
            this.$store.commit('collapseMenu')
        }
    },
    computed: {
        // mapState辅助函数
        // ...扩展运算符，解构返回的对象。computed是个对象，对象里不能包对象(mapState返回的也是一个对象)，用扩展运算符把mapState这个对象展开在computed这个对象里，就可以在computed里用mapState了。
        // this.$store.state.tab.tabList其实也可以这样直接获取，用辅助函数是，调用很多数据的情况，集中管理的。
        ...mapState({
            tabs: state => state.tab.tabList
        })
    }
    // ,mounted(){
    //     console.log(this.$store.state.tab.tabList)
    //     console.log(this.tabs,'tabs')
    // }
}
</script>
<style lang="less" scoped>
.header-container {
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .text {
        margin: 15px;
        color: #fff;
        font-size: 14px;
    }

    .r-content {
        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }

    .l-content {
        display: flex;
        align-items: center;

        /deep/.el-breadcrumb__item {

            // 这样写是自带的css选择方法，而且其实每个el-breadcrumb__inner都有同时有is-link
            // .el-breadcrumb__inner.is-link {
            //     font-weight: normal;
            //         color: #666;
            // }
            //老师是想区分一下来着，但是都同时带有is-link，其实没必要
            .el-breadcrumb__inner {
                font-weight: normal;

                &.is-link {
                    color: #666;
                }
            }

            // 因为el-breadcrumb__inner不是在一个父元素里面，所以不能直接在el-breadcrumb__inner上&:last-child。el-breadcrumb__item找最后一个子元素（el-breadcrumb__item）
            &:last-child {
                .el-breadcrumb__inner {
                    color: #fff;
                }
            }

        }
    }

}
</style>