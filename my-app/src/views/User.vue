<template>
    <div class="manage">
        <!-- 弹窗 -->
        <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <el-form ref="form" :rules="rules" :model="form" inline label-width="80px">
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择">
                        <el-option label="男"
                            :value="1"></el-option><!-- value没加：之前，只会选择这项然后设置value，加：之后，给他value="1/0"可以反推给出对应的label，而不是直接把值显示出来了。 -->
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.birth"
                        style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel()">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 新增按钮和搜索框总体 -->
        <div class="manage-header">
            <!-- 新增按钮 -->
            <el-button type="primary" @click="handleAdd()">+ 新增</el-button>
            <!-- form搜索区域 -->
            <el-form :model="userForm" :inline="true">
                <el-form-item>
                    <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 表格加分页总体 -->
        <div class="common-table">
            <!-- 表格 -->
            <el-table stripe height="90%" :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                    <template slot-scope="scope">
                        <span>{{ scope.row.sex === 1 ? '男' : '女' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄">
                </el-table-column>
                <el-table-column prop="birth" label="出生日期">
                </el-table-column>
                <el-table-column prop="addr" label="地址">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEidt(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 --><!-- 位置用position布局 -->
            <div class="pager">
                <el-pagination @current-change="handlePage" layout="prev, pager, next"
                    :total="total"><!-- total总条目数;page-size每页显示条目个数，默认值10。所以页数是5 -->
                </el-pagination>
            </div>
        </div>

    </div>
</template>
<script>
// 导入封装的axios的函数
import { getUser, addUser, editUser, delUser } from '@/api';

export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                name: "",
                age: "",
                sex: "",
                birth: "",
                addr: ""
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                age: [
                    { required: true, message: '请输入年龄', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'blur' }
                ],
                birth: [
                    { required: true, message: '请输入出生日期', trigger: 'blur' }
                ],
                addr: [
                    { required: true, message: '请输入地址', trigger: 'blur' }
                ]
            },
            tableData: [],
            modalType: 0,
            total: 0, // total总条目数默认为0
            pageData: {
                page: 1,
                limit: 10
            },
            userForm: {
                name: ''
            }
        }
    },
    methods: {
        // 提交用户表单
        submit() {
            this.$refs.form.validate((valid) => { // 这里的valid是自己命名的，随便叫什么v666都可以，回调函数，后面可以用到他，回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。valid是第一个参数，第二个参数这里没用，要用就打个逗号再写一个名字。
                // console.log(valid,"valid")
                if (valid) {
                    // 后续对表单数据的处理
                    // console.log(this.form, "form")

                    if (this.modalType === 0) {
                        addUser(this.form).then(() => {
                            // 重新获取列表的接口
                            // console.log(this.form) // 为空，所以这个addUser这个方法并没有改变打他中form的值，或者是改变了之后清空了。
                            this.getList()
                        })
                    } else {
                        editUser(this.form).then(() => {
                            // 重新获取列表的接口
                            this.getList()
                        })
                    }

                    // this.$refs.form.resetFields()
                    // this.dialogVisible = false
                    this.handleClose()
                }
            })
        },
        handleClose() {
            // 手动重置表单数据。因为编辑会改变this.form数据，使resetFields，重装成改变后的数据。办法：在用resetFields之前手动把this.form清空
            this.form = {
                name: "",
                age: "",
                sex: "",
                birth: "",
                addr: ""
            };
            // console.log(this.$refs.form,"页面中的form") // 加了this.$refs.form.resetFields()那么this.form也没有数据
            // 调用resetFields来重置验证状态，清空表单的数据
            this.$refs.form.resetFields()
            // 关闭弹窗
            this.dialogVisible = false
        },
        cancel() {
            this.handleClose()
        },
        handleEidt(row) {
            this.modalType = 1
            this.form = JSON.parse(JSON.stringify(row)) // 这个有问题，如果页面加载一开始点的是编辑，那么第一次的数据就会一直赖在上面，清空是清成这个数据。如果第一次点的是新增，那么就是新增时的空白。
            // 调用 this.$refs.form.resetFields() 时，它只会重置表单域的值到初始值，这个初始值是在 data 中定义的 form 对象。而第一点编辑，头一次用resetFields时，this.form里就已经是第一次的数据了，它以为这是初始值。一般情况this.form里原本是空的，新增就是这样。办法：在用resetFields之前手动把this.form清空
            // 应该不能这样写this.$refs.form = JSON.parse(JSON.stringify(row))，新增按钮里是没问题的，编辑按钮里会报错，可能是不能这样写，两边不对等吧，那就只能清空之后的this.form了。
            this.dialogVisible = true
        },
        handleDelete(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 定义的时候，参数是要传对象，post之类的需要传对象，get传的params也是对象，后来老师看文档更正了
                delUser({ id: row.id }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    // 重新获取列表的接口 // 特别注意如果用的不是箭头函数那么this是拿不到vue实例的。箭头函数能够拿到上一层作用域的this
                    this.getList()
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleAdd() {
            this.modalType = 0
            this.dialogVisible = true
        },
        getList() {
            // 因为要经常用就从mounted里封装到methods来了
            // axios调用接口，获取tableData的数据。axios前半部分axios.get(url)在api/index.js被封装成了函数，这个函数用来接受前半部分返回的promise类型的数据
            // 用扩展运算符把这两个对象打开再合并
            // 但是这样编辑/新增点击确定也会实现查询功能，查询按钮就是一个this.getList()，然而确定的这两种都带更新。
            getUser({ params: { ...this.pageData, ...this.userForm } }).then(({ data }) => {
                console.log(data.list)
                this.tableData = data.list
                this.total = data.count || 0 // 做一个容错，如果data.count不存在就返回0
            })
        },
        handlePage(val) {
            // console.log(val,"val")
            this.pageData.page = val
            this.getList()
        },
        onSubmit() {
            this.getList()
        }
    },
    mounted() {
        this.getList()
    }
}
</script>
<style lang="less" scoped>
.manage {
    height: 90%;

    .manage-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .common-table {
        position: relative;
        height: calc(100% - 62px);

        .pager {
            position: absolute;
            bottom: 0;
            right: 20px;
        }
    }
}
</style>

<!--
第一步：添加此页User.vue34行的表格
第二步：数据要从vue的data中的tableData中来，在vue的data中创建tableData对象，里面是一个数组[]
第三步：tableData的数据应该调用api接口得到，在mounted钩子函数中用axios调用api接口
第四步：这个axios已经被我二次封装了，前半部分的axios.get(url)在api/index.js被封装成了函数(...上面有具体注释)，所以前半部分直接用函数
第五步：导入上一步用到的封装了前半部分axios的函数
第六步：该axios请求时，在mock.js里mock通过请求的url来识别后拦截，然后用temple方法提供数据,temple被封装在user.js里，所以是返回temple这个对象中的函数返回的数据
最终：user.js里函数提供的用mock的各种方法模拟的响应数据，被用mock拦截请求，当成响应数据返回，后续提供给各部分。 
-->

<!-- bug2的改正方法:(来自智谱清言)
您遇到的问题是典型的表单数据绑定和重置的问题。当您使用 JSON.parse(JSON.stringify(row)) 将行数据赋值给 this.form 时，您实际上是在修改 this.form 的引用，指向了新的对象。但是，当您调用 this.$refs.form.resetFields() 时，它只会重置表单域的值到初始值，这个初始值是在 data 中定义的 form 对象。
由于您在编辑操作时改变了 this.form 的引用，this.$refs.form.resetFields() 无法正确地将表单重置为初始状态。要解决这个问题，您需要确保在每次编辑操作后，this.form 的引用始终指向在 data 中定义的同一个对象。
一种解决方法是在每次关闭对话框时，手动将 this.form 的属性重置为空或初始值，而不是改变 this.form 的引用。这样可以确保 this.$refs.form.resetFields() 正常工作。
修改代码已经应用在项目中了，可以看上面。
这样，每次关闭对话框时，this.form 都会被重置为初始状态，而 this.$refs.form.resetFields() 会清除表单的验证状态。无论您是进行新增操作还是编辑操作，表单都会在关闭对话框后重置为空。

此外，您可能需要考虑在编辑操作之前保存原始表单数据的一个副本，以便在取消编辑时可以恢复到原始状态。这可以通过在开始编辑时保存 this.form 的一个备份，然后在取消编辑时恢复这个备份来实现。 -->