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

  //1.저장한거 불러오기
  async getAnswerList() {
    const raw = await fs.readFile('./data/answers.json', { encoding: 'utf-8' });
    const answers = JSON.parse(raw) as Answer[];

    // answers를 돌면서... answer마다
    return answers.map((answer) => { // js map => 모던 자바스크립트 튜토리얼
      // problemId에 해당하는 problem의 정보랑
      const problem = problemDict[answer.problemID]; // js 객체

      return {
        // answer의 createdAt 붙여서
        createdAt: answer.createdAt,
        ...problem, // 객체 스프레드 
      };
    });
  }


  //2.작성한 답안 저장
  async saveAnswer(problemID: number, detail: MyColors[]) {
    // 복원(읽어와서 다시 js 객체로 복원)
    const raw = await fs.readFile('./data/answers.json', { encoding: 'utf-8' });
    const old = JSON.parse(raw) as Answer[]; // 역직렬화(deserialize)

    // old 기존 답안 목록 [{ id: 2, ... }, { id: 4, ... }, { id: 5 }]

    const answer: Answer = {
      id: Math.max(...old.map(item => item.id)) + 1, // 매번 새로 부여해줘야 함~
      problemID,
      detail,
      createdAt: Date.now(),
      bookmark: false,
    };

    // 영속 persist
    const data = JSON.stringify([...old, answer]); // 직렬화 serialize
    await fs.writeFile('./data/answers.json', data, { encoding: 'utf-8' });
    return answer.id;
  }


  // 마이페이지에서 filter forEach 등 사용해서 기능 구현
  // 3.저장한 답안 삭제

  //삭제할 답안의 ID 받는다
  async deleteAnswer(problemID: number, answerID: number) {
    // 복원(읽어와서 다시 js 객체로 복원)
    const raw = await fs.readFile('./data/answers.json', { encoding: 'utf-8' });
    const old = JSON.parse(raw) as Answer[]; // 역직렬화(deserialize)

    // old 기존 답안 목록 [{ id: 2, ... }, { id: 4, ... }, { id: 5 }]

    // 해당하는 문제에 대해서, 해당하는 answerID를 가진 것만...제외
    // or로 살아남는 기준만 기술

    const newAnswers = old.filter(answer =>
      answer.problemID !== problemID // 너 그 문제의 답안이 아니구나? 그러면 살려줄게
      || answer.id !== answerID // 너의 id가 answerID가 아니면 살려줄게~
    );

    //db에서는 두 인자를 다 써주는 게 좋은데 파일에서는 answer.id !== answerID만 해도 될듯

    // old.filter(answer => answer.problemID !== problemID );
    // 이러면 해당 문제에 대한 모든 답안이 사라짐


    // 영속 persist
    const data = JSON.stringify(newAnswers); // 직렬화 serialize
    await fs.writeFile('./data/answers.json', data, { encoding: 'utf-8' });
  }


  //   async deleteTodo(targetContent: string) {
  //     const oldTodoList = await this.todoRepository.getAll();
  //     const newTodoList = domain.deleteTodo(oldTodoList, targetContent);
  //     await this.todoRepository.saveAll(newTodoList);
  //   }

  //   export function deleteTodo(todoList: Todo[], targetContent: string): Todo[] {
  //   return todoList.filter(todo => todo.content !== targetContent);
  // }



}

// //저장한 답안에 북마크 표시

// async bookmarkAnswer(targetAnswer: Answer[]) {
//     const before = await this.colorRepository.getAnswerList
//     const after

//북마크 된 답안에서 북마크 해제


export default FsColorRepository;
