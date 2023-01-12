import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

type LoginPayload = Pick<User, 'email' | 'password'>

type JoinPayload = Omit<User, 'id'> //omit은 pick의 반대
// derived type
// 파생된 타입

//global.d.ts 에 다 넣는게 가장 안좋은 패턴 >> 되도록이면 역할에 따라서 나눠넣는게 좋다 

@Controller('/auth')
export class AuthController {
    //constructor(private configService: ConfigService) {}
    constructor(
        @Inject('AUTH_REPOSITORY')
        private readonly authRepository: IAuthRepository,
        private readonly configService: ConfigService
    ) { }

    // 로그인 >> 사용자가 아이디 비번을 준다 >> 디비에 실제로 있는 아이디 비번인지 확인을 한다 >> 
    // >> 확인이 되면, 토큰을 준다(로그인을 시켜준다) >> 받은 토큰을 가지고 홈페이지 자유이용권  

    @Post('/login')
    async login(
        @Body() body: LoginPayload
    ): Promise<{ success: true, token: string } | { success: false }> /* jwt token*/ {

        const user = await this.authRepository.getUserByEmail(body.email);
        //이메일을 가지고 유저를 찾음

        //현재는 테스트고 서버에 보유한 실제 유저 정보를 불러와서 대조해야 함
        if (user === null) { // email로 해당 사용자를 찾지 못했으면~
            return { success: false };
        }

        if ((await argon2.verify(user.password, body.password)) === false) {
            return { success: false }
            //hash는 암호화, verify는 일치 여부를 검증
        }

        // 방어 구문, 보호 구문, guard 절

        // ~하면 => 실패
        // verify가 실패하면 => 실패
        // 그 외에는 => 성공


        // { success: true; token: string; }

        return {
            success: true,
            token: jwt.sign({ id: user.id, email: user.email }, this.configService.get<string>('JWT_SECRET'))
            // .env(dot env) >> 두번째 인자인 관리자 번호는 코드레벨에서 적으면 안 돼서 env 써서 따로 관리하고 가져올 수 있음 >> 알아보기
            // 관리자 번호를 두번쨰 인자로 받아서 토큰을 만들어줌(관리자 번호가 토큰에 들어가는 건 아님)


            // 두번째 인자: 관리자 비밀번호
            //jwt payload에 비밀번호는 들어가면 안됨 
            //jwt는 임시신분증 발급/자주 사용함/가로챌 위험이 있음 >> 비밀번호(like 주민번호)를 넣는것은 이상함

            //const jwtToken = await jwt.sign(user);
            //jwt 설치후 >>return jwt.sign(payload, this.config.jwtSecret,
            //token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        }
    }
    //회원가입 구현: 유저모델과 연결? 바디 정확하게 파악해오기
    //유저에 대한 명세: 이메일, 비번, 가입일?
    @Post('/join')
    async join(
        @Body() body: JoinPayload
    ) {
        const hash = await argon2.hash(body.password);
        console.log({ hash })
        await this.authRepository.saveUser(body.email, hash);
    }
}
