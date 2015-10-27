var mlog = require('cloud/mlog');
var muser = require('cloud/muser');
var util = require('util');
var mutil = require('cloud/mutil');

var msgTypeText = -1;
var msgTypeImage = -2;
var msgTypeAudio = -3;
var msgTypeSticker = -4;
var msgTypeTule = -5;
var msgTypeEmotion = 1;

function messageReceived(req, res) {
  res.success();
}

function getPushMessage(params) {
  var contentStr = params.content;
  var json = {
    badge: "Increment",
    sound: "default",
    convid: params.convId     //来支持点击弹框，跳转至相应对话
    ,"_profile": "dev"      //设置证书，开发时用 dev，生产环境不设置
  };
  var msg = JSON.parse(contentStr);
  json.alert =contentStr;
  /*if (msg._lcattrs && msg._lcattrs.username) {
      if (type == msgTypeText) {
        json.alert = msg._lcattrs.username + ' : ' + msg._lctext;
      } else if (type == msgTypeImage) {
        json.alert = msg._lcattrs.username + ' 发来一张图片 ';
      } else if (type == msgTypeAudio) {
        json.alert = msg._lcattrs.username + ' 发来一段语音 ';
      } else if (type == msgTypeEmotion) {
        json.alert = msg._lcattrs.username + ' 发来一个表情 ';
      } else if (type == msgTypeSticker){
        json.alert = msg._lcattrs.username + ' 分享了一张贴纸给你 ';
      } else if (type == msgTypeTule){
        json.alert = msg._lcattrs.username + ' 分享了一张图片给你 ';
      } else {
        json.alert = '你收到了一条消息';
      }
      
  } else {
      json.alert = msg._lctext;
  }*/
  if (msg._lcattrs && msg._lcattrs.dev) {
    json._profile = "dev";
  }
  return JSON.stringify(json);
}

function receiversOffline(req, res) {
  if (req.params.convId) {
    // api v2
    try{
      var pushMessage = getPushMessage(req.params);
      res.success({pushMessage: pushMessage});
    } catch(err) {
      // json parse error
      res.success();
    }
  } else {
    console.log("receiversOffline , conversation id is null");
    res.success();
  }
}

function conversationStart(req,res){
  console.log('conversationStart');
  res.success();
}

function conversationRemove(req,res){
  console.log('conversationRemove');
  res.success();
}

function conversationAdd(req,res){
  console.log('conversationAdd');
  res.success();
}

exports.messageReceived = messageReceived;
exports.receiversOffline = receiversOffline; // used by main.js
exports.getPushMessage = getPushMessage;
exports.conversationStart=conversationStart;
exports.conversationRemove=conversationRemove;
exports.conversationAdd=conversationAdd;
