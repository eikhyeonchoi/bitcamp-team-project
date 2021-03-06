var memberNo,
page = $('.page-container'),
reviewPage = $('.review-page-container'),
snsType;
var fboardBody = $('#handle-bars-fboad-body'),
fboardTemplateSrc = $('#fboard-template').html(),
fbiardGenerator = Handlebars.compile(fboardTemplateSrc);

var reviewBody = $('#handle-bars-review-body'),
reviewTemplateSrc = $('#review-template').html(),
reviewGenerator = Handlebars.compile(reviewTemplateSrc);

$(document).ready(function() {
  $(document.body).bind('loaded.loginuser', function() {
    snsType = sessionStorage.getItem('snsType');
    console.log(snsType);
    if (snsType != 0) {
      $('.sidebar').hide();
    }
    memberNo = sessionStorage.getItem('no');
    loadFboard(memberNo);
    loadReview(memberNo);
  });
});

function loadFboard(memberNo) {
  $.getJSON('/bitcamp-team-project/app/json/fboard/myPost?no=' + memberNo , function(data) {
    $('#fboard-length').html(data.list.length);
    page.pagination({
      dataSource: data,
      locator: 'list',
      showGoInput: true,
      showGoButton: true,
      callback: function(data, pagination) {
        fboardBody.children().remove();
        var pageObj = {list: data};
        $(fbiardGenerator(pageObj)).appendTo(fboardBody);
        
        $('.fboard-body').click(function() {
          location.replace("/bitcamp-team-project/html/fboard/view.html?no=" + $(this).attr('data-no'));
        });
        
      } 
    }); //page.pagination
  }) //getJSON
}; //loadFboard




function loadReview(memberNo) {
  $.getJSON('/bitcamp-team-project/app/json/review/findMyPageReview?memberNo=' + memberNo , function(data) {
    $('#review-length').html(data.list.length);
    reviewPage.pagination({
      pageSize: 3,
      dataSource: data,
      locator: 'list',
      showGoInput: true,
      showGoButton: true,
      callback: function(data, pagination) {
        reviewBody.children().remove();
        var pageObj = {list: data};
        $(reviewGenerator(pageObj)).appendTo(reviewBody);
      } 
    }); //page.pagination
  }); //getJSON
}; //loadReview



