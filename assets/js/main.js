(function ($) {
  'use strict';

  const $header = $('#siteHeader');
  const $video = $('#heroVideo');

  function updateHeader() {
    $header.toggleClass('scrolled', window.scrollY > 30);
  }

  $(window).on('scroll', updateHeader);
  updateHeader();

  $('.nav-link, .navbar-brand').on('click', function () {
    $('.navbar-collapse').collapse('hide');
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function (element, index) {
    element.style.transitionDelay = Math.min(index * 60, 360) + 'ms';
    observer.observe(element);
  });

  // Keep autoplay graceful on browsers that block background video.
  if ($video.length) {
    const video = $video.get(0);
    video.muted = true;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(function () {
        video.setAttribute('poster', 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2000&q=82');
      });
    }
  }

  $('#year').text(new Date().getFullYear());
})(jQuery);
