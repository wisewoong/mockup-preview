// 글꼴(시안 B): Sora + Noto Sans KR. 오프라인이면 시스템 글꼴로 대체된다.
(function () {
  var h = document.head;
  if (h.querySelector('link[data-fonts]')) return;
  var a = document.createElement('link'); a.rel = 'preconnect'; a.href = 'https://fonts.googleapis.com'; h.appendChild(a);
  var l = document.createElement('link'); l.rel = 'stylesheet'; l.setAttribute('data-fonts', ''); l.href = 'https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Noto+Sans+KR:wght@400;500;700&display=swap'; h.appendChild(l);
})();
// 아이콘(인라인 SVG, 24px, stroke 2.2, round). data-icon="이름" data-label="접근성 이름" 이 붙은 버튼에 주입한다. data-keep 이면 글자도 남긴다.
// 토글(data-toggle)은 aria-pressed만 바꾸고, 모양은 CSS(.i-off/.i-on, .fillable)가 전환한다. data-lon/data-loff 가 있으면 라벨도 바꾼다.
(function () {
  function S(d, c) { return '<svg' + (c ? ' class="' + c + '"' : '') + ' viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">' + d + '</svg>'; }
  function P(d, f) { return '<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"' + (f ? ' class="fillable"' : '') + '/>'; }
  var spk = 'M4 9.5v5h4l5 4v-13l-5 4z';
  var I = {
    search: S('<circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="2.2"/>' + P('M16 16l5 5')),
    x: S(P('M6 6l12 12M18 6L6 18')),
    play: S(P('M7 5l12 7-12 7z'), 'i-off') + S(P('M8 5v14M16 5v14'), 'i-on'),
    mute: S(P(spk + 'M17 9.5a4 4 0 010 5'), 'i-off') + S(P(spk + 'M16 9.5l5 5M21 9.5l-5 5'), 'i-on'),
    fs: S(P('M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5')),
    share: S(P('M12 15V4M8 8l4-4 4 4M5 12v8h14v-8')),
    flag: S(P('M6 21V4M6 4h11l-2 4 2 4H6')),
    send: S(P('M21 3L10 14M21 3l-7 18-4-7-7-4z')),
    heart: S(P('M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z')),
    retry: S(P('M20 12a8 8 0 11-2.5-5.8M20 4v5h-5')),
    bookmark: S(P('M7 4h10v17l-5-4-5 4z', 1)),
    down: S(P('M6 9l6 6 6-6')),
    bell: S(P('M6 17v-6a6 6 0 0112 0v6l2 2H4z') + P('M10 21h4')),
    user: S('<circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="2.2"/>' + P('M4 21a8 8 0 0116 0')),
    clock: S('<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2.2"/>' + P('M12 7.5V12l3 2')),
    menu: S(P('M4 7h16M4 12h16M4 17h16')),
    star: S(P('M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.8z')),
    mail: S('<rect x="3.5" y="5.5" width="17" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="2.2"/>' + P('M4 7l8 6 8-6')),
    external: S(P('M14 4h6v6M20 4l-9 9M18 14v5H5V6h5')),
    more: S('<circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/>'),
    doc: S(P('M7 3.5h7l4 4v13H7zM14 3.5v4h4M9.5 12h5M9.5 16h5')),
    help: S('<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2.2"/>' + P('M9.5 9.5a2.5 2.5 0 114 2c-1 .7-1.5 1.2-1.5 2.3M12 17v.2')),
    ttsmute: S(P(spk + 'M17 9.5a4 4 0 010 5'), 'i-off') + S(P(spk + 'M16 9.5l5 5M21 9.5l-5 5'), 'i-on')
  };
  function label(el) {
    var on = el.getAttribute('aria-pressed') === 'true', t = on ? el.dataset.lon : el.dataset.loff;
    if (t) { el.setAttribute('aria-label', t); el.title = t; }
  }
  window.mockLabel = label;
  window.mockIcons = function (root) {
    (root || document).querySelectorAll('[data-icon]:not([data-iconed])').forEach(function (el) {
      var txt = el.textContent.trim(), l = el.dataset.label || txt;
      el.setAttribute('data-iconed', '');
      el.insertAdjacentHTML('afterbegin', I[el.dataset.icon]);
      if (el.hasAttribute('data-keep')) { el.classList.add('ik'); return; }
      Array.prototype.slice.call(el.childNodes).forEach(function (n) { if (n.nodeType === 3) el.removeChild(n); });
      el.classList.add('ib'); el.setAttribute('aria-label', l); el.title = l; label(el);
    });
  };
  window.mockIcons();
})();

