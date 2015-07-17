require(['js/formComponent.js'], function (Form) {
    var data = {
        name: '商品信息',           // 表单名
        items: {
            // 表单数据键值，用数组维持一个有序索引
            submitKey: [
                'goods_name',
                'goods_type',
                'goods_system',
                'goods_system_version'
            ],
            items: {
                // 表单渲染数据
                goods_name: {
                    label: '商品名称',
                    type: 'input',
                    className: 'specail-class',
                    validate: {
                        need: true,
                        maxLength: 10
                    }
                },
                goods_type: {
                    label: '商品类型',
                    type: 'radio',
                    options: [
                        {
                            value: 1,
                            label: '空气净化器'
                        },
                        {
                            value: 2,
                            label: '智能手表'
                        }
                    ]
                },
                goods_system: {
                    label: '操作系统',
                    type: 'selector',
                    options: [
                        {
                            value: 'Android',
                            label: '安卓'
                        }
                    ]
                },
                goods_system_version: {
                    label: '操作系统版本',
                    type: 'input',
                    validate: {
                        type: 'version'
                    }
                }
            },
            submitData: {
                // 表单数据默认值
                goods_name: '我是商户名称默认值',
                goods_type: 1
            }
        }
    };

    var formObj = new Form({
        data: data,
        container: $('body')
    });
    formObj.render();
});
