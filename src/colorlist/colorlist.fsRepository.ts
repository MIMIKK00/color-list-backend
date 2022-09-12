import * as fs from 'fs/promises';
import { Injectable } from '@nestjs/common';

const problemDict: Record<number, Problem> = {
  16: {
    year: '2022년도',
    round: '1회차',
    type: '1-2',
    title: '문제 제목 얼레벌레 블라블라',
  },
};

const FILE_NAME = 'myColors.json';

@Injectable()
export class FsColorRepository implements IColorRepository {
  // //저장

  // async saveList(colorList: MyColors[]) { // colorList 배열, 객체
  //     // colorList를 json 파일로 저장해서 data에 담음
  //     const data = JSON.stringify(colorList);
  //     await fs.writeFile('./' + FILE_NAME, data, { encoding: 'utf-8' });
  // }

  //     async getList
  //     fs에서 받을 때는 json으로 오고
  // 다시 객체로 바꿔야 함(데이터가 온전한 형태인지 검사를 해야 함-zod)
  // >> 그냥 return을 하면 알아서 stringify로 다시 json으로 변환해서 프론트에 넘겨줌
  //FsColorRepository 프로바이더 등록/ inject

  //저장한거 불러오기

  async getAnswerList() {
    const raw = await fs.readFile('./data/answers.json', { encoding: 'utf-8' });
    const answers = JSON.parse(raw) as Answer[];

    // answers를 돌면서... answer마다
    return answers.map((answer) => {
      // problemId에 해당하는 problem의 정보랑
      const problem = problemDict[answer.problemID];

      return {
        ...problem,
        // answer의 createdAt 붙여서
        createdAt: answer.createdAt,
      };
    });
  }

  // 마이페이지에서 filter forEach 등 사용해서 기능 구현

  //작성한 답안 저장
  async saveAnswer(problemID: number, detail: MyColors[]) {
    const raw = await fs.readFile('./data/answers.json', { encoding: 'utf-8' });
    const old = JSON.parse(raw) as Answer[];

    const answer: Answer = {
      problemID,
      createdAt: Date.now(),
      bookmark: false,
      detail,
    };

    const data = JSON.stringify([...old, answer]);
    await fs.writeFile(`./data/answers.json`, data, { encoding: 'utf-8' });
    return 1;
  }

  // //저장한 답안에 북마크 표시

  // async bookmarkAnswer(targetAnswer: Answer[]) {
  //     const before = await this.colorRepository.getAnswerList
  //     const after
  // }

  //북마크 된 답안에서 북마크 해제
}
export default FsColorRepository;
