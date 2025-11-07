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
    if(nav) nav.textContent = count;
    if(top) top.textContent = count;
  }

  function bumpCartIcon(){
    const anchors = document.querySelectorAll('.cart-icon');
    anchors.forEach(a => {
      a.classList.remove('cart-bump');
      // force reflow
      void a.offsetWidth;
      a.classList.add('cart-bump');
      setTimeout(() => a.classList.remove('cart-bump'), 700);
    });
  }

  function addItem(item){
    const cart = readCart();
    cart.push(item);
    writeCart(cart);
    updateBadges();
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
