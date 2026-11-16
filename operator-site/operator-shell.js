// 운영사 목업 셸(검토용). 상태: ?theme=dark&role=super&s=empty. role: op(일반 운영자) / super(최고 관리자)
(function () {
  var b = document.body, q = new URLSearchParams(location.search), H = document.getElementById('site-header');
  var ROLE = { op: '일반 운영자', super: '최고 관리자' };
  var NAV = [
    ['처리', [['reports', '신고·모더레이션'], ['appeals', '이의제기'], ['verification', '목회자 심사'], ['refunds', '환불·결제 오류'], ['vod-reprocess', 'VOD 재처리'], ['partners', '파트너 지정'], ['banned-words', '금칙어 관리']]],
    ['회원·방송국', [['members', '회원 관리']]],
    ['위험 설정', [['products', '열매 충전 상품', 1], ['fees', '수수료율', 1], ['limits', '후원·TTS 한도', 1]]],
    ['기록·권한', [['audit', '감사 로그·운영자 권한']]]
  ];
  if (q.get('theme')) document.documentElement.dataset.theme = q.get('theme');
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
        return '<a href="' + n[0] + '.html"' + (act === n[0] ? ' aria-current="page"' : '') + '><span>' + nm + '</span>' + (n[2] ? '<span class="tag">최고 관리자</span>' : '') + '</a>';
      }).join('');
    }).join('');
  }
  if (H) {
    H.className = 'topbar';
    var cur = act === 'index' ? '운영사 홈' : (NAV.reduce(function (a, g) { return a.concat(g[1]); }, []).filter(function (n) { return n[0] === act; })[0] || [0, ''])[1];
    H.innerHTML = '<div class="wrap hd-d"><a class="brand" href="index.html">말씀ON 운영사</a><span style="flex:1"></span>' +
      '<span class="who"><strong>샘플 운영자</strong> <span class="tag role"></span></span>' +
      '<button class="btn" type="button" data-open="me-dlg">내 정보</button></div>' +
      '<div class="wrap hd-m"><button class="btn ib" type="button" id="op-menu" aria-label="메뉴 열기" aria-expanded="false" aria-controls="op-drawer">☰</button>' +
      '<strong class="hd-title">' + cur + '</strong><span class="tag role"></span></div>';
    var d = document.createElement('dialog'); d.id = 'me-dlg'; d.setAttribute('aria-labelledby', 'me-t');
    d.innerHTML = '<h2 id="me-t">내 정보</h2><p class="muted small" style="margin-top:4px">샘플 운영자 · <span class="role"></span></p>' +
      '<div class="row" style="margin-top:20px;justify-content:flex-end"><button class="btn" type="button" data-close autofocus>닫기</button></div>';
    document.body.appendChild(d);
    var dr = document.createElement('dialog'); dr.id = 'op-drawer'; dr.className = 'drawer'; dr.setAttribute('aria-label', '운영사 메뉴');
    dr.innerHTML = '<div class="dr-top"><div><strong>샘플 운영자</strong> <span class="tag role"></span></div>' +
      '<button class="btn" type="button" data-open="me-dlg">내 정보</button>' +
      '<button class="btn ib" type="button" data-close aria-label="닫기">✕</button></div><nav class="op-nav" aria-label="운영사 메뉴"></nav>';
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
    document.querySelectorAll('.role').forEach(function (r) { r.textContent = ROLE[b.dataset.role] || b.dataset.role; });
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
  render();
  window.mockRender = render;
})();
