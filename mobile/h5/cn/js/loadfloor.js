pageManger={  
    serviceData:{ 	
		url:"http://www.yamibuy.com/cn/activity.php",
	    postdata:{
        	act:"getStack"            
        }		
	},  
    loadUI:function(dv,data){     
      
        var currentData={
                moreLink:$(dv).data("link"),
                list:data
            };          
        var gettpl = document.getElementById('templist').innerHTML;            
        laytpl(gettpl).render(currentData, function(htmlstr){
            $(dv).html(htmlstr);
            $(dv).attr("data-load","true");
        });   
    },
    loadData:function(){
        var noload=$("div[data-role='goods']:not([data-load])");
        if(noload){
            $.each(noload,function(i,$item){                
                var $win = $(window);
                var itemOffsetTop = $($item).offset().top;
                var itemOuterHeight =  $($item).outerHeight();
                var winHeight = $win.height();
                var winScrollTop = $win.scrollTop();               
               if(!(winScrollTop > itemOffsetTop+itemOuterHeight) && !(winScrollTop < itemOffsetTop-winHeight)) {                   
                    $($item).html("<div class='goodsloading'></div>");
                    var delay=0;                                    
                    if(GetQueryString('m')=='1'){
                          delay=2000;
                          pageManger.serviceData.url="./resourse/data.json";
                      }   
                     pageManger.refresh($item,delay);
                }             
            })           
        }
    },
    refresh:function($item,d){
          setTimeout(function(){                       
                        $.ajax({                        	
                        url: pageManger.serviceData.url,
                        method:"get",
                        xhrFields: {withCredentials:true},
                        data:{
                            act:pageManger.serviceData.postdata.act,
                            gids:$($item).data("gids")
                        },
                        dataType:"JSON"
                        }).done(function(resp){                                                        
                           pageManger.loadUI($item,resp.items);	
                        }).fail(function(err){
                          console.log(err);
                        })     
            },d)
    }
};
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
$(function(){  
   $(window).scroll(function () {
      pageManger.loadData();
    })
    pageManger.loadData();   
})


