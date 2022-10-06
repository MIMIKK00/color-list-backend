import { Controller, Get, Post, Body, Inject, Param, Delete } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

type LoginPayload = {
    email: string,
    password: string,
} //global.d.ts 에 다 넣는게 가장 안좋은 패턴 >> 되도록이면 역할에 따라서 나눠넣는게 좋다 

@Controller('/auth')
export class AuthController {
    constructor() { }

    @Post('signin')
    async signin(
        @Body() body: LoginPayload
    ): Promise<{ success: true, token: string } | { success: false }> /* jwt token*/ {
        if (body.email !== "test@test.io") {
            return {
                success: false,
            }
        }

        if (body.password !== "one23456&") {
            return {
                success: false,
            }
        }

        return {
            success: true,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        }
    }
}
