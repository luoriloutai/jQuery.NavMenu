 
 Head中的内容：

 先引用jquery文件，再引用以下文件
 <link href="javascript/navmenu/jquery.navmenu.css" rel="stylesheet" type="text/css" />
 <script src="javascript/navmenu/jquery.navmenu.js" type="text/javascript"></script>

 <script>
        $(function () {
		    // 菜单数据示例，必须符合如下格式
             var testMenuData = [
                {
                    "id":"1",
                    "menu": "menu1",
                    "url": "test.htm",
                    "target":"_blank",
                    "children": [
                        { 
                            "id": "1",
                            "menu":"sub1",
                            "url":"test.htm",
                            "target":"_blank"
                        },
                        {
                            "id": "2",
                            "menu": "sub2",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "3",
                            "menu": "sub3",
                            "url": "test.htm"
                        }
                    ]
                },
                {
                    "id": "2",
                    "menu": "menu2",
                    "url": "test.htm",
                    "target": "_blank",
                    "children": [
                        {
                            "id": "4",
                            "menu": "sub1",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "5",
                            "menu": "sub2",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "6",
                            "menu": "sub3",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "7",
                            "menu": "sub1",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "8",
                            "menu": "sub2",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "9",
                            "menu": "sub3",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "10",
                            "menu": "sub1",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "11",
                            "menu": "sub2",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "12",
                            "menu": "sub3",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "13",
                            "menu": "sub1",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "14",
                            "menu": "sub2",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "15",
                            "menu": "sub3",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "16",
                            "menu": "sub1",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "17",
                            "menu": "sub2",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "18",
                            "menu": "sub3",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "19",
                            "menu": "sub1",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "20",
                            "menu": "sub2",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "21",
                            "menu": "sub3",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "22",
                            "menu": "sub1",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "23",
                            "menu": "sub2",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "24",
                            "menu": "sub3",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "25",
                            "menu": "sub1",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "26",
                            "menu": "sub2",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "27",
                            "menu": "sub3",
                            "url": "test.htm",
                            "target": "_blank"
                        }
                    ]
                },
                {
                    "id": "3",
                    "menu": "menu3",
                    "url": "test.htm",
                    "target": "_blank",
                    "children": [
                        {
                            "id": "28",
                            "menu": "sub1",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "29",
                            "menu": "sub2",
                            "url": "test.htm",
                            "target": "_blank"
                        },
                        {
                            "id": "30",
                            "menu": "sub3",
                            "url": "test.htm",
                            "target": "_blank"
                        }
                    ]
                }
            ];

            $("#navmenu").navmenu(testMenuData);

        });

        
    </script>


body中的内容：

<div id="navmenu" style="float: left; "></div>




============================
其他说明

1.菜单默认宽度为300px,可自行设置所需宽度。

2.点击菜单选项跳转后Url带有参数,用于后台交互获取数据,形如xxx/test.htm?mainMenuId=2&subMenuId=20。
Url参数说明：
	mainMenuId - 主菜单（即一级菜单）选项对应的数据id。示例中testMenuData的id即为该值。
	subMenuId - 子菜单（即二级菜单）选项对应的数据id。示例中testMenuData的id即为该值。

点击了二级菜单后才有subMenuId参数。点击一级菜单只有mainMenuId。

3.json数据中target属性可以不设置，默认为_blank。

4.样式可以在.css文件中修改。
