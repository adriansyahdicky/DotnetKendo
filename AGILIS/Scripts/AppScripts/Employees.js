
$(document).ready(function () {
    GenerateGridEmployees();

    $("#cboDepartment").change(function () {
        loadJobbyDepart();
    });


    loadDate();

})

function loadDate() {
    $("#txtDateOfBirth, #txtHiresDate").kendoDatePicker({
        format: "dd MMM yyyy"
    });
    $("#txtDateOfBirth, #txtHiresDate").attr("readonly", true);
    
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function getBoolean(str) {
    if ("true".startsWith(str)) {
        return true;
    } else if ("false".startsWith(str)) {
        return false;
    } else {
        return null;
    }
}

$("#search_all").keyup(function () {
    var val = $('#search_all').val();
    $("#gvEmployees").data("kendoGrid").dataSource.filter({
        logic: "or",
        filters: [
            {
                field: "FirtsName",
                operator: "contains",
                value: val
            },
            {
                field: "LastName",
                operator: "contains",
                value: val
            },
            {
                field: "Email",
                operator: "contains",
                value: val
            },
            {
                field: "DepartmentName",
                operator: "contains",
                value: val
            },
            {
                field: "JobTitleName",
                operator: "contains",
                value: val
            },
            {
                field: "HireDate",
                operator: "contains",
                value: val
            },
        ]
    });


});

var isReadOnly = false;

function GenerateGridEmployees() {
    $("#gridview").append("<div id='gvEmployees' style='width:100%;'></div>");
 
        //console.log(getBasicUrl());
        isReadOnly = false;
        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: getBasicUrl() + "GetEmployees",
                    //data: parameter,
                    dataType: "json",
                    type: "post"
                },
            },
            batch: true,
            pageSize: 20,
            serverPaging: true,
            schema: {
                data: "data",
                total: "total_rows",
            }
        });

        grid = $("#gvEmployees").kendoGrid({
            dataSource: dataSource,
            sortable: false,
            scrollable: true,
            filterable: true,
            toolbar: [{ template: '# if(isReadOnly == false) { #<a class="btn btn-info" id="btnAddEmployee" onclick="CreateEmployee()"><i class="fa fa-plus-circle fa-fw"></i>Add New Record</a> #} #' }],
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            },
            columns: [{
                title: "No",
                template: '<div align="center">#= ++No #</div>',
                width: 40
            }, 

                {
                    field: "ID",
                    hidden: true
                },
                {
                    field: "FirtsName",
                    title: "FirtsName",
                    filterable: false,
                    width: 100
                },
                {
                    field: "LastName",
                    title: "LastName",
                    filterable: false,
                    width: 100
                },
                {
                    field: "Email",
                    title: "Email",
                    filterable: false,
                    width: 150
                },
                {
                    field: "DepartmentName",
                    title: "Department",
                    filterable: false,
                    width: 100
                },
                {
                    field: "JobTitleName",
                    title: "Job Title",
                    filterable: false,
                    width: 100
                },
                {
                    field: "HireDate",
                    title: "Hire Date",
                    filterable: false,
                    width: 100
                },
                {
                    field: "NIK",
                    hidden: true
                },
                {
                    field: "Address",
                    hidden: true
                },
                {
                    field: "Gender",
                    hidden: true
                },
                {
                    field: "PlaceOfBirth",
                    hidden: true
                },
                {
                    field: "DateOfBirth",
                    hidden: true
                },
                {
                    field: "Phone",
                    hidden: true
                },
                {
                    field: "JobTitleID",
                    hidden: true
                },
                {
                    field: "DepartID",
                    hidden: true
                },
                {
                    field: "ID",
                    template: '#if (isReadOnly == false) { #<a class="btn btn-primary k-button k-grid-Edit" data-toggle="tooltip" title="Edit" onclick="EditEmployee($(this))"><i class="fa fa-pencil fa-fw"></i></a> <a class="btn btn-primary k-button k-grid-Edit" data-toggle="tooltip" title="View" onclick="ViewEmployee($(this))"><i class="fa fa-eye fa-fw"></i>View</a> <a class="btn btn-danger k-button k-grid-myDelete" data-toggle="tooltip" title="Delete" onclick="DeleteEmployee($(this))"><i class="fa fa-trash-o fa-fw"></i></a> #} #',
                    title: "Action",
                    width: 200
                }
           ],
            dataBound: function (e) {
            },
            dataBinding: function () {
                No = (this.dataSource.page() - 1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
 
}


function CreateEmployee() {
    $(".formEmployee").find("span.validateText").remove();
    loadCombo();
    var viewModel = kendo.observable({
        FirstName: "",
        LastName: "",
        NIK: "",
        Department: "",
        JobTitle: "",
        PlaceOfBirth: "", 
        Gender: "",
        DateOfBirth: "",
        HiresDate: "",
        Email: "",
        Phone: "",
        Address: "",
        isNew: true,
        saveMenu: function (e) {

            e.preventDefault();
            if (fromValidation(".formEmployee")) {
                var data = kendo.observable({
                    FirstName: this.FirstName,
                    LastName: this.LastName,
                    NIK: this.NIK,
                    Department: this.Department,
                    JobTitle: this.JobTitle,
                    PlaceOfBirth: this.PlaceOfBirth,
                    Gender: this.Gender,
                    DateOfBirth: this.DateOfBirth,
                    HiresDate: this.HiresDate,
                    Email: this.Email,
                    Phone: this.Phone,
                    Address: this.Address
                });
                saveEmployee(data);
            }
        }
    });
    kendo.bind($("#EmployeeModals"), viewModel);
    $("#EmployeeModals .modal-title").text("Add Employee");
    ShowHideModal("EmployeeModals");
}


function saveEmployee(data) {
    var url = "CreateEmployee";
    if (fromValidation(".formEmployee")) {
        fromPost(data, getBasicUrl() + url, function (data) {
            //console.log(data)
            if (data) {
                ShowHideModal("EmployeeModals");
                $("#gvEmployees").data('kendoGrid').dataSource.read();
                //console.log("A");
            }
        })
    }
}


function EditEmployee(data) {
    var kendoGrid = $("#gvEmployees").data("kendoGrid");
    var dataItem = kendoGrid.dataItem($(data).closest("tr"));
    $(".formEmployee").find("span.validateText").remove();

    if (dataItem.Gender == "L") {
        $('#laki').prop('checked', true);
    }
    else {
        $('#perempuan').prop('checked', false);
    }

    var viewModel = kendo.observable({
        FirstName: dataItem.FirtsName,
        LastName: dataItem.LastName,
        NIK: dataItem.NIK,
        Department: dataItem.DepartID,
        JobTitle: dataItem.JobTitleID,
        PlaceOfBirth: dataItem.PlaceOfBirth,
        Gender: dataItem.Gender,
        DateOfBirth: dataItem.DateOfBirth,
        HiresDate: dataItem.HireDate,
        Email: dataItem.Email,
        Phone: dataItem.Phone,
        Address: dataItem.Address,
        isNew: false,
        saveMenu: function (e) {
            e.preventDefault();
           
            if (fromValidation(".formEmployee")) {
                var data = kendo.observable({
                    ID: dataItem.ID,
                    FirstName: this.FirstName,
                    LastName: this.LastName,
                    NIK: this.NIK,
                    Department: this.Department,
                    JobTitle: this.JobTitle,
                    PlaceOfBirth: this.PlaceOfBirth,
                    Gender: this.Gender,
                    DateOfBirth: this.DateOfBirth,
                    HiresDate: this.HiresDate,
                    Email: this.Email,
                    Phone: this.Phone,
                    Address: this.Address
                });
                updateEmployee(data);
            }
        }
    });
    kendo.bind($("#EmployeeModals"), viewModel);
    loadCombo(false);
    $("#EmployeeModals .modal-title").text("Edit Employee");
    ShowHideModal("EmployeeModals");
}

function updateEmployee(data) {
    var url = "UpdateEmployee";
    if (fromValidation(".formEmployee")) {
        fromPost(data, getBasicUrl() + url, function (data) {
            //console.log(data)
            if (data) {
                ShowHideModal("EmployeeModals");
                $("#gvEmployees").data('kendoGrid').dataSource.read();
                //console.log("A");
            }
        })
    }
}

function ViewEmployee(data) {
    var kendoGrid = $("#gvEmployees").data("kendoGrid");
    var dataItem = kendoGrid.dataItem($(data).closest("tr"));

    var viewModel = kendo.observable({
        FirstName: dataItem.FirtsName,
        LastName: dataItem.LastName,
        NIK: dataItem.NIK,
        Department: dataItem.DepartmentName,
        JobTitle: dataItem.JobTitleName,
        PlaceOfBirth: dataItem.PlaceOfBirth,
        Gender: dataItem.Gender == "L" ? "Laki - Laki" :  "Perempuan",
        DateOfBirth: dataItem.DateOfBirth,
        HiresDate: dataItem.HireDate,
        Email: dataItem.Email,
        Phone: dataItem.Phone,
        Address: dataItem.Address
    });
    kendo.bind($("#EmployeeViewModals"), viewModel);
    $("#EmployeeViewModals .modal-title").text("View Employee");
    ShowHideModal("EmployeeViewModals");
}

function DeleteEmployee(data) {
    var url = "DeleteEmployee";
    var dataItem = $("#gvEmployees").data('kendoGrid').dataItem($(data).closest("tr"));
    var data = {
        ID: dataItem.ID
    };

    var kendoWindow = $("<div />").kendoWindow({
        title: "<span style='color: #000'> Confirm delete record </span>",
        resizable: false,
        width: 400,
        modal: true
    });
    kendoWindow.data("kendoWindow").content($("#delete-confirmation").html()).center().open();
    var labelText = kendoWindow.find(".delete-message");
    labelText.text('Are you sure, that you want to Delete Employee "' + dataItem.FirtsName + '" ?');
    kendoWindow.find(".delete-confirm,.delete-cancel").click(function () {
        if ($(this).hasClass("delete-confirm")) {
            fromPost(data, getBasicUrl() + url, function (data) {
                if (data) {
                    //ShowHideModal("GroupModal");
                    $("#gvEmployees").data('kendoGrid').dataSource.read();
                    //console.log("A");
                }
            })
        }
        kendoWindow.data("kendoWindow").close();
    }).end();
}

function loadCombo(edit) {
    var dataDepartment = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: getBasicUrl() + "GetDepartments",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        options.success(result);
                    },
                    error: function (result) {
                        options.error(result);
                    }
                });
            }
        }
    });

    $("#cboDepartment").kendoDropDownList({
        optionLabel: '-- Please Select --',
        dataTextField: "PARAM_DESC",
        dataValueField: "ID",
        filter: "contains",
        dataSource: dataDepartment,
        selected: false
    });

    var parameter = {};
    if (edit === false) {
        parameter.DeptId = $("#cboDepartment").val();
    }
    else {
        parameter.DeptId = 0;
    }

    var dataJob = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: getBasicUrl() + "GetJobTitles",
                    data: JSON.stringify(parameter),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        options.success(result);
                    },
                    error: function (result) {
                        options.error(result);
                    }
                });
            }
        }
    });

    $("#cboJob").kendoDropDownList({
        optionLabel: '-- Please Select --',
        dataTextField: "PARAM_DESC",
        dataValueField: "ID",
        filter: "contains",
        dataSource: dataJob,
        selected: false
    });
}

function loadJobbyDepart() {
    var parameter = {};

    if ($("#cboDepartment").val() === "") {
        parameter.DeptId = 0;
    }
    else {
        parameter.DeptId = $("#cboDepartment").val();
    }

    var dataJob = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.ajax({
                    type: "POST",
                    url: getBasicUrl() + "GetJobTitles",
                    data: JSON.stringify(parameter),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        options.success(result);
                    },
                    error: function (result) {
                        options.error(result);
                    }
                });
            }
        }
    });

    $("#cboJob").kendoDropDownList({
        optionLabel: '-- Please Select --',
        dataTextField: "PARAM_DESC",
        dataValueField: "ID",
        filter: "contains",
        dataSource: dataJob,
        selected: false
    });
}