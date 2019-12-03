var thePlayer = 'test'; // 保存当前播放器以便操作

var current_play_status_element;
var current_complete_status_element;
var current_status;
var newWindow;
var nextSubContentDisplayOrder;
var nextSubContentType;
var newWindowCloseCheckLoop;
var is_first_load = true;
var is_section_no = false;
// 视频播放时间
var currentPosition = 0;

var suspend_time = 0;  // 播放过程中暂停的秒数
var timer;
var quizInterval;//播放下测试监听器

$(".btnl").click(function() { //点击btnl触发setTime()函数
	if (timer != null){
		clearInterval(timer); //清除对函数的调用
	}
	//setTime();
	timer = setInterval(setTime, 1000); //每隔1秒执行函数
});

$(".btnr").click(function() {
	clearInterval(timer); //清除对函数的调用
});





function setTime() {
	//	var hour = parseInt(suspend_time / 3600); // 计算时 
	//	var minutes = parseInt((suspend_time % 3600) / 60); // 计算分 
	//	var seconds = parseInt(suspend_time % 60); // 计算秒  
	//	hour = hour < 10 ? "0" + hour : hour;
	//	minutes = minutes < 10 ? "0" + minutes : minutes;
	//	seconds = seconds < 10 ? "0" + seconds : seconds;
	//	$(".showTime").val(hour + ":" + minutes + ":" + seconds);
	suspend_time++;
	//console.log('suspend_time : '+ suspend_time);
}

function getSuspendJsonData(next) {
	
	var status = 'I';
	var status_class = 'ing';
	var status_title = '进行中';
	var suspend_data = 0; //suspend_data  视频暂停位置
	var type = 'C';
	var video_length = 0;
	
	if (thePlayer != "test") {
		if (thePlayer.getState() == 'IDLE' || current_status == 'C'){
			status = 'C';
			var status_class = 'end';
			var status_title = '已完成';
		}
		suspend_data = Math.floor(thePlayer.getPosition());
		video_length = thePlayer.getDuration();
		if (suspend_data + 5 > video_length){
			suspend_data = 0;
		}
		thePlayer.stop();
	}else{
		type = "T";
	}
	
	//	if ($(current_complete_status_element).html() != 'C'){
	//		$(current_complete_status_element).html(status);  //更新完成状态
	//	}
	
	// $(current_play_status_element).html('o');  //取消正在播放标志
	
	if (next != 'none' && next != 'close'){
		//$(current_play_status_element).removeClass("play").addClass(status_class);  //取消正在播放标志，添加完成状态标志
		$(current_play_status_element).removeClass("section-cur");  //取消正在播放标志
		if (is_section_no){
			$(current_play_status_element).addClass('section_no');
			is_section_no = false;
		}
		//$(current_play_status_element).attr("title",status_title);
		$(current_complete_status_element).removeClass("ing").removeClass("end").addClass(status_class); // 添加完成状态标志
	}
	
	var data = {
		"type" : type,
		"status" : status,
		"suspend_data" : suspend_data,  // 视频暂停位置
		"suspend_time" : suspend_time,  // 播放过程中暂停的秒数
		"next":next
	}
	
	//console.info("post_data : "+JSON.stringify(data));
	
	return data;
	
}

function save(next) {
	var data = "";
	//console.info("save next : " + next);
	//	if ($(current_complete_status_element).html() != 'C'){
	//		$(current_complete_status_element).html(status);
	//	}
	
	$.ajax({
		type : "post",
		url : save_url,
		data : getSuspendJsonData(next),
		dataType : "json",
		success : function(data) {
			//console.info("player save status : " + data);
			//console.info("player save next : " + next);
		},
		error : function() {
			// console.error("player save failed.");
		}
	});
	if (next == 'close'){
		//console.info("play close: history back.");
		window.location = back_url;
		// history.back();
	}else if (next == 'close_preview'){
		window.close();
	}
}

function post_data(p_data, next_content_type) {
	
	if (next_content_type == 'S' || next_content_type == 'T' || next_content_type == 'L'){
		newWindow = window.open();
	}
	
	$.ajax({
		type : "post",
		url : play_next_url,
		data : p_data,
		dataType : "json",
		success : function(data) {
			// prev_content_type = data.prev_content_type;
			// next_content_type = data.next_content_type;
			play_new(data);
		},
		error : function() {
			// console.error("play change failed.");
		}
	});
}

