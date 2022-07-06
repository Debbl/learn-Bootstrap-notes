$(function () {
  var currentImg = 'none';

  // 数据
  var banners = [
    {
      id: 0,
      bigUrl: './img/banner0.png',
      smUrl: './img/banner0_sm.png',
    },
    {
      id: 1,
      bigUrl: './img/banner1.png',
      smUrl: './img/banner1_sm.png',
    },
    {
      id: 2,
      bigUrl: './img/banner2.png',
      smUrl: './img/banner2_sm.png',
    },
  ];

  // renderBanner(banners);

  $(window).on(
    'resize',
    throttle(function () {
      // console.log('OK');
      // console.log($(this).outerWidth());
      var winWidth = $(this).outerWidth();
      var isBigScreen = winWidth >= 768;
      if ((currentImg === 'big') & isBigScreen) {
        return;
      }
      if ((currentImg === 'small') & !isBigScreen) {
        return;
      }
      if (currentImg === 'none') {
        renderBanner(banners, isBigScreen);
      }
      renderBanner(banners, isBigScreen);
    })
  );

  $(window).trigger('resize');

  function renderBanner(banners = [], isBigScreen) {
    currentImg = isBigScreen ? 'big' : 'small';
    $('.carousel').carousel('dispose');
    var bannerHtmlString = '';
    banners.forEach(function (item, index) {
      bannerHtmlString += `
      <div class="carousel-item${
        index === 0 ? ' active' : ''
      }" data-interval='1000'>
        <img src=${
          isBigScreen ? item.bigUrl : item.smUrl
        } class="d-block w-100" alt="..." />
      </div>
      `;
    });
    $('.carousel-inner').empty().append(bannerHtmlString);
    $('.carousel').carousel('cycle');
  }
});
