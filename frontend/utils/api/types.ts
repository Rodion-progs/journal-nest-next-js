import {OutputData} from '@editorjs/editorjs';

export type LoginUserDto = {
    email: string;
    password: string;
};

export type CreateUserDto = {
    fullname: string;
} & LoginUserDto;


export type ResponseUser = {
    fullName: string;
    createdAt: string;
    email: string;
    id: number;
    token: string;
    updatedAt: string;
};

export type PostItem = {
    title: string;
    body: OutputData['blocks'];
    tage: null | string;
    id: number;
    views: number;
    createdAt: string;
    updatedAt: string;
    user: ResponseUser;
    description: string;
}