function applyButton(status) {
	//console.info("status:=" + status);
	// if (loop != null) {
	// 	clearInterval(loop); // 清除对函数的调用
	// }

	
	
	/*
	 * $("#main").removeClass("doing"); $("#complete_in_new_window").hide();
	 * $("#showprenext").show();
	 * $(current_complete_status_element).removeClass("ing").removeClass("end").addClass("end");
	 * newWindow.close();
	 */
	// alert("babc");
	
	
}

// function play_prev() {
//	var p_data = getSuspendJsonData('prev');
//	post_data(p_data, prev_content_type);
// }

function play_next() {
	// var p_data = getSuspendJsonData('next');
	// post_data(p_data, next_content_type);
	play(nextSubContentDisplayOrder,nextSubContentType);
}

function play(display_order, content_type) {
	var p_data = getSuspendJsonData(display_order);
	post_data(p_data, content_type);
	// window.open('http://www.baidu.com');
}

function play_new(data) {
	
	//console.info("play_new : "+JSON.stringify(data));
	
	nextSubContentDisplayOrder = data.nextSubContentDisplayOrder;
	nextSubContentType = data.nextSubContentType;
	var currentSubContentDisplayOrder = data.currentSubContentDisplayOrder;
	current_sub_content_id = data.currentSubContentId;
	play_time_list = data.play_time_list;
	
	if (data.nextSubContentDisplayOrder == data.currentSubContentDisplayOrder){
		$("#next_sub_content_name").html("当前已为最后一章节<br>点击目录中其他章节继续学习");
		$("#enter_next").hide();
	}else{
		
		if (data.type == 'T' ){
			$("#test_live_msg").html("当前内容为考试，点击目录开始考试。");
			$("#test_live_msg").show();
		}else if (data.type == 'L'){
			$("#test_live_msg").html("当前内容为直播，点击目录进入直播。");
			$("#test_live_msg").show();
		}else{
			$("#test_live_msg").hide();
		}
		
		$("#next_sub_content_name").html("下一节 [" + data.nextSubContentName + "]");
		$("#enter_next").show();
		
		
	}
	
	current_play_status_element = '#play_status_' + currentSubContentDisplayOrder;
	current_complete_status_element = '#complete_status_' + currentSubContentDisplayOrder;
	
	// $(current_play_status_element).html('>');
	// $(current_complete_status_element).html(data.status);
	
	//var status_class = 'play';
	var status_class = 'section-cur';
	var status_title = '正在播放';
	// $(current_play_status_element).removeClass("ing").removeClass("ed").removeClass("no").addClass(status_class);  //添加正在播放标志
	
	
	
	$(current_play_status_element).addClass(status_class);  //添加正在播放标志
	if ($(current_play_status_element).hasClass('section_no')){
		$(current_play_status_element).removeClass('section_no');
		is_section_no = true;
	}
	
	
	// $(current_play_status_element).attr("title",status_title);
	
	var busystr = "";
	if(data.type == 'S'){
		busystr = "正在参加调查中<br>请完成后继续学习!";
	}else if(data.type == 'T'){
		busystr = "正在参加考试中<br>请完成后继续学习!";
	}else if(data.type == 'L'){
		busystr = "正在直播<br>请完成后继续学习!";
	}
	if (data.type == 'S' || data.type == 'T' || data.type == 'L'){
		
		if (thePlayer!= null && thePlayer != "test") {
			thePlayer.stop();
			// clearInterval(timer);
			thePlayer = "test";
		}
		if (!is_first_load){
			$("#main").addClass("doing");
			$("#busy").html(busystr);
			$("#complete_in_new_window").show();
			$("#video").hide();
			$("#showprenext").show();
			$("#replay").hide();
			
			newWindowCloseCheckLoop = setInterval(function() {
				// console.info('check newWindow close : ' + newWindow.closed);
				if (newWindow.closed) {
					clearInterval(newWindowCloseCheckLoop);
					// console.info('closed');
					$("#main").removeClass("doing");
					$("#complete_in_new_window").hide();
					$("#showprenext").show();
					$(current_complete_status_element).removeClass("ing").removeClass("end").addClass("end");
				}
			}, 1000); 
			
			newWindow.location = data.start_url;
		}else{
			$("#video").hide();
			$("#showprenext").show();
			$("#replay").hide();
		}
	} else {
		
		$("#main").removeClass("doing");
		$("#complete_in_new_window").hide();

		$("#video").show();
		$("#replay").show();
		$("#showprenext").hide();
		
		
		suspend_time = 0;
		current_status = data.status;
		
		// var video_width = document.getElementById("video").style.width;
		// var video_height = document.getElementById("video").style.height;
		// console.info("video_width : "+ video_width + "  video_height :" + video_height);
		
		thePlayer = jwplayer('video').setup({
			flashplayer : basePath + 'learner/play/js/jwplayer.flash.swf',
			sources : JSON.parse(data.start_url),
			// [{"label":"标清","file":"http://content.asdga.com/ab.mp4"}]
			// "[{"label":"标清","file":"http://content.qixuetang.cn/media/Sunshine_Girl_320p.mp4"},{"label":"高清","file":"http://content.qixuetang.cn/media/Sunshine_Girl_480p.mp4"},{"label":"超清","file":"http://content.qixuetang.cn/media/Sunshine_Girl_720p.mp4"}]"
			startparam : "start",
			width : '100%',
			height : '100%',
			dock : false,
			events : {
				onComplete : function() {
					//console.log("播放结束!!!");
					currentPosition = thePlayer.getPosition();
					$("#video").hide();
					$("#showprenext").show();
					save('none');
				},
				onVolume : function() {
					//console.log("声音大小改变!!!");
				},
				onReady : function() {
					
				},
				onPlay : function() {
					//console.log("开始播放!!!");
					currentPosition = -1;
					clearInterval(timer);
				    clearInterval(quizInterval);
					if(play_time_list !=null && play_time_list !="" 
						&& play_time_list != undefined){
						//添加小测试播放监听
						quizInterval = setInterval(addQuizListener, 1000);
					}
					
				},
				onPause : function() {
					//console.log("暂停!!!");
					currentPosition = thePlayer.getPosition();
					if (timer != null){
						clearInterval(timer); //清除对函数的调用
					}
					timer = setInterval(setTime, 1000);
					clearInterval(quizInterval);//取消小测试监听
				},
				onBufferChange : function() {
					//console.log("缓冲改变!!!");
				},
				onBufferFull : function() {
					//console.log("视频缓冲完成!!!");
				},
				onError : function(obj) {
					//console.log("播放器出错!!!" + obj.message);
					// 如果视频出错设置当前播放位置为0
					currentPosition = 0;
				},
				onFullscreen : function(obj) {
					if (obj.fullscreen) {
						//console.log("全屏");
					} else {
						//console.log("非全屏");
					}
				},
				onMute : function(obj) {
					//console.log("静音/取消静音")
				}
			}
		});
		
		if (data.suspend_data != null && data.suspend_data != 0){
			thePlayer.seek(data.suspend_data);
		}
		
		if (thePlayer.getState() != 'PLAYING') {
			thePlayer.play(true);
		}
		
		$('#video_menu').remove();
	}
}

