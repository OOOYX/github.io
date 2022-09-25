"use strict";  //启用严格模式
function draw(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d'); 
    ctx.textAlign = "center";
    const img = new Image();
    let timing=document.getElementById("ti");
    let score=0;
    let counter=document.getElementById("sc");
    let x = [173.4,236.7,300,363.3,426.6];
    let y = [10,73.3,136.6,199.9,263.2,326.5,390];
    //填充背景色
    ctx.fillStyle="#FFFF66";
    ctx.fillRect(173.4, 10, 253.2, 380);
    

    //线条粗细
    ctx.lineWidth = 2;
    
    //画横线
    for(let i=0;i<7;i++){
        ctx.beginPath();
        ctx.moveTo(x[0],y[i]);
        ctx.lineTo(x[4],y[i]);
        ctx.closePath();
        ctx.stroke();
    }
    
    //画竖线
    for(let i=0;i<5;i++){
        ctx.beginPath();
        ctx.moveTo(x[i],y[0]);
        ctx.lineTo(x[i],y[6]);
        ctx.closePath();
        ctx.stroke();
    }
    
    //开始时随机绘制方块
    let a=[];
    function start(){
        for(let i=0;i<6;i++){
            ctx.fillStyle="#FFFF66";
            ctx.fillRect(x[a[i]]+1, y[i]+1, 61.3, 61.3);
        }
        for(let i=0;i<6;i++){
            a[i]=Math.floor(Math.random()*4);
            ctx.fillStyle="#4682B4";
            ctx.fillRect(x[a[i]]+1, y[i]+1, 61.3, 61.3);
        }  
     }
    start();
    
    let going = false;//判断游戏是否在进行中
    
    
    window.addEventListener("keydown",keydown);
    let timer,time;
    let lose=false;//避免输了不重置还能直接开始
    function keydown(e){
        let b=["KeyG","KeyH","KeyJ","KeyK"];
        let judge=false;
        if(e.code=="KeyR"){
            //重置游戏
            score=0;
            lose=false;
            timing.innerHTML="<h4>剩余时间：10秒</h4>";
            going=false;
            time=10;
            counter.innerHTML="<h4>得分：0</h4>";
            start();
            clearInterval(timer);
            alert("已重置");
            return;
        }
        //计时器开始
        
        if(going==false&&lose==false){
            time = 10;
            going = true;
            //放表情包
            img.onload = function() {
                ctx.drawImage(img, 0, 0);
             };
            img.src = "冲鸭.jpeg" ;
            timer = setInterval(function(){
                time=time-0.1;
                time=Math.round(time*10)/10
                timing.innerHTML="<h4>剩余时间："+time+"秒</h4>"
                if(time<0){
                    //时间到，游戏结束
                    alert("时间到！最终得分："+score);
                    clearInterval(timer);
                    timing.innerHTML="<h4>剩余时间：0秒</h4>";
                    going = false;
                    lose = true;
                    //覆盖表情包
                    ctx.fillStyle="#FFFFFF";
                    ctx.fillRect(0, 0, 100, 100);
                }
            }, 100)
            return;
        }
        if(going&&b[a[5]]==e.code){
            judge=true;
        }else if(going){
            judge=false;
        }
        if(judge&&going){
            //加分
            score++;
            counter.innerHTML="<h4>得分："+score;
            //还原色块
            for(let i=0;i<6;i++){
                ctx.fillStyle="#FFFF66";
                ctx.fillRect(x[a[i]]+1, y[i]+1, 61.3, 61.3);
            }
            //色块下移
            for(let i=5;i>=1;i--){
                a[i]=a[i-1];
                ctx.fillStyle="#4682B4";
                ctx.fillRect(x[a[i]]+1, y[i]+1, 61.3, 61.3);
            }
            //新色块
            a[0]=Math.floor(Math.random()*4);
            ctx.fillStyle="#4682B4";
            ctx.fillRect(x[a[0]]+1, y[0]+1, 61.3, 61.3);
        }else if(going){
            //按错了，游戏结束
            alert("按错了，游戏结束！最终得分："+score);
            clearInterval(timer);
            going = false;
            lose = true;
            //覆盖表情包
            ctx.fillStyle="#FFFFFF";
            ctx.fillRect(0, 0, 100, 100);
        }
    }
}