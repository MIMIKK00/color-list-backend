//canactivate 인터페이스를 구현
import { Request } from 'express';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(
        private readonly configService: ConfigService
    ) { }

    canActivate(
        context: ExecutionContext,//js의 실행컨텍스트와는 다른 개념/ nestjs에서 특수한 맥락
    ): boolean | Promise<boolean> { // union type ... 이 셋 중에 하나를 return 할 수 있다
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }
    // value => 값 (물건 구매...)
    // promise => 값을 준다는 약속 (주문... 배송 오기를 기다림)
    // Observable(트위터 계정) => 값을... 여러 번 주고... (구독) => RxJS 라이브러리를 이용

    private validateRequest(request: Request) {
        try {
            const jwtString = request.headers.authorization.split('Bearer ')[1];
            // https://www.imperva.com/blog/wp-content/uploads/sites/9/2017/10/parts-of-a-HTTP-request-1.png
            //  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
            const key = this.configService.get<string>('JWT_SECRET');
            jwt.verify(jwtString, key);
        } catch {
            return false;
        }
        return true;
    }
}

// HTTP Request

// context 란? 어떤 함수가 의존하는 맥락을 담고 있는 객체?

// 똑같은 ㅁㅁ이 와도 맥락에 따라서 다른 대답을 해야 할 경우에 그 맥락을 담고 있음(db같은 것도 넣음,,?)

// 그렇다면... 가드에서 ExecutionContext란? HTTP인 경우 요청과 응답의 정보를 꺼내기 위함
