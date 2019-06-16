var detailNo = location.href.split('?')[1].split('=')[1],
type = sessionStorage.getItem('type'),
name = sessionStorage.getItem('name'),
userNo = sessionStorage.getItem('no'),
memberNo = 0,
commentListSrc = $('#comment-list').html(),
commentListGenerator = Handlebars.compile(commentListSrc);

($.getJSON('/bitcamp-team-project/app/json/review/detail2?no=' + detailNo, function(data) {
	console.log(data)
	$('#review-prod-no').val(data.productNo),
  $('#review-no').val(data.no),
  $('#review-id').html(data.member.nickName),
  $('#review-title').html(data.title),
  $('#review-contents').html(data.contents),
  $('#review-createdDate').html(data.createdDate + '   |'),
  $('#review-viewCount').html(data.viewCount + ' 읽음');
	
  if (name == data.member.name || type == 3) {
    $('#update-btn').show();
    $('#delete-btn').show();
  }
  
  memberNo = data.memberNo;
  
  $(document.body).trigger({
      type: 'loaded-detail'
    }) // trigger
  
}));

//삭제
$('#delete-btn').click(() => {
  $.getJSON('/bitcamp-team-project/app/json/review/delete?no=' + detailNo, function(data) {
  })
  .done(function(data) {
	  location.href = 'prodView.html?no=' + $('#review-prod-no').val();
    }
  ).fail(function(data) {
    alert('삭제 실패입니다!\n' + data.responseText);
  })
});

//수정
$('#update-btn').click(() => {
	location.href = 'form.html?no=' + $('#review-prod-no').val() + '&rNo=' + $('#review-no').val();
});

//목록
$('#list-btn').click(() => {
  location.href = 'prodView.html?no=' + $('#review-prod-no').val();
})

//글자수 세기
$(function(){
  $('input.form-control-plaintext').keyup(function(){
    bytesHandler(this);
  });
});

function getTextLength(str) {
  var len = 0;
  for (var i = 0; i < str.length; i++) {
    if (encodeURIComponent(str.charAt(i)).length == 6) {
      len++;
    }
    len++;
  }
  return len;
}

function bytesHandler(obj){
  var text = $(obj).val(); 
  $('p.bytes').text(getTextLength(text) + '/80');
}

$(document.body).bind('loaded-detail', function(data){
	  $.get('/bitcamp-team-project/app/json/review/commentList?no=' + detailNo ,function(obj) {
	    $(commentListGenerator(obj)).appendTo($('.comment-child'));


	    $(document.body).trigger({
	      type: 'loaded-comment-list'
	    });
	  }); // get


	  $('#delete-btn').click(() => {
	    $.getJSON('../../app/json/review/delete?no=' + detailNo, function(obj) {
	      if (obj.status == 'success') {
	        location.href = "index.html";
	      } else {
	        alert('삭제 실패 입니다.\n' +  obj.message);
	      }
	    }) // get
	  }); // delete click


	  $('#update-btn').off().click(function(){
	    $.post('/bitcamp-team-project/app/json/review/update', {
	      no: detailNo,
	      title: $('#title').val(),
	      contents: $('#contents').val()
	    }, function(obj) {
	      if (obj.status == 'success') {
	        location.href = 'index.html';
	      } else {
	        alert('변경 실패 입니다.\n' +  obj.message);
	      }
	    }, "json") 
	  }); // update click


	}) // loaded-detail bind



	$(document.body).bind('loaded-comment-list', function() {

	  callUserInform();
	  
	  $('#comment-add-btn').click(function() {
	    $.post('/bitcamp-team-project/app/json/review/addComment' , {
	      reviewNo: detailNo,
	      contents: $('#comment-contents').val(),
	      depth: 0,
	      parentId: 0
	    }, function(obj) {
	      if (obj.status == 'success') {
	        location.reload();
	      } else {
	        alert('등록 실패 입니다.\n' +  obj.message);
	      }
	    }, "json") // post
	  }) // click


	  $('.comment-delete-btn').click(function(e) {
	    $.get('/bitcamp-team-project/app/json/review/deleteComment?no=' + $(e.target).attr('data-no') , function(obj) {
	      if (obj.status == 'success') {
	        location.reload();
	      } else {
	        alert('삭제 실패 입니다.\n' +  obj.message);
	      }
	    }, "json");

	  }); // click
	  

	  $('.comment-update-btn').click(function(e) {
	    $.post('/bitcamp-team-project/app/json/review/updateComment', {
	      no: $(e.target).attr('data-no'),
	      updateDate: getCurrentTime(),
	      contents: $(e.target).prev().val()
	    }, function(obj) {
	      if (obj.status == 'success') {
	        location.reload();
	      } else {
	        alert('변경 실패 입니다.\n' +  obj.message);
	      }
	    }, "json")
	  }) // click



	}) // loaded-comment-list bind



	function callUserInform(){
	  if(sessionStorage.getItem('no') == null) {
	    $('#fboard-comment-add-form').remove();
	    $('.reply-add-btn').remove();
	  }
	  
	  if(userNo != memberNo) {
		  $('#delete-btn').hide();
		  $('#update-btn').hide();
	    $('#fboard-file-div').hide();

	    $('#title').prop('disabled', true);
	    $('#contents').prop('disabled', true);
	  }
	  
	  $('.p-member-no').each(function(index, item) {
	    if($(item).attr('data-member-no') != userNo){
	      $(item).next().prop('disabled', true);
	      $(item).next().next().hide();
	      $(item).next().next().next().hide();
	    }
	  }) // each
}




