import axios from "../utils/axiosCustomize"
const getAllPosts = () => {
    return axios.get('v1/api/posts')
}

const getPost = (id) => {
    return axios.get(`v1/api/post/${id}`)
}
const postPost = (post_detail, type, owner, img_detail) => {
    const data = new FormData()
    data.append('post_detail', post_detail)
    data.append('type', type)
    data.append('num_Evaluate', 0)
    data.append('owner', owner)
    data.append('img_detail', img_detail)
    return axios.post('v1/api/post', data) // truyen form data
}

const deletePost = (id) => {
    return axios.delete('v1/api/post', { data: { id: id } })
}
const getAllUser = () => {
    return axios.get('v1/api/users')
}
const getUser = (id) => {
    return axios.get(`v1/api/user/${id}`)
}
const getPostsByUser = (idUser) => {
    return axios.get(`v1/api/posts/${idUser}`)
}


const login = (email, password) => {
    return axios.post('v1/api/login',
        {
            email,
            password
        }) // <-- truyen theo form-urlencoded
}
const register = (email, password, username) => {
    return axios.post('v1/api/register',
        {
            email,
            username,
            password
        })
}

const postComment = (cmt_detail, num_Evaluate, owner, post) => {
    return axios.post('v1/api/comment',
        {
            cmt_detail,
            num_Evaluate,
            owner,
            post
        })
}

const postReply = (reply_detail, owner, comment) => {
    return axios.post('v1/api/reply',
        {
            reply_detail,
            owner,
            comment
        })
}
const deleteComment = (id) => {
    return axios.delete('v1/api/comment', { data: { id: id } })
}

const deleteReply = (id) => {
    return axios.delete('v1/api/reply', { data: { id: id } })

}

const checkEmailExist = (email) => {
    return axios.post('v1/api/email', { email })
}
const logout = (email) => {
    return axios.post('v1/api/logout', { email })

}
const rate = (type, owner, post) => {
    return axios.post('v1/api/rate', { type, owner, post })
}
const getRatingsByUser = (id) => {
    return axios.post('v1/api/rates', { id })
}
export {
    getAllPosts, getPost, getUser, getPostsByUser, login, register,
    postComment, postReply, postPost, deletePost, deleteComment, deleteReply,
    checkEmailExist, logout, rate, getRatingsByUser, getAllUser
}
