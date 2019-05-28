var h1 = $('h1'),
el1 = $('.bit-new-item'),
el2 = $('.bit-view-item');

var param = location.href.split('?')[1];
if (param) {
  h1.html("공지사항"); 
  loadData(param.split('=')[1])
  for (e of el1) {
    e.style.display = 'none';
  }
} else {
  h1.html("새 글")
  for (e of el2) {
    e.style.display = 'none';
  }
}

$('#fileupload').fileupload({
  url: '../../app/json/notice/add',
  dataType: 'json',         
  sequentialUploads: true,  
  singleFileUploads: false, 
  add: function (e, data) { 
    $('#fileAdd-btn').show();
    $('#add-btn').hide();
    $('#fileAdd-btn').click(function() {
      console.log()
      data.formData = {
        title: $('#title').val(), 
        contents: $('#contents').val()
      };
      data.submit(); 
    });
  },
  done: function (e, data) { 
    console.log(data.result.message)
    if(data.result.status == 'success'){
      location.href='index.html';
    } else { 
      alert("필수 입력값을 입력하지 않았습니다\n" + data.result.error);
    }
  }
}) // fileupload

$('#add-btn').click(() => {
  $.post( '../../app/json/notice/add',{
    title: $('#title').val(), 
    contents: $('#contents').val()
  }, function(data) {
    if(data.status == 'fail'){
      alert('등록 실패입니다!\n' + data.message);
    } else {
      location.href = "index.html";
    }
  })
});

$('#update-btn').click(() => {
  $.post('../../app/json/notice/update', {
    no: $('#no').val(),
    title: $('#title').val(), 
    contents: $('#contents').val()
  }, function() {

  })
  .done(function() {
    location.href = "index.html";
  })
  .fail(function() {
    alert('등록 실패입니다!\n' + data.message)
  })
});

function loadData(no) {

  $.getJSON('../../app/json/notice/detail?no=' + no, function(data) {
    $('#no').val(data.no),
    $('#title').val(data.title),
    $('#contents').val(data.contents),
    $('#createdDate').val(data.createdDate),
    $('#viewCount').val(data.viewCount);
  });

}

