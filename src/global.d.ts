const pallete = {
    "base": [
        { "hex": "#CC1313", "colorName": "R" },
        { "hex": "#FF6B00", "colorName": "YR" },
        { "hex": "#FFC700", "colorName": "Y" },
        { "hex": "#90B81F", "colorName": "GY" },
        { "hex": "#2D7B4C", "colorName": "G" },
        { "hex": "#1B6553", "colorName": "BG" },
        { "hex": "#126C72", "colorName": "B" },
        { "hex": "#4E6192", "colorName": "PB" },
        { "hex": "#6A377C", "colorName": "P" },
        { "hex": "#833359", "colorName": "RP" }
    ],
    "deep": [
        { "hex": "#CC1313", "colorName": "R/dp" },
        { "hex": "#FF6B00", "colorName": "YR/dp" },
        { "hex": "#FFC700", "colorName": "Y/dp" },
        { "hex": "#90B81F", "colorName": "GY/dp" },
        { "hex": "#2D7B4C", "colorName": "G/dp" },
        { "hex": "#1B6553", "colorName": "BG/dp" },
        { "hex": "#126C72", "colorName": "B/dp" },
        { "hex": "#4E6192", "colorName": "PB/dp" },
        { "hex": "#6A377C", "colorName": "P/dp" },
        { "hex": "#833359", "colorName": "RP/dp" }
    ]
} as const

type palleteNames = keyof typeof pallete;

type ColorEnum = typeof pallete[palleteNames][number]['hex']

type MyColors = {
    jubogang: {
        ju: ColorEnum,
        bo: ColorEnum,
        gang: ColorEnum,
    },
    box: Array<{ color: ColorEnum, width: number }>,
    answer: string
};

type Problem = {
    year: string;
    // 회차
    title: string;
    // 지문?
}

// 문제 목록 Problem
// 사용자가 푼 풀이 Answer[]
// 풀이의 detail => MyColors[]

//보통 DTO가 페이지에 귀속되는 것은 맞는데
//DTO는 주고받을때 쓰는 용어

type Profile = {

}

// problem: Pick<Problem, 'year' | 'numbering' | 'title'>;
type Answer = {
    problemID: number;
    createdAt: number;
    bookmark: boolean;
    detail: MyColors[];
}


interface IColorRepository {
    // colorList를 저장(부수효과)
    getList: () => Promise<MyColors[]>
    // colorList를 조회
    saveAnswer: (problemID: number, detail: MyColors[]) => Promise<number>
    //답안저장

    // bookmarkAnswer
    //북마크 표시
}
