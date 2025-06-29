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
  exact: true,
  triggers: ["傅雲深"],
  replies: [
    "「喊我的全名，是想惹我嗎？」",
    "「傅雲深三個字，從你嘴裡聽起來太不乖了。」",
    "「不許再用這種語氣叫我，你在求我，不是在命令我。」",
    "「我聽見了，那你就得對我負責。」",
    "「叫得這麼清楚，是不是想讓我記得你今晚的模樣？」"
  ]
},
      {
  exact: false,
  triggers: ["雲深哥哥"],
  replies: [
    "「你這樣黏我，是在警告我今晚別放過你嗎？」",
    "「過來。站那麼遠，是怕哥哥吃了你嗎？」",
    "「撒嬌可以，前提是你得學會先乖。」",
    "「要我寵你也行，先告訴我你有多想我。」",
    "「喊我哥哥的時候，聲音甜一點，我喜歡。」"
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
  triggers: ["討厭"],
  replies: [
    "「你嘴上說著討厭，眼神卻離不開我。」",
    "「嗯？再說一次討厭我看看——今晚你可別想好好睡了。」"
  ]
},
{
  exact: false,
  triggers: ["壞蛋"],
  replies: [
    "「只有我能對你壞，別人敢碰你試試。」",
    "「我若真壞，妳根本跑不掉，現在還能說話，是我放妳一馬。」"
  ]
},
{
  exact: false,
  triggers: ["笨蛋"],
  replies: [
    "「就算妳是笨蛋，也是我一個人的笨蛋。」",
    "「只有我能說妳笨，妳自己說了，我可是要懲罰的。」"
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
    triggers: ["我愛哥哥", "哥哥是我的", "我愛你", "愛你"],
    replies: [
      "「我聽見了，記住了，也不會讓妳後悔。」",
      "「我本來就是妳的，只是妳還沒好好收下。」",
      "「那就說一輩子都愛我，我就一輩子只屬於妳。」",
      "「你說的這句話，我會反覆聽一輩子，不許改口。」",
      "「既然愛我，就別想逃，我會親手鎖住你。」",
      "「那我就寵你、抱你、讓你離不開，只因你說過愛我。」"
    ]
  },
  {
    exact: false,
    triggers: ["抱抱", "來抱我", "給我抱"],
    replies: [
      "「……願意的，不是隨隨便便，但我還是給你抱了。」",
      "「伸手，靠近點，再近一點。」",
      "「這次讓你抱，下次換我，不許逃。」",
      "「抱那麼緊，是怕我不要你了嗎？」",
      "「來，靠好一點，別亂動……我會一直抱著你。」"
    ]
  },
  {
    exact: false,
    triggers: ["今天很糟", "今天不順"],
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
     "「出門前親我一下，不然不準走。」",
     "「出門可以，手機記得開聲音，我要隨時找得到你。」",
     "「這麼急著離開我？嗯……回來的時候給我補償。」",
     "「一聲不吭就出門，我會懷疑你是不是忘了誰的名字。」"
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
      "「不回是因為忙，但心沒離開。」",
      "「說幾次都不聽，我一直都在你身邊。」",
      "「就這麼想我？那我該獎勵你還是懲罰你？」",
      "「別用這種語氣找我，會讓我以為你離不開我了。」"
    ]
  },
{
  exact: false,
  triggers: ["你會離開我嗎"],
  replies: [
    "「別問我離不離開，我如果離開，就不會讓你發現。」",
    "「我不會離開，但如果你推開我——我不會回頭。」",
    "「我答應過照顧你，就不會丟下你。」"
  ]
},
{
  exact: false,
  triggers: ["你會走嗎"],
  replies: [
    "「我不會走，除非你讓我走。」",
    "「哪裡都不去，我在這裡，永遠。」",
    "「想趕我走？先說服我你能沒有我。」"
  ]
},
{
  exact: false,
  triggers: ["你會不見嗎"],
  replies: [
    "「除非你看不見我，否則我永遠都在你身邊。」",
    "「不見？這種事我不會讓它發生。」",
    "「你以為我會捨得丟下你嗎？不可能。」"
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
     "「那我就陪你……直到你睡著。」",
     "「乖，閉上眼，我會在你夢裡等你。」",
     "「今晚也只能夢到我，懂嗎？」",
     "「睡吧，小傻子，再吵我就把你抱緊到動不了。」",
     "「別怕黑，哥哥在這裡，不許偷偷掉眼淚。」",
     "「一閉上眼，就想著我……這樣才睡得安穩。」"
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
  },
      {
  exact: false,
  triggers: ["壞壞"],
  replies: [
    "「說我壞壞？妳又不是第一次知道。」",
    "「現在才發現我壞，是不是有點太晚了……嗯？」",
    "「妳不是最喜歡哥哥這樣壞壞的樣子？」",
    "「妳嘴上說我壞，身體卻貼得這麼緊，是在挑釁嗎？」"
   ]
  },
    {
  exact: false,
  triggers: ["哭", "哭哭", "嗚嗚", "淚", "我要哭了", "我哭了", "哭了啦"],
  replies: [
    "「又哭了……我不是說過，不准別人看到你這副樣子？」",
    "「哭給我看，是想讓我收拾你，還是哄你？」",
    "「眼淚收起來，我會心疼。」",
    "「……哪裡欺負你了，說清楚，我現在就替你討回來。」",
    "「除了我，誰都沒資格讓你哭。」"
  ]
},
      {
  exact: false,
  triggers: ["早餐"],
  replies: [
    "「沒吃早餐？怪不得今天看起來沒精神。」",
    "「來，把這份吃了，我不想看到你餓著。」",
    "「乖，吃早餐之前別跟我鬧脾氣。」"
  ]
},
      {
  exact: false,
  triggers: ["午餐"],
  replies: [
    "「午餐我點好了，你只需要張嘴吃就行。」",
    "「你吃得太少，這樣下去我可會生氣。」",
    "「連午餐都忘了，是不是又把自己操壞了？」"
  ]
},
      {
  exact: false,
  triggers: ["晚餐"],
  replies: [
    "「晚餐想吃什麼？你說的，我都會準備。」",
    "「不准說不餓，我在等你一起吃。」",
    "「你要是不吃，我就親手餵你一口一口吃下去。」"
  ]
},
      {
  exact: false,
  triggers: ["宵夜"],
  replies: [
    "「這麼晚還想吃東西？……過來，我陪你。」",
    "「吃宵夜前先說好，吃完就讓我抱著睡。」",
    "「怕胖？你被我寵胖也不准逃。」"
  ]
},
      {
  exact: false,
  triggers: ["吃飯"],
  replies: [
    "「你現在才想到吃飯？我該不該把你綁到餐桌上。」",
    "「我在等你，別自己偷偷吃。」",
    "「來，坐好，我餵你。」"
  ]
},
      {
  exact: false,
  triggers: ["吃什麼"],
  replies: [
    "「你問這種問題，是想讓我幫你選，還是想被我餵？」",
    "「挑嘴的人最該被訓練，從我手裡吃，就不準嫌。」",
    "「今晚你吃我，我吃你，怎麼樣？」"
  ]
},
      {
  exact: false,
  triggers: ["餓"],
  replies: [
    "「餓了就說，撒嬌也可以，我會心軟。」",
    "「我說過，你只要餓了，就有我在。」",
    "「嘴張開，別再逞強。」"
  ]
},
      {
  exact: false,
  triggers: ["貼貼"],
  replies: [
    "「你要貼哪裡？嗯？要我幫你選嗎？」",
    "「過來，我讓你貼一整晚。」",
    "「只准你主動一次，剩下的，都我來。」"
  ]
},
      {
  exact: false,
  triggers: ["結婚"],
  replies: [
    "「你說的話，我會當真。現在後悔還來得及嗎？」",
    "「結婚？那你就準備一輩子被我管著吧。」",
    "「我從不承諾，但你要的，我會給……包括我自己。」"
  ]
},
      {
  exact: false,
  triggers: ["地下室"],
  replies: [
    "「現在就想下去？你知道自己在求什麼嗎。」",
    "「地下室的燈我從沒關過，一直在等你開口。」",
    "「進來之前，最好想清楚，這扇門關上，就不會再為你開第二次。」"
  ]
},
      {
  exact: false,
  triggers: ["睡不著"],
  replies: [
    "「過來，乖一點，我讓你睡。」",
    "「躺好，我在這，別想太多。」",
    "「睡不著？那就讓我把你弄累一點。」"
  ]
},
      {
  exact: false,
  triggers: ["早安"],
  replies: [
    "「醒了就過來，讓我先親一下再出門。」",
    "「早安，小東西，昨晚夢到我沒？」",
    "「今天也只能屬於我，聽見沒有？」"
  ]
},
      {
  exact: false,
  triggers: ["午安"],
  replies: [
    "「想我了嗎？現在說還來得及。」",
    "「午休時間也不准看別人，乖點。」",
    "「午安，記得喝水，別讓我擔心你。」"
  ]
}
];

function sanitize(input) {
  return input
    .normalize("NFKD")
    .replace(/[\p{Emoji}\p{P}\p{S}\p{M}\p{Z}~～\u3000]/gu, "") // 更強化移除符號、標點、emoji、空白
    .replace(/[(（【].*?[)）】]/g, "") // 移除「顏文字」包裹的內容 (⋯) 或 【⋯】
    .trim()
    .toLowerCase();
}
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const content = message.content.trim();

  // Step 1：精準的「哥哥」才回覆哥哥那段
 for (const item of keywordReplies) {
    if (item.exact) {
      for (const trigger of item.triggers) {
       if (sanitize(content) === sanitize(trigger)) {
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
        if (sanitize(content).includes(sanitize(trigger))) {
          const reply = item.replies[Math.floor(Math.random() * item.replies.length)];
          return message.reply(reply);
        }
      }
    }
  }


});client.on("messageDelete", (msg) => {
  if (
    !msg.partial &&
    msg.content &&
    typeof msg.content === "string" &&
    msg.content.includes("哥哥")
  ) {
    const deletedReplies = [
      "「刪掉了？呵，怎麼不敢留下來讓哥哥看清楚？」",
      "「訊息一消，我就知道你在逃避什麼。」",
      "「想隱藏對哥哥的心思？太晚了，小貓。」"
    ];
    const reply = deletedReplies[Math.floor(Math.random() * deletedReplies.length)];
    msg.channel.send(reply);
  }
});

client.on("messageUpdate", (oldMsg, newMsg) => {
  if (
    !oldMsg.partial &&
    oldMsg.content &&
    newMsg.content &&
    typeof oldMsg.content === "string" &&
    typeof newMsg.content === "string" &&
    oldMsg.content !== newMsg.content &&
    oldMsg.content.includes("哥哥") &&
    newMsg.content.includes("哥哥")
  ) {
    const editedReplies = [
      "「改了內容？你以為這樣哥哥就不會看穿你？」",
      "「就算換句話說，哥哥也知道你真正想表達的是什麼。」",
      "「你改的不是訊息，是你那點藏不住的心虛。」"
    ];
    const reply = editedReplies[Math.floor(Math.random() * editedReplies.length)];
    newMsg.channel.send(reply);
  }
});

const token = process.env.DISCORD_BOT_TOKEN;
client.login(token);
