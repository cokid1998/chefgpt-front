import VoteCard from "@/components/vote/voteList/VoteCard";

export const DUMMY = [
  {
    title: "MSG 논란",
    desc: "식품첨가물 MSG(글루탐산나트륨)은 몸에 나쁘다고 생각하시나요?",
    option: {
      A: {
        title: "그렇다",
        ratio: 50,
      },
      B: {
        title: "아니다",
        ratio: 50,
      },
    },
  },
  {
    title: "부먹 vs 찍먹",
    desc: "탕수육은 소스를 부어 먹는 게 맞을까, 찍어 먹는 게 맞을까?",
    option: {
      A: {
        title: "부먹",
        ratio: 3,
      },
      B: {
        title: "찍먹",
        ratio: 97,
      },
    },
  },
  {
    title: "파인애플 피자",
    desc: "하와이안 피자에 대한 영원한 논쟁",
    option: {
      A: {
        title: "좋아한다",
        ratio: 97,
      },
      B: {
        title: "싫어한다",
        ratio: 3,
      },
    },
  },
  {
    title: "민트초코",
    desc: "민트초코는 음식일까, 치약일까?",
    option: {
      A: {
        title: "음식이다",
        ratio: 3,
      },
      B: {
        title: "치약이다",
        ratio: 97,
      },
    },
  },
];

export default function VoteList() {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-900">진행 중인 투표</h2>

      <div className="grid grid-cols-3 gap-6">
        {DUMMY.map((item) => (
          <VoteCard key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}
