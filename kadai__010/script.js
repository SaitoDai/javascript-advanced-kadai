
 //マウスオーバー・アウト時のボタンの挙動
 $('.button-more').on('mouseover', function() {
    $(this).animate({
      opacity: 0.5,
      marginLeft: 20,

    }, 100);
    $('.button-more').on('mouseout', function() {
      $(this).animate({
        opacity: 1,
        marginLeft: 0,
      }, 100)
    })
  });

  //submitの点滅
  var stid = "";
  $('#submit').on('mouseover', function(){
    stid = setInterval(function() {
      $('#submit').fadeOut(10, function(){$(this).fadeIn(590)});
    }, 600);
  });
  $('#submit').mouseout(function(){
    clearInterval(stid);
  });


  //カルーセル
  $('.carousel').slick({
    autoplay: true,
    dots: true,
    infinite: true,
    autoplaySpeed: 500,
    arrows: false,
  });


  $('#submit').on('click', function(e){
    e.preventDefault();

    //入力をした結果、エラーがあるかないか判定
    let result = inputCheck();

    //エラー判定とメッセージを取得
    let error = result.error;
    let message = result.message;
    console.log(result);

    //エラーが無かったらフォーム送信する
    if(error == false) {
      // Ajaxでformを送信する
      $.ajax({
        url: 'https://api.staticforms.xyz/submit',
        type: 'POST',
        dataType: 'json',
        data: $('#form').serialize(),
        success: function (result) {
          alert('お問い合わせを送信しました。')
        },
        error: function (xhr, resp, text) {
          alert('お問い合わせを送信できませんでした。')
        }
      })
    } else {
      //エラーメッセージを表示する
      alert(message);
    }
    
  });

  $('#name').blur(function () {
    inputCheck();
  });
  $('#furigana').blur(function () {
    inputCheck();
  });
  $('#email').blur(function () {
    inputCheck();
  });
  $('#tel').blur(function () {
    inputCheck();
  });
  $('#message').blur(function () {
    inputCheck();
  });
  $('#prefecture').blur(function () {
    inputCheck();
  });
  $('#agree').blur(function () {
    inputCheck();
  });

  //お問い合わせフォームの入力チェック
  function inputCheck() {
    //エラーのチェック結果
    let result;

    //エラーのメッセージテキスト
    let message = '';

    //エラーが無ければfalse、エラーがあればtrue
    let error = false;

    //お名前チェック
    if ($('#name').val() == ''){
      //エラーあり
      $('#name').css('background-color', '#f79999');
      error = true;
      message += 'お名前を入力してください。\n';
    } else {
      //エラーなし
      $('#name').css('background-color', '#fafafa');
    }

    //フリガナのチェック
    if ($('#furigana').val() == ''){
      //エラーあり
      $('#furigana').css('background-color', '#f79999');
      error = true;
      message += 'フリガナを入力してください。\n';
    } else {
      //エラーなし
      $('#furigana').css('background-color', '#fafafa');
    }

    //お問い合わせチェック
    if ($('#message').val() == ''){
      //エラーあり
      $('#message').css('background-color', '#f79999');
      error = true;
      message += 'お問い合わせ内容を入力してください。\n';
    } else {
      //エラーなし
      $('#message').css('background-color', '#fafafa');
    }

    //メールアドレスのチェック
    if ($('#email').val() == '' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1) {
      //エラーあり
      $('#email').css('background-color', '#f79999');
      error = true;
      message += 'メールアドレスが未記入、または「@」「.」が含まれていません。\n';
    } else {
      //エラーなし
      $('#email').css('background-color', '#fafafa');
    }

    //電話番号のチェック
    if($('#tel').val() != '' && $('#tel').val().indexOf('-') == -1) {
      //エラーあり
      error = true;
      message += '電話番号に「-」が含まれていません。\n';
    } else {
      //エラーなし
      $('#tel').css('background-color', '#fafafa');
    }

    //都道府県のチェック
    if ($('#prefecture').prop('value') == false){
      console.log($('#prefecture').val())
      //エラーあり
      $('#prefecture').css('background-color', '#f79999');
      error = true;
      message += '都道府県を選択してください。\n';
    } else {
      //エラーなし
      $('#prefecture').css('background-color', '#fafafa');
    }

    //個人情報のチェックボックスのチェック
    if($('#agree').prop('checked') = false) {
      error = true;
      message += '個人情報の取扱いについてご同意いただける場合はチェックをつけてください。'
    }

    //エラーの有無で送信ボタンを切り替え
    if(error == true) {
      $('#submit').attr('src', 'images/button-submit.png');
    } else {
      $('#submit').attr('src', 'images/button-submit-blue.png');
    }

    //オブジェクトでエラー判定とメッセージを返す
    result = {
      error: error,
      message: message
    }

    //戻り値としてエラーがあるかどうかを返す
    return result;
  }

