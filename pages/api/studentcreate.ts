import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from '../../lib/prisma'

type Data = {
   message: string,
   student?:{}
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>)=> {
    if(req.method !== 'POST'){
        return res.status(405).json({message:'Method not allowed'})
    }
    console.log(req.body);
    const studentCreate=await prisma.student.create({data:req.body})
    console.log(studentCreate);
    
    return res.status(201).json({message:'Student saved successu',student:studentCreate})
}