var namee = $("#name"),
np = $("#name-p"),
homePage = $("#homePage"),
hp = $("#homePage-p"),
registerNo = $("#registerNo"),
rp = $("#registerNo-p"),
adr1 = $("#adr1"),
adr2 = $("#adr2"),
adr3 = $("#adr3"),
adr4 = $("#adr4"),
tel2 = $("#tel"),
address;

var nameCk = false;
var hompCk = false;
var regNoCk = false;
var adrCk = false;

$(document).ready(function() {
  var tel = window.localStorage.getItem('tel');
  tel2.val(tel);
});

namee.keyup(function() {
  nameCheck()
});

homePage.keyup(function() {
  hompCheck()
});

registerNo.keydown(function() {
  if (registerNo.val().length == 10) {
    registerNo.val(registerNo.val().substring(0, 9));
  } 
});

registerNo.keyup(function() {
  renCheck()
});

function nameCheck() {
  if (namee.val() == ""){
    np.html("기업명을 입력하세요.");
    nameCk = false;
  } else {
    np.html("");
    nameCk = true;
  }
};

function hompCheck() {
  if (homePage.val() == ""){
    hp.html("기업 URL을 입력해주세요.");
    hompCk = false;
  } else {
    hp.html("");
    hompCk = true;
  }
};

function renCheck() {
  if (registerNo.val() == ""){
    rp.html("* -를 제외하고 입력해주세요.");
    regNoCk = false;
  } else {
    rp.html("");
    regNoCk = true;
  }
};

adr1.change(function() {
  adrCheck();
});

adr3.change(function() {
  adrCheck();
});

function adrCheck() {
  if (adr1.val() != "" && adr3.val() != "") {
    address = adr1.val() + "/" + adr2.val() + "/" + adr3.val() + "/" + adr4.val();
    adrCk = true;
  } else {
    adrCk = false;
  }
};

$('#add-btn').click(function() {
  if (nameCk == true &&
      hompCk == true && 
      regNoCk == true && 
      adrCk == true) {
    $.post("../../app/json/manufacturer/authCompany", {
      name: namee.val(),
      tel: tel2.val(),
      homePage: homePage.val(),
      registerNo: registerNo.val(),
      address: address,
    }, function(data) {
      if (data.status == 'success') {
        swal({
          title: "환영합니다!",
          text: namee.val() + "님 Ohora에 가입해 주셔서 감사합니다.",
          icon: "success",
        });
        location.replace("../auth/login.html");
      } else {
        swal({
          title: "회원가입중 오류가 발생했습니다.",
          icon: "error",
        });
        location.reload();
      }

    }, "json");

  } else {
    if (nameCk != true){
      swal({
        title: "기업명을 입력하세요",
        icon: "error",
      });
      return;
      
    } else if (hompCk != true) {
      swal({
        title: "기업 URL을 입력하세요",
        icon: "error",
      });
      return;
      
    } else if (regNoCk != true) {
      swal({
        title: "사업자 등록번호를 입력하세요",
        icon: "error",
      });
      return;
      
    } else if (adrCk != true) {
      swal({
        title: "기업 주소를 입력하세요",
        icon: "error",
      });
      return;
    }
  }
});

$("#add-cns-btn").click(function() {
  location.replace("/bitcamp-team-project/index.html");
});


