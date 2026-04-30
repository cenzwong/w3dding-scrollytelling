export interface StoryData {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  content: string;
  img: string;
}

export const storyData: StoryData[] = [
  {
    id: 'hero',
    year: '',
    title: 'OUR STORY',
    subtitle: '一段關於時間與愛的紀錄',
    content: '向下滾動開始',
    img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2500&auto=format&fit=crop', // 婚紗/唯美空景
  },
  {
    id: 'childhood',
    year: '1998',
    title: '平行時空',
    subtitle: '我們在同一個城市長大，卻未曾相遇。',
    content: '那時的我喜歡在公園奔跑，而你總是在圖書館安靜地看書。我們呼吸著一樣的空氣，走過同一條街道，命運的齒輪卻還沒開始轉動。',
    img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2500&auto=format&fit=crop', // 模糊的童年/陽光
  },
  {
    id: 'highschool',
    year: '2010',
    title: '初次交集',
    subtitle: '那年秋天，中學的走廊。',
    content: '還記得第一次看到你，是因為你抱著一疊作業本撞到了我。沒有電影裡浪漫的慢動作，只有散落一地的紙張和我們尷尬的道歉。但那一刻，你的眼睛亮得讓我記到現在。',
    img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2500&auto=format&fit=crop', // 校園/課桌椅
  },
  {
    id: 'university',
    year: '2016',
    title: '各自飛翔，卻繫著線',
    subtitle: '倫敦與香港，9600公里的距離。',
    content: '大學時我們分隔兩地，時差有八個小時。我這裡的日出，是你那裡的深夜。無數個越洋視訊，把我們的世界緊緊連在一起。距離沒有讓我們疏遠，反而學會了珍惜。',
    img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2500&auto=format&fit=crop', // 城市夜景/機場/距離感
  },
  {
    id: 'proposal',
    year: '2024',
    title: '決定是你',
    subtitle: '冰島的極光下，時間彷彿靜止。',
    content: '零下十度的風吹得臉頰發痛，但當我單膝下跪，看到你眼裡的淚光倒映著綠色的極光時，我知道，這就是我想要共度餘生的畫面。你說了那句：「我願意」。',
    img: 'https://images.unsplash.com/photo-1518104593124-ac2e82a5eb9b?q=80&w=2500&auto=format&fit=crop', // 戒指/極光/浪漫場景
  },
  {
    id: 'wedding',
    year: '2026',
    title: '新的篇章',
    subtitle: '今天，我們站在這裡。',
    content: '這不是故事的結局，而是我們全新冒險的序章。謝謝你，願意成為我的家人。',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2500&auto=format&fit=crop', // 婚禮佈置/牽手
  }
];
