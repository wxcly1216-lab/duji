// ════════════════════════════════════════════
// 阅读档案 DRPS — Data
// ════════════════════════════════════════════

const LEVELS = [
  { id: 'breakthrough', short: 'B', cn: '入门级', en: 'Breakthrough', subtitle: '150–300 字', stamp: '入' },
  { id: 'level1', short: 'L1', cn: '第一级', en: 'Level 1', subtitle: '300–450 字', stamp: '一' },
  { id: 'level2', short: 'L2', cn: '第二级', en: 'Level 2', subtitle: '450–650 字', stamp: '二' },
  { id: 'level3', short: 'L3', cn: '第三级', en: 'Level 3', subtitle: '650–1000 字', stamp: '三' },
  { id: 'level4', short: 'L4', cn: '第四级', en: 'Level 4', subtitle: '1000+ 字', stamp: '四' },
];

// Each book gets a cover-color palette so book spines look hand-bound.
const COVER_PALETTES = {
  breakthrough: ['#7A8C5C', '#A37B4E', '#5C7A8C', '#8C5C5C', '#B89968', '#6E8A78', '#A37050'],
  level1:       ['#A04C32', '#5C7A47', '#3F5874', '#8B4A2B', '#766D4F'],
  level2:       ['#6F4E37', '#445D48', '#7A4E68', '#996644', '#3F4858', '#5B7065'],
  level3:       ['#8B3A2A', '#3D5A4C', '#7D6747', '#5C3A2E', '#6A4A5C', '#3F4858', '#7A5C3E'],
  level4:       ['#2E3D44', '#5A3429', '#4A3F2E', '#473A4F', '#3A4A33'],
};

