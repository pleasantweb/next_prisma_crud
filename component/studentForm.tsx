import { Student } from '.prisma/client'
import React from 'react'

type checkID ={
    id?:string|number
}
type studentType =checkID & Omit<Student, "id">
type propType ={
    setStudentList :React.Dispatch<React.SetStateAction<Student[]>>,
    studentList:Student[],
    setStudentDetails:React.Dispatch<React.SetStateAction<studentType>>,
    studentDetails:studentType
}

const StudentForm = (props:propType) => {
    const {setStudentList,studentList,setStudentDetails,studentDetails} =props
    
    const {id,name,roll_no,city} = studentDetails
    console.log(typeof(id),id);
    
    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setStudentDetails({
            ...studentDetails,[e.target.name]:e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        })
    }
    const onSubmit =async (e:React.FormEvent<HTMLFormElement>)=>{
          e.preventDefault()
          if(id === ''){
          const body = JSON.stringify({name,roll_no,city})
          const res = await fetch('/api/studentcreate',{
              method:"POST",
              headers:{
                  'content-Type':'application/json'
              },
              body:body
          })
          const data = await res.json()
          console.log(data);
          if(data.student){
              setStudentList(prev=>[...prev,data.student])
          }
        }else{
            const body = JSON.stringify({id,name,roll_no,city})
          await fetch('/api/studentupdate',{
              method:"PATCH",
              headers:{
                  'content-Type':'application/json'
              },
              body:body
          })
          const studentListt = [...studentList]
         const index = studentList.findIndex(v=>v.id === id)
        studentListt[index].name=name
        studentListt[index].roll_no=roll_no
        studentListt[index].city = city
        setStudentList(studentListt)
        
          
        }
          
    }
    return (
       <form onSubmit={onSubmit} action="">
           <input type="text" name="name" onChange={onChange} value={name} placeholder='name' />
           <input type="number" name="roll_no" onChange={onChange} value={roll_no || ""}  placeholder='roll no' />
           <input type="text" name="city" onChange={onChange} value={city} placeholder='city' />
           <input type="submit" value="save" />
       </form>
    )
}
export default StudentForm