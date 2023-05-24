import axios from "axios"

const getAll = () => {
    return axios.get('http://localhost:3000/class')
}
const ClassService = {
    getAll
}
export default ClassService