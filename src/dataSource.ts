import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserEntity } from "./auth/auth.entity"

const AppDataSource = new DataSource({
    type: "sqlite",
    // host: "localhost",
    // port: 3000,
    // username: "root",
    // password: "root",
    // 위에꺼는 네트워크를 위한 속성> sqlite는 통신하지 않기 때문에 필요없음ㅠ

    database: "colorList.sqlite", // '오픈'할 데이터베이스 파일경로를 지정
    entities: [UserEntity],
    synchronize: true, //연습을 할때는 true가 좋고 프로덕션에서도 공부를 좀 하고 결정해야함
    logging: true,
})

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap

export default {
    provide: 'DATASOURCE',
    useFactory: async () => {
        const dataSource = await AppDataSource.initialize(); //데이터소스 초기화가 될 때까지 기다렸다가
        return dataSource;
    },
}

//의존성 주입하는 여러가지 방법
// value => 값을 바로 주입
// class => 인스턴스를 만들어서 주입
// factory => 팩토리 함수로 초기화가 끝난 걸 주입!
//(인스턴스나 값을 그냥 쓰면 안되고 초기화라는 작업을 거친 데이터소스가 필요하니까 팩토리 사용)
//팩토리 패턴: 팩토리는 복잡한 객체를 형성하는 역할을 맡은 함수나 객체