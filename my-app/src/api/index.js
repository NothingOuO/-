// 这一页是二次封装的axios请求，有前半部分axios.get(url),返回的是promise类型，相当于半成品，vue调用的时候.then就能用。
import http from "../utils/request";

export const getData = () => {
    //这里的getData其实是自己命的名，实际没有这个接口，mock拦截了，只要这里和api/index.js里的命名一致就可以用。
    // http其实是axios，这里是axios请求，然后再到mock.js看到请求了这个网址然后拦截下来，再提供其中temple方法返回的数据
    return http.get("/home/getData")
}
export const getUser = (params) => {
    return http.get("/user/getUser", params)
}
export const addUser = (data) => {
    return http.post("user/add", data)
}
export const delUser = (data) => {
    return http.post("user/del", data)
}
export const editUser = (data) => {
    return http.post("user/edit", data)
}