// 목업 전용: 상태 전환(data-set="key:value"), 표시 조건(data-show="key=a|b"), 쿼리로 초기화(?theme=dark&state=empty)
(function () {
  var b = document.body, q = new URLSearchParams(location.search);
  var H = document.getElementById('site-header');
  var FILE = location.pathname.split('/').pop() || 'main.html';
  // 햄버거 드로어(NAV-DESIGN 5절): 모바일은 왼쪽 서랍, 768+는 헤더 아래 오른쪽 패널. 같은 <dialog id="drawer">를 쓴다.
  var DR = [['보관', [['즐겨찾기', 'star', 'favorites.html']]], ['도움', [['내 신고', 'flag', 'reports.html'], ['문의하기', 'mail', 'inquiry.html']]]];
  function buildDrawer() {
    var d = document.createElement('dialog'); d.id = 'drawer'; d.className = 'drawer'; d.setAttribute('aria-label', '전체 메뉴');
    var h = '<div class="dr-in"><div class="dr-top"><h2>메뉴</h2><button class="btn" type="button" data-icon="x" data-label="메뉴 닫기" data-dr-close>닫기</button></div>' +
      '<p class="dr-login"><a class="btn" data-dr-login href="login.html">로그인</a></p>';
    DR.forEach(function (g, i) {
      h += '<h3 id="dg' + i + '">' + g[0] + '</h3><ul aria-labelledby="dg' + i + '">' + g[1].map(function (r) {
        return '<li><a data-dr-need href="' + r[2] + '" data-to="' + r[2] + '"><span data-icon="' + r[1] + '" data-label="' + r[0] + '" data-keep></span><span class="t">' + r[0] + '</span><span class="hint" data-dr-hint hidden>로그인 필요</span></a></li>';
      }).join('') + '</ul>';
    });
    h += '<h3 id="dg9">다른 사이트</h3><ul aria-labelledby="dg9"><li><a href="../pastor-site/index.html" target="_blank" rel="noopener" data-dr-ext><span data-icon="external" data-keep></span><span class="t">목회자 사이트로 가기<span class="sr"> (새 창)</span></span></a>' +
      '<p class="sub"><span class="slot">목회자 사이트 주소 [배포 주소 확정 전]</span></p><p class="sub">목회자 사이트는 로그인을 따로 해요.</p></li></ul>' +
      '<ul class="dr-bottom"><li><a href="help.html" data-to="help.html"><span data-icon="help" data-keep></span><span class="t">도움말·공지</span></a></li><li><a href="terms.html" data-to="terms.html"><span data-icon="doc" data-keep></span><span class="t">약관·정책</span></a></li></ul></div>';
    d.innerHTML = h; document.body.appendChild(d);
    if (window.mockIcons) window.mockIcons(d);
    // 아이콘 span은 글자 없이 아이콘만 쓰므로 접근성 이름 제거(옆 글자가 이름)
    d.querySelectorAll('span[data-icon]').forEach(function (e) { e.removeAttribute('aria-label'); e.removeAttribute('title'); e.classList.remove('ik', 'ib'); e.classList.add('dri'); });
    d.querySelectorAll('.dr-top .btn[data-icon]').forEach(function (e) { e.classList.add('ib'); });
    return d;
  }
  var drawer = null, drOpener = null, mq = window.matchMedia('(min-width: 768px)');
  function setExp(v) { document.querySelectorAll('[aria-controls="drawer"]').forEach(function (x) { x.setAttribute('aria-expanded', v); }); }
  function openDrawer(btn) {
    if (!drawer) { drawer = buildDrawer(); wireDrawer(); }
    drOpener = btn.id; drawerPaint(); setExp(false); btn.setAttribute('aria-expanded', 'true'); drawer.showModal();
    if (mq.matches) { var f = drawer.querySelector('a[href]:not([hidden])'); if (f) f.focus(); } else drawer.querySelector('[data-dr-close]').focus();
  }
  function wireDrawer() {
    drawer.addEventListener('click', function (e) {
      if (e.target === drawer || e.target.closest('[data-dr-close]')) return drawer.close();
      if (e.target.closest('[data-dr-ext]')) setTimeout(function () { drawer.close(); }, 0);
    });
    drawer.addEventListener('close', function () {
      setExp(false); var o = drOpener && document.getElementById(drOpener); if (o && o.offsetParent) o.focus();
    });
    var chg = function () { if (drawer.open) drawer.close(); };
    if (mq.addEventListener) mq.addEventListener('change', chg); else mq.addListener(chg);
  }
  function drawerPaint() {
    if (!drawer) return;
    var g = isGuest();
    drawer.querySelector('.dr-login').hidden = !g;
    drawer.querySelectorAll('.dr-bottom a').forEach(function (a) { if (a.dataset.to === FILE) a.setAttribute('aria-current', 'page'); });
    drawer.querySelectorAll('[data-dr-need]').forEach(function (a) {
      var to = a.dataset.to; a.href = g ? 'login.html?next=' + encodeURIComponent(to) : to;
      a.querySelector('[data-dr-hint]').hidden = !g;
      if (to === FILE) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    drawer.querySelector('[data-dr-login]').href = FILE === 'login.html' ? 'login.html' : 'login.html?next=' + encodeURIComponent(FILE);
  }
  // 약관 개정 예고 배너(상태 n=upcoming에서만): 헤더 아래 한 줄, 닫으면 이 탭 세션 동안 숨김. 약관·동의·로그인 화면에는 띄우지 않는다.
  function revBar() {
    var o = document.getElementById('revbar'), gone = false;
    try { gone = sessionStorage.getItem('mw.rev.x') === '1'; } catch (e) {}
    var on = H && b.dataset.n === 'upcoming' && !gone && ['terms.html', 'consent.html', 'login.html'].indexOf(FILE) < 0;
    if (!on) { if (o) o.remove(); return; }
    if (o) return;
    o = document.createElement('div'); o.id = 'revbar'; o.className = 'notice revbar'; o.setAttribute('role', 'status');
    o.innerHTML = '<div class="wrap"><p class="small">약관이 곧 바뀌어요. 시행일 <span class="slot">날짜</span> <a href="terms.html?k=terms&v=new">자세히 보기</a></p><button class="btn ib" type="button" data-icon="x" data-label="개정 안내 닫기" data-revx>닫기</button></div>';
    H.insertAdjacentElement('afterend', o); if (window.mockIcons) window.mockIcons(o);
    o.querySelector('[data-revx]').addEventListener('click', function () { try { sessionStorage.setItem('mw.rev.x', '1'); } catch (e) {} o.remove(); });
  }
  function isGuest() { return ['state', 'auth', 's'].some(function (k) { return b.dataset[k] === 'guest'; }); }
  if (H) {
    var a = H.dataset.active || '', c = function (k) { return a === k ? ' aria-current="page"' : ''; };
    var live = '<span aria-hidden="true">LIVE</span><span class="sr">라이브</span>';
    var tabsOn = !document.body.hasAttribute('data-notabs') && (a === 'live' || a === 'videos');
    H.innerHTML = '<div class="wrap"><button class="btn ib hbtn hide-d" id="menubtn" type="button" data-icon="menu" data-label="메뉴 열기" aria-haspopup="dialog" aria-expanded="false" aria-controls="drawer">메뉴</button>' +
      '<a class="brand" href="main.html">말씀ON</a>' +
      '<nav class="nav" aria-label="주 메뉴"><a href="main.html"' + c('live') + '>' + live + '</a><a href="videos.html"' + c('videos') + '>다시보기</a><a href="subscriptions.html"' + c('subs') + '>구독</a><a href="upcoming.html"' + c('up') + '>방송 예정</a></nav>' +
      '<form class="hsearch" role="search" action="search.html"><label class="sr" for="hq">검색</label><span class="hs-box"><button class="hs-go" type="submit" data-icon="search" data-label="검색"></button><input class="input" id="hq" type="search" name="q" autocomplete="off" placeholder="방송·목회자 검색"></span></form>' +
      '<div class="htools"><a class="btn ib hbtn hide-d srch" href="search.html" data-icon="search" data-label="검색">검색</a><a class="btn ib hbtn bellbtn" href="notifications.html" data-icon="bell" data-label="알림">알림</a>' +
      '<a class="btn hbtn actbtn" href="activity.html" data-icon="clock" data-label="내 활동" data-keep' + c('act') + '><span class="lbl">내 활동</span></a>' +
      '<a class="btn loginbtn" href="login.html" hidden>로그인</a>' +
      '<a class="btn hbtn hide-m me" href="my.html" data-icon="user" data-label="MY" data-keep' + c('my') + '><span class="lbl">MY</span></a>' +
      '<button class="btn hbtn hide-m" id="morebtn" type="button" data-icon="menu" data-label="더보기" data-keep aria-haspopup="dialog" aria-expanded="false" aria-controls="drawer"><span class="lbl">더보기</span></button></div></div>' +
      (tabsOn ? '<nav class="subtabs" aria-label="화면 구분"><a href="main.html"' + c('live') + '>' + live + '</a><a href="videos.html"' + c('videos') + '>다시보기</a></nav>' : '');
    H.className = 'topbar'; if (window.mockIcons) window.mockIcons(H);
    H.querySelectorAll('[data-keep]:not(.me)').forEach(function (e) { e.setAttribute('aria-label', e.dataset.label); });
    H.addEventListener('click', function (e) { var t = e.target.closest('[aria-controls="drawer"]'); if (t) openDrawer(t); });
    if (!document.body.hasAttribute('data-notabs')) {
      var T = document.createElement('nav'); T.className = 'bottombar'; T.setAttribute('aria-label', '하단 메뉴');
      var home = a === 'live' || a === 'videos' ? ' aria-current="page"' : '';
      T.innerHTML = '<a href="main.html"' + home + '>홈</a><a href="subscriptions.html"' + c('subs') + '>구독</a><a href="upcoming.html"' + c('up') + '>방송 예정</a><a href="my.html"' + c('my') + '>MY</a>';
      document.body.appendChild(T);
    }
  }
  if (q.get('theme')) document.documentElement.dataset.theme = q.get('theme');
  function render() {
    if (window.mockDerive) window.mockDerive(b);
    var guest = isGuest(), file = FILE, lg = file === 'login.html' ? 'login.html' : 'login.html?next=' + encodeURIComponent(file);
    var lb = document.querySelector('.loginbtn'), ab = document.querySelector('.actbtn');
    if (lb) { lb.hidden = !guest; lb.href = lg; }
    if (ab) ab.hidden = guest;
    drawerPaint(); revBar();
    var bell = document.querySelector('.bellbtn');
    if (bell) {
      bell.hidden = guest;
      var n = window.mockUnread ? window.mockUnread(b) : 3, cnt = bell.querySelector('.cnt'), t = n > 0 ? '알림, 안 읽음 ' + n + '개' : '알림';
      if (!cnt) { cnt = document.createElement('span'); cnt.className = 'cnt'; cnt.setAttribute('aria-hidden', 'true'); bell.appendChild(cnt); }
      cnt.textContent = n > 99 ? '99+' : (n > 0 ? String(n) : '');
      bell.setAttribute('aria-label', t); bell.title = t;
    }
    document.querySelectorAll('[data-show]').forEach(function (el) {
      var ok = el.dataset.show.split(' ').every(function (c) {
        var p = c.split('='), vals = p[1].split('|');
        return vals.indexOf(b.dataset[p[0]] || '') > -1;
      });
      el.hidden = !ok;
    });
    document.querySelectorAll('[data-set]').forEach(function (btn) {
      var p = btn.dataset.set.split(':');
      var on = String(b.dataset[p[0]] === p[1]);
      btn.setAttribute(btn.getAttribute('role') === 'tab' ? 'aria-selected' : 'aria-pressed', on);
    });
  }
  document.querySelectorAll('[data-default]').forEach(function (el) {
    el.dataset.default.split(' ').forEach(function (c) { var p = c.split(':'); b.dataset[p[0]] = p[1]; });
  });
  q.forEach(function (v, k) { if (k !== 'theme') b.dataset[k] = v; });
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-set]');
    if (t) { var p = t.dataset.set.split(':'); b.dataset[p[0]] = p[1]; render(); }
    var f = e.target.closest('[data-toggle]');
    if (f) { var on = f.getAttribute('aria-pressed') !== 'true'; f.setAttribute('aria-pressed', on); var o = f.dataset.on, off = f.dataset.off; if (o) { if (!f.dataset.icon) f.textContent = on ? o : off; else if (f.hasAttribute('data-keep')) f.lastChild.textContent = on ? o : off; } if (window.mockLabel) window.mockLabel(f); }
  });
  render();
  window.mockRender = render;
})();

