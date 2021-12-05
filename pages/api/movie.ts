import { NextApiRequest,NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";


export default async(req:NextApiRequest,res:NextApiResponse)=>{
    if(req.method !== 'POST'){
        return res.status(405).json({message:"Method not allowed"})
    }
   
    
    const movieData = JSON.parse(req.body)

    

    const savedContact = await prisma.movie.create({
        data:movieData
    })
    res.status(201).json(savedContact)
}