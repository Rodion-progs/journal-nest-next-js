import {IsEmail, Length} from "class-validator";

export class LoginUserDto {
    @Length(6, 32, {message: 'Пароль должен быть не меньше 6 символов и не больше 32'})
    password?: string;

    @IsEmail(undefined,{ message: 'Неверная почта' })
    email: string;
}