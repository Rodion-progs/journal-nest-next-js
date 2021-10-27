import {IsEmail, Length} from "class-validator";
import {UniqueOnDatabase} from "../../auth/validations/UniqueValidation";
import {UserEntity} from "../entities/user.entity";

export class CreateUserDto {
    @Length(2, undefined, { message: 'Имя должно содержать минимум 2 символа' })
    fullName: string;

    @Length(6, 32, {message: 'Пароль должен быть не меньше 6 символов и не больше 32'})
    password: string;

    @IsEmail(undefined,{ message: 'Неверная почта' })
    @UniqueOnDatabase(UserEntity, {
        message: 'Такая почта уже есть',
    })
    email: string;

}
