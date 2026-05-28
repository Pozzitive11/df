(function(){
  var KEY = 'cookie_consent';
  var MAX_AGE = 60 * 60 * 24 * 365;

  function getCookie(name){
    var m = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]+)'));
    return m ? decodeURIComponent(m[2]) : null;
  }
  function setCookie(name, value){
    document.cookie = name + '=' + encodeURIComponent(value) +
      '; path=/; max-age=' + MAX_AGE + '; SameSite=Lax';
  }

  function enableAnalytics(){
    // TODO: підключіть аналітику тут, якщо використовуєте Google Analytics.
    // var s = document.createElement('script');
    // s.async = true;
    // s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX';
    // document.head.appendChild(s);
    // window.dataLayer = window.dataLayer || [];
    // function gtag(){dataLayer.push(arguments);}
    // gtag('js', new Date());
    // gtag('config', 'G-XXXXXXX', {anonymize_ip: true});
  }

  function hide(){
    var b = document.getElementById('cookieBanner');
    if (b) b.classList.remove('show');
  }

  document.addEventListener('DOMContentLoaded', function(){
    var consent = getCookie(KEY);
    var banner = document.getElementById('cookieBanner');
    if (!banner) return;

    if (consent === 'all') { enableAnalytics(); return; }
    if (consent === 'essential') { return; }

    banner.classList.add('show');

    banner.addEventListener('click', function(e){
      var btn = e.target.closest('[data-cb]');
      if (!btn) return;
      var choice = btn.getAttribute('data-cb');
      setCookie(KEY, choice);
      if (choice === 'all') enableAnalytics();
      hide();
    });
  });
})();
