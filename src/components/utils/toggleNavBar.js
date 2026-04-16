export function toggleNavbar() {
  const header = document.querySelector("header");

  if (header.classList.contains("responsive")) {
    header.classList.remove("responsive");
  } else {
    header.classList.add("responsive");
  }
}