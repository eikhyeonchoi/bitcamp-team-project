var tbody = $('tbody');
var templateSrc = $('#tr-template').html();
var trGenerator = Handlebars.compile(templateSrc);

function loadList(pn) {

  $.getJSON('../../app/json/member/list', 
      function(obj) {
    console.log(obj);
    tbody.html(''); 
    $(trGenerator(obj)).appendTo(tbody);

    $(document.body).trigger('loaded-list');

  }); 
}

$(document.body).bind('loaded-list', () => {
  var alist = $('.bit-view-link').click((e) => {
    e.preventDefault();
    location.href = 'view.html?no=' + $(e.target).attr('data-no');
  });
});

loadList(1);


