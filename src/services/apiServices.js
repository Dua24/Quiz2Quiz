import axios from "../utils/axiosCustomize"
const getAllPosts = () => {
    return axios.get('v1/api/post')
}

export { getAllPosts }
