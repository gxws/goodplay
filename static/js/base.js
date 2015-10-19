(function(window,undefined){
  $('.J_focus').focus();
  if($('.J_j_date').size()){
  var _run,
      $date = $('.J_j_date'),
      date  = $date.text().split('|'),
      days  = [31, date[0] % 4 ? 28 : 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      week  = ["一","二","三","四","五","六","日"],
      min   = [0, 1, 1, 0, 0, 0, 0],
      max   = [9999, 12, days[(+ date[1]) - 1], (date[1] -1), 23, 59, 59];
  (_run = function(){
    $date.text(getstr());
    setTimeout(_run, 1000);
  })();
  function getstr(){
    _add(6);
    // return _zero(date[1]) + '月' + _zero(date[2]) + '日 ' + _zero(date[3]) + ':' + _zero(date[4]) + ':' + _zero(date[5]);
    return  _zero(date[1]) + '月' + _zero(date[2]) + '日 ' + _zero(date[4]) + ':' + _zero(date[5]) + '星期' + week[(date[3] -1)];
  }
  function _zero(n){
    return n < 10 ? '0' + (+ n).toString() : + n;
  }
  function _add(i){
    var num = + date[i];
    if(num >= max[i]){
      date[i] = min[i];
      i >= 1 && _add(i - 1);
    }else if(i==3){
      date[i] = num + 1;
      _add(i - 1);
    }else{
      date[i] = num + 1;
    }
  }
}
  if($('.J_j_advertising').size()){
    var $imgBox = $('.J_j_advertising'),
        $img = $imgBox.find('img'),
        len = $img.size()-1,
        time = null,
        index = 0;
    time = setInterval(function(){
      $img.eq(index).removeClass('active');
      index+=1;
      if(index>len){
        index=0;
      }
      $img.eq(index).addClass('active');

    },5000);
  }
})(window)