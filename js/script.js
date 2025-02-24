
// Gestion du mode sombre
( function () {
  // Initialistion de la variable
  const body = document.querySelector( 'body' );
  // Verifie si le systeme a un mode sombre
  window.matchMedia( '(prefers-color-scheme: dark)' ).matches === true ? body.classList.add( 'dark' ) : '';
})();

// Gestion du menu deroulant
( function () {
  // Initialistion des variables
  const btn_toggle = document.querySelector( '.toggle' ),
        navigation = document.querySelector( 'header ul.navigation' ),
        link = document.querySelectorAll( 'header ul.navigation a' );
  // Evenement lors du clique sur le boutton menu
  btn_toggle.addEventListener( 'click', _ => navigation.classList.toggle( 'enable' ) );
  // Evenement lors du clique d'un lien du menu
  link.forEach( item => {
    item.addEventListener( 'click', _ => navigation.classList.remove( 'enable' ) );
  });
})();  
