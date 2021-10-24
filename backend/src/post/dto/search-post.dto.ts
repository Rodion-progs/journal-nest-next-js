import {IsNotEmpty} from "class-validator";

export class SearchPostDto {
    title: string;
    body: string;

    views: 'DESC' | 'ASC';

    @IsNotEmpty()
    limit: number;

    @IsNotEmpty()
    offset: number;

    tag: string;
}