const BOOKS = [
  // ─── Breakthrough ───────────────────────────────
  { id:'b01', n:1, level:'breakthrough', cn:'我们是朋友吗？', en:"Just Friends?", series:'Mandarin Companion', form:'分级读物', tags:['校园','友情'],
    desc:'新转学生努力融入新班级的轻松校园故事，词汇量约150个，对话丰富，贴近学生日常生活。',
    chapters:[{t:'第一章 · 新学校',e:'New School'},{t:'第二章 · 第一个朋友',e:'First Friend'},{t:'第三章 · 误会',e:'Misunderstanding'},{t:'第四章 · 真正的朋友',e:'Real Friends'}],
    cover:0, mood:'活泼' },
  { id:'b02', n:2, level:'breakthrough', cn:'小明：少年神探', en:'Xiao Ming, Boy Sherlock', series:'Mandarin Companion', form:'分级读物', tags:['悬疑','推理'],
    desc:'改编自福尔摩斯经典，以校园为背景的轻松侦探故事，情节紧凑。',
    chapters:[{t:'第一章 · 谜团',e:'The Mystery'},{t:'第二章 · 线索',e:'Clues'},{t:'第三章 · 调查',e:'Investigation'},{t:'第四章 · 真相',e:'The Truth'}],
    cover:1, mood:'紧张' },
  { id:'b03', n:3, level:'breakthrough', cn:'我的老师是火星人', en:'My Teacher is a Martian', series:'Mandarin Companion', form:'分级读物', tags:['科幻','幽默'],
    desc:'来自外星球的奇特老师带来的搞笑校园冒险，充满想象力，幽默感强。',
    chapters:[{t:'第一章 · 怪怪的老师',e:'Strange Teacher'},{t:'第二章 · 老师的秘密',e:"Alien's Secret"},{t:'第三章 · 麻烦',e:'Trouble'},{t:'第四章 · 再见',e:'Goodbye'}],
    cover:2, mood:'奇趣' },
  { id:'b04', n:4, level:'breakthrough', cn:'花马', en:'In Search of Hua Ma', series:'Mandarin Companion', form:'分级读物', tags:['冒险','文化'],
    desc:'寻找神秘花斑马的旅程故事，带领读者感受中国西北的风土人情。',
    chapters:[{t:'第一章 · 出发',e:'Departure'},{t:'第二章 · 西行',e:'Journey West'},{t:'第三章 · 发现',e:'Discovery'},{t:'第四章 · 归途',e:'Coming Home'}],
    cover:3, mood:'辽阔' },
  { id:'b05', n:5, level:'breakthrough', cn:'爷爷一定有办法', en:'Something from Nothing', series:'菲比·吉尔曼', form:'图画书', tags:['家庭','创意'],
    desc:'爷爷将旧布料一次次变换成新物品的温馨绘本，词汇量极低，图文并茂。',
    chapters:[{t:'前半段',e:'Part 1'},{t:'后半段',e:'Part 2'}], cover:4, mood:'温暖' },
  { id:'b06', n:6, level:'breakthrough', cn:'大卫，不可以', en:'No, David!', series:'大卫·香农', form:'图画书', tags:['幽默','成长'],
    desc:'广受欢迎的经典绘本，语言极度精简，词汇重复率高，配以生动插图。',
    chapters:[{t:'整本',e:'Full Story'}], cover:5, mood:'淘气' },
  { id:'b07', n:7, level:'breakthrough', cn:'猜猜我有多爱你', en:'Guess How Much I Love You', series:'麦克布雷特尼', form:'图画书', tags:['情感','家庭'],
    desc:'句型重复、结构工整的亲情绘本，反复出现比较级表达。',
    chapters:[{t:'整本',e:'Full Story'}], cover:6, mood:'柔软' },

  // ─── Level 1 ───────────────────────────────
  { id:'b08', n:8, level:'level1', cn:'周海生', en:'The Misadventures of Zhou Haisheng', series:'Mandarin Companion', form:'分级读物', tags:['喜剧','日常'],
    desc:'倒霉学生周海生的搞笑日常生活，对话自然流畅，场景贴近真实。',
    chapters:[{t:'第一章 · 糟糕的一天',e:'A Bad Day'},{t:'第二章 · 更糟',e:'Even Worse'},{t:'第三章 · 转机',e:'Something Funny'},{t:'第四章 · 结局',e:'The End'}],
    cover:0, mood:'乐观' },
  { id:'b09', n:9, level:'level1', cn:'错！错！错！', en:'Wrong, Wrong, Wrong!', series:'Chinese Breeze（北大版）', form:'分级读物', tags:['喜剧','误会'],
    desc:'层层乌龙误会引发的喜剧故事，句子短小精悍，对话丰富。',
    chapters:[{t:'第一部分',e:'First Mix-up'},{t:'第二部分',e:'Getting Messier'},{t:'第三部分',e:'Untangled'}],
    cover:1, mood:'忙乱' },
  { id:'b10', n:10, level:'level1', cn:'九色鹿', en:'The Nine-Colored Deer', series:'敦煌壁画故事', form:'绘本故事', tags:['寓言','诚信'],
    desc:'九色神鹿救人却遭背叛的经典佛教寓言，取材于敦煌壁画。',
    chapters:[{t:'第一节 · 救人',e:'The Rescue'},{t:'第二节 · 背叛',e:'Betrayal'},{t:'第三节 · 正义',e:'Justice'}],
    cover:2, mood:'肃穆' },
  { id:'b11', n:11, level:'level1', cn:'牛郎织女', en:'The Cowherd & the Weaving Maid', series:'传统节日故事', form:'民间故事', tags:['爱情','民俗'],
    desc:'七夕节来源的经典神话传说，了解中国传统节日习俗。',
    chapters:[{t:'第一节 · 相遇',e:'Meeting'},{t:'第二节 · 鹊桥',e:'The Magpie Bridge'}],
    cover:3, mood:'惆怅' },
  { id:'b12', n:12, level:'level1', cn:'孟姜女哭长城', en:'Meng Jiangnu Weeps at the Wall', series:'四大民间故事', form:'民间故事', tags:['历史','情感'],
    desc:'中国四大民间故事之一，讲述孟姜女寻夫哭倒长城的传说。',
    chapters:[{t:'第一节 · 离别',e:'Separation'},{t:'第二节 · 寻夫',e:'The Journey'},{t:'第三节 · 长城崩',e:'The Wall Crumbles'}],
    cover:4, mood:'悲怆' },

  // ─── Level 2 ───────────────────────────────
  { id:'b13', n:13, level:'level2', cn:'电脑公司的秘密', en:'Secret of a Computer Company', series:'Mandarin Companion', form:'分级读物', tags:['科技','悬疑'],
    desc:'改编自狄更斯故事，融入现代科技元素的悬疑情节。',
    chapters:[{t:'第一章 · 神秘邮件',e:'Mysterious Email'},{t:'第二章 · 调查',e:'Investigation'},{t:'第三章 · 危险',e:'Danger'},{t:'第四章 · 解码',e:'Decoded'}],
    cover:0, mood:'紧张' },
  { id:'b14', n:14, level:'level2', cn:'一张旧画儿', en:'An Old Painting', series:'Mandarin Companion', form:'分级读物', tags:['艺术','文化'],
    desc:'围绕一幅古代画作展开的故事，领略中国书画艺术文化。',
    chapters:[{t:'第一章 · 发现',e:'The Discovery'},{t:'第二章 · 研究',e:'Research'},{t:'第三章 · 画背后',e:'The Story Behind'},{t:'第四章 · 传承',e:'Legacy'}],
    cover:1, mood:'静谧' },
  { id:'b15', n:15, level:'level2', cn:'两兄弟', en:'Two Brothers', series:'Mandarin Companion', form:'分级读物', tags:['家庭','道德'],
    desc:'改编自托尔斯泰经典故事，两兄弟截然不同的人生选择。',
    chapters:[{t:'第一章 · 两条路',e:'Two Paths'},{t:'第二章 · 各自生活',e:'Different Lives'},{t:'第三章 · 重逢',e:'Reunion'}],
    cover:2, mood:'思辨' },
  { id:'b16', n:16, level:'level2', cn:'白蛇传（简化版）', en:'Legend of the White Snake', series:'经典民间故事', form:'民间故事', tags:['爱情','神话'],
    desc:'中国四大民间故事之一，许仙与白素贞的爱情传奇。',
    chapters:[{t:'第一节 · 相遇',e:'Meeting'},{t:'第二节 · 成婚',e:'Marriage'},{t:'第三节 · 大战',e:'The Battle'},{t:'第四节 · 重逢',e:'Reunion'}],
    cover:3, mood:'缠绵' },
  { id:'b17', n:17, level:'level2', cn:'窗边的小豆豆（节选）', en:'Totto-Chan', series:'黑柳彻子', form:'青少年文学', tags:['成长','学校'],
    desc:'日本经典成长故事中译版节选，记录小豆豆在巴学园的快乐时光。',
    chapters:[{t:'第一章 · 新学校',e:'A New School'},{t:'第二章 · 火车教室',e:'Train Classrooms'},{t:'第三章 · 饭盒',e:'Lunchbox'},{t:'第四章 · 长大',e:'Growing Up'}],
    cover:4, mood:'明亮' },
  { id:'b18', n:18, level:'level2', cn:'小王子（节选）', en:'The Little Prince', series:'圣-埃克苏佩里', form:'经典文学', tags:['哲思','友情'],
    desc:'世界经典文学中译节选，引发对友情、责任与人生意义的思考。',
    chapters:[{t:'第一节 · 降临',e:'The Prince Arrives'},{t:'第二节 · 玫瑰',e:'The Rose'},{t:'第三节 · 狐狸',e:'The Fox'},{t:'第四节 · 告别',e:'Farewell'}],
    cover:5, mood:'清澈' },

  // ─── Level 3 ───────────────────────────────
  { id:'b19', n:19, level:'level3', cn:'团圆', en:"A New Year's Reunion", series:'余丽琼 / 接力出版社', form:'图画书', tags:['家庭','传统节日'],
    desc:'春节前父亲回家团圆的温情故事，精美插图呈现中国新年习俗。',
    chapters:[{t:'爸爸回来了',e:'Dad is Back'},{t:'团圆饭',e:'Reunion Dinner'},{t:'告别',e:'Farewell'}],
    cover:0, mood:'团圆' },
  { id:'b20', n:20, level:'level3', cn:'神笔马良', en:'The Magic Paintbrush', series:'经典民间故事', form:'民间故事', tags:['奇幻','善恶'],
    desc:'少年得神笔、以画笔惩恶扬善的经典民间故事。',
    chapters:[{t:'第一节 · 神笔',e:'The Magic Brush'},{t:'第二节 · 帮助穷人',e:'Helping the Poor'},{t:'第三节 · 惩治恶人',e:'Punishing Evil'}],
    cover:1, mood:'酣畅' },
  { id:'b21', n:21, level:'level3', cn:'谁是第一名', en:'Who Is Number One?', series:'Chinese Breeze（北大版）', form:'分级读物', tags:['校园','竞争'],
    desc:'围绕学业竞争与友情平衡展开的校园故事。',
    chapters:[{t:'第一章 · 比赛',e:'The Competition'},{t:'第二章 · 友情与成绩',e:'Friendship vs Grades'},{t:'第三章 · 真正重要的',e:'What Really Matters'}],
    cover:2, mood:'纠结' },
  { id:'b22', n:22, level:'level3', cn:'中国古代寓言故事', en:'Classical Chinese Fables', series:'人民教育出版社', form:'寓言集', tags:['智慧','道德'],
    desc:'精选守株待兔、亡羊补牢等十余则经典寓言。',
    chapters:[{t:'第一辑 · 动物寓言',e:'Animal Fables'},{t:'第二辑 · 智慧故事',e:'Wisdom Tales'},{t:'第三辑 · 人生道理',e:'Life Lessons'}],
    cover:3, mood:'通透' },
  { id:'b23', n:23, level:'level3', cn:'草房子（节选）', en:'The Straw House', series:'曹文轩', form:'青少年小说', tags:['成长','乡村','友情'],
    desc:'当代儿童文学经典节选，描写农村少年的纯真成长与深厚友情。',
    chapters:[{t:'第一章 · 秃鹤',e:'Bald Crane'},{t:'第二章 · 纸月',e:'Paper Moon'},{t:'第三章 · 白雀',e:'White Sparrow'},{t:'第四章 · 桑桑',e:'Sangsang'}],
    cover:4, mood:'青涩' },
  { id:'b24', n:24, level:'level3', cn:'亲爱的汉修先生', en:'Dear Mr. Henshaw', series:'碧弗利·克莱瑞', form:'青少年文学', tags:['成长','书信'],
    desc:'以书信与日记形式呈现的成长故事，语言自然真实。',
    chapters:[{t:'第一封信',e:'Letter 1'},{t:'第二封信',e:'Letter 2'},{t:'第三封信',e:'Letter 3'},{t:'日记部分',e:'Diary Entries'}],
    cover:5, mood:'真挚' },
  { id:'b25', n:25, level:'level3', cn:'城南旧事（节选）', en:'My Memories of Old Beijing', series:'林海音', form:'经典文学', tags:['成长','历史','北京'],
    desc:'通过童年视角描绘二十世纪初老北京的风貌与人情。',
    chapters:[{t:'惠安馆',e:'The Huian Asylum'},{t:'我们看海去',e:"Let's Go to the Sea"},{t:'兰姨娘',e:'Auntie Lan'},{t:'爸爸的花儿落了',e:"Father's Flowers"}],
    cover:6, mood:'怀旧' },

  // ─── Level 4 ───────────────────────────────
  { id:'b26', n:26, level:'level4', cn:'城南旧事（完整版）', en:'My Memories of Old Beijing', series:'林海音', form:'经典文学', tags:['成长','历史','北京'],
    desc:'完整阅读本书，深入领略林海音细腻文笔与老北京文化历史之美。',
    chapters:[{t:'第一章',e:'Ch 1'},{t:'第二章',e:'Ch 2'},{t:'第三章',e:'Ch 3'},{t:'第四章',e:'Ch 4'},{t:'第五章',e:'Ch 5'}],
    cover:0, mood:'深远' },
  { id:'b27', n:27, level:'level4', cn:'骆驼祥子（节选）', en:'Camel Xiangzi', series:'老舍', form:'现代小说', tags:['社会','励志'],
    desc:'老舍经典名作节选，描写北京人力车夫在旧社会奋斗挣扎的故事。',
    chapters:[{t:'第一节 · 祥子的梦',e:"Xiangzi's Dream"},{t:'第二节 · 骆驼',e:'The Camel'},{t:'第三节 · 挣扎',e:'Struggles'},{t:'第四节 · 破碎',e:'Broken Dreams'}],
    cover:1, mood:'沉重' },
  { id:'b28', n:28, level:'level4', cn:'朝花夕拾（节选）', en:'Dawn Blossoms', series:'鲁迅', form:'回忆性散文', tags:['成长','回忆'],
    desc:'鲁迅回忆童年的经典散文集节选，语言凝练有力。',
    chapters:[{t:'狗·猫·鼠',e:'Dogs, Cats & Mice'},{t:'百草园',e:'Hundred Grasses'},{t:'三味书屋',e:'Three Tastes Study'}],
    cover:2, mood:'冷峻' },
  { id:'b29', n:29, level:'level4', cn:'假如给我三天光明（节选）', en:'Three Days to See', series:'海伦·凯勒', form:'人物传记', tags:['励志','生命'],
    desc:'世界励志经典中译版节选，鼓励学生勇面困难、珍视生命。',
    chapters:[{t:'第一节 · 黑暗',e:'Darkness'},{t:'第二节 · 觉醒',e:'Awakening'},{t:'第三节 · 假如能看见',e:'If I Could See'}],
    cover:3, mood:'坚毅' },
  { id:'b30', n:30, level:'level4', cn:'草房子（完整版）', en:'The Straw House', series:'曹文轩', form:'青少年小说', tags:['成长','乡村','友情'],
    desc:'完整阅读此书，系统感受曹文轩笔下中国乡村少年成长故事的完整魅力。',
    chapters:[{t:'秃鹤',e:'Ch 1'},{t:'纸月',e:'Ch 2'},{t:'白雀',e:'Ch 3'},{t:'艾地',e:'Ch 4'},{t:'红门',e:'Ch 5'},{t:'细马',e:'Ch 6'}],
    cover:4, mood:'悠远' },
];

