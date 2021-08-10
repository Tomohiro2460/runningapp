function initMap() {
    // Geolocation APIに対応している
    if (navigator.geolocation) {
      // 現在地を取得
      navigator.geolocation.getCurrentPosition(
        // 取得成功した場合
        function(position) {
          // 緯度・経度を変数に格納
          var mapLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          // マップオプションを変数に格納
          var mapOptions = {
            zoom : 15,          // 拡大倍率
            center : mapLatLng  // 緯度・経度
          };
          // マップオブジェクト作成
          var map = new google.maps.Map(
            document.getElementById("map"), // マップを表示する要素
            mapOptions         // マップオプション
          );
          //　マップにマーカーを表示する
          var marker = new google.maps.Marker({
            map : map,             // 対象の地図オブジェクト
            position : mapLatLng   // 緯度・経度
          });
  
          // new google.maps.Circle({
          //   center: mapLatLng,       // 中心点(google.maps.LatLng)
          //   fillColor: '#ff0000',   // 塗りつぶし色
          //   fillOpacity: 0.1,       // 塗りつぶし透過度（0: 透明 ⇔ 1:不透明）
          //   map: map,             // 表示させる地図（google.maps.Map）
          //   radius: 1500,          // 半径（ｍ）
          //   strokeColor: '#ff0000', // 外周色
          //   strokeOpacity: 1,       // 外周透過度（0: 透明 ⇔ 1:不透明）
          //   strokeWeight: 1         // 外周太さ（ピクセル）
          // });
        },
        // 取得失敗した場合
        function(error) {
          // エラーメッセージを表示
          switch(error.code) {
            case 1: // PERMISSION_DENIED
              alert("位置情報の利用が許可されていません");
              break;
            case 2: // POSITION_UNAVAILABLE
              alert("現在位置が取得できませんでした");
              break;
            case 3: // TIMEOUT
              alert("タイムアウトになりました");
              break;
            default:
              alert("その他のエラー(エラーコード:"+error.code+")");
              break;
          }
        }
      );
    // Geolocation APIに対応していない
    } else {
      alert("この端末では位置情報が取得できません");
    }
  }
  
  function clickBtn3() {
    const number2 = document.getElementById("number2");
    var distanse = document.getElementById("number2").value;
    distanse = Number(distanse)*1000;
    document.getElementById("span2").textContent = number2.value;
    
    // Geolocation APIに対応している
    if (navigator.geolocation) {
      // 現在地を取得
      navigator.geolocation.getCurrentPosition(
        // 取得成功した場合
        function(position) {
          // 緯度・経度を変数に格納
          var mapLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          // マップオプションを変数に格納
          var mapOptions = {
            zoom : 15,          // 拡大倍率
            center : mapLatLng  // 緯度・経度
          };
          // マップオブジェクト作成
          var map = new google.maps.Map(
            document.getElementById("map"), // マップを表示する要素
            mapOptions         // マップオプション
          );
          //　マップにマーカーを表示する
          var marker = new google.maps.Marker({
            map : map,             // 対象の地図オブジェクト
            position : mapLatLng   // 緯度・経度
          });
  
          new google.maps.Circle({
            center: mapLatLng,       // 中心点(google.maps.LatLng)
            fillColor: '#ff0000',   // 塗りつぶし色
            fillOpacity: 0.1,       // 塗りつぶし透過度（0: 透明 ⇔ 1:不透明）
            map: map,             // 表示させる地図（google.maps.Map）
            radius: distanse,          // 半径（ｍ）
            strokeColor: '#ff0000', // 外周色
            strokeOpacity: 1,       // 外周透過度（0: 透明 ⇔ 1:不透明）
            strokeWeight: 1         // 外周太さ（ピクセル）
          });
        },
        // 取得失敗した場合
        function(error) {
          // エラーメッセージを表示
          switch(error.code) {
            case 1: // PERMISSION_DENIED
              alert("位置情報の利用が許可されていません");
              break;
            case 2: // POSITION_UNAVAILABLE
              alert("現在位置が取得できませんでした");
              break;
            case 3: // TIMEOUT
              alert("タイムアウトになりました");
              break;
            default:
              alert("その他のエラー(エラーコード:"+error.code+")");
              break;
          }
        }
      );
    // Geolocation APIに対応していない
    } else {
      alert("この端末では位置情報が取得できません");
    } 
  }
  
  function click_start() {
    let getKm = document.getElementById("span2").textContent;
    if (getKm) {
      $('#timer-wrapper').removeClass('hidden');
      count_timer();
    } else {
      alert('距離を設定してください');
    }
  }
  // 後で消す
  // function clickBtn3() {
  //   const number2 = document.getElementById("number2");
  //   var distanse = document.getElementById("number2").value;
  //   document.getElementById("span2").textContent = number2.value;
  // }
  
  let cnt = 0;
  let min = 0;
  let hour = 0;
  function count_timer() {
    $('#timer-wrapper').removeClass('hidden');
    $('#start-run').removeClass('hidden');
    $('#click-start').addClass('hidden');
    cover_on()
    predict_run_time()
  
    // Timer
    cnt = 0;
    min = 0;
    hour = 0;
    let run_hour = document.getElementById('hour_timer');
    let run_minute = document.getElementById('min_timer');
    let run_second = document.getElementById('sec_timer');
  
    // timer初期化
    run_hour.innerText = ('00' + hour).slice(-2) // ゼロパディング
    run_minute.innerText = ('00' + min).slice(-2)
    run_second.innerText = ('00' + cnt).slice(-2)
  
    id = setInterval(function() {
      cnt++;
      if(cnt >= 60) {
        min++;
        cnt=0;
        run_minute.innerText = ('00' + min).slice(-2);
      }
      if(min>=60) {
        hour++;
        min=0;
        run_hour.innerText = ('00' + hour).slice(-2);
      }
      run_second.innerText = ('00' + cnt).slice(-2);
    }, 1000)
  }
  
  function stop_timer() {
    clearInterval(id)   // タイマーを止める
    insert_result(cnt)  // 経過時間を挿入
    insert_some_foods() // 画像を挿入
    // update_user_point() // DBにポイントを更新
    $('#timer-end-wrapper').removeClass('hidden');
  }
  function display_none() {
    $('#timer-wrapper').addClass('hidden');
    cover_off()
  }
  function display_block() {
    $('#timer-wrapper').removeClass('hidden');
    cover_on()
  }
  function cover_on() {
    $('#cover').removeClass('hidden');
  }
  function cover_off() {
    $('#cover').addClass('hidden');
  }
  
  // 終了画面
  function close_result() {
    $('#timer-end-wrapper').addClass('hidden');
    $('#timer-wrapper').addClass('hidden');
    $('#cover').addClass('hidden');
    $('#start-run').addClass('hidden');
    $('#click-start').removeClass('hidden');
  }
  
  // 18km/h → 5 m/s
  let max_run_speed = 5;
  function predict_run_time() {
    const number2 = document.getElementById("number2");
    let set_distanse = document.getElementById("number2").value*1000;
    let run_time_second = Math.floor(set_distanse/max_run_speed);
    let predict_run_hour = Math.floor(run_time_second/(60*60)); // 時間hour
    run_time_second -= predict_run_hour*3600;
    let predict_run_minute = Math.floor(run_time_second/60); // 分min
    run_time_second -= predict_run_minute*60; // 秒sec
  
    document.getElementById('predict_run_hour').textContent = ('00' + predict_run_hour).slice(-2);
    document.getElementById('predict_run_minute').textContent = ('00' + predict_run_minute).slice(-2);
    document.getElementById('predict_run_second').textContent = ('00' + run_time_second).slice(-2);
  }
  
  function insert_result(cnt) {
    let set_distance = document.getElementById('number2').value;
    let burned_calory = 0;
    let user_body_weight = sessionStorage.getItem("body_weight");
    let snack_num = sessionStorage.getItem("count_snack"); //お菓子の数取得
  
    document.getElementById('set_distance').textContent = set_distance;
    document.getElementById('result_run_hour').textContent = hour;
    document.getElementById('result_run_minute').textContent = min;
    document.getElementById('result_run_second').textContent = cnt;
  
    if(user_body_weight) {
      burned_calory = user_body_weight*set_distance;
    }
    document.getElementById('burned_calory').textContent = burned_calory;
    if(snack_num) {
      document.getElementById('snack_num').textContent = snack_num;
    }
  
  }
  
  // insert some foods
  function insert_some_foods() {
    let img_box = document.getElementById('img-box');
    let img_src = '../static/images/salada_chiken.jpeg';
    let new_element = document.createElement('img');
    new_element.src = img_src;
    new_element.width = 50;
    img_box.insertAdjacentElement("beforeend", new_element)
  }
  
  // update user point
  function update_user_point() {
    // 情報を取得
    // 加工
    // fetch_user_info()
  }