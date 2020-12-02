
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

var fromValidation = function (selector) {
    var result = true;
    $(selector).find("span.validateText").remove();

    $.each($(selector).find('.required'), function (i, val) {
        var value = $(this).val();
        var isNumber = $(this).attr('type');
        //console.log(value);
        if (value === "" || value === null || value === undefined) {
            if (isNumber == 'number') {
                $(this).after("<span class='validateText' id='validateText" + $(this).get(0).id + "' style='color:red;font-style:italic;'> *Min 0 </span>");
            }
            else if (!$(this).next().is("span.validateText")) {
                $(this).after("<span class='validateText' id='validateText" + $(this).get(0).id + "' style='color:red;font-style:italic;'> *Required </span>");
            } else {
                $(this).next().find("span.validateText").remove();
            }
            result = false;
        }
        else if (isNumber === "email" && validateEmail(value) === false && (value != "" || value != null || value != undefined)) {
            if (validateEmail(value) === false) {
                $(this).after("<span class='validateText' id='validateText" + $(this).get(0).id + "' style='color:red;font-style:italic;'> Format Email Tidak Benar </span>");
            } else {
                $(this).next().find("span.validateText").remove();
            }
            result = false;
        }
    });

    $.each($(selector).find('span.required-date'), function (i, val) {
        var value = $(this).find("input.required-date").val();
        if (value === "" || value === null || value === undefined) {
            if (!$(this).next().is("span.validateText")) {
                $(this).after("<span class='validateText' id='validateText" + $(this).find("input.required-date").get(0).id + "' style='color:red;font-style:italic;'> *Required </span>");
            } else {
                $(this).next().find("span.validateText").remove();
            }
            result = false;
        }
    });

    $.each($(selector).find('span.required-dropdown'), function (i, val) {
        var value = $(this).find("input.required-dropdown").val();
        if (value === "" || value === null || value === undefined) {
            if (!$(this).next().is("span.validateText")) {
                $(this).after("<span class='validateText' id='validateText" + $(this).find("input.required-dropdown").get(1).id + "' style='color:red;font-style:italic;'> *Required </span>");
            } else {
                $(this).next().find("span.validateText").remove();
            }
            result = false;
        }
    });

    $.each($(selector).find('span.required-dropdowns'), function (i, val) {
        var value = $(this).find("input.required-dropdowns").val();
        if (value === "" || value === null || value === undefined) {
            if (!$(this).next().is("span.validateText")) {
                $(this).after("<span class='validateText' id='validateText" + $(this).find("input.required-dropdowns").get(0).id + "' style='color:red;font-style:italic;'> *Required </span>");
            } else {
                $(this).next().find("span.validateText").remove();
            }
            result = false;
        }
    });

    if ($(selector).find('input.attachment-required').length) {
        if ($(selector).find('ul.k-upload-files').length > 0) {
            $(selector).find('input.attachment-required').parent().parent().find("span.validateText").remove();
        }
        else {
            if (!$(selector).find('input.attachment-required').parent().next().is("span.validateText")) {
                $(selector).find('input.attachment-required').parent().after("<span class='validateText' id='validateText" + $(selector).find("input.attachment-required").get(0).id + "' style='color:red;font-style:italic;'> *Required </span>");
            }
            result = false;
        }
    }
    return result;
}


function getBasicUrl() {
    var url = BASE + APPURL + getCurrentController() + "/";

    return url;
};

function getCurrentController() {
    //get Current Controller
    var SplitAppurl = APPURL.split('/');
    var splitActionUrl = ACTIONURL.split('/');
    SplitAppurl.splice((SplitAppurl.length - 1), 1);
    for (var i in SplitAppurl) {
        var idx = $.inArray(SplitAppurl[i], splitActionUrl);
        if (idx >= 0) {
            splitActionUrl.splice(idx, 1);
        }
    }
    return splitActionUrl[0];
}

function ShowHideModal(modalName) {
    if ($("#" + modalName + "").hasClass('in')) {

        $("#" + modalName + "").modal('hide');
    } else {
        $("#" + modalName + "").modal('show');
    }
}

var fromPost = function (data, url, callback) {
    var result = true;
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        beforeSend: function () {
            loadingShow();
        },
        success: function (data) {
            if (data.status === 'success') {
                notification.show({
                    title: data.title,
                    message: data.text
                }, data.status);
                notification.setOptions({ autoHideAfter: 3000 });
                result = true;
            }
            else {
                showAlert(data.title, data.text);
                result = false;
            }
        },
        error: function (data) {
            notification.show({
                title: data.title,
                message: data.text
            }, data.status);
            notification.setOptions({ autoHideAfter: 3000 });
            result = false;
        }
    }).always(function () {
        loadingHide();
    }).done(function () {
        callback(result);
        //return result;
    });
    //console.log(result);
}

var notification = $("#notification").kendoNotification({
    position: {
        pinned: true,
        top: 30,
        right: 30
    },
    autoHideAfter: 4000,
    stacking: "down",
    templates: [{
        type: "info",
        template: $("#infoTemplate").html()
    }, {
        type: "error",
        template: $("#errorTemplate").html()
    }, {
        type: "success",
        template: $("#successTemplate").html()
    }]

}).data("kendoNotification");

var showNotification = function (title, text, status) {
    notification.show({
        title: title,
        message: text
    }, status);
    notification.setOptions({ autoHideAfter: 5000 });
}

var showAlert = function (title, text) {
    $("#dialog").kendoDialog({
        width: "500px",
        title: title,
        closable: true,
        modal: true,
        content: text
    }).data("kendoDialog").open();
    $(".k-window-titlebar").css('background-color', 'red');
    $(".k-window-titlebar").css('color', 'white');
}

String.prototype.trunc = function (n) {
    return this.substr(0, n - 1) + (this.length > n ? '&hellip;' : '');
};

function onChangeInput(selector) {
    //console.log(selector.id);
    $("#validateText" + selector.id).remove();
}

function onChangedropdown(selector) {
    //console.log(selector.id);
    $("#validateText" + selector.id).remove();
}

var loadingHide = function () {
    $(".se-pre-con").fadeOut("slow");
};

var loadingShow = function () {
    //console.log("Show");
    $(".se-pre-con").fadeIn("slow");
};