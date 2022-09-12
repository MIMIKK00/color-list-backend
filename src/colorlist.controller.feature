Feature: colorlist.controller
    -요청 처리하고 응답 반환

    ## 요청하고 싶은 기능

    # post
    Scenario: saveAnswer 작성한 답안을 저장한다(클라 > fs로)
        # 사용자라는 개념은 아직 없어도 되는데 '문제'라는 개념은 필요함(+문제가 여러개)

        Given 기존의 동일한 문제에 대한 답안이 없을 때
        When post, /problems/:problemId/answer, body MyColors[] 라는 요청을 받으면
        Then status code로는 201 created, body로는 answer id가 담긴 응답을 돌려준다.

# when: 사용자의 동작, 프론트엔드 어플리케이션이 어떤 요청을 어떻게 보내는지

# patch
-bookmarkAnswer 저장한 답안에 북마크 표시를 한다
-unbookmarkAnswer 북마크 표시가 된 답안에서 북마크를 해제한다

# get
-getAnswer
-getAnswerList 답안을 작성한 문제 목록을 모두 조회한다.
-filter, pagination ?

# get
-getAnswerDetail (1개) 조회하고 싶은 문제를 눌렀을 때 해당하는 문제만 볼 수 있다

