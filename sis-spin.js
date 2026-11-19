/* Sis Spin: a self-contained game; the character and saved look remain untouched. */
(() => {
  'use strict';
  const mount = () => {
    const box = document.getElementById('boxView');
    if (!box || document.getElementById('sisSpinGame')) return;
    const questions = [
      { q: 'What is a period?', a: ['A little blood and tissue leaving the uterus', 'A visit from a moon penguin', 'A new dance move'], correct: 0 },
      { q: 'Are everyone’s cycles exactly the same?', a: ['Yes, like matching socks', 'No, cycles can vary from person to person', 'Only on Tuesdays'], correct: 1 },
      { q: 'What can help catch period flow?', a: ['A tiny umbrella', 'A pad or period underwear', 'A slice of pizza'], correct: 1 },
      { q: 'Can you move and play while on your period?', a: ['Yes, if you feel up to it', 'Only while wearing a cape', 'No, the moon says no'], correct: 0 },
      { q: 'What might feel soothing for period cramps?', a: ['A warm heating pad used safely', 'A frozen shoe', 'A tap-dancing broccoli'], correct: 0 },
      { q: 'Who can you talk to about a period question?', a: ['A trusted adult or health professional', 'Only a secret squirrel', 'Nobody, ever'], correct: 0 },
      { q: 'When do people start their first period?', a: ['Everyone starts on the same birthday', 'It varies from person to person', 'Whenever a unicorn sneezes'], correct: 1 },
      { q: 'What should you do if period pain feels severe or worrying?', a: ['Ask a trusted adult or health professional for help', 'Ask your socks for advice', 'Challenge a potato to a race'], correct: 0 }
    ];
    const style = document.createElement('style');
    style.textContent = `
      #sisSpinGame{margin:20px 0;padding:18px;border:2px solid #efc5d5;border-radius:20px;background:#fff5fa;color:#583549;text-align:center;position:relative;overflow:hidden}
      #sisSpinGame h2{margin:0 0 6px;font-size:1.35rem} #sisSpinGame p{margin:8px 0}
      #sisSpinGame .spin-stage{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap}
      #sisSpinGame .spin-avatar{width:112px;min-height:180px;display:flex;align-items:center;justify-content:center}
      #sisSpinGame .spin-avatar svg{width:112px!important;height:180px!important;max-width:100%}
      #sisSpinGame .wheel-wrap{position:relative;width:185px;height:185px;margin:12px auto}
      #sisSpinGame .wheel-pointer{position:absolute;left:50%;top:-8px;transform:translateX(-50%);z-index:2;color:#743c60;font-size:25px;line-height:1}
      #sisSpinGame .wheel{width:100%;height:100%;border:5px solid #a44e7a;border-radius:50%;box-sizing:border-box;background:conic-gradient(#ffd0df 0deg 45deg,#ffe6a9 45deg 90deg,#e4d5ff 90deg 135deg,#c9f0e2 135deg 180deg,#ffd0df 180deg 225deg,#ffe6a9 225deg 270deg,#e4d5ff 270deg 315deg,#c9f0e2 315deg 360deg);transition:transform 2.4s cubic-bezier(.18,.72,.22,1);position:relative}
      #sisSpinGame .wheel span{position:absolute;left:50%;top:50%;font-weight:800;color:#673b58}
      #sisSpinGame button{font:inherit;cursor:pointer;border:0;border-radius:12px;padding:10px 14px;background:#a74475;color:white;font-weight:700;margin:4px}
      #sisSpinGame button:hover{background:#81355d} #sisSpinGame button:focus-visible{outline:3px solid #673b58;outline-offset:3px} #sisSpinGame button:disabled{opacity:.55;cursor:default}
      #sisSpinGame .spin-answers{display:flex;flex-direction:column;align-items:stretch;max-width:400px;margin:0 auto} #sisSpinGame .spin-answers button{background:#fff;color:#673b58;border:1px solid #d998b5;text-align:left}
      #sisSpinGame .spin-answers button:hover{background:#ffe8f2} #sisSpinGame .spin-message{min-height:1.5em;font-weight:700} #sisSpinGame .spin-stickers{font-size:1.3rem;overflow-wrap:anywhere}
      #sisSpinGame .spin-wiggle{animation:sis-wiggle .5s ease-in-out} @keyframes sis-wiggle{0%,100%{transform:rotate(0)}25%{transform:rotate(-12deg)}75%{transform:rotate(12deg)}}
      #sisSpinGame .confetti{position:absolute;top:-20px;left:var(--x);font-size:20px;pointer-events:none;animation:sis-fall 1.5s ease-in forwards;animation-delay:var(--delay)} @keyframes sis-fall{to{transform:translateY(400px) rotate(400deg);opacity:0}}
      @media(prefers-reduced-motion:reduce){#sisSpinGame .wheel{transition:none}#sisSpinGame .spin-wiggle,#sisSpinGame .confetti{animation:none}}
    `;
    document.head.appendChild(style);
    const game = document.createElement('section');
    game.id = 'sisSpinGame';
    game.setAttribute('aria-label', 'Sis Spin game');
    game.innerHTML = '<h2>🎡 Sis Spin!</h2><p>Spin with your Sis, answer a question, and collect stickers!</p><div class="spin-stage"><div class="spin-avatar" aria-label="Your character"></div><div class="wheel-wrap"><span class="wheel-pointer" aria-hidden="true">▼</span><div class="wheel" aria-hidden="true"></div></div></div><button type="button" class="spin-go">Spin the wheel!</button><div class="spin-question" aria-live="polite"></div><div class="spin-answers"></div><p class="spin-message" role="status" aria-live="polite"></p><p><strong>Sticker collection</strong></p><div class="spin-stickers" aria-live="polite"></div>';
    box.appendChild(game);
    const wheel = game.querySelector('.wheel'), avatar = game.querySelector('.spin-avatar');
    const go = game.querySelector('.spin-go'), question = game.querySelector('.spin-question');
    const answers = game.querySelector('.spin-answers'), message = game.querySelector('.spin-message');
    const stickers = game.querySelector('.spin-stickers');
    let rotation = 0, count = 0;
    const stickerKey = 'periodSisSpinStickersV1';
    try { const n = Number(localStorage.getItem(stickerKey)); if (Number.isFinite(n) && n > 0) count = Math.floor(n); } catch (_) {}
    const refreshStickers = () => { stickers.textContent = count ? '⭐'.repeat(Math.min(count, 20)) + ' (' + count + ' earned)' : 'Your first sticker is waiting!'; };
    const refreshAvatar = () => {
      const source = document.querySelector('#avatar svg');
      if (source) { const clone = source.cloneNode(true); clone.setAttribute('aria-label', 'Your custom Sis'); avatar.replaceChildren(clone); }
      else avatar.textContent = 'Your Sis is getting ready!';
    };
    for (let i = 0; i < 8; i++) {
      const label = document.createElement('span'), angle = i * 45 + 22.5;
      label.textContent = String(i + 1);
      label.style.transform = `translate(-50%,-50%) rotate(${angle}deg) translateY(-65px) rotate(${-angle}deg)`;
      wheel.appendChild(label);
    }
    const confetti = () => {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      for (let i = 0; i < 18; i++) {
        const piece = document.createElement('span'); piece.className = 'confetti'; piece.setAttribute('aria-hidden', 'true');
        piece.textContent = ['✨','💖','⭐','🎉'][i % 4]; piece.style.setProperty('--x', (5 + Math.random() * 90) + '%'); piece.style.setProperty('--delay', (Math.random() * .35) + 's'); game.appendChild(piece);
        setTimeout(() => piece.remove(), 2200);
      }
    };
    go.addEventListener('click', () => {
      refreshAvatar(); go.disabled = true; answers.replaceChildren(); question.textContent = 'Spinning…'; message.textContent = '';
      const idx = Math.floor(Math.random() * questions.length), item = questions[idx];
      const target = (360 - (idx * 45 + 22.5)) % 360;
      rotation += 1800 + ((target - (rotation % 360) + 360) % 360);
      wheel.style.transform = `rotate(${rotation}deg)`;
      const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setTimeout(() => {
        question.textContent = 'Question ' + (idx + 1) + ': ' + item.q;
        item.a.forEach((text, i) => {
          const button = document.createElement('button'); button.type = 'button'; button.textContent = text;
          button.addEventListener('click', () => {
            if (i !== item.correct) {
              message.textContent = ['Oops! Your Sis did a silly wiggle. Try again!', 'Boop! Your Sis says, “Not quite!” Try again!', 'Oops-a-daisy! Your Sis is doing the wiggly dance.'][Math.floor(Math.random() * 3)];
              avatar.classList.remove('spin-wiggle'); void avatar.offsetWidth; avatar.classList.add('spin-wiggle');
              button.disabled = true;
            } else {
              answers.querySelectorAll('button').forEach(b => { b.disabled = true; });
              count++; try { localStorage.setItem(stickerKey, String(count)); } catch (_) {}
              refreshStickers(); message.textContent = 'You got it! Your Sis earned a star sticker!'; confetti(); go.disabled = false; go.textContent = 'Spin again!';
            }
          });
          answers.appendChild(button);
        });
      }, reduced ? 0 : 2450);
    });
    refreshAvatar(); refreshStickers();
    const boxTab = document.querySelector('[data-tab="box"]');
    if (boxTab) boxTab.addEventListener('click', refreshAvatar);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true }); else mount();
})();
