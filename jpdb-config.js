/* ══════════════════════════════════════════════
   jpdb-config.js
   JsonPowerDB Configuration & All API Functions
   Works on both localhost AND GitHub Pages
   ══════════════════════════════════════════════ */

/* ── CONFIG ─────────────────────────────────── */
var TOKEN    = "90935188|-31949239798991463|90958760";
var DB_NAME  = "SCHOOL-DB";
var REL_NAME = "STUDENT-TABLE";
var BASE_URL = "http://api.login2explore.com:5577";
var IML      = "/api/iml";
var IRL      = "/api/irl";

var currentRecNo = null;

/* ══════════════════════════════════════════════
   CORE — JSONP call (bypasses CORS on GitHub Pages)
   ══════════════════════════════════════════════ */
function executeCommand(reqObj, endpoint) {
    var result = null;

    $.ajax({
        url      : BASE_URL + endpoint,
        type     : "POST",
        data     : JSON.stringify(reqObj),
        dataType : "jsonp",        // JSONP bypasses CORS
        async    : false,
        success  : function (res) {
            result = res;
        },
        error    : function (xhr, status, err) {
            try   { result = JSON.parse(xhr.responseText); }
            catch (e) { result = { status: 0, message: "Error: " + err }; }
        }
    });
    return result;
}

/* ══════════════════════════════════════════════
   BUILD REQUEST OBJECTS
   jsonStr must be a plain object — NOT a string
   ══════════════════════════════════════════════ */
function buildPUT(dataObj) {
    return {
        token  : TOKEN,
        cmd    : "PUT",
        dbName : DB_NAME,
        rel    : REL_NAME,
        jsonStr: dataObj
    };
}

function buildGET(keyObj) {
    return {
        token  : TOKEN,
        cmd    : "GET_BY_KEY",
        dbName : DB_NAME,
        rel    : REL_NAME,
        jsonStr: keyObj
    };
}

function buildUPDATE(dataObj, recNo) {
    return {
        token  : TOKEN,
        cmd    : "UPDATE",
        dbName : DB_NAME,
        rel    : REL_NAME,
        recNo  : recNo,
        jsonStr: dataObj
    };
}

/* ══════════════════════════════════════════════
   GET FORM VALUES AS PLAIN OBJECT
   ══════════════════════════════════════════════ */
function getFormObj() {
    return {
        rollNo         : $("#rollNo").val().trim(),
        fullName       : $("#fullName").val().trim(),
        "class"        : $("#studentClass").val().trim(),
        birthDate      : $("#birthDate").val(),
        address        : $("#address").val().trim(),
        enrollmentDate : $("#enrollmentDate").val()
    };
}

/* ══════════════════════════════════════════════
   FILL FORM FROM RECORD
   ══════════════════════════════════════════════ */
function fillForm(rec) {
    $("#fullName").val(rec.fullName             || "");
    $("#studentClass").val(rec["class"]         || "");
    $("#birthDate").val(rec.birthDate           || "");
    $("#address").val(rec.address               || "");
    $("#enrollmentDate").val(rec.enrollmentDate || "");
}

/* ══════════════════════════════════════════════
   VALIDATION
   ══════════════════════════════════════════════ */
function validate() {
    var fields = [
        { id: "rollNo",         label: "Roll No" },
        { id: "fullName",       label: "Full Name" },
        { id: "studentClass",   label: "Class" },
        { id: "birthDate",      label: "Birth Date" },
        { id: "address",        label: "Address" },
        { id: "enrollmentDate", label: "Enrollment Date" }
    ];
    for (var i = 0; i < fields.length; i++) {
        if ($("#" + fields[i].id).val().trim() === "") {
            alert(fields[i].label + " is required!");
            $("#" + fields[i].id).focus();
            return false;
        }
    }
    return true;
}

/* ══════════════════════════════════════════════
   UI HELPERS
   ══════════════════════════════════════════════ */
function showMsg(msg, type) {
    $("#message").html(
        '<div class="alert alert-' + (type || "success") + '" style="margin-top:15px">'
        + msg + '</div>'
    );
}

function setButtons(state) {
    if (state === "found") {
        $("#saveBtn").prop("disabled", true);
        $("#updateBtn").prop("disabled", false);
        $("#rollNo").prop("disabled", true);
    } else {
        $("#saveBtn").prop("disabled", false);
        $("#updateBtn").prop("disabled", true);
        $("#rollNo").prop("disabled", false);
    }
}

/* ══════════════════════════════════════════════
   SAVE
   ══════════════════════════════════════════════ */
function saveStudent() {
    if (!validate()) return;

    showMsg("&#9203; Saving...", "info");

    var result = executeCommand(buildPUT(getFormObj()), IML);
    console.log("SAVE:", result);

    if (result && result.status === 200) {
        try {
            var d = (typeof result.data === "string") ? JSON.parse(result.data) : result.data;
            currentRecNo = Array.isArray(d.rec_no) ? d.rec_no[0] : d.rec_no;
        } catch (e) { currentRecNo = null; }

        showMsg("&#10004; Student saved successfully! Rec No: " + currentRecNo, "success");
        setButtons("found");
    } else {
        var msg = (result && result.message) ? result.message : JSON.stringify(result);
        showMsg("&#10008; Save failed: " + msg, "danger");
    }
}

/* ══════════════════════════════════════════════
   SEARCH
   ══════════════════════════════════════════════ */
function searchStudent() {
    var roll = $("#rollNo").val().trim();
    if (!roll) { alert("Enter Roll No to search!"); $("#rollNo").focus(); return; }

    showMsg("&#9203; Searching...", "info");

    var result = executeCommand(buildGET({ rollNo: roll }), IRL);
    console.log("SEARCH:", result);

    if (!result || result.status !== 200) {
        var msg = (result && result.message) ? result.message : "Not found";
        showMsg("&#10008; No record found for Roll No: <b>" + roll + "</b>", "danger");
        currentRecNo = null;
        setButtons("empty");
        return;
    }

    try {
        var d   = (typeof result.data === "string") ? JSON.parse(result.data) : result.data;
        var rec = d.record || d;
        currentRecNo = d.rec_no || null;

        fillForm(rec);
        setButtons("found");
        showMsg("&#10004; Record found! You can now update.", "success");
    } catch (e) {
        showMsg("&#10008; Parse error: " + e.message, "danger");
    }
}

/* ══════════════════════════════════════════════
   UPDATE
   ══════════════════════════════════════════════ */
function updateStudent() {
    if (!validate()) return;
    if (!currentRecNo) { alert("Please Search first, then update."); return; }

    showMsg("&#9203; Updating...", "info");

    var result = executeCommand(buildUPDATE(getFormObj(), currentRecNo), IML);
    console.log("UPDATE:", result);

    if (result && result.status === 200) {
        showMsg("&#10004; Student updated successfully!", "success");
    } else {
        var msg = (result && result.message) ? result.message : JSON.stringify(result);
        showMsg("&#10008; Update failed: " + msg, "danger");
    }
}

/* ══════════════════════════════════════════════
   RESET
   ══════════════════════════════════════════════ */
function resetForm() {
    $("#studentForm")[0].reset();
    $("#message").html("");
    currentRecNo = null;
    setButtons("empty");
}
