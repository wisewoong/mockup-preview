// 운영사 목업 셸(검토용). 상태: ?theme=dark&role=super&s=empty. role: op(일반 운영자) / super(최고 관리자)
(function () {
  var b = document.body, q = new URLSearchParams(location.search), H = document.getElementById('site-header');
  var ROLE = { op: '일반 운영자', super: '최고 관리자' };
  var NAV = [
    ['처리', [['reports', '신고·모더레이션'], ['appeals', '이의제기'], ['verification', '목회자 심사'], ['refunds', '환불·결제 오류'], ['inquiries', '문의 접수함'], ['vod-reprocess', 'VOD 재처리'], ['partners', '파트너 지정'], ['banned-words', '금칙어 관리']]],
    ['회원·방송국', [['members', '회원 관리'], ['stations', '방송국 관리']]],
    ['문서·공지', [['documents', '약관·정책 문서'], ['notices', '플랫폼 공지']]],
    ['정산', [['settlements', '정산 목록'], ['settlement-batch', '정산 마감'], ['payout-reviews', '수령 정보 확인']]],
    ['위험 설정', [['products', '열매 충전 상품', 1], ['fees', '수수료율', 1], ['limits', '후원·TTS 한도', 1]]],
    ['기록·권한', [['audit', '감사 로그·운영자 권한']]]
  ];
  if (q.get('theme')) document.documentElement.dataset.theme = q.get('theme');
  // 시안 B 글꼴(Sora 제목·숫자, Noto Sans KR 본문). 오프라인이면 시스템 글꼴로 대체
  var fl = document.createElement('link'); fl.rel = 'stylesheet'; fl.href = 'https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Noto+Sans+KR:wght@400;500;700&display=swap';
  document.head.appendChild(fl);
  document.querySelectorAll('[data-default]').forEach(function (el) {
    el.dataset.default.split(' ').forEach(function (c) { var p = c.split(':'); b.dataset[p[0]] = p[1]; });
  });
  if (!b.dataset.role) b.dataset.role = 'op';
  q.forEach(function (v, k) { if (k !== 'theme') b.dataset[k] = v; });

  var act = H ? H.dataset.active : '';
  function navHtml() {
    return NAV.map(function (g, i) {
      return (i ? '<hr>' : '') + '<h2>' + g[0] + '</h2>' + g[1].map(function (n) {
        // 운영자 권한은 최고 관리자 전용이라 일반 운영자에게는 항목명만 "감사 로그"
        var nm = n[0] === 'audit' && b.dataset.role !== 'super' ? '감사 로그' : n[1];
        return '<a href="' + n[0] + '.html"' + (act === n[0] ? ' aria-current="page"' : '') + '><span>' + nm + '</span>' + (n[2] ? '<span class="tag adm">최고 관리자</span>' : '') + '</a>';
      }).join('');
    }).join('');
  }
  if (H) {
    H.className = 'topbar';
    var cur = H.dataset.title || (act === 'index' ? '운영사 홈' : (NAV.reduce(function (a, g) { return a.concat(g[1]); }, []).filter(function (n) { return n[0] === act; })[0] || [0, ''])[1]);
    H.innerHTML = '<div class="wrap hd-d"><a class="brand" href="index.html">말씀<b>ON</b> <small>운영사</small></a><span style="flex:1"></span>' +
      '<span class="who"><strong>샘플 운영자</strong> <span class="tag role"></span></span>' +
      '<button class="btn ib hbtn" type="button" data-open="me-dlg" aria-label="내 정보" title="내 정보"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg></button></div>' +
      '<div class="wrap hd-m"><button class="btn ib hbtn" type="button" id="op-menu" aria-label="메뉴 열기" title="메뉴" aria-expanded="false" aria-controls="op-drawer"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>' +
      '<strong class="hd-title">' + cur + '</strong><span class="tag role"></span></div>';
    var d = document.createElement('dialog'); d.id = 'me-dlg'; d.setAttribute('aria-labelledby', 'me-t');
    d.innerHTML = '<h2 id="me-t">내 정보</h2><p class="muted small" style="margin-top:4px">샘플 운영자 · <span class="role"></span></p>' +
      '<div class="row" style="margin-top:20px;justify-content:flex-end"><button class="btn" type="button" data-close autofocus>닫기</button></div>';
    document.body.appendChild(d);
    var dr = document.createElement('dialog'); dr.id = 'op-drawer'; dr.className = 'drawer'; dr.setAttribute('aria-label', '운영사 메뉴');
    dr.innerHTML = '<div class="dr-top"><div><strong>샘플 운영자</strong> <span class="tag role"></span></div>' +
      '<button class="btn ib hbtn" type="button" data-open="me-dlg" aria-label="내 정보" title="내 정보"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg></button>' +
      '<button class="btn ib hbtn" type="button" data-close aria-label="닫기" title="닫기"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div><nav class="op-nav" aria-label="운영사 메뉴"></nav>';
    document.body.appendChild(dr);
    var mb = document.getElementById('op-menu');
    mb.addEventListener('click', function () { dr._opener = mb; mb.setAttribute('aria-expanded', 'true'); dr.showModal(); });
    dr.addEventListener('close', function () { mb.setAttribute('aria-expanded', 'false'); mb.focus(); });
    // 내 정보를 드로어에서 열면 드로어를 먼저 닫는다(대화상자 겹침 방지)
    dr.querySelector('[data-open]').addEventListener('click', function () { dr.close(); }, true);
  }
  var N = document.getElementById('op-nav');
  function nav() {
    if (N) N.innerHTML = navHtml();
    var dn = document.querySelector('#op-drawer .op-nav'); if (dn) dn.innerHTML = navHtml();
  }
  document.querySelectorAll('[data-rolebar]').forEach(function (g) {
    g.className = 'group'; g.setAttribute('role', 'group'); g.setAttribute('aria-label', '내 역할');
    g.innerHTML = '<b>내 역할</b><button data-set="role:op">일반 운영자</button><button data-set="role:super">최고 관리자</button>';
  });
  function render() {
    document.querySelectorAll('.role').forEach(function (r) { r.textContent = ROLE[b.dataset.role] || b.dataset.role; r.classList.remove('adm', 'mgr'); r.classList.add(b.dataset.role === 'super' ? 'adm' : 'mgr'); });
    nav();
    // 페이지를 옮겨도 내 역할·테마 유지
    document.querySelectorAll('a[href]').forEach(function (a) {
      var h = a.getAttribute('href');
      if (!/^[\w-]+\.html(\?|#|$)/.test(h)) return;
      var u = new URL(h, location.href); if (!u.searchParams.has('role')) u.searchParams.set('role', b.dataset.role);
      if (q.get('theme')) u.searchParams.set('theme', q.get('theme'));
      a.setAttribute('href', u.pathname.split('/').pop() + u.search + u.hash);
    });
    document.querySelectorAll('[data-show]').forEach(function (el) {
      el.hidden = !el.dataset.show.split(' ').every(function (c) { var p = c.split('='); return p[1].split('|').indexOf(b.dataset[p[0]] || '') > -1; });
    });
    document.querySelectorAll('[data-set]').forEach(function (btn) { var p = btn.dataset.set.split(':'); btn.setAttribute('aria-pressed', String(b.dataset[p[0]] === p[1])); });
    if (window.mockAfter) window.mockAfter(b);
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-set]');
    if (t) { var p = t.dataset.set.split(':'); b.dataset[p[0]] = p[1]; render(); }
    var o = e.target.closest('[data-open]');
    if (o) { var dl = document.getElementById(o.dataset.open); if (dl) { dl._opener = dl._opener && o.closest('#op-drawer') ? o.closest('#op-drawer')._opener : o; dl.showModal(); } }
    var c = e.target.closest('[data-close]');
    if (c) { var dd = c.closest('dialog'); if (dd) { dd.close(); if (dd._opener) dd._opener.focus(); } }
  });
  // ⋯ 더보기 메뉴: .more > button[aria-haspopup] + .mn[role=menu]. 클릭으로 열고, 바깥 클릭·Esc·Tab 으로 닫고, ↑↓·Home·End 로 이동
  function closeMenus(focusBack) {
    document.querySelectorAll('.more > button[aria-expanded="true"]').forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'false'); btn.nextElementSibling.hidden = true; if (focusBack) btn.focus();
    });
  }
  function openMenu(btn) {
    closeMenus(); var m = btn.nextElementSibling, r = btn.getBoundingClientRect();
    m.hidden = false; btn.setAttribute('aria-expanded', 'true');
    m.style.top = Math.min(r.bottom + 4, innerHeight - m.offsetHeight - 8) + 'px';
    m.style.left = Math.max(8, Math.min(r.right - m.offsetWidth, innerWidth - m.offsetWidth - 8)) + 'px';
    var f = m.querySelector('[role=menuitem]'); if (f) f.focus();
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.more > button');
    if (btn) { if (btn.getAttribute('aria-expanded') === 'true') closeMenus(true); else openMenu(btn); return; }
    if (e.target.closest('.mn')) closeMenus(true); else closeMenus();
  });
  document.addEventListener('keydown', function (e) {
    var m = e.target.closest && e.target.closest('.mn'), btn = e.target.closest && e.target.closest('.more > button');
    if (e.key === 'Escape') { if (m || btn || document.querySelector('.more > [aria-expanded=true]')) closeMenus(true); return; }
    if (btn && (e.key === 'ArrowDown' || e.key === 'ArrowUp') && btn.getAttribute('aria-expanded') !== 'true') { e.preventDefault(); openMenu(btn); return; }
    if (!m) return;
    var it = [].slice.call(m.querySelectorAll('[role=menuitem]')), i = it.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); it[(i + 1) % it.length].focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); it[(i - 1 + it.length) % it.length].focus(); }
    else if (e.key === 'Home') { e.preventDefault(); it[0].focus(); }
    else if (e.key === 'End') { e.preventDefault(); it[it.length - 1].focus(); }
    else if (e.key === 'Tab') closeMenus();
  });
  addEventListener('scroll', function () { closeMenus(); }, true);
  addEventListener('resize', function () { closeMenus(); });
  render();
  window.mockRender = render;
})();
