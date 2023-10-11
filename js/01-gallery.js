import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector(".gallery");
const body = document.querySelector("body");

const imgArr = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    /></a></li>`
  )
  .join("");

gallery.insertAdjacentHTML("beforeend", imgArr);

gallery.addEventListener("click", onPhotoClick);

function onPhotoClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName === "IMG") {
    const largePhotoLink = evt.target.dataset.source;
    const instance = basicLightbox.create(
      `
		<img width="1400" height="900" src="${largePhotoLink}">
	`,
      {
        onShow: () => {
          document.addEventListener("keydown", closeModal);
          body.classList.add("no-scroll");
        },
        onClose: () => {
          document.removeEventListener("keydown", closeModal);
          body.classList.remove("no-scroll");
        },
      }
    );
    instance.show();

    function closeModal(evt) {
      if (evt.code === "Escape") {
        instance.close();
      }
    }
  }
}
