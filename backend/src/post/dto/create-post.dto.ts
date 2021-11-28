import {IsArray, IsNotEmpty, IsOptional, IsString} from "class-validator";


export type OutputBlockData = {
    id?: string;
    type: string;
    data: any
}

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsArray()
    body: OutputBlockData[];
    
    @IsOptional()
    @IsArray()
    tags: string;
}
