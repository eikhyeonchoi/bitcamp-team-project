var tbody = $('tbody'),
templateSrc = $('#tr-template').html(),
trGenerator = Handlebars.compile(templateSrc),
page = $('#pagination-container');

$(document).ready(function() {
  if(sessionStorage.getItem('type') == 3) {
    $('#add-button').show();
  } else {
    $('#add-button').hide();
  }
}); // ready

function loadList() {
  $.getJSON('../../app/json/notice/list?keyword=' + $('#keyword').val() + 
          '&searchType=' + $('#searchType').val(), 
          function (obj){
    console.log(obj)
    page.pagination({
      dataSource: obj,
      locator: 'list',
      showGoInput: true,
      showGoButton: true,
      callback: function(data, pagination) {
        tbody.children().remove();
        var pageObj = {list: data};
        $(trGenerator(pageObj)).appendTo(tbody);
      }
    });
    $(document.body).trigger('loaded-list');
  });
};

//detail 링크
$(document.body).bind('loaded-list', () => {

  $('.bit-view-link').click((e) => {
    window.location.href = 'view.html?no=' + 
    $(e.target).attr('data-no');
  });
});


$('#keyword').keydown((e) => {
  if (event.keyCode == 13) {
    e.preventDefault();
    loadList();
  }
});

//검색
$('#search-btn').click((e) => {
  loadList();
});

loadList();
