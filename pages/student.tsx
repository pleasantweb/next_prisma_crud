import styles from '../styles/Home.module.scss'
import StudentForm from '../component/studentForm';
import { prisma } from '../lib/prisma';
import { GetStaticProps } from 'next'
import { Student } from '.prisma/client';
import React, { useState,useEffect } from 'react';
import { MdEdit,MdOutlineDeleteOutline } from "react-icons/md";

export const getStaticProps: GetStaticProps = async (ctx) => {
    const students:Student[] = await prisma.student.findMany()
  
    return {
        props: {
            students:students
        }
    }
}
type PropType ={
    students:Student[]
}
type checkID ={
    id?:string|number
}
type studentType = checkID & Omit<Student, "id">

const Student = (props:PropType) => {
    console.log(props);
    const {students} = props
    
    const [studentList, setStudentList] = useState<Student[]>([])

    const [studentDetails,setStudentDetails] = useState<studentType>({
        id:'',
        name:'',
        roll_no:0,
        city:''
        })

    useEffect(()=>{
        setStudentList(students)
    },[students])

    const onDelete=async(id:number)=>{
        const deleteId = JSON.stringify({id})
        await fetch('/api/studentdelete',{
            method:"DELETE",
            body:deleteId
        })
        let studentListDemo = [...studentList]
       let yo= studentListDemo.filter((c=>c.id !== id))
        setStudentList(yo)
    }
    const onUpdate=(id:number)=>{
       let yo = studentList.filter((c=>c.id === id))
       if(yo.length > 0){
        setStudentDetails({
            id:id,
            name:yo[0].name,
            roll_no:yo[0].roll_no,
            city:yo[0].city
        })
       } 
    }
    
    return (
       <section className={styles.student}>
          <div className={styles.formDiv}>
              <StudentForm 
                  setStudentList={setStudentList}
                  studentList={studentList}
                  setStudentDetails={setStudentDetails} 
                  studentDetails={studentDetails} />
          </div>
          <div className={styles.studentList}>
              <table >
                  <thead>
                      <tr>
                         <th>ID</th>
                         <th>Name</th>
                         <th>Roll no</th>
                         <th>City</th>
                         <th>Edit</th>
                         <th>Delete</th>
                      </tr>
                  </thead>
                  <tbody>
                      {studentList.map((c,i)=>(
                          <tr key={i}>
                              <td>{c.id}</td>
                              <td>{c.name}</td>
                              <td>{c.roll_no}</td>
                              <td>{c.city}</td>
                              <td><MdEdit onClick={id=>onUpdate(c.id)} /></td>
                              <td><MdOutlineDeleteOutline onClick={id=>onDelete(c.id)} /></td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
       </section>
    )
}
export default Student;