// 전체화면 보기(목업): 영상 영역을 Fullscreen API로 확대한다. 실제 앱·웹뷰 동작은 작업 9-2에서 기기별로 검증 필요(iOS는 요소 전체화면 미지원).
document.addEventListener('click', function (e) {
  var b = e.target.closest('[data-fs]'); if (!b) return;
  var box = b.closest('[data-fs-box]') || b.closest('.stage, .pstage'); if (!box) return;
  var fs = document.fullscreenElement || document.webkitFullscreenElement;
  if (fs) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); return; }
  var req = box.requestFullscreen || box.webkitRequestFullscreen;
  if (req) req.call(box); else alert('이 브라우저는 요소 전체화면을 지원하지 않아요. (목업 안내)');
});
document.addEventListener('fullscreenchange', function () {
  var on = !!document.fullscreenElement;
  document.querySelectorAll('[data-fs]').forEach(function (b) {
    b.setAttribute('aria-label', on ? '전체화면 종료' : '전체화면으로 보기');
  });
});

// 전체화면 중 채팅 열기/닫기(목업): .live-grid에 chat-off 클래스를 토글한다.
document.addEventListener('click', function (e) {
  var b = e.target.closest('[data-chat-toggle]'); if (!b) return;
  var g = b.closest('.live-grid'); if (!g) return;
  var off = g.classList.toggle('chat-off');
  b.setAttribute('aria-pressed', off ? 'false' : 'true');
  b.setAttribute('aria-label', off ? '채팅 열기' : '채팅 닫기');
  b.title = off ? '채팅 열기' : '채팅 닫기';
});

