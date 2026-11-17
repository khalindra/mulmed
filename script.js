/* ===== Utilitas ==== */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const hl = c => esc(c).replace(/("[^"]*")/g, '<i class="s">$1</i>').replace(/\b(let|const|function|return|if|else|for|while)\b/g, '<i class="k">$1</i>').replace(/\b(\d+)\b/g, '<i class="n">$1</i>');
const fmt = t => String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0');
let tt; const toast = m => { const t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('on'), 2200) };

/* ===== State (tersimpan di localStorage) ===== */
const KEY = 'codely-v1';
let S = { hearts: 5, gems: 420, xp: 0, done: {} };
try { Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')) } catch (e) { }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)) } catch (e) { } };
const active = () => { for (let i = 1; i <= 5; i++)if (!S.done[i]) return i; return 6 };

/* ===== Materi ===== */
const L = [null,
  {
    n: 'Dasar Koding', ic: '</>', d: 'Kenalan dengan variabel dan cara menampilkan hasil kode.', m: 'Variabel itu seperti kotak yang bisa diisi dan diganti isinya! ✨',
    con: [['Variabel', 'Menyimpan nilai dengan let dan const.', 'let skor = 100;\nconst bahasa = "JavaScript";'], ['Tipe data', 'String, Number, dan Boolean.', 'let nama = "Alex";\nlet level = 1;']],
    qs: [
      { q: 'Apa yang dicetak oleh kode berikut?', c: 'let skor = 10;\nskor = skor + 5;\nconsole.log(skor);', o: ['10', '5', '15', '"skor"'], a: 2, t: 'Komputer membaca kode dari atas ke bawah. Nilai terbaru yang dicetak.', e: 'Baris pertama mengisi <code>skor</code> dengan 10. Baris kedua mengubahnya jadi 10 + 5 = <b>15</b>, lalu <code>console.log</code> mencetak nilai terbaru.' },
      { q: 'Apa hasil kode ini?', c: 'console.log("Halo" + " Dunia");', o: ['"Halo Dunia"', '"HaloDunia"', '"Halo + Dunia"', 'Error'], a: 0, t: 'Tanda + pada teks menggabungkan dua string.', e: 'Operator <code>+</code> pada string menggabungkan teks. Spasi di depan "Dunia" ikut tercetak, jadi hasilnya <b>Halo Dunia</b>.' },
      { q: 'Apa yang terjadi pada kode ini?', c: 'const nama = "Alex";\nnama = "Budi";', o: ['Error: const tidak bisa diganti', 'nama jadi "Budi"', 'nama jadi undefined', 'Tidak terjadi apa-apa'], a: 0, t: 'const = konstanta, nilainya terkunci.', e: 'Variabel <code>const</code> tidak boleh diberi nilai baru. JavaScript akan melempar <b>TypeError</b>. Pakai <code>let</code> kalau nilainya perlu berubah.' },
      { q: 'Apa hasil typeof dari kode ini?', c: 'console.log(typeof 42);', o: ['"string"', '"number"', '"boolean"', '"object"'], a: 1, t: 'Angka tanpa tanda kutip bertipe number.', e: '42 adalah angka, jadi <code>typeof 42</code> menghasilkan <b>"number"</b>.' }]
  },
  {
    n: 'Logika IF/ELSE', ic: 'if', d: 'Kuasai logika percabangan if/else.', m: 'Ingat urutan cek kondisi percabangan ya!',
    con: [['Percabangan if', 'Jalankan blok hanya jika kondisi true.', 'if (skor >= 90) {\n  console.log("Lulus!");\n}'], ['else if & else', 'Alternatif kondisi berurutan.', 'else if (skor >= 80) {}\nelse {}']],
    qs: [
      { q: 'Apa output kode ini jika skor = 85?', c: 'let skor = 85;\nif (skor >= 90) {\n  console.log("Luar Biasa!");\n} else if (skor >= 80) {\n  console.log("Lulus Mantap!");\n} else {\n  console.log("Semangat!");\n}', o: ['"Luar Biasa!"', '"Lulus Mantap!"', '"Semangat!"', 'Error'], a: 1, t: 'Blok pertama yang bernilai true langsung dijalankan.', e: '85 >= 90 bernilai <code>false</code>, dilewati. 85 >= 80 bernilai <code>true</code>, jadi mencetak <b>"Lulus Mantap!"</b>.' },
      { q: 'Apa hasil ekspresi ini?', c: 'console.log(85 >= 90);', o: ['true', 'false', '85', 'undefined'], a: 1, t: 'Operator perbandingan menghasilkan true atau false.', e: '85 lebih kecil dari 90, jadi <code>85 >= 90</code> bernilai <b>false</b>.' },
      { q: 'Apa yang dicetak?', c: 'let x = 5;\nif (x > 10) {\n  console.log("A");\n} else {\n  console.log("B");\n}', o: ['"A"', '"B"', '"A" lalu "B"', 'Tidak ada'], a: 1, t: 'Kalau kondisi if false, blok else yang jalan.', e: '5 tidak lebih besar dari 10, jadi blok <code>else</code> berjalan dan mencetak <b>"B"</b>.' },
      { q: 'Apa hasil kode ini?', c: 'console.log(85 === "85");', o: ['true', 'false', '85', 'Error'], a: 1, t: '=== membandingkan nilai sekaligus tipe datanya.', e: '<code>===</code> mengecek tipe juga. 85 (number) berbeda dari "85" (string), hasilnya <b>false</b>.' }]
  },
  {
    n: 'Perulangan (Loop)', ic: '↻', d: 'Kuasai loop while dan for tanpa pusing!', m: 'Hitung berapa kali loop-nya berjalan ya!',
    con: [['Loop for', 'Nilai awal, kondisi batas, langkah naik.', 'for (let i = 1; i <= 3; i++) {\n  console.log("Hai!");\n}'], ['Loop while', 'Mengulang selama kondisi true.', 'let i = 1;\nwhile (i <= 3) { i++; }']],
    qs: [
      { q: 'Berapa kali teks dicetak?', c: 'for (let i = 1; i <= 3; i++) {\n  console.log("Hai Alex!");\n}', o: ['1 kali', '2 kali', '3 kali', '4 kali'], a: 2, t: 'Hitung dari nilai awal sampai batas kondisi.', e: 'Loop berjalan saat i = 1, 2, dan 3. Saat i = 4 kondisi <code>false</code>, loop berhenti. Total <b>3 kali</b>.' },
      { q: 'Berapa kali loop berjalan?', c: 'for (let i = 0; i < 5; i += 2) {\n  console.log(i);\n}', o: ['2 kali', '3 kali', '4 kali', '5 kali'], a: 1, t: 'i naik 2 setiap putaran: 0, 2, 4.', e: 'Nilai i: 0, 2, 4. Setelah 6 kondisi <code>i < 5</code> false. Jadi <b>3 kali</b>.' },
      { q: 'Berapa nilai i yang dicetak?', c: 'let i = 1;\nwhile (i <= 3) {\n  i++;\n}\nconsole.log(i);', o: ['1', '3', '4', 'Error'], a: 2, t: 'Loop berhenti saat kondisinya false.', e: 'i naik sampai 4, saat itu <code>i <= 3</code> false dan loop berhenti. Hasilnya <b>4</b>.' },
      { q: 'Berapa nilai total?', c: 'let total = 0;\nfor (let i = 1; i <= 3; i++) {\n  total += i;\n}\nconsole.log(total);', o: ['3', '5', '6', '9'], a: 2, t: 'Jumlahkan 1 + 2 + 3.', e: 'Total bertambah 1, lalu 2, lalu 3 sehingga <b>6</b>.' }]
  },
  {
    n: 'Fungsi & Modul', ic: 'f(x)', d: 'Bungkus kode jadi fungsi dan pakai ulang di mana saja.', m: 'Fungsi itu seperti resep, tinggal dipanggil namanya! ✨',
    con: [['Deklarasi fungsi', 'Blok kode bernama yang bisa dipanggil.', 'function sapa(nama) {\n  return "Halo, " + nama;\n}'], ['Nilai return', 'Mengembalikan hasil fungsi.', 'console.log(sapa("Alex"));']],
    qs: [
      { q: 'Apa yang dicetak oleh kode berikut?', c: 'function sapa(nama) {\n  return "Halo, " + nama + "!";\n}\nconsole.log(sapa("Alex"));', o: ['"Halo, nama!"', '"Halo, Alex!"', '"sapa"', 'undefined'], a: 1, t: 'Parameter nama berisi argumen saat dipanggil.', e: '<code>sapa("Alex")</code> mengisi parameter <code>nama</code> dengan "Alex", lalu <code>return</code> mengembalikan <b>"Halo, Alex!"</b>.' },
      { q: 'Apa hasilnya?', c: 'function kali(a, b) {\n  return a * b;\n}\nconsole.log(kali(3, 4));', o: ['7', '12', '34', 'undefined'], a: 1, t: '* adalah operator perkalian.', e: '3 * 4 = <b>12</b>, dikembalikan oleh <code>return</code>.' },
      { q: 'Apa yang dicetak?', c: 'function diam() {\n  let x = 1;\n}\nconsole.log(diam());', o: ['1', '0', 'undefined', 'Error'], a: 2, t: 'Fungsi tanpa return menghasilkan undefined.', e: 'Fungsi <code>diam</code> tidak punya <code>return</code>, jadi hasilnya <b>undefined</b>.' },
      { q: 'Berapa hasilnya?', c: 'function dua(x) {\n  return x + 2;\n}\nconsole.log(dua(dua(1)));', o: ['3', '4', '5', '6'], a: 2, t: 'Hitung dari fungsi yang paling dalam.', e: '<code>dua(1)</code> = 3, lalu <code>dua(3)</code> = <b>5</b>.' }]
  },
  {
    n: 'Array & Data', ic: '[ ]', d: 'Simpan banyak data dalam satu daftar dan olah dengan mudah!', m: 'Array itu seperti rak berlaci. Urutan laci dihitung dari 0! ✨',
    con: [['Membuat array', 'Beberapa nilai dalam satu variabel.', 'let buah = ["apel", "jeruk"];'], ['Indeks & push', 'Indeks mulai dari 0.', 'buah[0];\nbuah.push("pisang");']],
    qs: [
      { q: 'Apa yang dicetak oleh kode berikut?', c: 'let buah = ["apel", "jeruk", "mangga"];\nconsole.log(buah[1]);', o: ['"apel"', '"jeruk"', '"mangga"', 'undefined'], a: 1, t: 'Indeks array dimulai dari 0, bukan 1.', e: '<code>buah[0]</code> = "apel", <code>buah[1]</code> = <b>"jeruk"</b>.' },
      { q: 'Berapa panjang array?', c: 'let buah = ["apel", "jeruk", "mangga"];\nconsole.log(buah.length);', o: ['2', '3', '4', 'undefined'], a: 1, t: 'length menghitung jumlah elemen.', e: 'Ada 3 elemen, jadi <code>length</code> = <b>3</b>.' },
      { q: 'Berapa length setelah push?', c: 'let buah = ["apel", "jeruk", "mangga"];\nbuah.push("pisang");\nconsole.log(buah.length);', o: ['3', '4', '5', 'Error'], a: 1, t: 'push menambah data di akhir array.', e: '<code>push</code> menambah "pisang", total jadi <b>4</b>.' },
      { q: 'Apa yang dicetak?', c: 'let buah = ["apel", "jeruk", "mangga"];\nconsole.log(buah[3]);', o: ['"mangga"', 'null', 'undefined', 'Error'], a: 2, t: 'Indeks terakhir adalah length - 1.', e: 'Indeks 3 tidak ada (hanya 0 sampai 2), hasilnya <b>undefined</b>.' }]
  },
  { n: 'Mini Project', ic: '🚀', d: 'Gabungan semua level.' }];

/* ===== Router ===== */
let Q = {};
function go(id) {
  if (id !== 'quiz') clearInterval(Q.timer);
  $$('.screen').forEach(s => s.classList.toggle('on', s.id === 's-' + id));
  $('#nav').hidden = !['home', 'profile'].includes(id);
  $$('#nav button').forEach(b => b.classList.toggle('on', b.dataset.go === id));
  if (id === 'home') renderHome(); if (id === 'profile') renderProfile(); if (id === 'verify') startCountdown();
  $('#s-' + id).scrollTop = 0;
}
document.addEventListener('click', e => {
  const g = e.target.closest('[data-go]'); if (g) { go(g.dataset.go); return }
  const t = e.target.closest('[data-toast]'); if (t) toast(t.dataset.toast);
});

/* ===== Sheet ===== */
function openSheet(h) { $('#sheet').innerHTML = h; $('#sheet').classList.add('on'); $('#sheetBg').classList.add('on') }
function closeSheet() { $('#sheet').classList.remove('on'); $('#sheetBg').classList.remove('on') }
$('#sheetBg').onclick = () => { if (!Q.lock) closeSheet() };

/* ===== Auth ===== */
$$('[data-eye]').forEach(b => b.onclick = () => { const i = $('#' + b.dataset.eye); const s = i.type === 'password'; i.type = s ? 'text' : 'password'; b.textContent = s ? 'visibility_off' : 'visibility' });
$('#f-login').onsubmit = e => { e.preventDefault(); if (!$('#email').value.includes('@')) return toast('Masukkan email yang valid'); if ($('#pass').value.length < 6) return toast('Kata sandi minimal 6 karakter'); toast('Selamat datang kembali, Alex! 👋'); go('home') };
$('#google').onclick = () => toast('Masuk dengan Google segera hadir');
$('#signup').onclick = () => toast('Pendaftaran segera hadir');
$('#sendCode').onclick = () => { const m = $('#femail').value; if (!m.includes('@')) return toast('Masukkan email yang valid'); $('#vmail').textContent = m; go('verify'); $('#otp input').focus() };
const ob = $$('#otp input');
ob.forEach((b, i) => { b.oninput = () => { b.value = b.value.replace(/\D/g, ''); $('#otp').classList.remove('err'); if (b.value && ob[i + 1]) ob[i + 1].focus() }; b.onkeydown = e => { if (e.key === 'Backspace' && !b.value && ob[i - 1]) ob[i - 1].focus() } });
$('#verify').onclick = () => { if (ob.some(b => !b.value)) { $('#otp').classList.add('err'); return toast('Lengkapi 4 digit kode') } ob.forEach(b => b.value = ''); go('reset') };
let cdT; function startCountdown() { clearInterval(cdT); let n = 44; $('#resend').classList.add('dis'); const u = () => { $('#cd').textContent = '00:' + String(n).padStart(2, '0'); if (n-- <= 0) { clearInterval(cdT); $('#resend').classList.remove('dis') } }; u(); cdT = setInterval(u, 1000) }
$('#resend').onclick = () => { toast('Kode baru sudah dikirim'); startCountdown() };
$('#doReset').onclick = () => { const a = $('#np').value, b = $('#cp').value; if (a.length < 8) return toast('Minimal 8 karakter'); if (a !== b) return toast('Konfirmasi kata sandi tidak sama'); $('#np').value = $('#cp').value = ''; toast('Kata sandi berhasil diperbarui'); go('login') };

/* ===== Peta belajar ===== */
function renderHome() {
  const act = active(), done = Object.keys(S.done).length, pct = Math.round(done / 6 * 100);
  $('#gems').textContent = S.gems;
  $('#hudSub').textContent = 'Target harian: ' + Math.min(done, 3) + '/3 selesai';
  $('#hudTag').textContent = done < 2 ? 'Modul dasar' : 'Modul lanjutan';
  $('#hudBar').style.width = pct + '%'; $('#hudPct').textContent = pct + '%';
  $('#hudMsg').textContent = act > 5 ? 'Selesaikan mini project untuk lulus!' : '1 modul lagi untuk streak bonus!';
  $('#map').innerHTML = [1, 2, 3, 4, 5, 6].map(i => {
    const st = S.done[i] ? 'done' : i === act ? 'on' : 'lock', l = L[i];
    const ic = st === 'done' ? '<span class="i">check</span>' : st === 'on' ? l.ic : '<span class="i">lock</span>';
    return `<button class="node ${st}" data-lv="${i}"><span class="dot">${ic}</span><span class="nm">${i}. ${l.n}</span>${st === 'done' ? '<span class="stars">' + '⭐'.repeat(S.done[i].stars) + '</span>' : ''}</button>`
  }).join('');
  $$('.node').forEach(n => n.onclick = () => { const i = +n.dataset.lv; if (n.classList.contains('lock')) toast('Selesaikan level sebelumnya dulu 🔒'); else if (n.classList.contains('done')) showSummary(i); else n.scrollIntoView({ behavior: 'smooth', block: 'center' }) });
  const l = L[Math.min(act, 6)];
  $('#mission').innerHTML = `<h3>🗺️ Misi: ${l.n}</h3><p>${l.d}</p><div class="meta"><span class="chip"><span class="i">timer</span>~5 menit</span><span class="chip">💗 +3 hati</span><span class="chip"><span class="i">diamond</span>+10 permata</span></div><button class="btn d" id="start">Mulai belajar <span class="i">play_arrow</span></button>`;
  $('#start').onclick = () => act > 5 ? toast('Mini project segera hadir 🚀') : startQuiz(act);
}

/* ===== Kuis ===== */
function startQuiz(lv) { clearInterval(Q.timer); Q = { lv, i: 0, ok: 0, t: 0, r: [] }; go('quiz'); showQ(); Q.timer = setInterval(() => { Q.t++; const e = $('#qtime'); if (e) e.textContent = fmt(Q.t) }, 1000) }
$('#quitQuiz').onclick = () => { if (confirm('Keluar dari kuis? Progres level ini tidak tersimpan.')) go('home') };
function showQ() {
  const l = L[Q.lv], q = l.qs[Q.i]; Q.lock = false;
  $('#hearts').textContent = S.hearts; $('#gems2').textContent = S.gems;
  $('#segs').innerHTML = l.qs.map((_, i) => `<i class="${i < Q.i ? 'on' : i === Q.i ? 'cur' : ''}"></i>`).join('');
  $('#quizBody').innerHTML = `<div class="qrow"><span class="tag">✨ Level ${Q.lv}: ${l.n} • ${Q.i + 1}/4</span><span class="chip mono"><span class="i">timer</span><span id="qtime">${fmt(Q.t)}</span></span></div>
  <div class="bubble"><span class="mimi sm">🤖</span><p>${l.m}</p></div><h2 class="q">${q.q}</h2>
  <div class="code"><div class="bar2"><b></b><b></b><b></b><em>level${Q.lv}.js</em></div><pre>${hl(q.c)}</pre></div>
  ${q.o.map((o, i) => `<button class="opt" data-i="${i}"><b>${'ABCD'[i]}</b><span>${esc(o)}</span><span class="i">radio_button_unchecked</span></button>`).join('')}
  <div class="tipk"><button id="tipb"><span><span class="i">lightbulb</span> Tips kilat Mimi</span><span class="i">expand_more</span></button><p>${q.t}</p></div>`;
  $('#tipb').onclick = () => $('.tipk').classList.toggle('open');
  $$('.opt').forEach(b => b.onclick = () => answer(+b.dataset.i));
  $('#s-quiz').scrollTop = 0;
}
function answer(i) {
  if (Q.lock) return; Q.lock = true;
  const q = L[Q.lv].qs[Q.i], ok = i === q.a;
  $$('.opt').forEach((b, k) => { if (k === q.a) b.classList.add('ok'); if (k === i && !ok) b.classList.add('bad'); b.querySelector('.i').textContent = k === q.a ? 'check_circle' : k === i ? 'cancel' : 'radio_button_unchecked' });
  Q.r.push(ok);
  if (ok) { Q.ok++; S.xp += 15; S.gems += 5 } else S.hearts = Math.max(0, S.hearts - 1);
  save(); $('#hearts').textContent = S.hearts; $('#gems2').textContent = S.gems;
  setTimeout(() => {
    const head = ok ? `<div class="sh-head"><span class="mimi lg">🤖</span><div><span class="badge">✅ Jawaban benar! ✨</span><h3>Luar biasa, Alex!</h3><p>Pola pikir algoritmamu makin tajam hari ini.</p></div></div>
      <div class="stats"><div><b>+15 XP</b>Poin belajar</div><div><b>+5 permata</b>Bonus tepat</div><div><b>7 hari 🔥</b>Streak aktif</div></div>
      <div class="expl"><h4>PENJELASAN SINGKAT</h4>${q.e}</div>`
      : `<div class="sh-head"><span class="mimi lg">🤖</span><div><span class="badge">❌ Jawaban kurang tepat</span><h3>Yuk, coba pahami polanya!</h3><p>"Jangan menyerah, Alex! Kesalahan adalah bagian paling seru dari belajar kode."</p></div></div>
      <div class="stats bad"><div><b>-1 hati</b>Sisa: ${S.hearts} hati</div><div><b>+0 XP</b>Coba lagi</div><div><b>Aman</b>Streak hari ini</div></div>
      <div class="fix w"><small>Pilihanmu:</small><b>${'ABCD'[i]}. ${esc(q.o[i])}</b></div><div class="fix r"><small>Jawaban yang tepat:</small><b>${'ABCD'[q.a]}. ${esc(q.o[q.a])}</b></div>
      <div class="expl"><h4>PEMBAHASAN</h4>${q.e}</div><div class="mt">💡 <b>Tips Mimi:</b> ${q.t}</div>`;
    openSheet(head + `<button class="btn d" id="next">${ok ? 'Lanjutkan' : 'Paham, lanjutkan'} <span class="i">arrow_forward</span></button>`);
    $('#next').onclick = next;
  }, 550);
}
function next() {
  closeSheet(); Q.i++;
  if (S.hearts === 0) { S.hearts = 3; save(); toast('Hatimu habis. Diisi ulang, yuk coba lagi 💗'); return go('home') }
  if (Q.i < 4) return showQ();
  clearInterval(Q.timer);
  const acc = Math.round(Q.ok / 4 * 100), stars = Q.ok === 4 ? 3 : Q.ok >= 3 ? 2 : 1;
  const old = S.done[Q.lv]; S.done[Q.lv] = { acc, t: Q.t, stars: Math.max(stars, old ? old.stars : 0), r: Q.r }; S.xp += 30; save(); showSummary(Q.lv, true);
}

/* ===== Ringkasan level ===== */
function showSummary(lv, fresh) {
  const d = S.done[lv], l = L[lv], tl = d.acc === 100 ? 'Sempurna!' : d.acc >= 75 ? 'Bagus!' : 'Terus berlatih!';
  $('#s-summary').innerHTML = `<header class="top"><button class="ib i" data-go="home">arrow_back</button><b>Ringkasan Level ${lv}: ${l.n}</b><span></span></header>
  <div class="sum-hero"><span class="tag">🌸 ${tl}</span><h1>Level ${lv}: ${l.n}</h1><p>${l.d}</p>
    <div>${[0, 1, 2].map(i => `<span class="star ${i === 1 ? 'big' : ''} ${i < d.stars ? '' : 'off'}"><span class="i fill">star</span></span>`).join('')}</div>
    <div class="mq"><span class="mimi sm">🤖</span><span><b>Mimi • Pendamping belajar</b><br>"${d.acc === 100 ? 'Keren, Alex! Fondasi kodemu sudah sangat kokoh 🌸' : 'Bagus, Alex! Ulangi sekali lagi supaya makin mantap 🌸'}"</span></div></div>
  <div class="stats sum-stats"><div><b>${d.acc}%</b>Akurasi</div><div><b>${fmt(d.t)}</b>Durasi</div><div><b>${fresh ? '+30 XP' : '—'}</b>Bonus skor</div></div>
  <h3 class="sec">🎓 Konsep yang dikuasai</h3>
  ${l.con.map(c => `<div class="con"><b><span class="i fill">check_circle</span>${c[0]}</b><small>${c[1]}</small><pre>${hl(c[2])}</pre></div>`).join('')}
  <h3 class="sec">📋 Riwayat soal</h3>
  ${l.qs.map((q, i) => `<div class="hist ${d.r[i] ? '' : 'x'}"><b>${i + 1}</b><span>${q.q}</span><span class="i fill">${d.r[i] ? 'check_circle' : 'cancel'}</span></div>`).join('')}
  <button class="btn d" style="width:calc(100% - 32px);margin:16px" id="again"><span class="i">refresh</span> Ulangi kuis Level ${lv}</button>
  <button class="btn g" style="width:calc(100% - 32px);margin:0 16px" data-go="home"><span class="i">map</span> Kembali ke peta belajar</button>`;
  $('#again').onclick = () => startQuiz(lv); go('summary');
}

/* ===== Profil ===== */
function renderProfile() {
  const n = Object.keys(S.done).length; $('#plv').textContent = Math.max(1, n);
  $('#stats').innerHTML = [['Rentang belajar', '7 hari', 'local_fire_department', 'Rekor terbaik! 🎉'], ['XP & permata', S.xp + ' XP', 'diamond', 'Permata: ' + S.gems], ['Modul selesai', n + ' modul', 'bolt', 'Dari 6 level'], ['Waktu belajar', (n * 0.5 + 14).toFixed(1) + ' jam', 'schedule', 'Total waktu aktif']].map(s => `<div>${s[0]}<span class="i">${s[2]}</span><b>${s[1]}</b>${s[3]}</div>`).join('');
  const a = [['Konsisten 7 hari', 'Belajar tanpa henti', 'workspace_premium', 1], ['Percabangan', 'Paham if/else logic', 'call_split', !!S.done[2]], ['Pemburu bug', 'Selesaikan 10 syntax error', 'bug_report', S.xp >= 150], ['Algoritma kilat', 'Kuis kilat < 60 detik', 'speed', Object.values(S.done).some(d => d.t < 60)]];
  $('#ach').innerHTML = a.map(x => `<div class="${x[3] ? '' : 'lk'}"><span class="i fill">${x[2]}</span><b style="font-size:14px">${x[0]}</b>${x[1]}<br><span class="tag" style="margin-top:6px">${x[3] ? 'Terbuka' : 'Terkunci'}</span></div>`).join('');
}
$('#logout').onclick = () => {
  openSheet(`<div class="sh-head"><span class="mimi lg">🤖</span><div><span class="badge">🔒 Sesi belajar</span><h3>Mau istirahat dulu, Alex?</h3><p>Progres belajarmu hari ini, streak 7 hari, dan ${S.gems} permata sudah tersimpan aman.</p></div></div>
  <button class="btn d" id="stay"><span class="i">terminal</span> Batal, tetap belajar</button><button class="btn g" id="out"><span class="i">logout</span> Ya, keluar akun</button>`);
  $('#stay').onclick = closeSheet; $('#out').onclick = () => { closeSheet(); go('login') }
};
$('#resetProg').onclick = () => { if (confirm('Hapus semua progres belajar?')) { S = { hearts: 5, gems: 420, xp: 0, done: {} }; save(); toast('Progres direset'); renderProfile() } };

go('login');