// User state: 雪纯 is currently 10年级, has been reading for 72 days.
const USER = {
  name: '雪纯',
  grade: 'IGCSE 0523',
  startedDays: 72,
  streak: 14,
  goal: 12,           // books per semester
  finished: 5,        // completed
  reading: 3,         // in progress
  pagesRead: 472,
  quotesCount: 18,
  reflectionsCount: 23,
};

// Library status — what books are on which shelf and progress per book
const SHELF = {
  // completed in journey order (oldest → newest)
  finished: [
    { bookId: 'b05', date: '2026-02-10', stars: 4 },
    { bookId: 'b06', date: '2026-02-22', stars: 5 },
    { bookId: 'b07', date: '2026-03-04', stars: 4 },
    { bookId: 'b03', date: '2026-03-20', stars: 5, highlight: true },
    { bookId: 'b04', date: '2026-04-12', stars: 3 },
  ],
  reading: [
    { bookId: 'b08', progress: 19, chapter: 1 },
    { bookId: 'b13', progress: 10, chapter: 1 },
    { bookId: 'b14', progress: 16, chapter: 1 },
  ],
  wishlist: ['b09','b10','b18','b19'],
};

// Reflections, grouped by bookId then chapterIndex (some books have student-added free nodes too)
const REFLECTIONS = {
  'b03': [
    { idx:0, type:'chapter', date:'2026-03-08', quote:'地球老师很严肃，可是火星老师笑起来眼睛会变成两道弯弯的光。',
      understanding:'小明发现新来的老师其实来自火星。老师虽然奇怪，但是很善良，会帮助同学。',
      thinking:'我觉得"不一样"不是坏事。我刚到香港的时候也觉得自己像火星来的，但是慢慢就有了朋友。',
      mood:'😊', stars:5 },
    { idx:1, type:'chapter', date:'2026-03-12', quote:'秘密说出来，就不只是秘密了。',
      understanding:'同学们渐渐发现了老师的秘密，但他们决定一起保护这个秘密。',
      thinking:'有些秘密不需要告诉所有人。守住朋友的秘密，是一种信任。',
      mood:'🤔', stars:5 },
    { idx:99, type:'student', label:'我画了一幅火星教室', date:'2026-03-14', quote:'',
      thinking:'我想象火星教室里桌子是漂在空中的，黑板会自己变颜色。', mood:'😄' },
    { idx:2, type:'chapter', date:'2026-03-17', quote:'真正的麻烦，不是事情发生，而是没有人和你一起面对。',
      understanding:'火星老师暴露身份，被学校要求离开。同学们决定为老师辩护。',
      thinking:'我喜欢同学们站出来的那一段，让我想起了"窗边的小豆豆"里校长护着小豆豆。',
      mood:'😲', stars:5 },
    { idx:3, type:'chapter', date:'2026-03-20', quote:'再见不是结束，是另一段路开始的地方。',
      understanding:'火星老师回到了自己的星球。小明和同学们一起送别。',
      thinking:'结尾让我有点难过又有点温暖。原来道别也可以是美的。',
      mood:'😊', stars:5 },
  ],
  'b08': [
    { idx:0, type:'chapter', date:'2026-05-05', quote:'倒霉的人不是没有运气，是不会笑。',
      understanding:'周海生今天迟到、丢钥匙、被淋雨，但他还是笑着回家了。',
      thinking:'读到"还是笑着回家了"这句的时候，我忽然觉得自己平时太容易生气。',
      mood:'😄', stars:4 },
  ],
  'b13': [
    { idx:0, type:'chapter', date:'2026-05-12', quote:'电脑里藏着的不是密码，是没人愿意听的话。',
      understanding:'公司新来了一封奇怪的邮件，没有人知道是谁发的。',
      thinking:'好像悬疑故事的开头都是从一个"没有人知道"开始的。',
      mood:'🤔', stars:4 },
  ],
  'b14': [
    { idx:0, type:'chapter', date:'2026-05-14', quote:'',
      understanding:'主人公在爷爷的阁楼里发现了一幅看不清的旧画。',
      thinking:'我也想去阁楼找东西。', mood:'😊', stars:3 },
  ],
};

