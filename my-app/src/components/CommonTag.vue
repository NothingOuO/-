<template>
    <div class="tag-group">
        <el-tag v-for="(item, index) in tabs" :key="item.path" :closable="item.name !== 'home'"
            :effect="$route.name === item.name ? 'dark' : 'plain'" 
            @click="changeMenu(item)"
            @close="handleClose(item, index)"
            size="small"
            ><!-- $route.path === '/'+item.name 也行-->
            {{ item.label }}
        </el-tag>
    </div>
</template>
<script>
// 辅助函数，mapState用来简洁调用store中的state，mapMutations用来简洁调用store中的mutations
import { mapState,mapMutations } from 'vuex';
export default {
    name: 'CommonTag',
    // 这样写也可以，不用mapState
    // data() {
    //     return {
    //         tabs: []
    //     }
    // },
    // mounted() {
    //     this.tabs = this.$store.state.tab.tabList
    //     // console.log(this.$route, this.tabs)
    // }
    data() {
        return {}
    },
    computed: {
        // 数据会更改，更改后要重新计算，所以放computed里
        ...mapState({
            tabs: state => state.tab.tabList
            // console.log(this.$route, this.tabs)
        })
    },
    methods: {
        // 数据不会更改，里面是个固定的函数，放methods里就可以了
        // mapMutations辅助函数
        // ...扩展运算符，解构返回的对象。methods是个对象，对象里不能包对象(mapMutations返回的也是一个对象)，用扩展运算符把mapMutations这个对象展开在methods这个对象里，就可以在methods里用mapMutations了。
        ...mapMutations(['closeTag']),
        changeMenu(item) {
            //这样点正在展示的path就不会报错，不会跳转相同的
            if (item.name !== this.$route.name) {
                this.$router.push({ name: item.name })//原来直接写item.path一样的，两种不同的方式。甚至直接写item也行。这种方法传的是对象所以外面要加{}。
            }
        },
        handleClose(item, index) {
            // （1）这是第一种写法，有效果，但不规范，调用state应该在统一的mutations里
            // const tabList = this.$store.state.tab.tabList突然发现我computed里已经声明一个变量来装tabList了。但是证明这样直接写也是可以的
            //那下面的tabList就全部改成this.tabs
            // const length = this.tabs.length - 1
            // this.tabs.splice(index, 1)

            const length = this.tabs.length - 1
            // 调用store中的mutation
            // this.$store.commit('closeTag',index) //（2）这是规范的调用方法，传值是这样写的，但是老师又给了一种，更统装的方法，应该也是辅助函数，适合调多值的场景。
            this.closeTag(index)//（3）这是用了辅助函数的方法

            if (item.name !== this.$route.name) {
                return
            }
            if (index === length) {
                this.$router.push({ name: this.tabs[index - 1].name })
            } else {
                this.$router.push({ name: this.tabs[index].name })
            }
        }
    }
}
</script>
<style lang="less" scoped>
.tag-group{
    padding: 20px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;// 悬浮手指
    }
}
</style>