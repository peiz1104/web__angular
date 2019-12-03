var isInit = false;
var isUpdate = false;
var updateStr = '';
var jsonStr = '';
var loadingUrl = '';
var client_proxy = '';
/**
 * @remark 以下为课件初始化参数设置SET,GET方法
 */
var getParamData = "";
function setParamData(data){
	this.getParamData = "cmi.suspend_data="+decodeURIComponent(data.cmi_suspend_data)+"\n"+ 
				        "cmi.core.lesson_location="+decodeURIComponent(data.cmi_core_lesson_location)+"\n"+ 
				        "cmi.core.credit="+data.cmi_core_credit+"\n"+ 
				        "adl.nav.request_valid.continue="+data.adl_nav_request_valid_continue+"\n"+
				        "cmi.core.lesson_status="+data.cmi_core_lesson_status+"\n"+
				        "cmi.core.session_time="+data.cmi_core_session_time+"\n"+
				        "errorCode="+data.errorCode+"\n"+
				        "adl.nav.request_valid.previous="+data.adl_nav_request_valid_previous+"\n"+
				        "cmi.core.student_id="+data.cmi_core_student_id+"\n"+
				        "cmi.core.student_name="+data.cmi_core_student_name+"\n"+
				        "cmi.core.entry="+data.cmi_core_entry+"\n"+
				        "cmi.core.lesson_mode="+data.cmi_core_lesson_mode+"\n"+
				        "cmi.core.total_time="+data.cmi_core_total_time+"\n"+
				        "errorText="+data.errorText+"\n"+
				        "cmi.core.exit="+data.cmi_core_exit+"\n"+
				        "cmi.core.score.raw="+data.cmi_core_score_raw;

}


/**
 * @获得随机数
 */
function getMathNum(){
	return Math.floor(Math.random() * ( 1000 + 1));
}

var resizeTimer = null;
window.onresize = function(){
   resizeTimer = resizeTimer ? null : setTimeout(doResize,0);
}
function doResize(){
	var iframe=document.getElementById("iframeB");
    iframe.height=document.documentElement.clientHeight;
	iframe.width = document.documentElement.clientWidth;
   
} 
//发送数据信息
function send(){
	//提交课件初始化请求
	if(isInit == true){
		isInit = false;
		jsonStr = '{"type":"init","mathNum":"'+this.getMathNum()+'"}';
		sendMessage(jsonStr);
	}
	//提交课件提交的跟踪信息
	if(isUpdate == true){
		jsonStr = '{"type":"updateInfo","updateInfo":"'+updateStr+'","mathNum":"'+this.getMathNum()+'"}';
		isUpdate = false;
		sendMessage(jsonStr);
	}
}
//处理接收的信息
(function(win, doc){
	var ifr = win.parent;
	var cb = function(json){
		var obj = eval('(' + json + ')');
		//初始化课件信息
		if(obj.type=="initData"){
			this.setParamData(obj.GetParam);
		}
		//切换章节时执行
		if(obj.type=="unloadsave"){
			document.getElementById("iframeB").src = loadingUrl;
		}
		//退出课程时执行
		if(obj.type=="unloadexit"){
			document.getElementById("iframeB").src = loadingUrl+"?type=E";
		}
		if(obj.type=="resize"){
			resizeCalBak(obj.width,obj.height);
		}
	};
	var sendMessage = function(){
			if (win.addEventListener) {
                win.addEventListener("message",function(e){
                	cb.call(win,e.data);
                },false);
            }else if(win.attachEvent) {
                win.attachEvent("onmessage",function(e){
                	cb.call(win,e.data);
                });
            }
			return function(data){
				ifr.postMessage(data,'*');
			};
		 
	}
	win.sendMessage = sendMessage();
})(window, document);

 /**
 * @remark 获得课程课件提交的跟踪信息，在ScormAPI.js中updateServer方法中调用
 */ 
function updateLessonStudyInfo(info){
	var infos = info.split("\n");
	var cmiData = infos[0];
	var cksd = infos[0].toLowerCase().indexOf("cmi.suspend_data");
	var ckcll = infos[0].toLowerCase().indexOf("cmi.core.lesson_location");
	
	if(cksd != -1 || ckcll != -1){
		cmiData = encodeURIComponent(infos[0]);
	}
	if(window.postMessage){
		isUpdate = true;
		updateStr = cmiData;
		send();
	}
}