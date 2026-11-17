// 목회자 사이트 목업 공통 스크립트(검토용). 시청자 mock.js에서 필요한 것만 가져왔다.
// 아이콘: data-icon="이름" data-label="접근성 이름", data-keep 이면 글자도 남긴다.
(function () {
  function S(d) { return '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">' + d + '</svg>'; }
  function P(d) { return '<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>'; }
  var I = {
    x: S(P('M6 6l12 12M18 6L6 18')),
    retry: S(P('M20 12a8 8 0 11-2.5-5.8M20 4v5h-5')),
    user: S('<circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="2.2"/>' + P('M4 21a8 8 0 0116 0')),
    site: S(P('M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5')),
    copy: S(P('M9 9h11v11H9zM5 15V4h11'))
  };
  window.mockIcons = function (root) {
    (root || document).querySelectorAll('[data-icon]:not([data-iconed])').forEach(function (el) {
      var l = el.dataset.label || el.textContent.trim();
      el.setAttribute('data-iconed', '');
      el.insertAdjacentHTML('afterbegin', I[el.dataset.icon]);
      if (el.hasAttribute('data-keep')) { el.classList.add('ik'); return; }
      Array.prototype.slice.call(el.childNodes).forEach(function (n) { if (n.nodeType === 3) el.removeChild(n); });
      el.classList.add('ib'); el.setAttribute('aria-label', l); el.title = l;
    });
  };
})();

