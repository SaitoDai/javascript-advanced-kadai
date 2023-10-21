let untyped = '';
let typed= '';
let score = 0;

const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const scoreView = document.getElementById('score-view');


const textLists = [
  'Hello World',
  'This is my Salad',
  'I eat nothing but Salad',
  'I am taller than you',
  'I am a fucking fat',
  'I am 2times heaver than you',
  'I graduated the University of Tokyo',
  'My face becomes like murder during lunch time',
  'I have people who piss me off',
  'I want to jump off a building when I have mistakes at work',
  'I have strong mental'
];



// ランダムなテキストを表示
const createText = () => {
  //正タイプした文字列をクリア
  typed = '';
  typedfield.textContent = typed;

  console.log(Math.floor(Math.random() * textLists.length));
  console.log(textLists.length);

  // 配列のインデックス数からランダムな数値を生成する
  let random = Math.floor(Math.random() * textLists.length);
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

//タイムアップと表示させる
const timeUp = () => {

    typedfield.textContent = '';
    untypedfield.textContent = 'タイムアップ！';

};


//スコアの表示


// キー入力の判定
const keyPress = e => {

  //誤タイプの場合
  if(e.key !== untyped.substring(0, 1)){
    wrap.classList.add('mistyped');
    //100ms誤に背景色を戻す
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }

  //正タイプの場合
  wrap.classList.remove('mistyped');
  console.log(e.key);
  //スコアリンクメイト
  score++;
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;
  scoreView.textContent = `${score} typed!`;

  scoreView.classList.add('green');
  setTimeout(() => {
    scoreView.classList.remove('green');
  }, 100);

  if(untyped === ''){
    createText();
  }
};

// タイピングスキルのランクを判定
const rankCheck = score => {
  //テキストを格納する変数を作る
  let text = '';

  //スコアに応じて異なるメッセージを変数textに格納する
  if(score < 100){
    text = `あなたのランクはCです。 \nBランクまであと${100 - score}文字です。`;
  } else if(score < 200){
    text = `あなたのランクはBです。 \nAランクまであと${200 - score}文字です。`;
  } else if(score < 300){
    text = `あなたのランクはAです。 \nSランクまであと${300 - score}文字です。`;
  } else if(score >= 300){
    text = `あなたのランクはSです。 \nおめでとうございます！`;
  }

  return `${score}文字打てました！\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {

  clearInterval(id);

  const result = confirm(rankCheck(score));
  if(result == true){
    window.location.reload();
  }
};

// カウントダウンタイマー
const timer = () => {
  //タイマー部分のHTML要素(p要素)を取得する
  let time = count.textContent;

  const id = setInterval(() => {
    //カウントダウンする
    time--;
    count.textContent = time;
    //カウントが0になったらタイマーを停止する
    if(time <= 0){;
      setTimeout(() => {
        gameOver(id); 
      }, 100);
      timeUp();
      
    }
  }, 1000);
};



//ゲームを開始
start.addEventListener('click', () => {
  //カウントダウンタイマーを開始する
  timer();

  createText();

  start.style.display = 'none';
  scoreView.style.display = 'block';

  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';
scoreView.textContent = score;

