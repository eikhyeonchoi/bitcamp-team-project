var tr = $('#ohr-card-tr').html(),
cardDiv = $('#card-div'),
trGenerator = Handlebars.compile(tr);
var listType = '';

$(document).ready(function(){
})

function loadList(listType) {
  $.getJSON('../../app/json/review/list?largeNo=' + 0
          + '&smallNo=' + 0
          + '&keyword=' + $('#keyword').val()
          + '&listType=' + listType, 
          function (obj){
    console.log(obj)
    console.log($('#listType').val())

    cardDiv.html('');
    $(trGenerator(obj)).appendTo(cardDiv);

    cardDiv.slick({
      infinite: false,
      autoplay: false, 
      slidesToShow: 5,
      slidesToScroll: 3,
      arrows: true
    });
    
    //prodView 링크
    $('.ohr-view-link').off().click((e) => {
      window.location.href = 'prodView.html?no=' + 
      $(e.target).attr('data-no');
    });

  });
  $(document.body).trigger('loaded-list');
};



$('#keyword').keydown((e) => {
  if (event.keyCode == 13) {
    e.preventDefault();
    cardDiv.slick('unslick');
    loadList();
  }
});

//검색
$('#search-btn').click((e) => {
  cardDiv.slick('unslick');
  loadList();
});

$('#list_desc').click((e) => {
  cardDiv.slick('unslick');
  listType = '';
  loadList(listType);
});

$('#list_asc').click((e) => {
  cardDiv.slick('unslick');
  listType = 'asc';
  console.log(listType);
  loadList(listType);
});

loadList(listType);

