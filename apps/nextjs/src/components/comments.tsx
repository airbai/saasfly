import { cn } from "@saasfly/ui";
import Marquee from "@saasfly/ui/marquee";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "This AI-powered Zi Wei Dou Shu service has completely transformed my understanding of fate and life planning. It's truly remarkable!",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Alex",
    username: "@alex",
    body: "The AI-driven insights from Zi Wei Dou Shu have revolutionized how we approach personal growth and destiny. This tool is a game-changer!",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "Shamoki",
    username: "@shamoki",
    body: "I’m amazed by how this AI-based Zi Wei Dou Shu interpretation has reshaped my perspective on life planning. It’s incredible!",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "王伟",
    username: "@wangwei",
    body: "这个AI驱动的紫微斗数服务完全颠覆了我对命运和人生规划的理解。它真的很了不起！",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "김민수",
    username: "@kios",
    body: "이 AI 기반의 紫微斗數 서비스는 제 인생 계획과 운명 해석을 완전히 혁신시켰습니다. 정말 놀랍습니다!",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "山田太郎",
    username: "@samtimkun",
    body: "このAI駆動の紫微斗数サービスは、運命と人生設計に対する私の理解を完全に変えました。素晴らしいです！",
    img: "https://avatar.vercel.sh/james",
  },
];


const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

const Comments = () => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background py-4 sm:py-20 md:py-20 xl:py-20">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
};

export { Comments };
