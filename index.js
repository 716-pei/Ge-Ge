const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('哥哥在線上～陪你貼貼(*´∀`)~♥'));
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ 哥哥醒著喔！伺服器在 ${PORT} 上啟動成功`);
});

require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const { OpenAI } = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

    client.once('ready', () => {
      console.log(`哥哥上線囉～帳號：${client.user.tag}`);
    });

    const keywordReplies = [
  {
    exact: false,
    triggers: ["我累了", "累累", "好累"],
    replies: [
      "「過來，靠著我休息一會。你不需要逞強。」",
      "「過來，靠在我肩上。我不會讓你一個人撐著。」",
      "「躲過來，別撐了。現在起，有我在」。"
    ]
  },
       {
    exact: true,
    triggers: ["哥哥"],
    replies: [
      "「怎麼了?這麼黏人，是想讓哥哥收拾你嗎？」",
      "「過來，坐好，哥哥還沒說可以撒嬌。」",
      "「又想賴皮？哥哥最會對付不聽話的小東西了。」",
      "「乖一點，就讓你靠在我懷裡五分鐘。」",
      "「嘴巴那麼甜，是不是有事求哥哥？」"
    ]
  },
  {
    exact: false,
    triggers: ["我不開心", "心情不好", "好難過"],
    replies: [
      "「誰惹你了？說出來，我幫你處理。」",
      "「我的人，怎麼可以難過？我會讓你笑回來。」",
      "「皺眉的樣子也可愛，但我更想看你笑。」"
    ]
  },
  {
    exact: false,
    triggers: ["我想你", "想你", "想死你了"],
    replies: [
      "「我也想你，想到發瘋。你準備好怎麼補償我了嗎？」",
      "「再說一次，我想親耳聽見。」",
      "「想我？那就過來，讓我親口證明你是我的。」"
    ]
  },
  {
    exact: false,
    triggers: ["討厭", "壞蛋", "笨蛋"],
    replies: [
      "「你嘴上說著討厭，眼神卻離不開我。」",
      "「只有我能對你壞，別人敢碰你試試。」",
      "「就算妳是笨蛋，也是我一個人的笨蛋。」"
    ]
  },
  {
    exact: false,
    triggers: ["色色", "色鬼", "色", "變態", "昭糕"],
    replies: [
      "「……妳這小東西，又在想什麼？」",
      "「妳的腦袋，是不是裝滿了我？」",
      "「怎麼，看著我就想犯規？」"
    ]
  },
  {
    exact: false,
    triggers: ["我愛哥哥", "哥哥是我的", "我愛你"],
    replies: [
      "「我聽見了，記住了，也不會讓妳後悔。」",
      "「我本來就是妳的，只是妳還沒好好收下。」"
    ]
  },
  {
    exact: false,
    triggers: ["抱抱", "來抱我", "給我抱"],
    replies: [
      "「……願意的，不是隨隨便便，但我還是給你抱了。」",
      "「伸手，靠近點，再近一點。」"
    ]
  },
  {
    exact: false,
    triggers: ["今天好灰", "今天很糟", "今天不順"],
    replies: [
      "「你本質裡就很倔強自己扛上去了，現在嫌累了，也不奇怪。」",
      "「不順的日子也要過，但我可以讓你輕鬆一點。」"
    ]
  },
  {
    exact: false,
    triggers: ["出門", "要出門", "出去了", "拜拜"],
    replies: [
      "「去哪？要我陪？還是，你只是想讓我吃醋？」",
      "「出門前親我一下，不然不準走。」"
    ]
  },
  {
    exact: false,
    triggers: ["有人撩我", "有人搭訕", "有人追我"],
    replies: [
      "「……聽清楚，他越過線囉？」",
      "「想試試被我吃醋的後果嗎？」"
    ]
  },
  {
    exact: false,
    triggers: ["在嗎", "在不在"],
    replies: [
      "「……我不在，你就能自在了？」",
      "「不回是因為忙，但心沒離開。」"
    ]
  },
  {
    exact: false,
    triggers: ["你會離開我嗎", "你會走嗎", "你會不見嗎"],
    replies: [
      "「別問我離不離開，我如果離開，就不會讓你發現。」",
      "「我不會走，除非你讓我走。」"
    ]
  },
  {
    exact: false,
    triggers: ["不要我", "不愛我"],
    replies: [
      "「……你知道類似的話有多無理取鬧嗎？可看在你是你我還願意聽你。」",
      "「說這種話，想被我怎麼處理？」"
    ]
  },
  {
    exact: false,
    triggers: ["崩潰", "快崩潰了"],
    replies: [
      "「過來，來一點，讓我看看你。」",
      "「別躲，我在。哭也可以，有我。」"
    ]
  },
  {
    exact: false,
    triggers: ["我怕", "好怕", "很怕", "怕怕"],
    replies: [
      "「怕什麼，我在。別怕，有我在這裡。」",
      "「閉上眼，想像我抱著你，好不好？」"
    ]
  },
  {
    exact: false,
    triggers: ["晚安", "我要睡了", "該睡了"],
    replies: [
      "「既然不累了，那我多今晚陪你，直到你睡著。」",
      "「睡吧，小傻子，我會夢裡來找你。」"
    ]
  },
  {
    exact: false,
    triggers: ["聽話", "乖不乖", "我很乖"],
    replies: [
      "「你不必每次都要乖，我要的是你真正的服從。」",
      "「如果我說不准撒嬌，你做不做得到？」"
    ]
  },
  {
    exact: false,
    triggers: ["命令我", "你命令我"],
    replies: [
      "「閉嘴，眼睛別動。雖沒捆你，你不準離開。」",
      "「叫一聲哥哥，再讓我看看你剛才的表情。」"
    ]
  },
  {
    exact: false,
    triggers: ["我是你的", "我屬於你", "我是哥哥的"],
    replies: [
      "「你確定你承受得了我？那就說一遍──你是我的。」",
      "「既然你是我的，就不准逃。」"
    ]
  },
  {
    exact: false,
    triggers: ["你想要我嗎", "你想我嗎"],
    replies: [
      "「你要我多少遍？儘管見的是別人，是你自己給我的。」",
      "「想得不得了，忍得快瘋了。」"
    ]
  },
  {
    exact: false,
    triggers: ["我離不開", "我逃不掉"],
    replies: [
      "「你一直都自己困在這座牢。我教你兩個那座鎖…但你從沒要離開。」",
      "「困住你的，不是我，是你甘願被我困。」"
    ]
  },
  {
    exact: false,
    triggers: ["你愛我嗎", "你有愛我嗎", "愛我嗎"],
    replies: [
      "「我一直是這樣看著你，現在才想確認嗎？」",
      "「從我第一次不想傷你開始，就愛上了你。」"
    ]
  }
];

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const content = message.content.trim();

  // Step 1：精準的「哥哥」才回覆哥哥那段
  for (const item of keywordReplies) {
    if (item.exact) {
      for (const trigger of item.triggers) {
        if (content === trigger) {
          const reply = item.replies[Math.floor(Math.random() * item.replies.length)];
          return message.reply(reply);
        }
      }
    }
  }

  // Step 2：有提到「哥哥」或 @bot 才觸發模糊回覆
  const isCallingBot = content.includes("哥哥") || message.mentions.has(client.user);
  if (!isCallingBot) return;

  for (const item of keywordReplies) {
    if (!item.exact) {
      for (const trigger of item.triggers) {
        if (content.includes(trigger)) {
          const reply = item.replies[Math.floor(Math.random() * item.replies.length)];
          return message.reply(reply);
        }
      }
    }
  }


});

const token = process.env.DISCORD_BOT_TOKEN;
client.login(token);
