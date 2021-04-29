/* jshint esversion: 6 */
import axios from "axios"
import qs from "qs"
const simpleInfoMe = () => axios.get(`/apis/api/v1/admin/user/me`).then(res => res.data)
const userList = data => axios.get(`/apis/api/v1/admin/users?${qs.stringify(data)}`).then(res => res.data)
    //const adminList = data => axios.get(`/apis/api/v1/admin/user/adminList?${qs.stringify(data)}`).then(res => res.data)
const batchDeleteUser = data => axios.delete(`/apis/api/v1/admin/user/delUser`, { data: data }).then(res => res.data)
const updateUser = data => axios.post(`/apis/api/v1/admin/user/update`, data).then(res => res.data)
const createUser = data => axios.post(`/apis/api/v1/admin/user/create`, data).then(res => res.data)
    //视频类
const videoList = data => axios.get(`/apis/api/v1/admin/videos?${qs.stringify(data)}`).then(res => res.data)
const batchDeleteVideo = data => axios.delete(`/apis/api/v1/admin/video/delVideo`, { data: data }).then(res => res.data)
const updateVideo = form => axios.post(`/apis/api/v1/admin/video/updateVideo`, form).then(res => res.data)
const commentList = form => axios.get(`/apis/api/v1/admin/video/commentList?${qs.stringify(form)}`).then(res => res.data)
const batchDeleteComments = data => axios.delete(`/apis/api/v1/admin/video/delComment`, { data: data }).then(res => res.data)
export {
    userList,
    //adminList,
    batchDeleteUser,
    simpleInfoMe,
    updateUser,
    createUser,
    //
    videoList,
    batchDeleteVideo,
    updateVideo,
    commentList,
    batchDeleteComments
}