function Stack_lg()
{
	this._option={
		_endpoint:"http://www.yamibuy.com/cn/activity.php",
		_act:"getStack",		
		_self:$('#stackScript'),
	}
	this.renderUI = function()
	{

		var f = this;		
		var counter = 0;//for position calculate
		var sectionItemNumber = 9; //how much items in a section
		//get items

		this._option._queryParams= {act:this._option._act,gids:this._option._items};	

		$.ajax({
		url:f._option._endpoint,
		method:"GET",		
		xhrFields: {withCredentials:true},
		data:f._option._queryParams,
		dataType:"JSON"
		}).done(function(resp){

			$.each(resp.items,function(i,v)
			{	
					var fragment = '<div class="lg-it-box">';
					fragment +=	'<a href="http://m.yamibuy.com/item-page.php?gid='+v.gid+'" target="_blank" rel="external"><img class="item-pic" src="'+v.basic.image+'"></a>';
					if(v.basic.is_promote)
					{
						fragment += '<p class="item-des">'+v.basic.name+'</p><p class="item-price">$'+v.basic.promote_price+'</p><p class="item-o-price">原价: $'+v.basic.shop_price+'</p>';
					}
					else
					{
						fragment += '<p class="item-des">'+v.basic.name+'</p><p class="item-price">$'+v.basic.shop_price+'</p>';
					}		
					
					if(v.basic.is_oos == 1)
					{
						fragment += '<a href="javascript:;" class="cta-btn ui-link">已售完</a></div>';
					}
					else
					{
						fragment += '<a href="javascript:;" class="cta-btn" onclick="addToCart('+v.gid+')">立即购买</a></div>';
					}
					
					if(counter == 8)
					{
	          fragment += '<div class="lg-it-box"><a href="http://m.yamibuy.com/activity.php?act=mchinese" target="_blank" rel="external"><img class="bs_2country_more" src="images/BS_2Country_PC_cn_zhgbtn.jpg"></a></div>';
					}
					else if(counter == 17)
					{
						fragment += '<div class="lg-it-box"><a href="http://m.yamibuy.com/activity.php?act=japan" target="_blank" rel="external"><img class="bs_2country_more" src="images/BS_2Country_PC_cn_japanbtn.jpg"></a></div>';
					}
					else if(counter == 26)
					{
						fragment += '<div class="lg-it-box"><a href="http://m.yamibuy.com/activity.php?act=mkorea" target="_blank" rel="external"><img class="bs_2country_more" src="images/BS_2Country_PC_cn_hanguobtn.jpg"></a></div>';
					}
					
					//decide the item belongs to which position 
	
					var stackHandler = Math.floor(counter/sectionItemNumber);
					f._option._stackHandler = $('#stack-lg'+stackHandler);
					f._option._stackHandler.append(fragment);			
	
					counter++;				
			});		
		});
	}

	this.init = function()
	{
		this._option._items = this._option._self.data('gids');
		this.renderUI();
	}

	this.init();
}
