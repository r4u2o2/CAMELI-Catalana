$(function(){
    /**
     * ハンバーガーメニュー
     */
     $('#manuButton').on('click', function(){
        console.log('menuクリック');
        $('#manuButton').toggleClass('active');
        $('#nav').toggleClass('active');
   });
    /**
     * topArea
     */
    // 1. 要素の位置を取得
    var workPosY00 = $('#topArea').offset().top;
    var workPosY01 = $('#selectArea').offset().top;
    // 2. スクロール位置取得
    $(window).on('scroll', function(){
        var dy = $(this).scrollTop();
        // console.log('dy' + dy);
    // 3. 条件文
    // console.log($(window).height());
    // 4. 対象要素にクラスの付与
    if(workPosY00 - $(window).height() < dy)
    {
        // $('#leftIn').addClass('left-in-box'),
        // $('#rightIn00').addClass('right-in-img'),
        $('#topArea > #titleArea00').addClass('top-in'),
        $('#topArea > #titleText00').addClass('top-in-text');
    }
    else{
        // $('#leftIn').removeClass('left-in-box'),
        // $('#rightIn00').removeClass('right-in-img'),
        $('#topArea > #titleArea00').removeClass('top-in'),
        $('#topArea > #titleText00').removeClass('top-in-text');
    }
    if(workPosY01 - $(window).height() < dy)
    {
        // $('#leftIn').removeClass('left-in-box'),
        // $('#rightIn00').removeClass('right-in-img'),
        $('#topArea > #titleArea00').removeClass('top-in'),
        $('#topArea > #titleText00').removeClass('top-in-text');
    }
    });


    /**
     * 画像切り替え（クリックイベント）
     */
    var subImage1Src = $('#subImage1').css('background-image');
    var subImage2Src = $('#subImage2').css('background-image');
    var subImage3Src = $('#subImage3').css('background-image');

    console.log('画像１：' + subImage1Src);
    console.log('画像２：' + subImage2Src);
    console.log('画像３：' + subImage3Src);

     $('#subImage1').on('click', function(){
         console.log('画像1クリックしたよ');
         $('#mainImage').css('background-image', subImage1Src);
     });
     $('#subImage2').on('click', function(){
         console.log('画像2クリックしたよ');
         $('#mainImage').css('background-image', subImage2Src);
     });
     $('#subImage3').on('click', function(){
         console.log('画像3クリックしたよ');
         $('#mainImage').css('background-image', subImage3Src);
     });

    /**
     * プルダウン
     */
    //アコーディオンをクリックした時の動作
    $('.select').on('click', function() {//セレクト要素をクリックしたら
        // console.log('セレクトクリック');

        $('.box').slideUp(500);//クラス名.boxがついたすべてのアコーディオンを閉じる
      
        var findElm = $(this).children(".box");//セレクト直後のアコーディオンを行うエリアを取得


        if($('.select').hasClass('close')){//セレクト要素にクラス名closeがあれば
            $(this).removeClass('close');//クラス名を除去    
        }
        else
        {//それ以外は
            $('.close').removeClass('close'); //クラス名closeを全て除去した後
            $(this).addClass('close');//クリックしたタイトルにクラス名closeを付与し
            $(findElm).slideDown(500);//アコーディオンを開く
        }
    });

  
    /**
     * セレクト
     */




     /**
     * カレンダー
     */
    const weeks = ['日', '月', '火', '水', '木', '金', '土']
    const date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    const config = {
        show: 1,
    }
    
    function showCalendar(year, month) {
        for ( i = 0; i < config.show; i++) {
            const calendarHtml = createCalendar(year, month)
            const sec = document.createElement('section')
            sec.innerHTML = calendarHtml
            document.querySelector('#calendar').appendChild(sec)
    
            month++
            if (month > 12) {
                year++
                month = 1
            }
        }
    }
    
    function createCalendar(year, month) {
        const startDate = new Date(year, month - 1, 1) // 月の最初の日を取得
        const endDate = new Date(year, month,  0) // 月の最後の日を取得
        const endDayCount = endDate.getDate() // 月の末日
        const lastMonthEndDate = new Date(year, month - 2, 0) // 前月の最後の日の情報
        const lastMonthendDayCount = lastMonthEndDate.getDate() // 前月の末日
        const startDay = startDate.getDay() // 月の最初の日の曜日を取得
        let dayCount = 1 // 日にちのカウント
        let calendarHtml = '' // HTMLを組み立てる変数
    
        // calendarHtml += '<p>ご希望の到着予定日</p>'
        calendarHtml += '<h3>' + month + '月' + '</h3>'
        calendarHtml += '<table>'
    
        // 曜日の行を作成
        // for (let i = 0; i < weeks.length; i++) {
        //     calendarHtml += '<td>' + weeks[i] + '</td>'
        // }
    
        for (let w = 0; w < 5; w++) {
            calendarHtml += '<tr>'
    
            for (let d = 0; d < 7; d++) {
                if (w == 0 && d < startDay) {
                    // 1行目で1日の曜日の前
                    let num = lastMonthendDayCount - startDay + d + 1
                    calendarHtml += '<td class="is-disabled"></td>'
                } else if (dayCount > endDayCount) {
                    // 末尾の日数を超えた
                    let num = dayCount - endDayCount
                    calendarHtml += '<td class="is-disabled"></td>'
                    dayCount++
                } else {
                    calendarHtml += `<td class="calendar_td" data-date="${year}/${month}/${dayCount}">${dayCount}</td>`
                    dayCount++
                }
            }
            calendarHtml += '</tr>'
        }
        calendarHtml += '</table>'
    
        return calendarHtml
    }
    
    function moveCalendar(e) {
        document.querySelector('#calendar').innerHTML = ''
    
        if (e.target.id === 'prev') {
            month--
    
            if (month < 1) {
                year--
                month = 12
            }
        }
    
        if (e.target.id === 'next') {
            month++
    
            if (month > 12) {
                year++
                month = 1
            }
        }
    
        showCalendar(year, month)
    }
    
    // document.querySelector('#prev').addEventListener('click', moveCalendar)
    // document.querySelector('#next').addEventListener('click', moveCalendar)
    
    document.addEventListener("click", function(e) {
        if(e.target.classList.contains("calendar_td")) {
            // alert('クリックした日付は' + e.target.dataset.date + 'です')
            $('#preview-date').html('お届け予定日：' + e.target.dataset.date);
        }
    })
    
    showCalendar(year, month)


});