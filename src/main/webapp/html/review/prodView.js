var detailNo = location.href.split('?')[1].split('=')[1],
    tbody = $('tbody'),
    page = $('#pagination-container'),
    templateSrc = $('#select-template').html(),
    addBtn = $('#review-add-btn'),
    total = 0;

var trGenerator = Handlebars.compile(templateSrc);
var type = sessionStorage.getItem('type');
function loadList() {
  $.getJSON('/bitcamp-team-project/app/json/review/detail?no=' + detailNo + 
      '&keyword=' + $('#keyword').val() + 
      '&searchType=' + $('#searchType').val(), (obj) => {
        console.log(obj);
        console.log(obj.product.name);
        console.log(obj.product.manufacturer.name);
        for (var el of obj.satisfy.list) {
          total += el.asStf + el.design + el.level + el.priceStf + el.understand + el.useful;
        }
        
        var grade = (total / (obj.satisfy.totalColumn * 6)).toFixed(2);
        if(grade == 'NaN') {
          $('#ohr-product-grade').html('');
          $('#ohr-product-grade').html('만족도: 등록되어 있지 않습니다.');
        } else {
        $('#ohr-product-grade').html('');
        $('#ohr-product-grade').html('만족도: ' + grade);
        }
        
        var productName = obj.product.name,
            manuName = obj.product.manufacturer.name,
            prodImg = obj.product.productFiles[0].img;
        
        page.pagination({
          dataSource: obj.list,
          showGoInput: true,
          showGoButton: true,
          callback: function(data, pagination) {
            tbody.children().remove();
            var pageSrc = {list: data};
            $(trGenerator(pageSrc)).appendTo(tbody);
          }
        });
        
        $('#ohr-product-img').attr('src', '');
        $('#ohr-product-img').attr('src', '/bitcamp-team-project/upload/productfile/' + prodImg + '_thumb');
        
        $('#ohr-product-name').html('');
        $('#ohr-product-name').append(productName);
        
        $('#ohr-product-manufacturer-name').html('');
        $('#ohr-product-manufacturer-name').append(manuName);

        $(document.body).trigger('loaded-list');
      })
};

$(document.body).bind('loaded-list', function() {
  $('.review-tr-class').click((e) => {
    window.location.href = 'view.html?no=' +  $(e.target).parent().attr('data-no');
  });
});


loadList();

//검색
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

//등록버튼
$(document).ready(() => {
  if(type == null) {
    addBtn.prop('disabled', true);
  } else {
    addBtn.click(function() {
      location.href='form.html?no=' + detailNo;
    })
  }
});

