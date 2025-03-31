window.onload = (e) => {
  counterAnimation();
};

const menuIcon = document.querySelector('.menu-icon');
const menuBody = document.querySelector('.menu__body');

menuIcon.addEventListener('click', (e) => {
  menuIcon.classList.toggle('menu-open');
  menuBody.classList.toggle('menu-open');
});

window.addEventListener('beforeunload', (e) => {
  menuIcon.removeEventListener('click');
});

// TODO make a separate module lazyvideo.js
//? ----------------------------------------------------------------------
function findVideos() {
  let videos = document.querySelectorAll('.ivideo');

  for (let i = 0; i < videos.length; i++) {
    setupVideo(videos[i]);
  }
}

const getVideos = () => document.querySelectorAll('.ivideo');

function setupVideo(video) {
  let link = video.querySelector('.ivideo__link');
  let media = video.querySelector('.ivideo__media');
  let button = video.querySelector('.ivideo__button');
  let id = media ? parseMediaUrl(media) : parseLinkUrl(link);

  video.addEventListener('click', (e) => {
    let iframe = createIframe(id);

    link.remove();
    button.remove();
    video.appendChild(iframe);
  });

  link.removeAttribute('href');
  video.classList.add('video-enabled');
}

function parseMediaUrl(media) {
  let regexp =
    /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
  let url = media.src;
  let match = url.match(regexp);

  return match[1];
}

function parseLinkUrl(link) {
  let regexp = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/;
  let url = link.href;
  let match = url.match(regexp);

  return match[1];
}

function createIframe(id) {
  let iframe = document.createElement('iframe');

  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay');
  iframe.setAttribute('src', generateURL(id));
  iframe.classList.add('ivideo__media');

  return iframe;
}

function generateURL(id) {
  let query = '?rel=0&showinfo=0&autoplay=1';

  return 'https://www.youtube.com/embed/' + id + query;
}

findVideos();
//? ----------------------------------------------------------------------

const watchBtn = document.querySelector('.column-info-history__watch-video');
const videoCnt = document.querySelector('.column-video');
const watchBtnMainScreen = document.querySelector(
  '.column-info-hero__watch-video'
);

watchBtnMainScreen.addEventListener('click', (e) => {
  window.scrollTo({
    top: videoCnt.getBoundingClientRect().top - 30,
    behavior: 'smooth',
  });

  if (!videoCnt.querySelector('iframe')) {
    videoCnt.click();
  }
});

watchBtn.addEventListener('click', (e) => {
  if (!videoCnt.querySelector('iframe')) {
    videoCnt.click();
  }
});
//========================================================================================================================================================
const select = document.querySelector('.form-availability__select');
const selectCont = document.querySelector('.select-row');
select.addEventListener('click', (e) => {
  selectCont.classList.toggle('select-active');
});
//========================================================================================================================================================
function counterAnimation() {
  // Ініціалізація
  function digitsCounterInit(digitsCountersItems) {
    let digitsCounters = digitsCountersItems
      ? digitsCountersItems
      : document.querySelectorAll('[data-digits-counter]');
    if (digitsCounters) {
      digitsCounters.forEach((digitsCounter) => {
        digitsCountersAnimate(digitsCounter);
      });
    }
  }
  // Анімація
  function digitsCountersAnimate(digitsCounter) {
    let startTimestamp = null;
    const duration = parseInt(digitsCounter.dataset.digitsCounter)
      ? parseInt(digitsCounter.dataset.digitsCounter)
      : 1000;
    const startValue = parseInt(digitsCounter.innerHTML);
    const startPosition = 0;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      digitsCounter.innerHTML = Math.floor(
        progress * (startPosition + startValue)
      );
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  digitsCounterInit();

  // Пуск при появі блоку з лічильниками
  let options = {
    threshold: 0.3,
  };
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetElement = entry.target;
        const digitsCountersItems = targetElement.querySelectorAll(
          '[data-digits-counter]'
        );
        if (digitsCountersItems.length) {
          digitsCounterInit(digitsCountersItems);
        }
        // Вимкнути відслідкування після спрацювання
        observer.unobserve(targetElement);
      }
    });
  }, options);

  let sections = document.querySelectorAll('.offers');
  if (sections.length) {
    sections.forEach((section) => {
      observer.observe(section);
    });
  }
}
//========================================================================================================================================================
const swiper = new Swiper('.customers__slider ', {
  loop: true,
  loopedSlides: 3,
  clickable: true,
  centeredSlides: true,
  slideToClickedSlide: true,
  roundLengths: true,
  initialSlide: 1,
  speed: 800,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },

    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    992: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },

  autoplay: {
    delay: 3000,
  },

  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  pagination: {
    el: '.customers-pagination',
    clickable: true,
    dynamicBullets: true,
  },
});

const newsSwiper = new Swiper('.news__slider ', {
  loop: true,
  clickable: true,
  slideToClickedSlide: true,
  speed: 800,

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },

    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    992: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },

  autoplay: {
    delay: 3000,
  },

  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  pagination: {
    el: '.news-pagination',
    clickable: true,
    dynamicBullets: true,
  },
});
//========================================================================================================================================================
const devMode = false;
const emailInput = document.querySelector('.signup-page__input');
const placeholder = emailInput.placeholder;
const emailForm = document.querySelector('.signup-page__email-form');
const popup = document.querySelector('.popup');
const popupBody = document.querySelector('.popup__body');
const popupClose = document.querySelector('.popup-close');
const popupMsg = document.querySelector('.popup__message');
const loader = document.querySelector('.loader');

emailInput.addEventListener('focusin', (event) => {
  event.target.placeholder = '';
  emailInput.classList.contains('invalid')
    ? emailInput.classList.remove('invalid')
    : null;
});

emailInput.addEventListener('focusout', (event) => {
  event.target.placeholder = placeholder;
});

emailForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (emailTest(emailInput)) {
    loader.classList.add('isLoading');
    if (devMode) {
      setTimeout(() => {
        popup.classList.add('popup-active');
        popupMsg.innerText = 'Thanks for Subscription!';
      }, 2000);
    } else {
      fetch('http://localhost:8080/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          email: emailInput.value,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw Error('Error from server');
        })
        .then((data) => {
          popup.classList.add('popup-active');
          popupMsg.innerText = data.message;
        })
        .catch((err) => {
          console.log(err);
          popup.classList.add('popup-active');
          popupMsg.innerText = 'An error occured :(';
        })
        .finally(() => {
          loader.classList.remove('isLoading');
        });
    }
    emailForm.reset();
  } else {
    emailInput.value = '';
    emailInput.placeholder = 'invalid email';
    emailInput.classList.add('invalid');
  }
});

popup.addEventListener('click', (e) => {
  popup.classList.remove('popup-active');
});

popupBody.addEventListener('click', (e) => {
  e.stopPropagation();
});

popupClose.addEventListener('click', (e) => {
  popup.classList.remove('popup-active');
});

function emailTest(formRequiredItem) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(
    formRequiredItem.value
  );
}
//========================================================================================================================================================
//! remove listeners
window.addEventListener('beforeunload', (e) => {
  watchBtn.removeEventListener('click');
  watchBtnMainScreen.removeEventListener('click');
  select.removeEventListener('click');
  const videos = getVideos();
  if (videos.length) {
    videos.forEach((video) => video.removeEventListener('click'));
  }
});

//TODO simple server, active page indictor, subscribe by email, show/hide header after scroll
// https://www.youtube.com/watch?v=fyc-4YmgLu0
