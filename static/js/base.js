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
init = (function(){
      var time = null,
          $img = $('#bar'),
          tag =120,
          $row = $('.row'),
          //max =$row.attr('data-max'),
          url = $row.attr('data-url') + '&rt=',
          failmax = $row.attr('data-failmax'),
          //arg='&rt=',
          // succeedurl = $row.attr('data-succeedurl'),
          // failurl = $row.attr('data-failurl'),
          //cliksize = 0,
          yes = 0,
          nb = 0,//正确次数
          _nb = 0;//错误次数
      if($img.size()){
        $img.animate({
            top:355
          },120000,'linear');
        time = setInterval(function(){
          if(tag<=0) return false;
          tag--;
          $('.J_countdown').text(tag+'s');
          if(tag<=0){//超时跳转失败结果
            location.href = url + 1;
          }
        },1000);
        $(document).on('click','.grid',function(){
          var $this = $(this),
              size  = $('[data-tag=1]').size(),
              _tag = $this.attr('data-tag'),
              has = $this.hasClass('no') || $this.hasClass('yes');
          if(has) return false;
          _tag == 1 ? nb+=1 : _nb+=1;
          //cliksize+=1;
          $this.addClass(_tag==1?'yes' : 'no');
          // nb==size ? delay(0) : _nb==failmax ? delay(0) :
          if(nb==size){//全部正确跳转成功结果
            delay(0)
            return false;
          }else if(_nb==failmax){//全部错误跳转失败结果
            delay(2)
          }
          function delay(ag){
            var ag = ag;
            setTimeout(function(){
              location.href= url + ag;
            },1000)
          }
        });
      }
    })();