$(function() {
	
	//play_time_list = $("#play_time_list").val();//小测试播放时间5,10,20
	//sub_content_id = $("#sub_content_id").val();
	
	$('.section-list').each(function(){
		var obj = $(this).find('.section');
		if(obj.length == 1){
			obj.addClass('section_no');
		}
	});
	
	play_new(current_play_data);
	
	is_first_load = false;
	
	//console.info("----- " + current_play_data.start_url);
	//console.info("--bb--"+JSON.stringify(current_play_data));
	
	
	
	// 播放 暂停
	$('.player-play').click(function() {
		if (thePlayer.getState() != 'PLAYING') {
			thePlayer.play(true);
			this.value = '暂停';
		} else {
			thePlayer.play(false);
			this.value = '播放';
		}
	});

	// 停止
	$('.player-stop').click(function() {
		thePlayer.stop();
	});

	// 获取状态
	$('.player-status').click(function() {
		var state = thePlayer.getState();
		var msg;
		switch (state) {
		case 'BUFFERING':
			msg = '加载中';
			break;
		case 'PLAYING':
			msg = '正在播放';
			break;
		case 'PAUSED':
			msg = '暂停';
			break;
		case 'IDLE':
			msg = '停止';
			break;
		}
		//alert(msg);
	});

	// 获取播放进度
	$('.player-current').click(function() {
		//alert(thePlayer.getPosition());
	});

	// 跳转到指定位置播放
	$('.player-goto').click(function() {
		if (thePlayer.getState() != 'PLAYING') { // 若当前未播放，先启动播放器
			thePlayer.play();
		}
		thePlayer.seek(80.8); // 从指定位置开始播放(单位：秒)
	});
	
	// 跳转到指定位置播放
	$('.player-replay').click(function() {
		$("#video").show();
		$("#showprenext").hide();
		thePlayer.seek(0); // 从指定位置开始播放(单位：秒)
		if (thePlayer.getState() != 'PLAYING') { // 若当前未播放，先启动播放器
			thePlayer.play();
		}
	});

	// 获取视频长度
	$('.player-length').click(function() {
		//alert(thePlayer.getDuration());
	});
	
	// 获取视频长度
	$('.player-next').click(function() {
		play_next();
	});
	
	$('.player-prev').click(function() {
		play_prev();
	});
	
	$('.back-btn').click(function() {
		
		$('#busy').html('正在保存，请稍候...');
		
		if (thePlayer!= null && thePlayer != "test") {
			thePlayer.play(false);
			//thePlayer.stop();
		}
		$("#main").addClass("doing");
		$("#complete_in_new_window").show();
		$("#video").hide();
		$("#showprenext").show();
		$("#replay").hide();
		
		save("close");
		// console.info("close");
		// setTimeout("alert('abc')", 2000);
		// setTimeout("history.back()", 1000);
	});
	
	$('.close-btn').click(function() {
		save("close_preview");
	});
	
});

