/**
 * [base 交互逻辑]
 * @param  {[object]} window    [window对象]
 * @param  {[undefined]} undefined [undefined]
 * @return {[null]}           [description]
 */

 ((window, undefined) => {
 	'use strict';
	var WS     = window.WS || (window.WS = {});
	var base   = WS.base || (WS.base = {}); //接口程序
	const $win = $(window);
	const $doc = $(document);
	const loc  = location;
	let init   = {};//加载程序

	/**
	 * [base.loader 执行程序]
	 * @param  {[object]} fns    [传入对象或 function]
	 * @param  {[function]} onload [event]
	 * @return {[null]}        [ ]
	 */
	base.loader = (fns, onload) => {
		let _loader = () => {
			if ($.isFunction(fns)) {
				fns();
			}
			else if ($.isPlainObject(fns)) {
				for(let name in fns) {
					$.isFunction(fns[name]) && fns[name]();
				}
			}
		}
		onload ? _loader() : $(_loader);
		return fns;
	}
    /**
     * [图片异步加载]
     * @param  {[string]} imgurl [图片src]
     * @return {[object]}        [Promise对象]
     */
    base.loadImage = (imgurl) => {
        return new Promise((resolve, reject) => { //Promise对象 API http://es6.ruanyifeng.com/#docs/promise
            let image = new Image();
            image.onload = resolve;
            image.onerror = reject;
            image.src = imgurl;
        });
    }
    /**
     * 游戏结果弹出类
     */
    class confirm {
        constructor(obj, game) {//原型方法
            this.obj = obj;
            this.game = game;
            //this.ajaxurl = ajaxurl;
            //this.senddata = senddata;
            //this.status = status;
            // this.supplier = supplier; //商家
            // this.offered = offered; //提供积分
        }
        /**
         * [getGamesresult description]
         * @param  {[string]} url  [ajaxurl]
         * @param  {[object]} data [发送数据]
         * @return {[object]}      [Promise对象]
         */
        getGamesresult(url, data) {//ajax
            return new Promise((resolve, reject) => {
                $.get(url ,data||null, resolve, "json");
            });
        }
        /**
         * [图片异步加载]
         * @param  {[string]} imgurl [图片src]
         * @return {[object]}        [Promise对象]
         */
        loadImage(imgurl) {
            return new Promise((resolve, reject) => {
                let image = new Image();
                image.onload = resolve;
                image.onerror = resolve;
                image.src = imgurl;
            });
        }
        /**
         * [renderDom description]
         * @param  {[objcet]} d      [ajax返回数据]
         * @param  {[boole]} status [状态]
         * @return {[null]}        [ ]
         */
        renderDom(d, status) {
            let supplier = $('.J_supplier').text();
            let offered = $('.J_offered').text();
            let imgsrc = d.imgurl!='' ? d.imgurl : '';
            let data = {
                status: status,
                indexurl: d.indexurl,
                gameurl: d.gameurl,
                imgurl: imgsrc,
                supplier: supplier,
                offered: offered
            }
            let name = this.game == 'zaoca' ? '找茬' : this.game == 'zadan' ? '砸彩蛋' : '游戏';
            let node = `
                <div class="pa ad_img">
                    {{if imgurl && imgurl!=''}}
                        <img src="{{imgurl}}" />
                    {{/if}}
                </div>
                <div class="pa status_text {{if !status}}fail{{/if}}">{{if status}}${name}成功！{{else}}${name}失败！{{/if}}</div>
                <div class="pa status_info">{{if status}}<span>{{supplier}}</span>已将<span>{{offered}}</span>积分奖励存入钱包{{else}}奖励与您不远了，需再接再厉！{{/if}}</div>
                <div class="pa btn_bx zaoca_again">
                    <a href="{{gameurl}}" class="btn btn-action">继续${name}</a>
                    <a href="{{indexurl}}" class="btn btn-action">不玩了</a>
                </div>
            `;
            let render = template.compile(node);
            $(`#${this.obj}`).html(render(data));
            $('.J_confirm_bg').addClass('active');
            let $btn = $('.btn_bx').find('a');
            if($btn.size()>1){
                $btn.on('keydown', function(e) {
                    let indx = $(this).index();
                    let key   = indx == 0 ? 39 : 37;
                    if((e.keyCode != key) && (e.keyCode != 13)) return false;
                }).bind(null, this);
            }
            else{
                $btn.on('keydown', (e) => {
                    if(e.keyCode != 13) return false;
                });
            }
            $btn.eq(0).focus();
        }
        /**
         * [run description]
         * @param  {[string]} ajaxurl [ajaxurl]
         * @param  {[boole]} status  [状态]
         * @return {[null]}         [ ]
         */
        run(ajaxurl, status) { //实例化后另外调用
            let type = status ? {type:"succeed"} : {type:"fail"};
            this.getGamesresult(ajaxurl, type).then((d) => {
                if (d.state) {
                    if (d.imgurl && d.imgurl!='') {
                        this.loadImage(d.imgurl).then(this.renderDom(d, status), this.renderDom(d, status));
                    }
                    else {
                        this.renderDom(d, status);
                    }
                }
            });
        }
    }
    base.confirm = new confirm('confirm_zaoca', 'zaoca');
	init.public = () => { //公共方法
		// $doc.on('keydown', e => {//测试用
		// 	switch (e.keyCode) {
		// 		case 48://遥控器按键0
		// 			loc.reload();
		// 			break;
		// 		case 57://遥控器按键9
		// 			loc.href = '../index.html';
		// 			break;
		// 	}
		// });
		$('.J_focus').focus();
	}

	init.private = () => { //自定义方法
		const $amBox = $('.J_announcement_bx');
		if ($amBox.size()) {//首页公告滚动
			let arr = $amBox.attr('data-text').split(',');
			let len = arr.length;
			let tag = 0;
			const $tx = $amBox.find('span');
			let time = null;
			(function reel() {
				let s = 45;
				$tx.css('transform',`translate(0,50px)`).text(arr[tag]);
				time = setInterval(() => {
					$tx.css('transform',`translate(0, ${s}px)`);
					s -= 9;
					if(s<0){
						clearInterval(time);
						tag++;
						if (tag >= (len)) {
							tag = 0;
						}
						setTimeout(reel,6500);
					}
				},
				50);
			})();
		}
        const $clone = $('.J_clone');
        let t = null;
        if ($clone.size()) {//找茬游戏判断
            let $clo = $clone.find('a');
            $clo.eq(0).focus();
            const max = $clone.attr('data-max');
            const size = $clone.find('[data-tag=1]').size();
            let tag = 0;
            let win = 0;
            let arr = [];
            $clo.on('click', function () {
                let $this = $(this);
                let _tag = $this.attr('data-tag');
                let css = _tag=="1" ? 'yes' : 'no';
                let index = $this.index();
                if(!arr.includes(index)) {
                    if (_tag=='1') {win++;}
                    tag ++;
                    $this.addClass(css);
                    arr.push(index);
                }
                let status = win==size ? true : tag>=max ? false    : '';
                if((win==size) || (tag>=max)) {
                    base.confirm.run($('[data-ajax]').attr('data-ajax'), status);
                    clearInterval(t);
                    return false;
                }
            }).bind(null, this);//由于使用了babel-polyfill，在使用bind方法时需要传入null参数，babel-polyfill API文档https://babeljs.io/docs/usage/polyfill/
        }
        const $timeNb = $('.J_time_nb');
        let space = 603;
        if ($timeNb.size()) {//找茬游戏说明倒计时
            const $bf = $timeNb.find('span');
            setInterval(()=>{
                if(space<=0){
                    //space = 670;
                    loc.href = $timeNb.attr('data-url');
                    return false;
                }
                space -= 67;
                //$('title').text(space);
                $timeNb.css('background-position',  `0 -${space}px`);
                //countDown(space);
            },
            1000
            );
            function countDown(space) {
                //$bf.show();
                $timeNb.addClass('active');
                // $bf.css('transform:', 'scale3d(1, 1, 1)');
                // $bf.css('opacity:', 0);
                setTimeout(() => {
                    $timeNb.removeClass('active');
                    //$bf.css('transition','none');
                    //$bf.hide();
                    // $bf.css('transform:', 'scale3d(1, 1, 1)');
                    // $bf.css('opacity:', 1);
                    $bf.css('background-position',  '0 -'+space+'px');


                },
                700);
                //$timeNb.addClass('active');
            }
            // $timeNb.addClass('active')
        }
        const $scroll_bar = $('.J_scroll_bar');
        if ($scroll_bar.size()) {//找茬时间进度条
            const times = $scroll_bar.attr('data-time');
            let _time = times;
            let space = 0;
            const $reel = $scroll_bar.find('span');
            const $tx = $scroll_bar.find('em');
            const max = 355;

            t = setInterval(() => {
                space += max/times;
                if (_time<=0) {
                    clearInterval(t);
                    base.confirm.run($('[data-ajax]').attr('data-ajax'), false);
                    return false;
                }
                $reel.css('background-position', `-37px ${space}px`);
                _time --;
                $tx.text(`${_time}s`);
            },
            1000);
        }
        const $egg_bx = $('.J_egg_bx');
        if ($egg_bx.size()) {//砸蛋游戏
            let $egg = $egg_bx.find('a');
            $egg.on('click', function() {
                let $this = $(this);
                let $hammer = $this.find('.hammer');
                $hammer.addClass('active');
                let _t = null;
                t = setTimeout(() => {
                    $this.addClass('active');
                    let status = $this.attr('data-win') == '1' ? true : false;
                    _t = setTimeout(() => {
                        let zadanconfirm = new confirm('confirm_zadan', 'zadan');
                        zadanconfirm.run($('[data-ajax]').attr('data-ajax'), status);
                    },
                    1500);
                },
                500);
            }).bind(null, this);
        }
        const $adimg = $('.J_adimg');
        if ($adimg.size()) {//我的钱包广告图片异步加载
            const interval = $adimg.attr('data-interval');
            const imgs = $adimg.attr('data-adimg').split(',');
            let _size = 0;
            let imgarr = [];
            const $img = $adimg.find('img');
            // async function loadAdimg() {//异步事件 async函数 API http://es6.ruanyifeng.com/#docs/async
            //     let ret = null;
            //     try {
            //         for (var loadadimg of imgs) {
            //             // ret = await base.loadImage(loadadimg).then((result) => {
            //             //     imgarr.push(loadadimg);
            //             //     return result;
            //             // });
            //             ret = await base.loadImage(loadadimg);
            //             imgarr.push(loadadimg);
            //             //console.log(loadadimg);
            //         }
            //     }
            //     catch(err) {
            //         /* 忽略错误，继续执行 */
            //         console.log(`无法加载${loadadimg}`);
            //     }
            //     return ret;
            // }
            //setTimeout(loadAdimg, 3000);
            //loadAdimg();
            setTimeout(() => {
                imgs.map((imgurl) => {
                    base.loadImage(imgurl).then(() => {
                        imgarr.push(imgurl);
                    },(err) => {
                        console.log(err);
                    });
                });
            },
            3000);
            t = setInterval(() => {
                _size ++;
                let len = imgarr.length - 1;
                if (_size>len) {
                    _size = 0;
                }
                $img.attr('src', imgarr[_size]);
            },
            interval*1000);
        }
	}

	base.loader(init);
})(window);