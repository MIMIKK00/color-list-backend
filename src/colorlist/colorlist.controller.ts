import { Controller, Get, Post, Body, Inject, Param, Delete, UseGuards } from '@nestjs/common';
import { LoginGuard } from '../auth/auth.loginGuard';

@Controller('/colors')
export class ColorListController {
  // http://localhost:8000/colors/color-list
  constructor(
    @Inject('COLOR_REPOSITORY')
    private readonly colorRepository: IColorRepository,
  ) { }

  // https://image3.slideserve.com/7037013/http-response-message4-l.jpg

  // login한 사람만~ 
  // https://wikidocs.net/158631#_3

  @UseGuards(LoginGuard)
  @Post('/problems/:problemID/answers') //사용자 입장에서 서버에 데이터를 보내서 저장=post
  async saveAnswer(
    @Param('problemID') problemID: number,
    @Body() detail: MyColors[],
  ): Promise<number> {
    return this.colorRepository.saveAnswer(problemID, detail);
  }

  // (@Param('problemID') problemID: number  패스에 있는 :problemID를 problemID라는 매개변수로 맵핑을 해준다!

  @UseGuards(LoginGuard)
  @Get('/color-list')
  async getAnswerList(): Promise<(Pick<Answer, 'createdAt'> & Problem)[]> {
    return this.colorRepository.getAnswerList();
  }


  //이건 로그인 가드보다 센 게 필요해서 일단 보류
  @Delete('/problems/:problemID/answers/:answerID')
  async deleteAnswer(@Param('problemID') problemID: number, @Param('answerID') answerID: number): Promise<void> {
    return this.colorRepository.deleteAnswer(problemID, answerID)
  }



  // getAnswerList: () => Promise<(Problem & { createdAt: number })[]>;
  // //Answer & { createdAt: number } 되어야 하는건가??

  // 작성한 답안을 저장한다(클라 > fs로)

  // @Post("/color-list")
  // async saveAnswer(): (@Body() answer: Answer[]): Promise<void> {
  //     return this.colorRepository.saveAnswer();
  // }

  // @Patch("/color-list/:targetAnswer")
  // async bookmarkAnswer(@Param("targetAnswer") targetAnswer: Answer[]) {

  // }
  // -bookmark 저장한 답안에 북마크 표시를 한다
  // -unbookmarkAnswer 북마크 표시가 된 답안에서 북마크를 해제한다

  // # get
  // -getAnswerList 답안을 작성한 문제 목록을 모두 조회한다.
  // -filter, pagination ?

  // # get
  // -getAnswerDetail (1개) 조회하고 싶은 문제를 눌렀을 때 해당하는 문제만 볼 수 있다
}
