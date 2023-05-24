import { useEffect, useState } from "react"
import ClassService from "../service/ClassService"
import { useForm } from 'react-hook-form'
import ProductService from "../service/Products"
import { useNavigate } from "react-router-dom"
const Create = () => {
    const validateAge = (value) => {
        // Kiểm tra tuổi
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
    
        if (age < 18) {
          return 'Bạn phải trên 18 tuổi';
        }
    
        return true;
      };
   
   
    const validate = {
        name: {required: 'Vui lòng nhập tên',pattern : { value: /^[a-z A-Z]{9,}$/,
        message: 'Tên của bạn quá ngắn'},minLength: {value: 8,message: 'alo alo'}},
        dateOfBirth:{required: 'Vui lòng nhập ngày sinh',validate: {validateAge  }},
        phoneNumber:{required: 'Vui lòng nhập số điện thoại',pattern: {value: /^0[3|9][0-9]{8,9}$/,message: 'Số điện thoại không đúng định dạng'}},
        class:{required: 'Vui lòng chọn Lớp học'},
        gender:{required: 'Vui lòng chọn giới tính'}
    }
   
    const navigate = useNavigate()
    const {register, handleSubmit,formState: {errors},watch} = useForm()
    const [clazz, setClass] = useState([])
   const onError = error => console.log(error)
    useEffect(() => {
        getAll()
    }, [])
    const getAll = async () => {
        const clazz = await ClassService.getAll()
        setClass(clazz.data)
    }
    const addStudent = data => { 
        data.class = JSON.parse(data.class)
        data.gender = JSON.parse(data.gender)
        ProductService.addStudent(data) 
    navigate('/')}
    return <div>
        <form onSubmit={handleSubmit(addStudent,onError)} style={{ width: '50%', margin: '0 auto' }}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Họ và tên</label>
                <input type="text" className="form-control" name='name' id='name' {...register('name',validate.name)} />
                {errors?.name && <span style={{color: 'red'}}>{errors.name?.message}</span>}
            </div>
            <div className="mb-3">
                <label htmlFor="dateOfBirth" className="form-label">Ngày sinh</label>
                <input type="date" className="form-control" name='dateOfBirth' id="dateOfBirth" {...register('dateOfBirth', validate.dateOfBirth)} />
              <p style={{color: 'red'}}>{errors.dateOfBirth?.message}</p>
            </div>
           
            <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">Số điện thoại</label>
                <input type="text" className="form-control" id="phoneNumber" name='phoneNumber'  {...register('phoneNumber',validate.phoneNumber )} />
                <p style={{color: 'red'}}>{errors.phoneNumber?.message}</p>
            </div>
            
            <div className="mb-3">
                <label htmlFor="gender" className="form-label">Giới tính</label> <br></br>
                <input type="radio" value={true} className="form-radio" checked id="gender" name='gender'  {...register('gender',validate.gender )} /> Nam 
                <input style={{marginLeft: '20px'}} type="radio" value={false} className="form-radio" id="gender" name='gender'  {...register('gender',validate.gender )} /> Nữ 
               
            </div>
            <div className="mb-3">
                <label htmlFor="class" className="form-label">Lớp học</label>
                <select className="form-select" id='class' name='class'   {...register('class',validate.class)}>
                <option value='' disabled selected >Chọn lớp</option>
                    {clazz.map((item) => (
                        <option key={item.id}  value={JSON.stringify(item)}  >{item.name}</option>
                    ))}
                </select>
                <p style={{color: 'red'}}>{errors.class?.message}</p>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
}
export default Create