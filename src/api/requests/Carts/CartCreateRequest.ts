import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, IsNumber, IsDateString } from 'class-validator'

export class CartCreateRequest {
    @MaxLength(20)
    @IsDateString()
    @IsNotEmpty()
    trans_date: string

    @IsString()
    @IsNotEmpty()
    trans_no: string

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    user_email: string

    @MaxLength(20)
    @MinLength(2)
    @IsString()
    @IsNotEmpty()
    product_name: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsNumber()
    @IsNotEmpty()
    quantity: number

    @MaxLength(20)
    checkout: string
}