// 공유 시트(목업): [data-share="제목 · 방송국"] 버튼이 <dialog>를 연다. 상태는 body data-sh = ok|copyfail|linkfail|restricted (쿼리 ?sh=). OS 공유 지원 기기는 이 화면 대신 OS 시트가 열린다.
(function () {
  var dlg, opener, timer;
  function build() {
    dlg = document.createElement('dialog'); dlg.setAttribute('aria-labelledby', 'sh-t');
    dlg.innerHTML = '<h2 id="sh-t" tabindex="-1">공유하기</h2><p class="muted small" id="sh-m" style="margin-top:4px"></p>' +
      '<label class="field" id="sh-f" style="margin-top:12px"><span class="label">링크</span><input class="input" id="sh-u" readonly value="https://malsseumon.example/s/샘플"></label>' +
      '<p class="err" id="sh-e" role="alert" hidden>복사하지 못했어요. 링크를 길게 눌러 직접 복사해 주세요</p>' +
      '<div class="notice danger" id="sh-x" role="alert" hidden style="margin-top:12px"><strong>링크를 만들지 못했어요</strong><p style="margin-top:8px"><button class="btn" type="button" id="sh-r">다시 시도</button></p></div>' +
      '<button class="btn primary block" type="button" id="sh-c" style="margin-top:12px">링크 복사</button><p class="sr" role="status" id="sh-s"></p>' +
      '<p class="help" id="sh-h">링크를 받은 사람이 볼 수 있는지는 방송의 공개 범위와 로그인 상태에 따라 달라요.</p>' +
      '<div class="notice" id="sh-n" hidden style="margin-top:12px"><p>이 방송은 권한이 있는 사람만 볼 수 있어요. 링크를 받아도 권한이 없으면 볼 수 없어요.</p></div>' +
      '<div class="row" style="margin-top:20px;justify-content:flex-end"><button class="btn" type="button" id="sh-k">닫기</button></div>';
    document.body.appendChild(dlg);
    dlg.querySelector('#sh-k').onclick = function () { dlg.close(); };
    dlg.addEventListener('close', function () { clearTimeout(timer); if (opener) opener.focus(); });
    dlg.querySelector('#sh-r').onclick = function () { document.body.dataset.sh = 'ok'; if (window.mockRender) window.mockRender(); paint(); };
    dlg.querySelector('#sh-c').onclick = function () {
      var c = dlg.querySelector('#sh-c'), s = document.body.dataset.sh, u = dlg.querySelector('#sh-u');
      if (s === 'copyfail') { dlg.querySelector('#sh-e').hidden = false; u.focus(); u.select(); return; }
      c.textContent = '복사했어요'; dlg.querySelector('#sh-s').textContent = '복사했어요';
      clearTimeout(timer); timer = setTimeout(function () { c.textContent = '링크 복사'; dlg.querySelector('#sh-s').textContent = ''; }, 3000);
    };
  }
  function paint() {
    var s = document.body.dataset.sh || 'ok', q = function (i) { return dlg.querySelector(i); };
    q('#sh-f').hidden = s === 'linkfail'; q('#sh-x').hidden = s !== 'linkfail'; q('#sh-c').disabled = s === 'linkfail';
    q('#sh-e').hidden = true; q('#sh-n').hidden = s !== 'restricted'; q('#sh-h').hidden = s === 'restricted';
    q('#sh-c').textContent = '링크 복사'; q('#sh-s').textContent = '';
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-share]'); if (!b) return;
    if (!dlg) build(); opener = b; dlg.querySelector('#sh-m').textContent = b.dataset.share; paint(); dlg.showModal(); dlg.querySelector('#sh-t').focus();
  });
})();

