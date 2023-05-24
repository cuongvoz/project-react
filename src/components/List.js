import { useEffect, useState } from "react"
import ProductService from "../service/Products"
import Swal from "sweetalert2"
import { useNavigate, useParams } from "react-router-dom"
const List = ({getData}) => {
  const [list, setList] = useState([])
  const getAll = async () => {
    const next = await ProductService.getAll()
    setList(next.data)

  }
  const search = async () => {
    const next = await ProductService.search(getData)
    setList(next.data)

  }
  const navigate = useNavigate()
  useEffect(() => {
    // if(getData) {
       search()
    // } else {
    //   getAll()

    // }
  },[getData])

  const deletePhone = async id => {

    await ProductService.deleteProduct(id)
    getAll()
  }
  const warning = async student => {
    Swal.fire({
      title: 'Xác nhận xóa?',
      text: "Bạn có chắc choán mún xóa!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Xóa đê!',
      cancelButtonText: 'Đéo'
    }).then((result) => {
      if (result.isConfirmed) {
        deletePhone(student.id)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  return <div>
    <table className="table table-borderless">
      <thead>
        <tr>
          <th>STT</th>
          <th>Họ và tên</th>
          <th>Ngày sinh</th>
          <th>Số điện thoại</th>
          <th>Giới tính</th>
          <th>Lớp</th>
          <th>Chức năng</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => (
          <tr key={item.id}>
            <td>
              {index + 1}
            </td>
            <td>
              {item.name}
            </td>
            <td>
              {item.dateOfBirth}
            </td>
            <td>
              {item.phoneNumber}
            </td> <td>
              {item.gender ? 'Nam' : 'Nữ'}
            </td>
            <td>
              {item.class.name}
            </td>
            <td>
              <button onClick={() => warning(item)} className="btn btn-outline-danger"><i class="fa-sharp fa-solid fa-hippo"></i></button>
              <button onClick={() => navigate('/update/'+item.id)} className="btn btn-outline-success"><i class="fa-solid fa-ghost"></i></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}
export default List 