// Badges earned (or yet to earn)
const BADGES = [
  { id:'first_book',   stamp:'初',  cn:'破壳之初',   en:'First Book',     desc:'读完第一本书',     earned:true,  date:'2026-02-10' },
  { id:'streak_7',     stamp:'七',  cn:'七日笃读',   en:'7-Day Streak',   desc:'连续阅读 7 天',    earned:true,  date:'2026-02-17' },
  { id:'streak_14',    stamp:'旬',  cn:'旬日不辍',   en:'14-Day Streak',  desc:'连续阅读 14 天',   earned:true,  date:'2026-05-18' },
  { id:'quotes_10',    stamp:'句',  cn:'集句成珠',   en:'10 Quotes',      desc:'摘录 10 条金句',   earned:true,  date:'2026-03-22' },
  { id:'genre_3',      stamp:'类',  cn:'博览群类',   en:'3 Genres',       desc:'读过三种文体',     earned:true,  date:'2026-03-04' },
  { id:'level_up',     stamp:'阶',  cn:'拾级而上',   en:'Level Up',       desc:'进入新级别',       earned:true,  date:'2026-04-13' },
  { id:'reflect_20',   stamp:'思',  cn:'思绪满簿',   en:'20 Reflections', desc:'记录 20 条反思',   earned:true,  date:'2026-05-10' },
  { id:'finish_5',     stamp:'伍',  cn:'五卷既成',   en:'5 Books',        desc:'读完 5 本书',       earned:true,  date:'2026-04-12' },
  { id:'streak_30',    stamp:'卅',  cn:'卅日如一',   en:'30-Day Streak',  desc:'连续阅读 30 天',   earned:false },
  { id:'finish_10',    stamp:'拾',  cn:'十全十美',   en:'10 Books',       desc:'读完 10 本书',      earned:false },
  { id:'quotes_50',    stamp:'卷',  cn:'卷帙浩繁',   en:'50 Quotes',      desc:'摘录 50 条金句',   earned:false },
  { id:'all_levels',   stamp:'阶',  cn:'登顶',       en:'All Levels',     desc:'完成所有级别',     earned:false },
];

