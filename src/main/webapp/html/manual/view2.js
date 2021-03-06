var productNo = location.href.split('?')[1].split('=')[1];
var type = sessionStorage.getItem('type'),
nickName = sessionStorage.getItem('nickName'),
category = $('.categoryItem');

$(document).ready(() => {
  
  $('#fullpage').fullpage({
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    scrollOverflow: true,
    anchors: ['firstPage'],
    onLeave: function (section, origin) {
      if (origin.index == 0 && section.index == 1) {
        $('.info').removeClass('animated fadeOut');
        $('.info').addClass('animated fadeIn');
        $('.contsTab').removeClass('animated fadeIn');
        $('.contsTab').addClass('animated fadeOut');
      }
      if (origin.index == 1 && section.index == 0) {
        $('.info').removeClass('animated fadeIn');
        $('.contsTab').removeClass('animated fadeOut');
        $('.info').addClass('animated fadeOut');
        $('.contsTab').addClass('animated fadeIn');
      }
    },
    afterLoad: function (section, origin) {
      if (origin.anchor == 'firstPage') {
        $('.info').addClass('animated fadeIn');
      }
    }
  });
  
  $.fn.fullpage.setAutoScrolling(true);
  $.fn.fullpage.setAllowScrolling(true, 'down');
  
  $.getJSON('/bitcamp-team-project/app/json/product/files?no=' + productNo, function(data) {
    if (data.status == 'success') {
      for (var i = 0; i < data.pList.productFiles.length; i++) {
        $('<img class="row mx-sm-auto contPhoto">').attr('src', '/bitcamp-team-project/upload/productfile/' 
            + data.pList.productFiles[i].img).appendTo(fileDiv);
        
      }
    } else {
      alert('실패했습니다!\n' + data.error);
    }
  });

  $.getJSON('/bitcamp-team-project/app/json/manual/detail?no=' + productNo, 
      function(data) {
    if (data.status == 'success') {
      $('#memberName').text(data.manual[0].product.manufacturer.name);
      $('#productName').text(data.manual[0].name);
      
      for (var i = 0; i < data.mFile.length; i++) {
        if (data.mFile[i].typeNo == 5) {
          var summarize = '<section>' + data.mFile[i].contents + '</section>'
          $(summarize).appendTo($('#contents'));
        }
        console.log(data.mFile[i].file);
        var contents = '<section class="row justify-content-between" id="conts">'
          + '<span class="col-sm-4" id="textconts">' + data.mFile[i].contents + '</span>'
          + '<span class="col-sm-4" id="textimg"><img src="/bitcamp-team-project/upload/manualfile/' + data.mFile[i].file + '_thumb"></span>'
          + '</section>';
        $(contents).appendTo($('.innerForm' + data.mFile[i].typeNo));
      }
      category.text(data.manual[0].product.productSmallCategory.productLargeCategory.name + ' > '
      + data.manual[0].product.productSmallCategory.name + ' > '
      + data.manual[0].name);
      
      fullpage_api.reBuild();
    } else {
      alert('실패했습니다\n' + data.error);
    }
  });
});







