/* jshint esversion: 6 */
import axios from "axios"
import qs from "qs"
const postVideo = form => axios.post(`/apis/api/v1/videos`, form).then(res => res.data)
const getVideo = id => axios.get(`/apis/api/v1/video/${id}`).then(res => res.data)
const getVideos = params => axios.get(`/apis/api/v1/videos?${qs.stringify(params)}`).then(res => res.data)
const getVideoRank = params => axios.get(`/apis/api/v1/rank/video?${qs.stringify(params)}`).then(res => res.data)
const postUploadTokenAvatar = fName => axios.post(`/apis/api/v1/upload/tokenAvatar`, { fileName: fName }).then(res => res.data)
const postUploadTokenVideo = fName => axios.post(`/apis/api/v1/upload/tokenVideo`, { fileName: fName }).then(res => res.data)
const comment = data => axios.post("/apis/api/v1/video/comment", qs.stringify(data)).then(res => res.data)
const getComments = id => axios.get(`/apis/api/v1/video/${id}/comments`).then(res => res.data)
const updateVideo = form => axios.post(`/apis/api/v1/video/updateVideo`, form).then(res => res.data)
const delVideo = data => axios.delete(`/apis/api/v1/video/delVideo`, { data: data }).then(res => res.data)
    //记一个坑 delete方法传参要在外面包一个data
const delComments = data => axios.delete(`/apis/api/v1/video/delComment`, { data: data }).then(res => res.data)
export {
    postVideo,
    getVideo,
    getVideos,
    getVideoRank,
    postUploadTokenAvatar,
    postUploadTokenVideo,
    updateVideo,
    comment,
    getComments,
    delComments,
    delVideo
}