import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from '../../lib/prisma'
type Data = {
    message: string,
    student?:{}
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>)=> {
    console.log(req.body);
    const updatedData = req.body
    if(req.method !== 'PATCH'){
        return res.status(405).json({message:'Method not allowed'})
    }
    const studentUpdate = await prisma.student.update({
        where:{
            id:updatedData.id
        },
        data:{
            name:updatedData.name,
            roll_no:updatedData.roll_no,
            city:updatedData.city 
        }
    })
    
    res.status(200).json({message: 'Student updated successfully.',student:studentUpdate })
}