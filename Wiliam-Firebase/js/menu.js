export function menuModal() {
  const $menu = document.querySelector(".menu");
  const $openMenuBtn = document.querySelector(".open-menu");
  const $closeMenuBtn = document.querySelector(".close-menu");

  function toggleMenu() {
    $menu.classList.toggle("menu_opened");
  }

  $openMenuBtn.addEventListener("click", toggleMenu);
  $closeMenuBtn.addEventListener("click", toggleMenu);
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const menuLink = document.querySelector(`.menu a[href^="#${id}"]`);
        if (entry.isIntersecting) {
          document
            .querySelector(".menu a.selected")
            .classList.remove("selected");
          menuLink.classList.add("selected");
        }
      });
    }, {
      rootMargin: "-30% 0px -50% 0px"
    }
  );

  const $menuLinks = document.querySelectorAll('.menu a[href^="#"]');
  $menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", () => {
      $menu.classList.remove("menu_opened");
    });
    const hash = menuLink.getAttribute("href");
    const target = document.querySelector(hash);
    if (target) observer.observe(target);
  });

  // Modal
  const $openModal = document.querySelector("#enviar");
  const $closeModal = document.querySelector(".modal__close");
  const $modal = document.querySelector(".modal");

  $openModal.addEventListener("click", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const mensaje = document.getElementById("mensaje").value;
    const $informacion = document.getElementById("informacion");

    $informacion.textContent = `
    ${nombre}, revise su correo => ${email} para confirmar su registro,
      gracias por su comentario => ${mensaje}
    `;

    $modal.classList.add("modal--show");
  });
  $closeModal.addEventListener("click", (e) => {
    e.preventDefault();
    $modal.classList.remove("modal--show");
  });
}