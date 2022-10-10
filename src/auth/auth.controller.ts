import { Controller, Get, Post, Body, Inject, Param, Delete } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

type LoginPayload = Pick<User, 'email' | 'password'>

type JoinPayload = Omit<User, 'id'> //omit은 pick의 반대
// derived type
// 파생된 타입

//global.d.ts 에 다 넣는게 가장 안좋은 패턴 >> 되도록이면 역할에 따라서 나눠넣는게 좋다 

@Controller('/auth')
export class AuthController {
    constructor(
        @Inject('AUTH_REPOSITORY')
        private readonly authRepository: IAuthRepository,
    ) { }

    @Post('/login')
    async login(
        @Body() body: LoginPayload
    ): Promise<{ success: true, token: string } | { success: false }> /* jwt token*/ {

        const user = await this.authRepository.getUserByEmail(body.email);

        //현재는 테스트고 서버에 보유한 실제 유저 정보를 불러와서 대조해야 함
        if (user === null) { // email로 해당 사용자를 찾지 못했으면~
            return { success: false };
        }

        if (body.password !== user.password) {
            return { success: false }
        }

        return {
            success: true,
            //jwt 설치후 >>return jwt.sign(payload, this.config.jwtSecret,
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        }
    }

    //회원가입 구현: 유저모델과 연결? 바디 정확하게 파악해오기
    //유저에 대한 명세: 이메일, 비번, 가입일?
    @Post('/join')
    async join(
        @Body() body: JoinPayload
    ) {
        await this.authRepository.saveUser(body.email, body.password);
    }
}
