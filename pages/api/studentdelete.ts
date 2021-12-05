import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from '../../lib/prisma'
type Data = {
    message: string
}

export default async(req: NextApiRequest, res: NextApiResponse<Data>)=> {
    if(req.method !== 'DELETE'){
        return res.status(405).json({message:'Method not allowed'})
    }
    const data = JSON.parse(req.body)
    if(data.id){
       await prisma.student.delete({
        where: {
          id: data.id,
        },
      })
    return res.status(200).json({message:'Student deleted successfully'})
    }else{
        return res.status(400).json({message:'Bad Request'})
    }
    
    
}