// Reflection step prompts (teacher-mode, gentle)
const REFLECT_STEPS = [
  { key:'quote',
    title:'金句摘录', en:'A line that stayed with you',
    q:'这一节里，有哪句话让你想停下来再读一遍？',
    hint:'抄下来，哪怕只有半句也好。',
    type:'input', optional:true },
  { key:'understanding',
    title:'内容理解', en:'What happened',
    q:'用你自己的话，说说这部分发生了什么？',
    hint:'两三句就够，不用写得太"作文"。',
    type:'textarea', optional:false },
  { key:'thinking',
    title:'批判性思考', en:'Your thoughts',
    q:'有没有哪个情节、人物，让你觉得意外、不同意，或者想起了什么？',
    hint:'不用是"对的"想法，是"你的"就行。',
    type:'textarea', optional:true },
  { key:'feeling',
    title:'阅读感受', en:'Your feeling',
    q:'读完这一节，你现在的心情是？',
    type:'mood', optional:false },
];

const MOODS = [
  { emoji:'😊', cn:'平静' },
  { emoji:'😄', cn:'喜悦' },
  { emoji:'🤔', cn:'思索' },
  { emoji:'😲', cn:'意外' },
  { emoji:'😐', cn:'平淡' },
  { emoji:'😕', cn:'困惑' },
];

// Activity sparkle for last 28 days (1 = read that day, 0 = not)
const ACTIVITY_28 = [1,1,0,1,1,1,1, 1,1,1,0,1,1,1, 0,1,1,1,1,1,0, 1,1,1,1,1,1,1];

Object.assign(window, {
  LEVELS, BOOKS, USER, SHELF, REFLECTIONS, BADGES, REFLECT_STEPS, MOODS, COVER_PALETTES, ACTIVITY_28,
});
