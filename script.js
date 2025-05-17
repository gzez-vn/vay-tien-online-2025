// const slider = document.querySelector(".slider");
// const dots = document.querySelectorAll(".dots span");
// const totalSlides = dots.length;

// let currentIndex = 0;

// function updateSlider(index) {
//   slider.style.transform = `translateX(-${index * 100}vw)`;
//   dots.forEach((dot) => dot.classList.remove("active"));
//   dots[index].classList.add("active");
//   currentIndex = index;
// }

// dots.forEach((dot) => {
//   dot.addEventListener("click", () => {
//     updateSlider(Number(dot.dataset.index));
//   });
// });

// // Swipe touch support
// let startX = 0;
// slider.addEventListener("touchstart", (e) => {
//   startX = e.touches[0].clientX;
// });

// slider.addEventListener("touchend", (e) => {
//   const endX = e.changedTouches[0].clientX;
//   const diff = endX - startX;
//   if (Math.abs(diff) > 50) {
//     if (diff > 0) {
//       // swipe right
//       const index = (currentIndex - 1 + totalSlides) % totalSlides;
//       updateSlider(index);
//     } else {
//       // swipe left
//       const index = (currentIndex + 1) % totalSlides;
//       updateSlider(index);
//     }
//   }
// });

// // Set mặc định
// updateSlider(0);
const slider = document.querySelector(".slider");
const dots = document.querySelectorAll(".dots span");
const totalSlides = dots.length;

let currentIndex = 0;
let autoSlideInterval;

function updateSlider(index) {
  slider.style.transform = `translateX(-${index * 100}vw)`;
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
  currentIndex = index;
}

// Auto slide mỗi 5 giây
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    const nextIndex = (currentIndex + 1) % totalSlides;
    updateSlider(nextIndex);
  }, 5000);
}

// Dừng và khởi động lại khi người dùng click
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    clearInterval(autoSlideInterval);
    updateSlider(Number(dot.dataset.index));
    startAutoSlide();
  });
});

// Swipe touch support
let startX = 0;
slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      const index = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlider(index);
    } else {
      const index = (currentIndex + 1) % totalSlides;
      updateSlider(index);
    }
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }
});

// Khởi tạo ban đầu
updateSlider(0);
startAutoSlide();
