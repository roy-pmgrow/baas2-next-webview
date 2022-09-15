export interface ContentType {
  title: string;
  description: string;
}

const swiperContents: ContentType[] = [
  {
    title: "배터리 케어 서비스 소개",
    description: `
      전기차 배터리도 잘 관리하면, 돈이 되는 세상!<br/>
      지금 바로 케어 서비스에 가입하여, 실시간으로 케어 받고<br/>
      올바른 주행 환경을 제공 받으세요!
    `,
  },
  {
    title: "전국 충전소 정보를 한번에!",
    description: `
      전국 모든 전기차 충전소 정보를 한번에!<br/>
      갈 수 없는 충전소는 보이지 않게 설정할 수 있고, 자주 가는<br/>
      충전소를 등록해보세요!
    `,
  },
];

export { swiperContents };
