
// fake => 메모리에 배열에 넣어두는 용도 (가장 빠름!)(테스트 후에는 사라짐)
// fs => 실제 구현으로 쓰기도 함... (안 사라짐. DB보다 느려요... 구현하기 편함)
// sqlite, postgre => 실제 구현 (안 사라짐, 빠름, 구현하기는 매우 귀찮아요)

// 객체의 메소드와 필드는 이름으로 구분

// 함수의 매개변수... 위치로 구분
//hash 가입
//verify 로그인


export class FakeAuthRepository implements IAuthRepository {
    _store = []

    async getUserByEmail(email) {
        // _store에서 email을 가진 사용자를 찾아서 반환
        //배열 메서드 모르는거 점찍어서 찾아보기 + mdn 예시 참고
        return this._store.find(user => user.email === email) ?? null;
    }

    async saveUser(email, password) {
        // 기존 id 최댓값에 +1  한 값을 새 id로 한다
        // auto increment

        const newId = Math.max(...this._store.map(user => user.id), 0) + 1;
        const newUser = {
            id: newId,
            email,
            password
        }
        this._store = [...this._store, newUser];
        return newId;
    }

    async deleteUserById(id: User['id']) {
        this._store = this._store.filter(user => user.id !== id);
    }
}

// [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] 
// [1,2,3,4] // map은 변환을 하니까. 고른다고 해도 개수가 그대로

// [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
// [{ id: 2 }, { id: 4 }] // filter는 변환하지 않고, 조건에 맞는 것만 거름... 개수는 같거나 줄어듬. 원하는 것만 고르고 싶을 때
//filter는 변환이 안됨