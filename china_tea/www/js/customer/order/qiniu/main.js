/*global Qiniu */
/*global plupload */
/*global FileProgress */
/*global hljs */


$(function() {
    var img_list_1 = [], img_list_2 = [], img_list_3 = [], img_list_4 = [];
    var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'pickfiles1',
        container: 'container1',
        chunk_size: '4mb',

        // uptoken_url: $('#uptoken_url').val(),
        uptoken: localStorage.getItem('qiniu_token'),
        multi_selection: !(mOxie.Env.OS.toLowerCase()==="ios"),


        filters : {
            max_file_size : '100000mb',
            prevent_duplicates: true,
            //Specify what files to browse for
            mime_types: [
                // {title : "mp4 files", extensions : "mkv"}
                // {title : "flv files", extensions : "flv,jpg"}
                // {title : "Video files", extensions : "flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4"}
                // {title : "Video files", extensions : "avi,mp4,wmv,mpg,mov,flv,mkv,mpeg"}
                // {title : "Image files", extensions : "jpg,gif,png"}
                // {title : "Zip files", extensions : "zip"}
            ]
        },
        // uptoken_func: function(){
        //     var ajax = new XMLHttpRequest();
        //     ajax.open('GET', $('#uptoken_url').val(), false);
        //     ajax.setRequestHeader("If-Modified-Since", "0");
        //     ajax.send();
        //     if (ajax.status === 200) {
        //         var res = JSON.parse(ajax.responseText);
        //         console.log('custom uptoken_func:' + res.uptoken);
        //         return res.uptoken;
        //     } else {
        //         console.log('custom uptoken_func err');
        //         return '';
        //     }
        // },
        domain: $('#domain').val(),
        get_new_uptoken: false,
        // downtoken_url: '/downtoken',
        // unique_names: true,
        // save_key: true,
        // x_vars: {
        //     'id': '1234',
        //     'time': function(up, file) {
        //         var time = (new Date()).getTime();
        //         // do something with 'time'
        //         return time;
        //     },
        // },
        auto_start: true,
        log_level: 5,
        resize : {
            width : 200,
            height : 200,
            quality : 72,
            crop: true // crop to exact dimensions
        },
        init: {
            'FilesAdded': function(up, files) {
                plupload.each(files, function(file) {
                    var progress = new FileProgress(file, 'fsUploadProgress');
                    progress.setStatus("等待...");
                    progress.bindUploadCancel(up);
                });
            },
            'BeforeUpload': function(up, file) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                if (up.runtime === 'html5' && chunk_size) {
                    progress.setChunkProgess(chunk_size);
                }
            },
            'UploadProgress': function(up, file) {
                /*var progress = new FileProgress(file, 'fsUploadProgress');
                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                progress.setProgress(file.percent + "%", file.speed, chunk_size);*/
            },
            'UploadComplete': function() {
                //$('#success').show();
            },
            'FileUploaded': function(up, file, info) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                progress.setComplete(up, info, 1);
                img_list_1.push(localStorage.getItem('img_item_1'));
                localStorage.setItem('img_list_1', img_list_1);
            },
            'Error': function(up, err, errTip) {
                //$('table').show();
                var progress = new FileProgress(err.file, 'fsUploadProgress');
                progress.setError();
                progress.setStatus(errTip);
            }
                // ,
                // 'Key': function(up, file) {
                //     var key = "";
                //     // do something with key
                //     return key
                // }
        }
    });

    uploader.bind('FileUploaded', function() {
        console.log('hello man,a file is uploaded');
    });


    var uploader2 = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'pickfiles2',
        container: 'container2',
        chunk_size: '4mb',
        uptoken: localStorage.getItem('qiniu_token'),
        multi_selection: !(mOxie.Env.OS.toLowerCase()==="ios"),

        filters : {
            max_file_size : '100000mb',
            prevent_duplicates: true,
            mime_types: []
        },
        domain: $('#domain').val(),
        get_new_uptoken: false,
        auto_start: true,
        log_level: 5,
        resize : {
            width : 200,
            height : 200,
            quality : 72,
            crop: true // crop to exact dimensions
        },
        init: {
            'FilesAdded': function(up, files) {
                plupload.each(files, function(file) {
                    var progress = new FileProgress(file, 'fsUploadProgress');
                    progress.setStatus("等待...");
                    progress.bindUploadCancel(up);
                });
            },
            'BeforeUpload': function(up, file) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                if (up.runtime === 'html5' && chunk_size) {
                    progress.setChunkProgess(chunk_size);
                }
            },
            'UploadProgress': function(up, file) {
            },
            'UploadComplete': function() {
            },
            'FileUploaded': function(up, file, info) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                progress.setComplete(up, info, 2);
                img_list_2.push(localStorage.getItem('img_item_2'));
                localStorage.setItem('img_list_2', img_list_2);
            },
            'Error': function(up, err, errTip) {
                var progress = new FileProgress(err.file, 'fsUploadProgress');
                progress.setError();
                progress.setStatus(errTip);
            }
        }
    });

    uploader2.bind('FileUploaded', function() {
        console.log('hello man,a file2 is uploaded');
    });

    var uploader3 = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'pickfiles3',
        container: 'container3',
        chunk_size: '4mb',
        uptoken: localStorage.getItem('qiniu_token'),
        multi_selection: !(mOxie.Env.OS.toLowerCase()==="ios"),

        filters : {
            max_file_size : '100000mb',
            prevent_duplicates: true,
            mime_types: []
        },
        domain: $('#domain').val(),
        get_new_uptoken: false,
        auto_start: true,
        log_level: 5,
        resize : {
            width : 200,
            height : 200,
            quality : 72,
            crop: true // crop to exact dimensions
        },
        init: {
            'FilesAdded': function(up, files) {
                plupload.each(files, function(file) {
                    var progress = new FileProgress(file, 'fsUploadProgress');
                    progress.setStatus("等待...");
                    progress.bindUploadCancel(up);
                });
            },
            'BeforeUpload': function(up, file) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                if (up.runtime === 'html5' && chunk_size) {
                    progress.setChunkProgess(chunk_size);
                }
            },
            'UploadProgress': function(up, file) {
            },
            'UploadComplete': function() {
            },
            'FileUploaded': function(up, file, info) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                progress.setComplete(up, info, 3);
                img_list_3.push(localStorage.getItem('img_item_3'));
                localStorage.setItem('img_list_3', img_list_3);
            },
            'Error': function(up, err, errTip) {
                var progress = new FileProgress(err.file, 'fsUploadProgress');
                progress.setError();
                progress.setStatus(errTip);
            }
        }
    });

    uploader3.bind('FileUploaded', function() {
        console.log('hello man,a file3 is uploaded');
    });
});
