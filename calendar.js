(function($){

  $.fn.myCalendar = function(options){
    var settings = $.extend( {
      week: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
      format:'yy/mm/dd',
      head_color: '#0e7ac4',
      left_arrow: '#0e7ac4',
      right_arrow: '#0e7ac4',
      week_color: 'white',
      day_color: '#fffff1',
      close_color: '#2fcdb4'
    }, settings, options);

/*
 *  CLOSEをクリックでカレンダーを閉じる
 */
      $(document).on('click',".mycld_close",function(){
        $(".myCalendar").remove();
      });

      /*
 * 月末を得る
 */
    function lastDay(yy, mm){
      var dt = new Date(yy, mm, 0);
      return dt.getDate();
    }

/*
 * カレンダーボックスの展開
 */
/*
 * 今月のカレンダー展開
 */

    $(document).on('click',"input[type = text][class = mycld]",function(){
      $(".myCalendar").remove();
      var date   = new Date();
      var yy     = date.getFullYear();
      var mm     = date.getMonth()+1;
      var offset = $( this ).offset();
      var top    = Math.ceil(offset.top)+35;
      var left   = Math.ceil(offset.left);
      var id     = $(this).attr('id');

      Calendar(yy,mm,top,left,id);
    });

  function Calendar(yy,mm,top,left,id){
    var last = lastDay(yy,mm);
    var week = settings.week;

  //曜日を得て最初の空白行数を計算
    var dt    = new Date(yy,mm-1,1);
    var blank = dt.getDay();

  //月初めの曜日を取得
    var fday = blank;
    
    var html = '';
      html +='    <div class="myCalendar" data-year="" data-month="" data-top="" data-left="" data-fid="" >';
      html +='      <div class="mycld_wrap">';
      html +='        <div class="mycld_control">';
      html +='          <div class="mycld_clt_l" style="background-color: '+settings.left_arrow+'">&Lt;</div>';
      html +='          <div class="mycld_clt_c" style="background-color: '+settings.head_color+'">'+yy+' - '+mm+'</div>';
      html +='          <div class="mycld_clt_r" style="background-color: '+settings.right_arrow+'">&Gt;</div>';
      html +='        </div>';
      html +='        <div class="mycld_head">';
      
      for(var i=0; i<week.length; i++){
        html +='          <div class="mycld_days mycld_c" style="background-color: '+settings.week_color+'">'+week[i]+'</div>';
      }

      html +='        </div>';
      html +='        <div class="mycld_day_wrap" style="background-color: '+settings.day_color+'">';

      for(var i=0; i<blank; i++){
        html +='          <div class="mycld_days">&nbsp;</div>';
      }

      for(var i=1; i<=last; i++){
        html +='          <div class="mycld_days mycld_r '+week[fday]+'" id="'+i+'">'+i+'</div>';
        fday++;
        if(fday > 6){
          fday = 0;
        }
      }

      html +='        </div>';
      html +='        <div class="mycld_close" style="background-color: '+settings.close_color+'">CLOSE</div>';
      html +='      </div>';
      html +='    </div>';
      
        $("body").append(html);
        $(".myCalendar").css({"top":top,"left":left});

        $(".myCalendar").data("year",yy);
        $(".myCalendar").data("month",mm);
        $(".myCalendar").data("top",top);
        $(".myCalendar").data("left",left);
        
        if(id){
          $(".myCalendar").data("fid",id);
        }
  }

 /*
 * 日をクリックでフォームへ日付を入れる
 */
$(document).on('click',".mycld_r",function(){
  var year   = $(".myCalendar").data("year");
  var month  = $(".myCalendar").data("month")|0;
  var day    = $(this).attr('id')|0;
  var format = settings.format;
  if(day < 10) day = '0'+day;
  if(month < 10) month = '0'+month;

  format = format.replace("yy", year);
  format = format.replace("mm", month);
  format = format.replace("dd", day);

  $("#day1").val(format);

});


/*
 * 月を進める
 */
$(document).on('click',".mycld_clt_r",function(){
  $(".myCalendar").addClass('mycld_remove');
  $(".myCalendar").hide();

  var year  = $(".myCalendar").data("year");
  var month = $(".myCalendar").data("month");
  var top   = $(".myCalendar").data("top");
  var left  = $(".myCalendar").data("left");
  
  if( month == 12){
    year = year+1;
    month = 1;
  }else{
    month = month+1;
  }
  Calendar(year,month,top,left);
  $(".mycld_remove").remove();
});

/*
* 月を戻す
*/
$(document).on('click',".mycld_clt_l",function(){
  $(".myCalendar").addClass('mycld_remove');
  $(".myCalendar").hide();
  
  var year  = $(".myCalendar").data("year");
  var month = $(".myCalendar").data("month");
  var top   = $(".myCalendar").data("top");
  var left  = $(".myCalendar").data("left");
  
  if( month == 1){
    year = year-1;
    month = 12;
  }else{
    month = month-1;
  }
  Calendar(year,month,top,left);
  $(".mycld_remove").remove();
});

  };
})(jQuery);