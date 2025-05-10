import Mock from "mockjs";
import homeApi from "./mockServeData/home"
import user from "./mockServeData/user";

// 以下定义mock模拟的api请求
// 定义mock请求拦截, Mock.mock( rurl, rtype, template )
// 从服务器接收之前拦截，所以F12NetWork中找不到getData 
//这里的/api/home/getData这个ruel其实是自己命的名，实际没有这个接口，mock拦截了，只要这里和api/index.js里的命名一致就可以用。
// /api/home/getData是路径，完全的请求应该是整个网址，但这里模拟的并没有这个api网址，这个路径也是在本网站的网址里的
Mock.mock('/api/home/getData',homeApi.getStatisticalData // homeApi.getStatisticalData这个template是封装在/mockServeData/user里的函数。提取的内容其实都是看template
// function(){
//     // 拦截到请求后的处理逻辑
//     console.log('拦截到了')
//     return 
// }
)

// 用户列表的数据
Mock.mock('/api/user/add','post',user.createUser)
Mock.mock('/api/user/edit','post',user.updateUser)
Mock.mock('/api/user/del','post',user.deleteUser)
Mock.mock(/api\/user\/getUser/,user.getUserList)