// 상태 전환(data-set="키:값"), 표시 조건(data-show="키=a|b 키=c"), 쿼리(?theme=dark&role=mgr&s=empty), 역할별 헤더
(function () {
  var b = document.body, q = new URLSearchParams(location.search), H = document.getElementById('site-header');
  var ROLE = { owner: '소유자', adm0: '관리자', admall: '관리자', mgr: '매니저' };
  var D = { dashboard: ['dashboard', 'dashboard.html', '대시보드'], live: ['live', 'live-start.html', '라이브 시작'], videos: ['videos', 'videos.html', '영상'], donation: ['donation', 'donation-settings.html', '후원 설정'], stats: ['stats', 'stats.html', '현황'], settlements: ['settlements', 'settlements.html', '정산'], chat: ['chat', 'live-control.html', '채팅 관리'], members: ['members', 'members.html', '구성원'] };
  var ST = '샘플 방송국'; // 방송국명은 샘플
  function nav(role, a, tab) {
    // PC: 소유자 전체(정산은 소유자만), 관리자(전체 부여)는 정산 제외, 부여 없는 관리자는 라이브 시작·후원 설정도 숨김, 매니저는 채팅 관리만
    // 하단 탭은 4항목 이내(대시보드·라이브·영상·현황), 나머지는 내 정보 메뉴
    var K = role === 'mgr' ? ['chat'] : role === 'adm0' ? ['dashboard', 'videos', 'chat', 'stats'] : tab ? ['dashboard', 'live', 'videos', 'stats'] : ['dashboard', 'live', 'videos', 'donation', 'stats'].concat(role === 'owner' ? ['settlements'] : []);
    if (!tab && role !== 'mgr') K.push('members');
    return K.map(function (k) { var n = D[k]; return '<a href="' + n[1] + '"' + (a === n[0] || (a === 'live' && n[0] === 'chat') ? ' aria-current="page"' : '') + '>' + n[2] + '</a>'; }).join('');
  }
  if (q.get('theme')) document.documentElement.dataset.theme = q.get('theme');
  document.querySelectorAll('[data-default]').forEach(function (el) {
    el.dataset.default.split(' ').forEach(function (c) { var p = c.split(':'); b.dataset[p[0]] = p[1]; });
  });
  if (!b.dataset.role) b.dataset.role = 'owner';
  q.forEach(function (v, k) { if (k !== 'theme') b.dataset[k] = v; });

  var meDlg;
  if (H) {
    H.className = 'topbar';
    H.innerHTML = '<div class="wrap"><a class="brand" href="dashboard.html">말씀ON 목회자</a><nav class="nav" aria-label="주 메뉴"></nav>' +
      '<span class="who"><strong>' + ST + '</strong> <span class="tag role"></span></span>' +
      '<div class="htools"><a class="btn ib hbtn hide-m" href="../user-site/main.html" data-icon="site" data-label="시청자 사이트로 이동">사이트 이동</a>' +
      '<button class="btn hbtn" type="button" data-open="me-dlg" data-icon="user" data-label="내 정보">내 정보</button></div></div>';
    window.mockIcons(H);
    var T = document.createElement('nav'); T.className = 'bottombar four'; T.setAttribute('aria-label', '하단 메뉴'); document.body.appendChild(T);
    meDlg = document.createElement('dialog'); meDlg.id = 'me-dlg'; meDlg.setAttribute('aria-labelledby', 'me-t');
    meDlg.innerHTML = '<h2 id="me-t">내 정보</h2><p class="muted small" style="margin-top:4px">' + ST + ' · <span class="role"></span></p>' +
      '<ul class="plain" style="margin-top:12px"><li id="me-donation"><a href="donation-settings.html">후원 설정</a></li><li id="me-settle"><a href="settlements.html">정산 내역</a></li><li id="me-members"><a href="members.html">구성원</a></li><li id="me-station"><a href="station-settings.html">방송국 설정</a></li><li id="me-sanc"><a href="sanctions.html">제재 안내</a></li><li id="me-verify"><a href="verification.html">목사 인증</a></li><li><a href="create-station.html">새 방송국 만들기</a></li><li><a href="../user-site/main.html">사이트 이동 (시청자 사이트)</a></li><li><a href="../user-site/history.html">내 정보 (시청자 사이트)</a></li></ul>' +
      '<div class="row" style="margin-top:20px;justify-content:flex-end"><button class="btn" type="button" data-close>닫기</button></div>';
    document.body.appendChild(meDlg);
    // Esc·닫기 어느 쪽으로 닫아도 열었던 버튼으로 포커스 복귀(close 이벤트 한 곳에서만)
    meDlg.addEventListener('close', function () { var o = meDlg._opener; if (o && document.contains(o) && o.offsetParent !== null) o.focus(); });
  }
  // 역할 그룹(mockbar의 [data-rolebar] 안에 주입)
  document.querySelectorAll('[data-rolebar]').forEach(function (g) {
    g.className = 'group'; g.setAttribute('role', 'group'); g.setAttribute('aria-label', '내 역할');
    g.innerHTML = '<b>내 역할</b><button data-set="role:owner">소유자</button><button data-set="role:adm0">관리자(부여 없음)</button><button data-set="role:admall">관리자(전체 부여)</button><button data-set="role:mgr">매니저</button>';
  });

  function render() {
    var role = b.dataset.role, a = H ? H.dataset.active || '' : '';
    if (H) {
      H.querySelector('.nav').innerHTML = nav(role, a);
      document.querySelector('.bottombar').innerHTML = nav(role, a, true);
      [['me-members', role === 'mgr'], ['me-station', role === 'mgr'], ['me-sanc', role === 'mgr'], ['me-verify', role === 'mgr'], ['me-donation', role === 'mgr' || role === 'adm0'], ['me-settle', role !== 'owner']].forEach(function (x) { var l = document.getElementById(x[0]); if (l) l.hidden = x[1]; });
      document.querySelector('.bottombar').style.gridTemplateColumns = 'repeat(' + (role === 'mgr' ? 1 : 4) + ',1fr)';
      document.querySelectorAll('.role').forEach(function (r) { r.textContent = ROLE[role] || role; r.classList.remove('host', 'adm', 'mgr'); r.classList.add(role === 'owner' ? 'host' : role === 'mgr' ? 'mgr' : 'adm'); });
    }
    document.querySelectorAll('[data-show]').forEach(function (el) {
      el.hidden = !el.dataset.show.split(' ').every(function (c) {
        var p = c.split('='); return p[1].split('|').indexOf(b.dataset[p[0]] || '') > -1;
      });
    });
    document.querySelectorAll('[data-set]').forEach(function (btn) {
      var p = btn.dataset.set.split(':'); btn.setAttribute('aria-pressed', String(b.dataset[p[0]] === p[1]));
    });
    if (window.mockAfter) window.mockAfter(b);
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-set]');
    if (t) { var p = t.dataset.set.split(':'); b.dataset[p[0]] = p[1]; render(); }
    var o = e.target.closest('[data-open]');
    if (o) { var d = document.getElementById(o.dataset.open); if (d) { d._opener = o; d.showModal(); var f = d.querySelector('[autofocus]') || d.querySelector('h2'); if (f) { f.tabIndex = -1; if (!d.querySelector('[autofocus]')) f.focus(); } } }
    var c = e.target.closest('[data-close]');
    if (c) { var dd = c.closest('dialog'); if (dd) { dd.close(); if (dd._opener && dd !== meDlg) dd._opener.focus(); } }
  });
  render();
  window.mockRender = render;
})();
