import Navbar from '@/components/layout/Navbar'
import HeroPortfolio from '@/components/sections/HeroPortfolio'
import AboutMe from '@/components/sections/AboutMe'
import Portfolio from '@/components/sections/Portfolio'
import TechStack from '@/components/sections/TechStack'
// import Certifications from '@/components/sections/Certifications' // TODO: aktifkan kembali saat section ini siap digunakan
import Contact from '@/components/sections/Contact'

const NATIVE_INTERACTIONS = `
(function () {
  function onReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  onReady(function () {
    var menus = document.querySelectorAll('header details');
    for (var menuIndex = 0; menuIndex < menus.length; menuIndex++) {
      (function (menu) {
        var links = menu.querySelectorAll('a');
        for (var linkIndex = 0; linkIndex < links.length; linkIndex++) {
          links[linkIndex].addEventListener('click', function () {
            menu.removeAttribute('open');
          });
        }
      })(menus[menuIndex]);
    }

    var viewers = document.querySelectorAll('[data-native-frame-viewer]');
    for (var viewerIndex = 0; viewerIndex < viewers.length; viewerIndex++) {
      (function (viewer) {
        var image = viewer.querySelector('[data-frame-image]');
        var urls;
        try {
          urls = JSON.parse(viewer.getAttribute('data-frame-urls') || '[]');
        } catch (error) {
          urls = [];
        }
        if (!image || !urls.length) return;

        var currentFrame = 0;
        var startFrame = 0;
        var startX = 0;
        var startY = 0;
        var axis = 0;
        var touching = false;
        var cachedFrames = { 0: true };
        var pendingFrame = 0;
        var frameRequest = 0;

        function preload(index) {
          if (index < 0 || index >= urls.length) return;
          if (cachedFrames[index]) return;
          cachedFrames[index] = true;
          var preloadImage = new Image();
          preloadImage.src = urls[index];
        }

        function showFrame(index) {
          index = Math.max(0, Math.min(urls.length - 1, index));
          if (index === currentFrame) return;
          currentFrame = index;
          image.src = urls[index];
          preload(index - 1);
          preload(index + 1);
        }

        function requestFrame(index) {
          pendingFrame = Math.max(0, Math.min(urls.length - 1, index));
          if (frameRequest) return;
          frameRequest = window.requestAnimationFrame(function () {
            frameRequest = 0;
            showFrame(pendingFrame);
          });
        }

        for (var warmup = 1; warmup <= 12; warmup++) preload(warmup);
        var preloadCursor = 13;
        function preloadBatch() {
          var batchEnd = Math.min(urls.length, preloadCursor + 5);
          while (preloadCursor < batchEnd) {
            preload(preloadCursor);
            preloadCursor++;
          }
          if (preloadCursor < urls.length) window.setTimeout(preloadBatch, 80);
        }
        window.setTimeout(preloadBatch, 250);

        viewer.addEventListener('touchstart', function (event) {
          if (!event.touches.length) return;
          startX = event.touches[0].clientX;
          startY = event.touches[0].clientY;
          startFrame = currentFrame;
          axis = 0;
          touching = true;
        }, { passive: true });

        viewer.addEventListener('touchmove', function (event) {
          if (!event.touches.length) return;
          var deltaX = event.touches[0].clientX - startX;
          var deltaY = event.touches[0].clientY - startY;
          if (axis === 0) {
            if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 8) return;
            axis = Math.abs(deltaX) > Math.abs(deltaY) ? 1 : 2;
          }
          if (axis !== 1) return;
          event.preventDefault();
          requestFrame(startFrame + Math.round(deltaX / 7));
        }, { passive: false });

        viewer.addEventListener('touchend', function () {
          touching = false;
          axis = 0;
        }, { passive: true });

        function updateFrameFromScroll() {
          if (touching) return;
          var hero = document.getElementById('hero');
          var about = document.getElementById('about');
          if (!hero || !about) return;
          var start = hero.offsetTop;
          var fullRangeEnd = about.offsetTop + about.offsetHeight;
          var end = start + (fullRangeEnd - start) / 5;
          var progress = Math.max(0, Math.min(1, (window.pageYOffset - start) / Math.max(1, end - start)));
          requestFrame(Math.round(progress * (urls.length - 1)));
        }

        window.addEventListener('scroll', updateFrameFromScroll, { passive: true });
        window.addEventListener('resize', updateFrameFromScroll);
        updateFrameFromScroll();
      })(viewers[viewerIndex]);
    }

    var aboutStacks = document.querySelectorAll('[data-native-about-stack]');
    for (var stackIndex = 0; stackIndex < aboutStacks.length; stackIndex++) {
      (function (stack) {
        if (window.innerWidth >= 1024) return;
        var cards = stack.querySelectorAll('[data-about-card]');
        if (cards.length < 3) return;
        var order = [1, 2, 0];
        var slots = [
          { left: 0, top: 80, scale: 0.90, zIndex: 10 },
          { left: 80, top: 40, scale: 0.95, zIndex: 20 },
          { left: 40, top: 0, scale: 1, zIndex: 30 }
        ];
        var animating = false;
        var touchStartX = 0;
        var touchStartY = 0;
        var touchAxis = 0;
        var suppressClickUntil = 0;

        function cardById(id) {
          return stack.querySelector('[data-about-card="' + id + '"]');
        }

        function applySlots(immediate) {
          for (var slotIndex = 0; slotIndex < order.length; slotIndex++) {
            var card = cardById(order[slotIndex]);
            var slot = slots[slotIndex];
            if (!card) continue;
            card.style.transition = immediate ? 'none' : 'left 350ms ease, top 350ms ease, transform 350ms ease';
            card.style.left = slot.left + 'px';
            card.style.top = slot.top + 'px';
            card.style.transform = 'scale(' + slot.scale + ')';
            card.style.opacity = '1';
            card.style.zIndex = String(slot.zIndex);
          }
        }

        function cycleAboutCards() {
          if (animating) return;
          animating = true;
          var back = order[0];
          var middle = order[1];
          var front = order[2];
          var frontCard = cardById(front);
          if (frontCard) {
            frontCard.style.zIndex = '40';
            frontCard.style.transition = 'left 220ms ease, top 220ms ease, transform 220ms ease';
            frontCard.style.left = '-190px';
            frontCard.style.top = '40px';
            frontCard.style.transform = 'scale(0.95)';
          }
          window.setTimeout(function () {
            order = [front, back, middle];
            applySlots(false);
          }, 220);
          window.setTimeout(function () {
            animating = false;
          }, 580);
        }

        applySlots(true);
        stack.addEventListener('click', function () {
          if (Date.now() < suppressClickUntil) return;
          cycleAboutCards();
        });
        stack.addEventListener('touchstart', function (event) {
          if (!event.touches.length) return;
          touchStartX = event.touches[0].clientX;
          touchStartY = event.touches[0].clientY;
          touchAxis = 0;
        }, { passive: true });
        stack.addEventListener('touchmove', function (event) {
          if (!event.touches.length) return;
          var deltaX = event.touches[0].clientX - touchStartX;
          var deltaY = event.touches[0].clientY - touchStartY;
          if (touchAxis === 0 && Math.max(Math.abs(deltaX), Math.abs(deltaY)) >= 8) {
            touchAxis = Math.abs(deltaX) > Math.abs(deltaY) ? 1 : 2;
          }
          if (touchAxis === 1) event.preventDefault();
        }, { passive: false });
        stack.addEventListener('touchend', function (event) {
          if (!event.changedTouches.length) return;
          var deltaX = event.changedTouches[0].clientX - touchStartX;
          if (touchAxis === 1 && deltaX < -35) {
            suppressClickUntil = Date.now() + 500;
            cycleAboutCards();
          }
          touchAxis = 0;
        }, { passive: true });
      })(aboutStacks[stackIndex]);
    }

    var carousels = document.querySelectorAll('[data-native-carousel]');
    for (var carouselIndex = 0; carouselIndex < carousels.length; carouselIndex++) {
      (function (carousel) {
        var cards = carousel.querySelectorAll('[data-carousel-card]');
        if (!cards.length) return;

        function updateScale() {
          var carouselRect = carousel.getBoundingClientRect();
          var center = carouselRect.left + carouselRect.width / 2;
          for (var cardIndex = 0; cardIndex < cards.length; cardIndex++) {
            var cardRect = cards[cardIndex].getBoundingClientRect();
            var cardCenter = cardRect.left + cardRect.width / 2;
            var distance = Math.min(1, Math.abs(cardCenter - center) / Math.max(1, carouselRect.width * 0.7));
            cards[cardIndex].style.transformOrigin = cardCenter < center ? 'right center' : cardCenter > center ? 'left center' : 'center center';
            cards[cardIndex].style.transform = 'scale(' + (1 - distance * 0.14) + ')';
          }
        }

        function centerDefaultCard() {
          var defaultIndex = parseInt(carousel.getAttribute('data-default-index') || '0', 10);
          var card = cards[Math.max(0, Math.min(cards.length - 1, defaultIndex))];
          carousel.scrollLeft = card.offsetLeft - (carousel.clientWidth - card.offsetWidth) / 2;
          updateScale();
        }

        carousel.addEventListener('scroll', updateScale, { passive: true });
        window.addEventListener('resize', centerDefaultCard);
        window.requestAnimationFrame(centerDefaultCard);
        window.setTimeout(centerDefaultCard, 150);
      })(carousels[carouselIndex]);
    }
  });
})();
`

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroPortfolio />
      <AboutMe />
      <Portfolio />
      <TechStack />
      {/* <Certifications /> */}
      <Contact />
      <script dangerouslySetInnerHTML={{ __html: NATIVE_INTERACTIONS }} />
    </main>
  )
}