/**
 * 小测试定时监听
 * @returns
 */
function addQuizListener(){
	
	if(play_time_list !=null && play_time_list !="" &&  play_time_list != undefined){
		//需要弹出小测试时间位置
		var timeArr = play_time_list.split(",");
		if (thePlayer != "test") {
			var play_time = thePlayer.getPosition();
			var len = 0;
			while(len < timeArr.length){
				if(parseInt(play_time) >= timeArr[len] && parseInt(play_time) <= parseInt(timeArr[len])+1 ){
					thePlayer.play(false);
					play_time_list = play_time_list.replace(timeArr[len],"");
					playQuiz(current_sub_content_id,parseInt(timeArr[len]));
					break;
				}
				len++;
			}
		}
	}
    //console.info(thePlayer.getPosition()+" : "+play_time_list);
}
/**
 * 播放小测试
 * @param sub_content_id
 * @param play_time
 */
function playQuiz(sub_content_id,play_time){
	
	var data ={
		"sub_content_id":sub_content_id,
		"play_time":play_time
	}
	//手机端
	if(is_from_mobile){
		thePlayer.play(true);
		/*top.dialog({
			url:basePath+'admin/resource/content/quiz/mobile/play?sub_content_id='+sub_content_id+"&play_time="+play_time,
			width: $(window).width()-10,
			height:$(window).height()-10,
			data:data,
			onclose: function () {
				thePlayer.play(true);
			}
		}).showModal();*/
	}else{
		top.dialog({
			url:basePath+'admin/resource/content/quiz/play?sub_content_id='+sub_content_id+"&play_time="+play_time,
			title: '小测试',
			width: 725,
			height:380,
			data:data,
			onclose: function () {
				thePlayer.play(true);
			}
		}).showModal();
	}

	
}

//function openLive(sub_content_id,offering_id,type){
//	if( type == 'L'){
//		$.ajax({
//			type : "post",
//			url : basePath+"admin/live/haslive",
//			data : {"sub_content_id":sub_content_id,"offering_id":offering_id,"flag":"S"},
//			dataType : "json",
//			success : function(data) {
//					//var liveTrainingExtend = data.liveTrainingExtend;
//					if(yun.isNotEmpty(data)){
//						if(data.start_date > new Date()){
//							alert("该直播还未开始!");
//						}else if(data.invalid_date < new Date()){
//							alert("该直播已经结束!");
//						}else{
//							alert(data.url);
//							window.open(data.url);
//							
//							//var link = $('#live'+sub_content_id);
//							//alert(link);
//							//link.arrt("href",data.url);
//							//link.setAttribute("href",data.url);
//							//a.click();
//							//var postUrl = basePath+"admin/live/findcourselive?sub_content_id=" + sub_content_id +"&offering_id=" +offering_id;
//							//window.location.href = postUrl;
//							//window.open('_blank');
//						}
//					}else{
//						alert("该章节在不存在直播!");
//					}
//				},
//				error:function() {
//					alert("请联系管理员!");
//				}
//		});
//	}
//}




