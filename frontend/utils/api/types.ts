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
