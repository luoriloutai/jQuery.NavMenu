
/*
 *  jQuery导航菜单插件
 *
 *  Guo Sheng@2016 778170336@qq.com
 */

;
(function($) {
    $.fn.navmenu = function(data) {
        return this.each(function() {
            var $self = $(this);
            $self.css({
                "position": "relative" // 这个设置很重要，设置之后，其他元素的偏移才对，否则就需要加上其他的内边距等才能正确
            });

            $self.hover(function() {

            }, function() {
                // 由于绝对定位的子菜单在逻辑上属于父元素，所以只需设置鼠标离开父元素后子菜单隐藏即可。
                $(subMenu).hide();
                $(mainMenu).find("div").removeClass("mainMenuItemHover"); 
            });

            // 一级菜单外容器
            var mainMenu = document.createElement("div");
            $(mainMenu).css({
                "float": "left", // 不设浮动的话，子菜单不会与一级菜单并排显示，总会被顶到下面。
                "position": "relative", // 这个设置应与父元素设置相同，父元素在这里就是控件（定义为菜单控件的元素）自己
                "z-index": 101 // 将一级菜单的层叠数设置高于二级菜单的层叠数，这样可以压住二级菜单的左边框
            });
            var selfWidth = $self.width();
            if (!selfWidth) {
                selfWidth = 300;
                $self.width(selfWidth);
            }
            $(mainMenu).width(selfWidth);
            $(mainMenu).addClass("mainMenu");
            $self.append(mainMenu);

            // 子菜单外容器
            var subMenu = document.createElement("div");
            // 一级菜单的边框宽度，这里只取左边框
            var mainMenuBorderWidth = $(mainMenu).css("border-right-width");
            
            // 若未取到值，浏览器可能是火狐
            if (!mainMenuBorderWidth) {
                mainMenuBorderWidth = $(mainMenu).css("borderRightWidth");
            } 

            mainMenuBorderWidth = mainMenuBorderWidth.substr(0, mainMenuBorderWidth.indexOf("px"));
            if (!mainMenuBorderWidth) {
                mainMenuBorderWidth = 0;
            }
            mainMenuBorderWidth = parseInt(mainMenuBorderWidth);
            // 子菜单左外边距，值为一级菜单的宽度+一级菜单边框的宽度
            var subMenuLeft = $self.width() + mainMenuBorderWidth;
            
            $(subMenu).css({
                "position": "absolute", // 要设置为绝对定位
                "left": subMenuLeft+"px", 
                "z-index": 100,
                "display": "none"
            });

            $(subMenu).addClass("subMenu");
            $self.append(subMenu);

            // 清除浮动
            var clearEle = document.createElement("div");
            $(clearEle).css("clear", "both");
            $self.append(clearEle);

            // 子菜单边框宽度
            var subMenuBorderWidth = $(subMenu).css("border-right-width");
            
            // 可能为火狐时
            if (!subMenuBorderWidth) {
                subMenuBorderWidth = $(subMenu).css("borderRightWidth");
            }

            subMenuBorderWidth = subMenuBorderWidth.substr(0, subMenuBorderWidth.indexOf("px"));
            if (!subMenuBorderWidth) {
                subMenuBorderWidth = 0;
            }
            subMenuBorderWidth = parseInt(subMenuBorderWidth);

            // 一级菜单条目悬停时，向右伸展的距离，用于压住子菜单边框
            var mainItemRight = mainMenuBorderWidth + subMenuBorderWidth;

            // 填充菜单数据
            for (var i = 0; i < data.length; i++) {
                var mainMenuItem = document.createElement("div");
                $(mainMenuItem).attr("id", "nav-" + i); // 为一级菜单单个条目命名，为了使其与它的子菜单关联。设置为nav-0、nav-1...
                
                var mainMenuId = data[i].id;
                $(mainMenuItem).attr("menuId", mainMenuId);
                var mainMenuUrl = data[i].url;
                if (mainMenuId) {
                    mainMenuUrl = mainMenuUrl + "?mainMenuId="+encodeURIComponent(mainMenuId);
                }

                var mainMenuItemContent = document.createElement("a");
                var mainMenuTarget = data[i].target;
                if (!mainMenuTarget) {
                    mainMenuTarget = "_blank";
                }
                $(mainMenuItemContent).text(data[i].menu).attr({
                    "href":mainMenuUrl,
                    "target":mainMenuTarget
                });
                
                $(mainMenuItem).addClass("mainMenuItem");
                $(mainMenuItem).hover(function() {
                    $(subMenu).show();
                    $(this).addClass("mainMenuItemHover");
                    $(this).css("margin-right", parseInt("-" + mainItemRight));
                    $(this).siblings().removeClass("mainMenuItemHover");
                    $("#" + $(this).attr("id") + "-sub").show().siblings().hide();
                }, function() {
                    $(this).siblings().removeClass("mainMenuItemHover").attr("style", "none");

                });
                $(mainMenuItem).append(mainMenuItemContent);
                $(mainMenu).append(mainMenuItem);

                // 子菜单内容容器
                var subMenuContainer = document.createElement("dl");
                $(subMenuContainer).css({
                    "padding": "10px 20px",
                    "margin": 0
                });
                $(subMenuContainer).hide();
                $(subMenuContainer).attr("id", "nav-" + i + "-sub"); // 命名子菜单，设置为nav-0-sub、nav-1-sub...
                $(subMenuContainer).hover(function() {
                    var thisId = $(this).attr("id");
                    var mainMenuItemId = thisId.substr(0, thisId.lastIndexOf("-")); // 通过子菜单的名称获得一级菜单的名称，然后对一级菜单进行操作
                    $("#" + mainMenuItemId).addClass("mainMenuItemHover");
                }, function() {

                });

                var submenuData = data[i].children;
                for (var j = 0; j < submenuData.length; j++) {
                    var submenuItem = document.createElement("dd");
                    $(submenuItem).css({
                        "padding": 0,
                        "margin": 0
                    });

                    var subMenuItemContent = document.createElement("a");
                    $(submenuItem).append(subMenuItemContent);
                    $(subMenuContainer).append(submenuItem);

                    var subMenuUrl = submenuData[j].url;
                    var subMenuId = submenuData[j].id;
                    // 当前所在的子菜单的元素id
                    var subMenuEleId = $(submenuItem).parent().attr("id");
                    // 取得与当前子菜单对应的主菜单（一级菜单）的元素id
                    var mainMenuEleId = subMenuEleId.substr(0,subMenuEleId.indexOf("-sub"));
                    // 父菜单的数据id，不是元素id。来自于数据库等数据源。
                    var parentMenuId = $("#" + mainMenuEleId).attr("menuId");
                    
                    if (subMenuId) {
                        subMenuUrl = subMenuUrl + "?mainMenuId="+encodeURIComponent(parentMenuId)+"&subMenuId=" + encodeURIComponent(subMenuId);
                    }
                    $(subMenuItemContent).text(submenuData[j].menu);
                    var target = submenuData[j].target;
                    if (!target) {
                        target = "_blank";
                    }
                    $(subMenuItemContent).attr({
                        "href":subMenuUrl,
                        "target":target
                    });
                }
                $(subMenu).append(subMenuContainer);
            }
        });
    };
})(jQuery);