// 신고 접수 대화상자(목업): [data-report="대상 문구"] 버튼 또는 채팅 ⋯ 메뉴([data-msg-menu])의 '신고'가 <dialog>를 연다. 상태는 body data-rp = ok|sending|done|dup|nokind|fail|gone|guest|limited (쿼리 ?rp=). 비회원 채팅(chat=guest)은 항상 guest.
(function () {
  var dlg, mdlg, opener, forced, going;
  var R = ['외부 후원 유도(계좌·연락처·링크)', '저작권 침해', '사칭', '욕설·혐오·괴롭힘', '허위 정보', '기타'];
  var RD = ['외부 후원 유도(계좌·연락처·링크)', '사칭', '욕설·혐오·괴롭힘', '기타']; // 후원 메시지: 저작권·스팸·도배 뺌, TTS 별도 항목 없음. 전체가 사용자 결정 전
  var RC = ['외부 후원 유도(계좌·연락처·링크)', '사칭', '욕설·혐오·괴롭힘', '스팸·도배', '기타']; // 채팅 기본안: 저작권 침해 뺌. 목록 전체가 사용자 결정 전
  function q(i) { return dlg.querySelector(i); }
  function back(b) { var t = b && b.isConnected && b.offsetParent ? b : document.getElementById('h-chat'); if (t) t.focus(); }
  function backdrop(d) { d.addEventListener('click', function (e) { if (e.target !== d) return; var r = d.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close(); }); }
  function build() {
    dlg = document.createElement('dialog'); dlg.className = 'sheet'; dlg.setAttribute('aria-labelledby', 'rp-t');
    dlg.innerHTML = '<h2 id="rp-t" tabindex="-1">신고하기</h2><div class="muted small" id="rp-m" style="margin-top:4px"></div>' +
      '<div id="rp-res" role="status"></div>' +
      '<form id="rp-f" onsubmit="return false"><fieldset style="border:0;padding:0;margin:12px 0 0" aria-describedby="rp-e"><legend style="font-weight:700;color:var(--strong)">신고 사유 <span class="slot">사유 목록 사용자 결정 전</span></legend>' +
      '<div id="rp-rs"></div><p class="err" id="rp-e" hidden>신고 사유를 선택해 주세요.</p></fieldset>' +
      '<div class="field" id="rp-o" hidden style="margin-top:8px"><label class="label" for="rp-x">자세한 내용</label><textarea class="textarea" id="rp-x" aria-describedby="rp-xh"></textarea><p class="help" id="rp-xh">계좌번호 등 개인정보는 쓰지 마세요.</p></div>' +
      '<div id="rp-chat" hidden style="margin-top:12px"><p class="help" id="rp-ch"></p><p class="help">신고한 메시지와 신고 내용의 보관 기간: <span class="slot">보존 기간</span></p></div>' +
      '<div class="field" id="ev" style="margin-top:12px"><span class="label" id="ev-l">내가 올린 증빙 (선택)</span>' +
      '<p class="help">화면 캡처 등 신고 내용을 보여 주는 파일이에요. 형식 <span class="slot">형식</span>, 최대 <span class="slot">개수</span>개, 한 개당 <span class="slot">크기</span></p>' +
      '<label class="btn block ev-pick" id="ev-pick" style="margin-top:8px">파일 선택<input class="sr" type="file" multiple id="ev-in" aria-label="파일 선택, 내가 올린 증빙"></label>' +
      '<p class="help" id="ev-full" hidden>더 올릴 수 없어요(<span class="slot">개수</span>개). 삭제한 뒤 추가할 수 있어요.</p>' +
      '<p class="help">신고 내용과 관계없는 다른 사람의 얼굴, 연락처, 계좌번호, 주소가 보이면 가려서 올려 주세요. <span class="slot">보관 기간·열람 범위 안내 문구 법무 확인 전</span> <span class="slot">수집 동의 문구 법무 확인 전</span></p>' +
      '<ul class="plain ev-list" id="ev-list" aria-label="첨부한 증빙 목록" hidden></ul><p class="sr" id="ev-live" role="status"></p>' +
      '<div class="mockbar" style="margin-top:8px"><div class="group"><b>증빙 목업</b><button type="button" data-ev-add="up">올리는 중</button><button type="button" data-ev-add="ok">첨부됨</button><button type="button" data-ev-add="bad1">형식 거절</button><button type="button" data-ev-add="bad2">크기 거절</button><button type="button" data-ev-add="fail">실패</button><button type="button" id="ev-lim" aria-pressed="false">개수 한도</button></div></div></div>' +
      '<p class="help" style="margin-top:12px"><span class="slot">신고자 공개 여부 안내</span></p>' +
      '<p class="help" style="margin-top:4px">접수된 신고는 운영자가 검토해요. 바로 처리되지 않을 수 있고, 결과와 시점은 달라질 수 있어요.</p><p class="help" id="rp-h">신고 사유를 선택해 주세요.</p>' +
      '<div class="notice" id="ev-esc" role="alert" hidden style="margin-top:12px"><strong>올리는 중인 파일이 있어요</strong><p>지금 닫으면 신고가 접수되지 않아요.</p><p class="row" style="margin-top:8px"><button class="btn" type="button" id="ev-stay">계속 올리기</button><button class="btn" type="button" id="ev-quit">그만두고 닫기</button></p></div>' +
      '<div class="row" style="margin-top:16px;justify-content:flex-end"><button class="btn" type="button" id="rp-c">취소</button><button class="btn primary" type="submit" id="rp-s" disabled>신고 접수</button></div></form>';
    document.body.appendChild(dlg);
    backdrop(dlg);
    dlg.addEventListener('close', function () { back(opener); });
    q('#rp-c').onclick = evClose;
    dlg.addEventListener('cancel', function (e) { if (evBusy()) { e.preventDefault(); evClose(); } });
    q('#ev-stay').onclick = function () { q('#ev-esc').hidden = true; q('#rp-c').focus(); };
    q('#ev-quit').onclick = function () { dlg.close(); };
    evBind();
    dlg.addEventListener('change', function (e) {
      if (e.target.name !== 'rpk') return;
      q('#rp-o').hidden = e.target.value !== 'etc'; q('#rp-s').disabled = false; q('#rp-h').hidden = true; q('#rp-e').hidden = true; evSync();
    });
    q('#rp-f').addEventListener('submit', function () {
      if (q('#rp-s').getAttribute('aria-disabled') === 'true') return;
      if (!q('input[name=rpk]:checked')) { q('#rp-e').hidden = false; return; }
      if ((forced || document.body.dataset.rp || 'ok') === 'ok') document.body.dataset.rp = 'done';
      paint();
    });
  }
  // 증빙(목업): 행 상태 li[data-ev] = up|ok|bad|fail. 실제 업로드는 없다. 파일 선택은 잠시 뒤 첨부됨으로 바뀌고, 목업 버튼은 그 상태에 머문다.
  var EV_MAX = 3, EV_MS = 1500, evN = 0, evLim = false; // 목업 내부 값. 화면에는 .slot으로만 보인다
  function evSay(t) { q('#ev-live').textContent = t; }
  function evBusy() { return !q('#rp-f').hidden && !!q('#ev-list [data-ev="up"]'); }
  function evClose() { if (!evBusy()) return dlg.close(); q('#ev-esc').hidden = false; q('#ev-stay').focus(); }
  function evSync() {
    var L = q('#ev-list'), n = function (s) { return L.querySelectorAll('[data-ev="' + s + '"]').length; };
    var up = n('up'), fail = n('fail'), full = evLim || up + n('ok') + fail >= EV_MAX; // 거절(bad) 행은 개수에 넣지 않는다
    var kind = !!q('input[name=rpk]:checked'), h = q('#rp-h'), b = q('#rp-s'), pick = q('#ev-pick');
    L.hidden = !L.children.length;
    q('#ev-in').disabled = full; q('#ev-full').hidden = !full;
    if (full) pick.setAttribute('aria-disabled', 'true'); else pick.removeAttribute('aria-disabled');
    b.disabled = !kind;
    if (up) b.setAttribute('aria-disabled', 'true'); else b.removeAttribute('aria-disabled');
    h.textContent = up ? '파일을 올리는 중이에요. 다 올라가면 접수할 수 있어요.' : !kind ? '신고 사유를 선택해 주세요.' : fail ? '올리지 못한 파일 ' + fail + '개는 빼고 접수돼요.' : '';
    h.hidden = !h.textContent;
    if (!up) q('#ev-esc').hidden = true;
  }
  function evAdd(name, k, auto) {
    if (q('#ev-in').disabled) return evSay('더 올릴 수 없어요');
    var li = document.createElement('li'); li.className = 'item ev-row'; li.dataset.name = name;
    if (k.indexOf('bad') === 0) { li.dataset.why = k; k = 'bad'; }
    q('#ev-list').appendChild(li); evSet(li, k, auto);
  }
  function evSet(li, s, auto) {
    var n = li.dataset.name, had = li.contains(document.activeElement), size = '<span class="muted small"><span class="slot">파일 크기</span></span>';
    var B = function (d, t, al, ic) { return '<button class="btn" type="button" data-ev-do="' + d + '" data-al="' + al + '"' + (ic ? ' data-icon="x"' : '') + '>' + t + '</button>'; };
    li.dataset.ev = s;
    li.innerHTML = '<span class="ev-name"></span><span class="ev-meta">' + {
      up: size + '<span class="ev-st">올리는 중</span><progress></progress>', ok: size + '<span class="ev-st">첨부됨</span>',
      bad: '<span class="err">이 파일은 올릴 수 없어요: ' + (li.dataset.why === 'bad2' ? '크기 <span class="slot">크기</span> 초과' : '형식이 <span class="slot">형식</span> 아님') + '</span>',
      fail: size + '<span class="err" role="alert">올리지 못했어요</span>' }[s] + '</span><span class="ev-act">' + {
      up: B('rm', '취소', '올리기 취소'), ok: B('rm', '삭제', '삭제'), bad: B('rm', '닫기', '안내 닫기', 1),
      fail: B('retry', '다시 시도', '다시 올리기') + B('rm', '삭제', '삭제') }[s] + '</span>' +
      (s === 'fail' ? '<span class="help ev-wide">증빙 없이도 접수할 수 있어요.</span>' : '');
    var nm = li.firstChild, p = li.querySelector('progress'); nm.textContent = n; nm.title = n; if (p) p.setAttribute('aria-label', n);
    if (window.mockIcons) window.mockIcons(li);
    li.querySelectorAll('[data-al]').forEach(function (b) { b.setAttribute('aria-label', n + ' ' + b.dataset.al); if (b.title) b.title = b.dataset.al; });
    if (had) li.querySelector('.ev-act .btn:last-child').focus();
    var say = { up: ' 올리는 중', ok: ' 올렸어요', bad: ' 올릴 수 없는 파일이에요' }[s]; if (say) evSay(n + say); // 실패는 행의 role=alert가 읽는다
    if (auto) setTimeout(function () { if (li.isConnected && li.dataset.ev === 'up') evSet(li, 'ok'); }, EV_MS);
    evSync();
  }
  function evBind() {
    q('#ev-in').addEventListener('change', function (e) {
      Array.prototype.forEach.call(e.target.files, function (f) { evAdd(f.name, 'up', 1); }); // 형식·크기 검사는 정책 값이 없어 하지 않는다(거절은 목업 버튼으로 본다)
      e.target.value = '';
    });
    dlg.addEventListener('click', function (e) {
      var a = e.target.closest('[data-ev-add]'), r = e.target.closest('[data-ev-do]');
      if (e.target.closest('#ev-lim')) { evLim = !evLim; q('#ev-lim').setAttribute('aria-pressed', evLim); evSync(); }
      if (a) evAdd('증빙 파일 (샘플) ' + (++evN), a.dataset.evAdd);
      if (!r) return;
      var li = r.closest('li'), nx = li.nextElementSibling, n = li.dataset.name, was = li.dataset.ev;
      if (r.dataset.evDo === 'retry') return evSet(li, 'up', 1);
      li.remove(); evSync();
      evSay(n + (was === 'up' ? ' 올리기를 취소했어요' : was === 'bad' ? ' 안내를 닫았어요' : ' 삭제했어요'));
      // 포커스: 다음 행의 삭제 버튼, 없으면 파일 선택(한도로 꺼져 있으면 제목)
      ((nx && nx.querySelector('.ev-act .btn:last-child')) || (!q('#ev-in').disabled && q('#ev-in')) || q('#rp-t')).focus();
    });
  }
  function paint() {
    var s = forced || document.body.dataset.rp || 'ok', res = q('#rp-res'), f = q('#rp-f'), btn = q('#rp-s');
    var link = '<p style="margin-top:8px"><a href="reports.html">내 신고 보기</a></p>', evn = dlg.querySelectorAll('#ev-list [data-ev="ok"]').length;
    var msg = { done: '<strong>신고를 접수했어요</strong><p>' + (evn ? '첨부 ' + evn + '개 포함. ' : '') + '처리 상태는 내 신고에서 볼 수 있어요.</p>' + link,
      dup: '<strong>이미 신고한 내용이에요</strong>' + link, limited: '<strong>지금은 신고할 수 없어요</strong><p>신고하려면 <span class="slot">제한 조건</span>이 필요해요.</p>', gone: '<strong>이미 사라진 내용이에요</strong>',
      guest: '<strong>로그인하면 신고할 수 있어요</strong><p style="margin-top:8px"><a class="btn primary" href="login.html?next=' + encodeURIComponent(location.pathname.split('/').pop() || 'main.html') + '">로그인</a></p>',
      fail: '<strong>신고를 접수하지 못했어요</strong><p style="margin-top:8px"><button class="btn" type="button" id="rp-r">다시 시도</button></p>' }[s];
    res.className = msg ? (s === 'fail' ? 'notice danger' : 'notice') : ''; res.style.marginTop = msg ? '12px' : ''; res.innerHTML = msg || '';
    res.setAttribute('role', s === 'fail' ? 'alert' : 'status');
    f.hidden = ['done', 'dup', 'gone', 'guest', 'limited'].indexOf(s) > -1;
    btn.textContent = s === 'sending' ? '접수하는 중' : '신고 접수'; btn.setAttribute('aria-busy', s === 'sending');
    if (s === 'sending') btn.disabled = true;
    q('#rp-e').hidden = s !== 'nokind'; if (s === 'nokind') q('#rp-h').hidden = true;
    var r = q('#rp-r'); if (r) r.onclick = function () { document.body.dataset.rp = 'ok'; paint(); };
    if (f.hidden && !q('#rp-k')) { var k = document.createElement('div'); k.id = 'rp-k'; k.className = 'row'; k.style.cssText = 'margin-top:16px;justify-content:flex-end'; k.innerHTML = '<button class="btn" type="button">닫기</button>'; k.firstChild.onclick = function () { dlg.close(); }; res.after(k); }
    var k2 = q('#rp-k'); if (k2) k2.hidden = !f.hidden;
  }
  function openReport(b, chat) {
    if (!dlg) build(); opener = b;
    forced = chat && document.body.dataset.chat === 'guest' ? 'guest' : null;
    var m = q('#rp-m'); m.textContent = '';
    if (chat) {
      var h = document.createElement('div'); h.append((chat.kind === 'don' ? '후원 메시지 · ' : '채팅 메시지 · ') + chat.nick + ' · '); var sl = document.createElement('span'); sl.className = 'slot'; sl.textContent = '보낸 시각'; h.append(sl);
      var bq = document.createElement('blockquote'); bq.className = 'rp-q'; bq.textContent = chat.text; m.append(h, bq);
    } else m.textContent = b.dataset.report;
    q('#rp-chat').hidden = !chat;
    if (chat) q('#rp-ch').textContent = chat.kind === 'don' ? '신고하는 후원 메시지의 작성자, 내용, 보낸 시각과 해당 후원 기록이 신고와 함께 접수돼요.' : '신고하는 메시지의 작성자, 내용, 보낸 시각이 신고와 함께 접수돼요.';
    var L = chat ? (chat.kind === 'don' ? RD : RC) : R;
    q('#rp-rs').innerHTML = L.map(function (r, i) { return '<label class="check"><input type="radio" name="rpk" value="' + (i === L.length - 1 ? 'etc' : i) + '"><span>' + r + '</span></label>'; }).join('');
    q('#rp-o').hidden = true; q('#rp-s').disabled = true; q('#rp-h').hidden = false;
    q('#ev-list').innerHTML = ''; evLim = false; q('#ev-lim').setAttribute('aria-pressed', 'false'); q('#ev-live').textContent = ''; evSync();
    paint(); dlg.showModal(); q('#rp-t').focus();
  }
  function openMenu(b) {
    var nick = b.dataset.nick, text = b.dataset.text;
    if (!mdlg) {
      mdlg = document.createElement('dialog'); mdlg.className = 'sheet'; mdlg.setAttribute('aria-labelledby', 'mn-t');
      mdlg.innerHTML = '<p id="mn-t" style="font-weight:700;color:var(--strong)"><span id="mn-n"></span> <span id="mn-k">메시지</span></p><p class="muted small ellipsis" id="mn-b"></p>' +
        '<p style="margin-top:8px"><button class="btn mn-bad block" type="button" id="mn-r" data-icon="flag" data-keep>신고</button></p><p><button class="btn block" type="button" id="mn-x">닫기</button></p>';
      document.body.appendChild(mdlg); if (window.mockIcons) window.mockIcons(mdlg); backdrop(mdlg);
      mdlg.querySelector('#mn-x').onclick = function () { mdlg.close(); };
      mdlg.querySelector('#mn-r').onclick = function () { going = true; mdlg.close(); going = false; openReport(opener, { nick: opener.dataset.nick, text: opener.dataset.text, kind: opener.dataset.kind }); };
      mdlg.addEventListener('close', function () { if (!going) back(opener); });
    }
    opener = b; mdlg.querySelector('#mn-n').textContent = nick; mdlg.querySelector('#mn-k').textContent = b.dataset.kind === 'don' ? '후원 메시지' : '메시지'; mdlg.querySelector('#mn-b').textContent = text;
    mdlg.showModal(); mdlg.querySelector('#mn-r').focus();
  }
  document.addEventListener('click', function (e) {
    var m = e.target.closest('[data-msg-menu]'); if (m) return openMenu(m);
    var b = e.target.closest('[data-report]'); if (!b) return;
    openReport(b, null);
  });
})();
