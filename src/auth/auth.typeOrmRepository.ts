import { Inject, Injectable } from "@nestjs/common";
import { type Repository, type DataSource } from "typeorm";
import { UserEntity } from "./auth.entity";


@Injectable()
export class TypeOrmRepository implements IAuthRepository {
    _repository: Repository<UserEntity>
    constructor(
        @Inject('DATASOURCE')
        dataSource: DataSource
    ) {
        this._repository = dataSource.getRepository(UserEntity)
    }

    async getUserByEmail(email: string) {
        //이메일을 받아서 해당하는 유저를 찾아줌

        // await con.queryOne('select email, id, password from user_entity where email = $1', email)
        return await this._repository.findOneBy({ email }); // await을 하면 레포에서 에러가 남
        // return this._repository.findOneBy({ email }); // await을 안 하면... 성능은 더 좋은데 받은 사람에게 에러가 남
    }
    async saveUser(email: string, password: string) {

    }
    async deleteUserById(id: number) {

    }
}

// https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%8A%94-%EB%84%A4%EC%8A%A4%ED%8A%B8-%EC%A0%9C%EC%9D%B4%EC%97%90%EC%8A%A4#curriculum
// https://wikidocs.net/book/7059
