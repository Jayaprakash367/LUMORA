(function(){
  const STORAGE_KEY = 'cart';

  function readCart(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch(e){ return []; }
  }

  function writeCart(arr){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
      // small cross-window signal
      try { localStorage.setItem('__cart_last_update', Date.now()); localStorage.removeItem('__cart_last_update'); } catch(e){}
    } catch(e) {}
  }

  function getCount(){ return readCart().length; }

  function updateBadges(){
    const count = getCount();
    const nav = document.getElementById('navCartCount');
    const top = document.getElementById('topCartCount');
    // update all known badge elements
    const badges = Array.from(document.querySelectorAll('#navCartCount, .cart-count'));
    if(nav && !badges.includes(nav)) badges.push(nav);
    if(top && !badges.includes(top)) badges.push(top);
    badges.forEach(b => {
      try {
        b.textContent = count;
        // Make screen readers announce changes
        b.setAttribute('aria-live', 'polite');
        b.setAttribute('role', 'status');
      } catch(e){}
    });

    // update cart anchor aria-labels for better accessibility
    const anchors = document.querySelectorAll('.cart-icon');
    anchors.forEach(a => {
      try {
        const label = count === 1 ? `Open cart, 1 item` : `Open cart, ${count} items`;
        a.setAttribute('aria-label', label);
      } catch(e){}
    });
  }

  function bumpCartIcon(){
    const anchors = document.querySelectorAll('.cart-icon');
    anchors.forEach(a => {
      // add bump class to anchor
      a.classList.remove('cart-bump');
      // also target svg inside, if present, for a subtle pop
      const svg = a.querySelector('.cart-svg');
      if (svg) svg.classList.remove('cart-bump');
      // force reflow
      void a.offsetWidth;
      a.classList.add('cart-bump');
      if (svg) svg.classList.add('cart-bump');
      // cleanup
      setTimeout(() => {
        try { a.classList.remove('cart-bump'); } catch(e){}
        try { if (svg) svg.classList.remove('cart-bump'); } catch(e){}
      }, 700);
    });
  }

  function addItem(item){
    const cart = readCart();
    cart.push(item);
    writeCart(cart);
    updateBadges();
    // trigger bump locally when an item is added via this API
    try { bumpCartIcon(); } catch(e){}
  }

  // sync across tabs
  window.addEventListener('storage', (ev) => {
    if(ev.key === STORAGE_KEY || ev.key === '__cart_last_update') {
      updateBadges();
      // also allow pages to react
      document.dispatchEvent(new CustomEvent('cart:updated', { detail: { count: getCount() } }));
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    updateBadges();
  });

  window.LUMORA_CART = {
    readCart,
    writeCart,
    getCount,
    updateBadges,
    bumpCartIcon,
    addItem
  };

})();
