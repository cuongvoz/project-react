import axios from "axios"

const getAll = async () => {
    return await axios.get('http://localhost:3000/students')
    
}
const getStudent = async id => {
    return await axios.get('http://localhost:3000/students/'+ id)
}
const deleteProduct = async id => {
    return await axios.delete('http://localhost:3000/students/'+id)
    
}
const addStudent = async student => {
    await axios.post('http://localhost:3000/students',student)
}
const updateStudent = async student => {
    await axios.put('http://localhost:3000/students/'+student.id,student)
}
const search = async name => {
   return await axios.get('http://localhost:3000/students?name_like='+name)
}
const ProductService =  {
    getAll,
    deleteProduct
    ,addStudent,
    getStudent,
    updateStudent,
    search
}
export default ProductService;