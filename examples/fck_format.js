// 获取编辑器中文字内容
function getEditorTextContents(EditorName) {
  var oEditor = CKEDITOR.instances[EditorName];
  return oEditor.getData();
}
// 设置编辑器中内容
function SetEditorContents(EditorName, ContentStr) {
  var oEditor = CKEDITOR.instances[EditorName];
  //oEditor.insertHtml(ContentStr); 
  oEditor.setData(ContentStr);
}

function DBC2SBC(str) {
  var result = '';
  for (var i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i);
    // “65281”是“！”，“65373”是“｝”，“65292”是“，”。不转换"，"

    if (code >= 65281 && code < 65373 && code != 65292 && code != 65306) {
      //  “65248”是转换码距
      result += String.fromCharCode(str.charCodeAt(i) - 65248);
    } else {
      result += str.charAt(i);
    }
  }
  return result;
}

String.prototype.trim = function () {
  return this.replace(/(^[\s　]*)|([\s　]*$)/g, "");
};

String.prototype.leftTrim = function () {
  return this.replace(/(^\s*)/g, "");
};

String.prototype.rightTrim = function () {
  return this.replace(/(\s*$)/g, "");
};
function processFormatText(textContext) {
  console.log('textContext:  processFormatText', textContext);
  var text = DBC2SBC(textContext);
  var prefix = "";
  var tmps = text.split("\n");
  var html = "";
  for (var i = 0; i < tmps.length; i++) {
    var tmp = tmps[i].trim();
    if (tmp.length > 0) {
      var reg = /#Format[A-Za-z]+_\d+#/gi;
      var f = reg.exec(tmp);
      if (f != null) {
        tmp = tmp.replace(/#Format[A-Za-z]+_\d+#/gi, '');
        html += f;
        if (tmp != "") {
          html += tmp;
        }

      } else {
        html += tmp;
      }
    }
  }
  return html;
}
function processFormatText2(textContext) {
  console.log('textContext: processFormatText2', textContext);
  var text = DBC2SBC(textContext);
  var prefix = "";
  var tmps = text.split("\n");
  var html = "";
  var paraStr = "";
  for (var i = 0; i < tmps.length; i++) {
    var tmp = tmps[i].trim();
    if (tmp.length > 0) {
      paraStr = "";
      var k = tmp.indexOf("#FormatStrongID_");
      if (k == -1) {
        paraStr = tmp;
      } else {
        for (; k != -1 && k <= tmp.length;) {
          if (k == 0) {
            var kend = tmp.indexOf("_FormatStrongID#", k + 16);
            paraStr += tmp.substr(k, kend - k + 16);
            tmp = tmp.substr(kend + 16);
            k = tmp.indexOf("#FormatStrongID_");
          } else {
            paraStr += tmp.substr(0, k);
            tmp = tmp.substr(k);
            k = tmp.indexOf("#FormatStrongID_");
          }
        }
        if (tmp.length > 0) {
          paraStr += tmp;
        }
      }
      html = paraStr;
      // html += "<p>" + paraStr + "</p>";
      // console.log('html: ', html);
    }
  }
  return html;
}
//自动排版
function FormatText(EditorName) {
  var html = getEditorTextContents(EditorName);
  html = doFormatText(html);
  //html = doFormatText(html);
  if (document.getElementById("ifblank") != null && document.getElementById("ifblank").checked) {
    console.log(1111)
    html = "<div style=\"text-indent:2em\">" + html + "</div>";
  }
  SetEditorContents(EditorName, html);
}
function doFormatText(editorhtml) {
  var tempimg = new Array();
  var temptable = new Array();
  var tempobject = new Array();
  var tmpDiv = document.createElement("DIV");
  editorhtml = editorhtml.replace(/<div style="page-break-after: always;?">\s*<span style="display: none;?">&nbsp;<\/span>\s*<\/div>/gi, '<p>[page]</p>');
  tmpDiv.innerHTML = editorhtml.replace(/&nbsp;/gi, '').replace(/<div/gi, '<p').replace(/<\/div/gi, '</p');


  if (window.navigator.userAgent.toLowerCase().indexOf("msie") > 0) {
    tmpDiv.innerHTML = tmpDiv.innerHTML.replace(/<\/p>/gi, '<br /><\/p>')

  }


  var tables = tmpDiv.getElementsByTagName("TABLE");
  if (tables != null && tables.length > 0) {
    for (var j = 0; j < tables.length; j++) {
      temptable[temptable.length] = tables[j].outerHTML;
    }
    var formattableCount = 0;
    for (var j = 0; j < tables.length;) {
      tables[j].outerHTML = "#FormatTableID_" + formattableCount + "#";
      formattableCount++;
    }
  }


  var objects = tmpDiv.getElementsByTagName("OBJECT");
  if (objects != null && objects.length > 0) {
    for (var j = 0; j < objects.length; j++) {
      tempobject[tempobject.length] = objects[j].outerHTML;
    }
    var formatobjectCount = 0;
    for (var j = 0; j < objects.length;) {
      objects[j].outerHTML = "#FormatObjectID_" + formatobjectCount + "#";
      formatobjectCount++;
    }
  }


  var imgs = tmpDiv.getElementsByTagName("IMG");
  if (imgs != null && imgs.length > 0) {
    for (var j = 0; j < imgs.length; j++) {
      var t = document.createElement("IMG");
      t.alt = imgs[j].alt;
      t.src = imgs[j].src;
      t.width = imgs[j].width;
      t.height = imgs[j].height;
      t.align = imgs[j].align;
      tempimg[tempimg.length] = t;
    }
    var formatImgCount = 0;
    for (var j = 0; j < imgs.length;) {
      imgs[j].outerHTML = "#FormatImgID_" + formatImgCount + "#";
      formatImgCount++;
    }
  }


  var strongarray = new Array();
  var strongcount = 0;
  for (var i = 0; i < tmpDiv.getElementsByTagName('b').length; i++) {
    strongarray[strongcount] = tmpDiv.getElementsByTagName('b')[i].innerText.trim();
    tmpDiv.getElementsByTagName('b')[i].innerHTML = "#FormatStrongID_" + strongcount + "_FormatStrongID#";
    strongcount++;
  }


  for (var i = 0; i < tmpDiv.getElementsByTagName('strong').length; i++) {
    strongarray[strongcount] = tmpDiv.getElementsByTagName('strong')[i].innerText.trim();
    tmpDiv.getElementsByTagName('strong')[i].innerHTML = "#FormatStrongID_" + strongcount + "_FormatStrongID#";
    strongcount++;
  }


  var html = processFormatText2(tmpDiv.innerHTML);
  console.log('html: processFormatText2', html);
  for (var i = 0; i < strongcount; i++) {
    html = html.replace("#FormatStrongID_" + i + "_FormatStrongID#", "<strong>" + strongarray[i] + "</strong>");
  }

  html = processFormatText(html);
  console.log('html: processFormatText', html);
  html = html.replace(/<p>\[page\]<\/p>/gi, '<div style="page-break-after: always;"><span style="display: none;">&nbsp;</span></div>');
  if (temptable != null && temptable.length > 0) {
    for (var j = 0; j < temptable.length; j++) {
      var tablehtml = temptable[j];
      html = html.replace("#FormatTableID_" + j + "#", tablehtml);
    }
  }

  if (tempobject != null && tempobject.length > 0) {
    for (var j = 0; j < tempobject.length; j++) {
      var objecthtml = "<p align=\"center\">" + tempobject[j] + "</p>";
      html = html.replace("#FormatObjectID_" + j + "#", objecthtml);
    }
  }

  if (tempimg != null && tempimg.length > 0) {
    for (var j = 0; j < tempimg.length; j++) {
      var imgheight = "";
      var imgwidth = "";
      if (tempimg[j].height != 0) imaheight = " height=\"" + tempimg[j].height + "\"";
      if (tempimg[j].width != 0) imgwidth = " width=\"" + tempimg[j].width + "\"";
      var imgalign = "";
      if (tempimg[j].align != "") imgalign = " align=\"" + tempimg[j].align + "\"";
      var imghtml = "<p align=\"center\"><img src=\"" + tempimg[j].src + "\" alt=\"" + tempimg[j].alt + "\"" + imgwidth + " " + imgheight + " align=\"" + tempimg[j].align + "\" border=\"0\"></p>";
      html = html.replace("#FormatImgID_" + j + "#", imghtml);
    }
  }

  // while (html.indexOf("</p></p>") != -1) html = html.replace("</p></p>", "</p>");
  // while (html.indexOf('<p><p align="center">') != -1) html = html.replace('<p><p align="center">', '<p align="center">');

  return html;
}
