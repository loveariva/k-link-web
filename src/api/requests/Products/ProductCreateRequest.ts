import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, IsNumber } from 'class-validator'

export class ProductCreateRequest {
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
    stock_in: number

    @IsNumber()
    @IsNotEmpty()
    stock_out: number
}