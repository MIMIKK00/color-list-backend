


        ## Scenario 01: 답안 작성한 문제 여러 개 볼 수 있음

        before
        -문제 하나만 저장하고, 그 하나를 불러옴
        after
        - 여러 개의 풀이를 저장
        - 새로 문제를 풀면... 추가되어야 함
        - 새로운 걸 만들어야 함!
        - 여러 개를 보내준다. 단. 제목이랑 날짜만 선택해서!

        Given 문제 목록을 렌더하고
        When 링크를 클릭하면
        Then 링크에 해당하는 문제 페이지로 이동한다


        ## Scenario 02: 작성한 답안을 삭제할 수 있음
        Given 삭제할 답안의 problemID를 받아서(repo의 deleteAnswer 메소드가)
        When 삭제 버튼을 클릭하면
        Then 삭제되었습니다 라는 알림 뜨고 다시 답안 목록으로 이동한다? 
                삭제한 답안이 제외된 newAnswerlist를 saveAnswer 메소드의 인자로 받아 실행한 후
                최신 Answerlist가 반환되도록 한다



## 하고 싶은 거 (사용자 스토리)
- 마이페이지
- 년차, 회차, 제목, 문제 푼 날짜, (번호??)
- bookmark
- pagination
- 내가 푼 문제 목록을 조회해서 볼 수 있다
- 원하는 기준으로 filter해서 볼 수 있다

## 백엔드랑 프런트랑... interface (API)
- 기존에 있던 걸 변경!
- before
- 문제 하나만 저장하고, 그 하나를 불러옴
- after
- 여러 개의 풀이를 저장
- 새로 문제를 풀면... 추가되어야 함
- 새로운 걸 만들어야 함!
- 여러 개를 보내준다. 단. 제목이랑 날짜만 선택해서!
- select(sql), pick(typescript)
- list vs detail
- filter => get, query, read
- bookmark => patch, mutation, update
- pagination ???

## 데이터를 어떻게 저장하고 가져오고, 가공할까? (persistence 영속성)
file, sql, mongodb