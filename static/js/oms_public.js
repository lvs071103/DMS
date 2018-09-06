/**
 * Created by jack on 17/4/12.
 */

if(document.getElementById('keyManager')){
    $('.agree').click(function(){
        var object1 = $(this).parent().prev().html();
        $(this).attr('href','/salt/salt_key_accept/minion=' + object1 );
    });

    $('.delete').click(function(){
        var object1 = $(this).parent().prev().prev().html();
        $(this).attr('href','/salt/salt_key_delete/minion=' + object1 );
    });

    $('.push_agent').click(function(){
        var object1 = $(this).parent().prev().prev().html();
        $(this).attr('href','/salt/cp_agent_dir/minion=' + object1 );
    });

    $('.sync').click(function(){
        var object1 = $(this).parent().prev().prev().html();
        $(this).attr('href','/salt/salt_sync_model/minion=' + object1 );
    });

    $('.get_info').click(function(e){
        //alert("111");
        var object1 = $(this).parent().prev().prev().html();
        var xx = e.originalEvent.x || e.originalEvent.layerX || 0;
        var yy = e.originalEvent.y || e.originalEvent.layerY || 0;

        $.ajax({
            url: '/salt/get_servers_info/minion=' + object1,
            'dataType':'json',
            success: function(data){
                console.log(data);
            },
            error: function(data){
                $('body').append('<div id="deletWrap">' +
                '<div width="100%" id="explain">'+data.responseText+'</div>'+
                '<a href="javascript:void(0)" id="notDel">确认</a></div>');

                $('#deletWrap').css("position","fixed");
                $('#deletWrap').css("top",yy);
                $('#deletWrap').css("left",xx);

                $('#deletWrap').fadeIn(300);
                $('#notDel,#deletWin').click(function(){
                    $('#deletWrap').fadeOut(300,function(){
                        $(this).remove();
                    })
                });
            }
        })
    });

}



$('.dataTables-example').DataTable({
    pageLength: 25,
    responsive: true,
    dom: '<"html5buttons"B>lTfgitp',
    buttons: [
        { extend: 'copy'},
        {extend: 'csv'},
        {extend: 'excel', title: 'ExampleFile'},
        {extend: 'pdf', title: 'ExampleFile'},

        {extend: 'print',
         customize: function (win){
                $(win.document.body).addClass('white-bg');
                $(win.document.body).css('font-size', '10px');

                $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
        }
        }
    ]

});


// server tag list delete
// ----------------start-------------------

var tagList = [
        [$("#assets_list"), '/assets/assets_del/?id='],
        [$("#network_list"), '/assets/network_del/?id='],
        [$("#hardware_list"), '/assets/hardware_del/?id='],
        [$("#tag_list"), '/assets/tags_del/?id='],
        [$("#service_list"), '/assets/service_del/?id='],
        [$("#user_list"), '/auth/user_del/?id='],
        [$("#group_list"), '/auth/group_del/?id='],
        [$("#department_list"), '/department/dept_del/?id='],
        [$("#app_list"), '/department/app_del/?id='],
        [$("#zone_list"), '/settings/zone_del/?id='],
        [$("#info_list"), '/settings/info_del/?id='],
        [$("#upload_list"), '/settings/upload_del/?id='],
        [$("#path_list"), '/settings/path_del/?id='],
        [$("#produce_list"), '/settings/produce_del/?id='],
        [$("#repo_list"), '/repo/repo_del/?id='],
        [$("#update_list"), '/saltstack/all_zone_update_del/?id='],
        [$("#sys_password_list"), '/saltstack/change_password_record_del/?id='],
        [$("#backup_list"), '/saltstack/code_backup_record_del/?id='],
        [$("#release_list"), '/saltstack/code_release_history_del/?id='],
        [$("#rollback_list"), '/saltstack/code_rollback_record_del/?id='],
        [$("#cron_list"), '/saltstack/cron_history_del/?id='],
        [$("#command_list"), '/saltstack/execute_history_del/?id='],
        [$("#push_list"), '/saltstack/file_push_history_del/?id='],
        [$("#processor_list"), '/saltstack/services_handle_del/?id='],
        [$("#op_list"), '/saltstack/system_user_operation_history_del/?id='],
        [$("#package_list"), '/saltstack/yum_install_record_del/?id='],
        [$("#mysql_user_list"), '/dbs_mysql/dba_del/?id='],
        [$("#db_list"), '/dbs_mysql/database_del/?id='],
        [$("#archive_list"), '/repo/repo_archive_del/?id='],
        [$("#redis_list"), '/dbs_redis/redis_del/?id='],
        [$("#sync_config_list"), '/saltstack/sync_config_record_del/?id='],
        [$("#domain_list"), '/settings/domain_del/?id='],
        [$("#deploy_wizard_list"), '/saltstack/deploy_game_wizard_del/?id='],
        [$("#merge_list"), '/saltstack/merge_server_record_del/?id='],
        [$("#web_upstream_list"), '/saltstack/web_upstream_del/?id='],
        [$("#cp_get_template_list"), '/saltstack/salt_cp_get_template_del/?id='],
        [$("#cp_get_dir_list"), '/saltstack/salt_cp_get_dir_del/?id='],
        [$("#channel_list"), '/channel/channel_del/?id='],
        [$("#package_list"), '/channel/package_del/?id='],
        [$("#channel_push_list"), '/channel/package_push_del/?id='],
];

var newTag = null, i = null;

tagList.forEach(function (item,x) {
    if(item[0].length){
        newTag = item[0];
        i = x;
    }
});

//console.log(newTag);

if(newTag){
    newTag.on('click','.btn-danger',function(){
        var self = $(this),
            deleteID = self.attr('deleteId');

        $('body').append('<div id="deletWrap" ><div id="deletWin">X</div>' +
            '<a href="javascript:void(0)" id="trueDel" deleteId="' + deleteID + '">确认</a>' +
            '<a href="javascript:void(0)" id="notDel">离开</a></div>');

        $('#deletWrap').fadeIn(300);

        $('#trueDel').click(function(){
            var _the = $(this);
            var _delID = _the.attr('deleteId');
            $.get(tagList[i][1] + _delID,function(){
                newTag.find('.list_' + _delID).fadeOut(300,function(){
                    $(this).remove();
                });
                self.closest('tr').fadeOut(300, function () {
                    self.remove();
                });
            });
            $('#deletWrap').fadeOut(300,function(){
                $(this).remove();
            });
        });

        $('#notDel,#deletWin').click(function(){
            $('#deletWrap').fadeOut(300,function(){
                $(this).remove();
            })
        });
    });
}
// ----------------end--------------------
