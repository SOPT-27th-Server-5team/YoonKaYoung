const fishes = [
  "연어",
  "금붕어",
  "상어",
  "돌고래",
  "해마",
  "불가사리",
  "소라",
  "산호",
  "새우",
  "고래",
  "말미잘",
  "랍스터",
  "고등어"
];

const adjs = [
  "침대에 누운",
  "따듯한 차를 마시는",
  "쉬어가는",
  "잠시 멈춘",
  "여행하는",
  "낚시하는",
  "배부른",
  "친절한",
  "나른한",
  "모범적인",
  "수줍은",
  "온화한"
];

module.exports = {
  generateRandomNickname: () => {
    const randomAdjIdx = parseInt(Math.random() * adjs.length);
    const randomNounIdx = parseInt(Math.random() * fishes.length);
    const randomNickname = adjs[randomAdjIdx] + fishes[randomNounIdx];
    return randomNickname;
  },
};