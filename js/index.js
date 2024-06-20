var clickFlag=true,
    time=setInterval(forward,5000),//计时器
    index=0,//位数
    banner=document.querySelector(".banner"),
    bannerUl=document.querySelector(".bannerImg"),
    roundLi=document.querySelector(".round").getElementsByTagName("li"),
    bannerWidth=banner.offsetWidth,//获取图片的宽度
    bannUl=document.querySelector(".bannerImg").getElementsByTagName("li")[0],
    bannerUl_li=bannerUl.getElementsByTagName("li");

    for(var i=0;i<bannerUl_li.length;i++){
        bannerUl_li[i].style.width=banner.offsetWidth+"px"
    }
    cloneJpg(bannUl);

    //遍历按钮,切换到对应图片
    for(var i=0;i<roundLi.length;i++){
        roundLi[i].onmouseover=function(){
            index=this.getAttribute("num");
            AutoGo();
        }
    }

    //鼠标悬停在图片上,动画停止
    banner.onmouseover=function(){
        clearInterval(time);
    }

    //鼠标移开图片,动画开始
    banner.onmouseout=function(){
        time=setInterval(forward,5000);
    }
//图片滑动的函数
function forward(){
    index++;
    if(index>roundLi.length) index=0;//图片到最后一张
    AutoGo();
}
document.querySelector(".leftPrev").onclick=function (){
    index--;
    if(index<0) index=bannerUl_li.length-2;
    AutoGo();
}
document.querySelector(".rightPrev").onclick=function (){
    forward();
}
//轮播图滚动动画
function AutoGo(){
    clearInterval(timer);//清除定时器
    var start=bannerUl.offsetLeft,//获取移动块left的开始坐标
        end=index*bannerWidth*(-1),//获取移动块结束的坐标。
        change=end-start,
        timer,//图片添加动画效果计时器
        nowPage=0,
        maxT=30;
    clear();//清除所有按钮状态

    //添加按钮选中状态
    if(index==roundLi.length) roundLi[0].className="active";
    else roundLi[index].className="active";
    timer=setInterval(function(){
        nowPage++;
        if(nowPage>=maxT){//图片到达终点,停止计时器
            clearInterval(timer);
            clickFlag=true;
        }
        //图片到最后一张时,瞬间切换回第一张
        if(index==roundLi.length&&nowPage>=maxT){
            bannerUl.style.left=0;
            index=0;
        }else
            bannerUl.style.left=change/maxT*nowPage+start+"px";
    },1);
}

//克隆
function cloneJpg(l_i,){
    var clone_li=l_i.cloneNode(true);
    l_i.parentNode.appendChild(clone_li);
}

//清除所有按钮颜色
function clear(){
    for(var i=0;i<roundLi.length;i++){
        roundLi[i].className="";
    }
 }
 //置地
 document.getElementById("scrollbottom").onclick=function(){
    window.scrollTo(0,document.body.scrollHeight);
}
//置顶
document.getElementById("scrollTop").onclick=function(){
    window.scrollTo(0,0);
}







