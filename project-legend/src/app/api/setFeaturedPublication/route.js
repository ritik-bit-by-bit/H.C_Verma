import { NextResponse } from "next/server";
import { featurePublicationModel } from "@/models/featurePublication";
import dbConnect from "@/lib/dbConnect";
export  async function POST(request) {
    try{
        await dbConnect();
        const body = await request.json();
        console.log(body);
        const{title,description,image,link} = body;
        const featurePublication = await featurePublicationModel.create({title,description,image,link});
        return NextResponse.json(featurePublication);
    }catch{
        return NextResponse.json({error:"Failed to set featured publication"},{status:500});
    }
}