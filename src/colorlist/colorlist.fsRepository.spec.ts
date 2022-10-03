import FsColorRepository from "./colorlist.fsRepository"

describe("FsColorRepository", () => { // 구현체 이름
    // 구현체가 인터페이스를 준수하는지 테스트를 함
    //"FsColorRepository"라는 구현체가 getAnswerList를 
    it("새 답안을 저장하면 답안 개수가 한 개 늘어난다.", async () => {

        const repo = new FsColorRepository()

        //expect(1 + 1).toBe(2)
        const oldList = await repo.getAnswerList()
        //toStrictEqual 은 객체 배열일때
        //toHaveLength는 배열 안에 원소 개수를 측정

        //arange, action, assert
        //어떤 상태였는데 > 어떤 동작을 하니까 >> 어떤 상태로 변했다
        await repo.saveAnswer(16, [{
            jubogang: {
                ju: "#833359",
                bo: "#126C72",
                gang: "#126C72"
            },
            "box": [
                { color: "#126C72", width: 2455 },
            ],
            "answer": "여백의 미"
        }])

        await expect(repo.getAnswerList()).resolves.toHaveLength(oldList.length + 1)
    })
}) 