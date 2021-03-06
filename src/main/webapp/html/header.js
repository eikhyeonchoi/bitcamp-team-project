//헤더 가져오기
$(document.body).ready(function() {
  $('.ohr-main-header').load('/bitcamp-team-project/html/header.html',
      function (){
    $(document.body).trigger('loaded.header');
  });
});

//헤더를먼저 로딩한 후 로그인 버튼을 활성화시킨다. (...맞나?)
$(document.body).bind('loaded.header', function(data) {
  // 웹 페이지에 header.html을 삽입했으면 로그인 정보를 가져와 설정한다.
  loadLoginUser();
  // 로그아웃 버튼의 click 리스너를 등록한다.
  $('#logout-menu').click(function(e) {
    e.preventDefault();
    $.get('/bitcamp-team-project/app/json/auth/logout', () => {
      location.href = "/bitcamp-team-project/index.html";
      sessionStorage.clear();
    });
  });
  
  $('#ohr-menu').click(function(){
    $('.ohr-menu-det').toggleClass("ohr-menu-show")
  });

  const input = $("#search-input");
  const searchBtn = $("#search-btn");

  const expand = () => {
    searchBtn.toggleClass("ohr-close");
    input.toggleClass("ohr-square");
    
    if($('#navbarCollapse').find('li').hasClass('ohr-disappear')) {
      $('#navbarCollapse').find('li').removeClass('ohr-disappear');
      $('#navbarCollapse').find('li').addClass('ohr-appear');
      $('#ohr-search-tag').removeClass('ohr-appear-tag');
      $('#ohr-search-tag').addClass('ohr-disappear-tag');
    } else {
      $('#navbarCollapse').find('li').removeClass('ohr-appear');
      $('#navbarCollapse').find('li').addClass('ohr-disappear');
      $('#ohr-search-tag').removeClass('ohr-disappear-tag');
      $('#ohr-search-tag').addClass('ohr-appear-tag');
    }
};

searchBtn.on("click", expand);

$('#search-input').keydown((e) => {
  if (event.keyCode == 13) {
    e.preventDefault();
    location.href = 
      '/bitcamp-team-project/html/search/index.html?keyword=' 
      + $('#search-input').val();
  }
});

$('#ohr-header-logo').click(function() {
  location.href = '/bitcamp-team-project/index.html';
});


});



function loadLoginUser() {
  $.getJSON('/bitcamp-team-project/app/json/auth/user', function(data) {
    if (data.status == 'success') {
      $('#bit-not-login-state').hide();
      $("#bit-auth").hide();
      $('.bit-login-state').show();
      $('#login-username').html(data.user.nickName);
      $('#login-userimg').css('background-image', 'url(/bitcamp-team-project/upload/memberfile/' + data.user.filePath + '_thumb)');
      
      $('#login-username').click(function(){
        location.href = '/bitcamp-team-project/html/myPage/myPost.html';  
      });
      
      $('#ohr-mypage').click(function(){
          location.href = '/bitcamp-team-project/html/myPage/myPost.html';  
        });
      
      $('#ohr-mypage-2').click(function(){
          location.href = '/bitcamp-team-project/html/myPage/password.html';  
        });
      
      $('#ohr-mypage-3').click(function(){
          location.href = '/bitcamp-team-project/html/myPage/index2.html';  
        });

      sessionStorage.setItem('no', data.user.no);
      sessionStorage.setItem('type', data.user.type);
      sessionStorage.setItem('nickName', data.user.nickName);
      sessionStorage.setItem('name', data.user.name);
      sessionStorage.setItem('email', data.user.email);
      sessionStorage.setItem('tel', data.user.tel);
      sessionStorage.setItem('pwdUpdateDate', data.user.passwordUpdateDate);
      sessionStorage.setItem('filePath', data.user.filePath);
      sessionStorage.setItem('snsType', data.user.snsType);
      
      if(data.user.type == 2) {
    	  $('#ohr-mypage-3').show();
      } else {
    	  $('#ohr-mypage-3').hide();
      }
      if(data.user.snsType != 0) {
    	  $('#ohr-mypage-2').hide();
      } else {
    	  $('#ohr-mypage-2').show();
      }
      
      $(document.body).trigger('loaded.loginuser');
      
    } else {
      $('#bit-not-login-state').show();
      $('.bit-login-state').hide();
      $("#bit-auth-div").show();
      
      // fail 일때도 trigger 보내줘야함 // 0602 최익현 추가
      $(document.body).trigger('loaded.loginuser');
    }
  });
}








