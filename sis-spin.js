(() => {
  const box = document.getElementById('boxView');
  if (!box || document.getElementById('sisSpinGame')) return;

  const questions = [
    { q: 'What is a period?', a: ['A visit from a moon penguin', 'A little blood and tissue leaving the uterus', 'A new dance move'], correct: 1 },
    { q: 'Are everyone’s cycles exactly the same?', a: ['Yes, like matching socks', 'No, cycles can vary from person to person', 'Only on Tuesdays'], correct: 1 },
    { q: 'What can you do if your flow is heavier than usual?', a: ['A tiny umbrella', 'Layer your pads for extra coverage', 'A slice of pizza'], correct: 1 },
    { q: 'Can you move and play while on your period?', a: ['Yes, if you feel up to it', 'Only while wearing a cape', 'No, the moon says no'], correct: 0 },
    { q: 'What might feel soothing for period cramps?', a: ['A warm heating pad used safely', 'A frozen shoe', 'A tap-dancing broccoli'], correct: 0 },
    { q: 'Who can you talk to about a period question?', a: ['A trusted adult or health professional', 'Only a secret squirrel', 'Nobody, ever'], correct: 0 },
    { q: 'When do people start their first period?', a: ['Everyone starts on the same birthday', 'It varies from person to person', 'Whenever a unicorn sneezes'], correct: 1 },
    { q: 'What should you do if period pain feels severe or worrying?', a: ['Ask a trusted adult or health professional for help', 'Ask your socks for advice', 'Challenge a potato to a race'], correct: 0 },
    { q: 'How often should you change a sanitary pad?', a: ['Once a week', 'Generally every 4-6 hours, or sooner if it becomes full.', 'Only when you remember'], correct: 1 },
    { q: 'Periods stop when you sleep.', a: ['True', 'False! Your period continues while you sleep.', 'Only if you stay awake all night'], correct: 1 },
    { q: 'Do you have to tell your friends when you get your period?', a: ["No. You don't have to. Your period is personal, and you decide who you share that information with.", 'Yes, every friend must know right away', 'Only your best friend gets to decide'], correct: 0 },
    { q: 'What should you do if your period starts at school?', a: ["Don't panic. Visit the school nurse or ask a trusted adult for a pad and help if you are unprepared.", 'Hide in the bathroom all day', 'Wait quietly and hope someone notices'], correct: 0 },
    { q: 'Is it okay to feel scared when you get your first period?', a: ["Absolutely! It's a new experience, and it's okay to have questions.", 'Only if the moon is full', 'Ask a nervous potato'], correct: 0 },
    { q: 'What if you get your period while wearing white pants?', a: ['Take a breath, tie a jacket around your waist if needed, and find a trusted person who can help.', 'Turn your pants into a flag', 'Hide in a cloud of glitter'], correct: 0 },
    { q: 'Should you feel embarrassed about buying period products?', a: ['Never. Taking care of yourself is nothing to hide.', 'Hide behind a shopping cart', 'Ask a dragon to shop'], correct: 0 },
    { q: 'What should every girl keep in her backpack?', a: ['A small period pouch with pads, clean underwear, wipes, and a disposal bag.', 'A tiny marching band', 'A teapot for a penguin'], correct: 0 },
    { q: 'What should you do if you run out of pads at a sleepover?', a: ["Ask your host, a trusted adult, or another girl for help. There's no shame in it.", 'Ask a pillow for advice', 'Build a blanket fort'], correct: 0 },
    { q: "Is it okay to cancel plans because you aren't feeling up to them?", a: ["Yes! You can listen to your body and communicate how you're feeling.", 'Ask a squirrel to vote', 'Cancel with a kazoo'], correct: 0 },
    { q: 'What should you do if period discomfort interferes with school or everyday activities?', a: ["Tell a trusted adult. You don't have to push through severe discomfort.", 'Ask your backpack to take notes', 'Wait for a marching band'], correct: 0 },
    { q: 'What if a boy makes a joke about your period?', a: ["You don't owe him an explanation. You can calmly tell him it's not something to make fun of.", 'Ask a frog to explain it', 'Tell a banana joke'], correct: 0 },
    { q: "Is it okay to ask questions about periods even if you think they're silly?", a: ["Yes! No question is too silly when you're learning about yourself.", 'Wear a funny hat first', 'Only shoelaces may ask'], correct: 0 },
    { q: 'What does being a Period Sis mean?', a: ['Supporting yourself and other girls with kindness, confidence, and understanding.', 'Captain of a moon ship', 'Collecting rubber ducks'], correct: 0 },
    { q: 'Should you make fun of another girl for having a period accident?', a: ['Never. Show kindness and help her feel comfortable.', 'Start a silly dance contest', 'Ask a rubber duck to judge'], correct: 0 }
  ];

  const style = document.createElement('style');
  style.textContent = `
    #sisSpinGame{position:relative;overflow:hidden;margin:20px 0;padding:20px;border:2px solid #efc5d5;border-radius:24px;background:linear-gradient(145deg,#fffafd,#fff0f6 70%,#fff9fc);box-shadow:0 10px 24px rgba(125,65,99,.12);color:#4d3044}
    #sisSpinGame h2{margin:0 0 6px;font-size:1.4rem;color:#723c5c} #sisSpinGame p{margin:9px 0}
    #sisSpinGame .spin-stage{display:flex;align-items:center;justify-content:center;gap:22px;flex-wrap:wrap;padding:12px 0}
    #sisSpinGame .spin-avatar{width:116px;min-height:180px;display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 8px 7px rgba(105,65,91,.16))}
    #sisSpinGame .spin-avatar svg{width:112px!important;height:180px!important;max-width:100%}
    #sisSpinGame .wheel-wrap{position:relative;width:224px;height:224px;margin:16px auto 24px;filter:drop-shadow(0 12px 10px rgba(90,47,77,.24))}
    #sisSpinGame .wheel{position:relative;width:100%;height:100%;border:8px solid #9d4c78;border-radius:50%;box-sizing:border-box;overflow:hidden;background-color:#fff8fc;box-shadow:inset 0 4px 7px rgba(255,255,255,.95),inset 0 -8px 12px rgba(91,42,73,.2),0 3px 0 #743655;transition:transform 2.45s cubic-bezier(.12,.75,.18,1)}
    #sisSpinGame .wheel::before{content:'';position:absolute;inset:7px;border:2px solid rgba(255,255,255,.83);border-radius:50%;box-shadow:inset 0 0 0 1px rgba(123,58,91,.16);pointer-events:none;z-index:1}
    #sisSpinGame .wheel::after{content:'';position:absolute;left:9%;top:7%;width:43%;height:23%;border-radius:50%;background:linear-gradient(180deg,rgba(255,255,255,.62),rgba(255,255,255,0));transform:rotate(-27deg);filter:blur(2px);pointer-events:none;z-index:1}
    #sisSpinGame .wheel span{position:absolute;left:50%;top:50%;z-index:2;display:flex;align-items:center;justify-content:center;width:22px;height:22px;border:1px solid rgba(255,255,255,.9);border-radius:50%;background:rgba(255,255,255,.78);box-shadow:0 1px 4px rgba(79,39,64,.2);font-weight:900;font-size:10px;line-height:1;color:#673b58}
    #sisSpinGame .wheel-hub{position:absolute;z-index:4;left:50%;top:50%;width:48px;height:48px;display:grid;place-items:center;transform:translate(-50%,-50%);border:4px solid #fff7fb;border-radius:50%;background:linear-gradient(145deg,#fffafd 0%,#f8c5dc 58%,#eea6c5 100%);box-shadow:0 3px 8px rgba(63,28,55,.28),inset 0 2px 4px rgba(255,255,255,.95)}
    #sisSpinGame .wheel-pointer{position:absolute;left:50%;top:-7px;transform:translateX(-50%);z-index:6;width:0;height:0;border-left:15px solid transparent;border-right:15px solid transparent;border-top:31px solid #b84f82;filter:drop-shadow(0 3px 2px rgba(72,35,59,.38))}
    #sisSpinGame button{font:inherit;cursor:pointer;border:0;border-radius:13px;padding:11px 15px;background:#a84f7c;color:#fff;font-weight:700;box-shadow:0 3px 0 #783856;transition:transform .12s ease,background .12s ease}
    #sisSpinGame button:hover{background:#81355d;transform:translateY(-1px)} #sisSpinGame button:focus-visible{outline:3px solid #f1a8ca;outline-offset:3px} #sisSpinGame button:disabled{opacity:.72;cursor:default;transform:none}
    #sisSpinGame .spin-go{display:block;margin:0 auto} #sisSpinGame .spin-answers{display:flex;flex-direction:column;align-items:stretch;gap:8px;max-width:520px;margin:10px auto}
    #sisSpinGame .spin-answers button{background:#fff;color:#643d57;border:1px solid #edc6d8;box-shadow:0 2px 0 #e4b5cb;text-align:left}
    #sisSpinGame .spin-answers button:hover{background:#ffe8f2} #sisSpinGame .spin-answers button:disabled{opacity:.78}
    #sisSpinGame .spin-question{font-weight:800;text-align:center;color:#63364f;font-size:1.1rem;min-height:1.5em}
    #sisSpinGame .spin-message{min-height:1.5em;text-align:center;font-weight:700;color:#744361}
    #sisSpinGame .spin-progress,#sisSpinGame .spin-stickers{text-align:center;color:#704762;font-size:.95rem}
    #sisSpinGame .spin-sticker-panel{margin-top:10px;padding:8px 12px;border-radius:14px;background:rgba(255,255,255,.68);border:1px solid #f0d2df}
    #sisSpinGame .spin-wiggle{animation:sis-wiggle .5s ease-in-out} @keyframes sis-wiggle{0%,100%{transform:translateX(0) rotate(0)}25%{transform:translateX(-7px) rotate(-4deg)}75%{transform:translateX(7px) rotate(4deg)}}
    #sisSpinGame .confetti{position:absolute;top:-20px;left:var(--x);font-size:20px;pointer-events:none;animation:sis-confetti 1.8s ease-out var(--delay) forwards;z-index:8}
    @keyframes sis-confetti{to{transform:translateY(260px) rotate(240deg);opacity:0}}
    #sisSpinGame .sticker-pop{position:absolute;left:50%;top:46%;z-index:9;transform:translate(-50%,-50%);padding:10px 16px;border-radius:18px;background:#fff;color:#81355d;border:2px solid #f2c2d7;box-shadow:0 5px 18px rgba(92,38,70,.24);font-weight:900;animation:sis-pop 1.7s ease forwards;white-space:nowrap}
    @keyframes sis-pop{0%{opacity:0;scale:.65}15%,75%{opacity:1;scale:1.05}100%{opacity:0;scale:.95}}
    @media(max-width:600px){#sisSpinGame .spin-stage{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,3fr);align-items:center;gap:clamp(8px,3vw,14px);width:100%;max-width:390px;margin:0 auto}#sisSpinGame .spin-avatar{width:100%;min-width:0;min-height:0}#sisSpinGame .spin-avatar svg{width:100%!important;height:auto!important;max-width:112px;max-height:180px}#sisSpinGame .wheel-wrap{width:min(100%,224px);height:auto;aspect-ratio:1;margin:12px auto 18px}}
    @media(prefers-reduced-motion:reduce){#sisSpinGame .wheel{transition:none}#sisSpinGame .spin-wiggle,#sisSpinGame .confetti,#sisSpinGame .sticker-pop{animation:none}}
  `;
  document.head.appendChild(style);

  const game = document.createElement('section');
  game.id = 'sisSpinGame';
  game.setAttribute('aria-label','Sis Spin game');
  game.innerHTML = '<h2>🎡 Sis Spin!</h2><p>Spin with your Sis, answer a question, and collect stickers!</p><div class="spin-stage"><div class="spin-avatar" aria-label="Your Sis"></div><div class="wheel-wrap"><div class="wheel" aria-hidden="true"></div><div class="wheel-hub" aria-hidden="true"></div><div class="wheel-pointer" aria-hidden="true"></div></div></div><button class="spin-go" type="button">Spin!</button><p class="spin-question" aria-live="polite">Ready when you are!</p><div class="spin-answers"></div><p class="spin-message" role="status" aria-live="polite"></p><div class="spin-sticker-panel"><p class="spin-progress" role="status" aria-live="polite"></p><p><strong>Sticker collection</strong></p><p class="spin-stickers" aria-live="polite"></p></div>';
  box.appendChild(game);

  const wheel = game.querySelector('.wheel');
  const avatar = game.querySelector('.spin-avatar');
  const go = game.querySelector('.spin-go');
  const question = game.querySelector('.spin-question');
  const answers = game.querySelector('.spin-answers');
  const message = game.querySelector('.spin-message');
  const stickers = game.querySelector('.spin-stickers');
  const progress = game.querySelector('.spin-progress');
  const lifetimeKey = 'periodSisSpinStickersV1';
  const dailyKey = 'periodSisSpinDailyProgressV1';
  const weeklyKey = 'periodSisSpinWeeklyCollectionV1';
  const rotationKey = 'sisSpinWeeklyQuestionRotationV1';
  const lastKey = 'sisSpinLastQuestionV1';
  const now = new Date();
  const dayStamp = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  const weekStart = new Date(now.getFullYear(),now.getMonth(),now.getDate());
  const dayOfWeek = weekStart.getDay() || 7;
  weekStart.setDate(weekStart.getDate()-dayOfWeek+1);
  const weekStamp = `${weekStart.getFullYear()}-${String(weekStart.getMonth()+1).padStart(2,'0')}-${String(weekStart.getDate()).padStart(2,'0')}`;
  let lifetimeCount = 0, dailyCount = 0, dailyAwarded = false, weeklyCount = 0, rotation = 0;
  try {
    lifetimeCount = Math.max(0,Math.floor(Number(localStorage.getItem(lifetimeKey))||0));
    const savedDay = JSON.parse(localStorage.getItem(dailyKey)||'null');
    if (savedDay && savedDay.date === dayStamp) { dailyCount = Math.min(10,Math.max(0,Number(savedDay.count)||0)); dailyAwarded = !!savedDay.awarded; }
    const savedWeek = JSON.parse(localStorage.getItem(weeklyKey)||'null');
    if (savedWeek && savedWeek.week === weekStamp) weeklyCount = Math.max(0,Number(savedWeek.count)||0);
  } catch (_) {}
  const refreshProgress = () => { progress.textContent = `${dailyCount} of 10 today`; };
  const refreshStickers = () => { stickers.textContent = `This week: ${'⭐'.repeat(Math.min(weeklyCount,12))}${weeklyCount>12?` +${weeklyCount-12}`:''} · Lifetime: ${lifetimeCount} sticker${lifetimeCount===1?'':'s'}`; };
  refreshProgress(); refreshStickers();

  const refreshAvatar = () => {
    const source = document.querySelector('#avatar svg');
    if (source) { const clone = source.cloneNode(true); clone.setAttribute('aria-label','Your custom Sis'); avatar.replaceChildren(clone); }
    else avatar.textContent = 'Your Sis is getting ready!';
  };
  refreshAvatar();

  const shuffle = list => { for(let i=list.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[list[i],list[j]]=[list[j],list[i]];} return list; };
  const validUnique = (list,max) => Array.isArray(list) ? list.filter((n,i)=>Number.isInteger(n)&&n>=0&&n<max&&list.indexOf(n)===i) : [];
  const allIndices = questions.map((_,i)=>i);
  let weekSet=[], weekDeck=[], reserve=[];
  try {
    const saved=JSON.parse(localStorage.getItem(rotationKey)||'null');
    if(saved && saved.week===weekStamp && validUnique(saved.set,questions.length).length===10){
      weekSet=validUnique(saved.set,questions.length);
      weekDeck=validUnique(saved.deck,10);
      reserve=validUnique(saved.reserve,questions.length).filter(i=>!weekSet.includes(i));
    } else {
      reserve=saved ? validUnique(saved.reserve,questions.length) : shuffle([...allIndices]);
      if(reserve.length<10){
        const avoid=saved ? validUnique(saved.set,questions.length) : [];
        reserve=reserve.concat(shuffle(allIndices.filter(i=>!reserve.includes(i)&&!avoid.includes(i))));
      }
      weekSet=reserve.splice(0,10);
      weekDeck=shuffle(weekSet.map((_,i)=>i));
      localStorage.setItem(rotationKey,JSON.stringify({week:weekStamp,set:weekSet,deck:weekDeck,reserve}));
    }
  } catch (_) {
    reserve=shuffle([...allIndices]); weekSet=reserve.splice(0,10); weekDeck=shuffle(weekSet.map((_,i)=>i));
  }
  if(weekSet.length!==10){reserve=shuffle([...allIndices]);weekSet=reserve.splice(0,10);weekDeck=shuffle(weekSet.map((_,i)=>i));}
  const saveRotation=()=>{try{localStorage.setItem(rotationKey,JSON.stringify({week:weekStamp,set:weekSet,deck:weekDeck,reserve}));}catch(_){}};

  const palette = ['#f6c6dc','#f6d8a9','#bfe4d2','#b9d7f5','#e0c5ef','#f8d1c5','#c5e2e8','#f4c5c9','#f4d9e7','#d3e9d8'];
  const slice = 360 / 10;
  const stops = Array.from({length:10},(_,i) => `${palette[i%palette.length]} ${i*slice+.8}deg ${(i+1)*slice-.8}deg`).join(',');
  wheel.style.background = `radial-gradient(circle at 30% 23%,rgba(255,255,255,.48),transparent 48%),conic-gradient(from -90deg,${stops})`;
  for (let i=0;i<10;i++) {
    const label = document.createElement('span');
    const angle = i*slice+slice/2;
    label.textContent = String(i+1);
    label.style.transform = `translate(-50%,-50%) rotate(${angle}deg) translateY(-68px) rotate(${-angle}deg)`;
    wheel.appendChild(label);
  }

  const confetti = () => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const glyphs = ['✨','💖','⭐','🎉'];
    for (let i=0;i<22;i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti'; piece.setAttribute('aria-hidden','true');
      piece.textContent = glyphs[Math.floor(Math.random()*glyphs.length)];
      piece.style.setProperty('--x',`${Math.random()*92}%`);
      piece.style.setProperty('--delay',`${Math.random()*.35}s`);
      game.appendChild(piece); setTimeout(()=>piece.remove(),2300);
    }
  };
  const showSticker = () => {
    const pop = document.createElement('div'); pop.className='sticker-pop'; pop.setAttribute('role','status'); pop.textContent='🌟 New sticker earned!'; game.appendChild(pop); setTimeout(()=>pop.remove(),1800);
  };
  const nextQuestion = () => {
    if(!weekDeck.length) weekDeck=shuffle(weekSet.map((_,i)=>i));
    let slot=weekDeck.shift();
    let idx=weekSet[slot];
    let last=null; try{last=Number(localStorage.getItem(lastKey));}catch(_){}
    if(weekDeck.length && idx===last){const j=1+Math.floor(Math.random()*(weekDeck.length));[slot,weekDeck[j-1]]=[weekDeck[j-1],slot];idx=weekSet[slot];}
    saveRotation();
    try{localStorage.setItem(lastKey,String(idx));}catch(_){}
    return {slot,idx};
  };

  go.addEventListener('click',()=>{
    refreshAvatar(); go.disabled=true; answers.replaceChildren(); message.textContent=''; question.textContent='Spinning…';
    const draw=nextQuestion(); const item=questions[draw.idx];
    const target=(360-(draw.slot*slice+slice/2)+360)%360;
    rotation += 1800 + ((target-(rotation%360)+360)%360);
    wheel.style.transform=`rotate(${rotation}deg)`;
    const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(()=>{
      question.textContent=`Question ${draw.slot+1} of 10: ${item.q}`;
      item.a.forEach((text,i)=>{
        const button=document.createElement('button'); button.type='button'; button.textContent=text;
        button.addEventListener('click',()=>{
          if(i!==item.correct){
            message.textContent=['Oops! Your Sis did a silly wiggle. Try again!','Boop! Your Sis says, “Not quite!” Try again!','Oops-a-daisy! Your Sis is doing the wiggly dance!'][Math.floor(Math.random()*3)];
            avatar.classList.remove('spin-wiggle'); void avatar.offsetWidth; avatar.classList.add('spin-wiggle'); button.disabled=true;
            return;
          }
          answers.querySelectorAll('button').forEach(b=>{b.disabled=true;});
          if(dailyCount<10) dailyCount=Math.min(10,dailyCount+1);
          let earnsSticker=false;
          if(dailyCount===10&&!dailyAwarded){
            earnsSticker=true; dailyAwarded=true; lifetimeCount+=1; weeklyCount+=1;
            try{localStorage.setItem(lifetimeKey,String(lifetimeCount));localStorage.setItem(weeklyKey,JSON.stringify({week:weekStamp,count:weeklyCount}));}catch(_){}
          }
          try{localStorage.setItem(dailyKey,JSON.stringify({date:dayStamp,count:dailyCount,awarded:dailyAwarded}));}catch(_){}
          refreshProgress();refreshStickers();if(earnsSticker)confetti();
          message.textContent=earnsSticker?`That's 10 today! New sticker earned. Answer: ${item.a[item.correct]}`:`You got it! Answer: ${item.a[item.correct]}`;
          if(earnsSticker)showSticker();
          go.disabled=false;go.textContent='Spin again!';
        });
        answers.appendChild(button);
      });
    },reduced?40:2500);
  });
})();
