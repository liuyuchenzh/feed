var feed = (function() {
  var timeStamp = 0;
  var _feed = {
    profPicHtml: "<a href='{#href#}' target='_blank'>" +
                   "<img src='{#profPicSrc#}' alt='Profile Pic'>" +
                 "</a>",
    nameHtml: "<a href='{#href#}' target='_blank'>{#userName#}</a>",
    contentHtml: "<p>{#content#}</p>",
    imgHtml: "<img src='{#imgSrc#}' alt='Image'>",
    tailHtml: "<p>{#time#}</p>",
    formateHTML: function(str, data) {
      return str.replace(/\{#(\w+)#\}/g, function(match, prop) {
        return data[prop] !== undefined ? data[prop] : "";
      });
    },
    getTimeSpan: function(start, target) {
      var timeID = setTimeout(function _getTimeSpan() {
        var interval = 10000;
        var now = Date.now();
        var span = now - start;
        var sec = span / 1000;
        var min = sec / 60;
        var hour = min / 60;
        sec < 60 ?
          target.innerHTML = 10 * parseInt(sec / 10) + " sec ago" :
          min < 60 ?
            (function() {
              target.innerHTML = parseInt(min) + " min ago";
              interval = 60000;
            })() :
            hour < 3 ?
              (function() {
                target.innerHTML = parseInt(hour) + " hr ago";
                interval = 5 * 60000;
              })() :
              (function() {
                clearTimeout(timeID);
                var date = new Date(start);
                target.innerHTML = date.getFullYear() + "-" +
                                   (date.getMonth() + 1) + "-" +
                                   date.getDate() +
                                   " " +
                                   date.getHours() +
                                   ":" +
                                   date.getMinutes();
              })()
        timeID && (timeID = setTimeout(_getTimeSpan, interval));
      }, 10000);
    },
    init: function(data) {
      var container = document.createElement("div");
      var html = "";
      html =  "<div class='yuchen-feed-side'" +
                "<div class='yuchen-feed-profile-pic'>" +
                  this.profPicHtml +
                "</div>" +
              "</div>";
      html += "<div class='yuchen-feed-main'>"; // close at the end
      html += "<div class='yuchen-feed-name'>" +
                this.nameHtml +
              "</div>";
      html += "<div class='yuchen-feed-content'>" +
                this.contentHtml +
              "</div>";
      // image is optional
      if (data.imgSrc !== undefined) {
        html += "<div class='yuchen-feed-img'>" +
                  this.imgHtml +
                "</div>";
      }
      html += "<div class='yuchen-feed-tail'>" +
                this.tailHtml +
              "</div>";
      html += "</div>"; // close

      timeStamp = Date.now();
      data.time = "just now";
      html = this.formateHTML(html, data);
      container.innerHTML = html;
      container.className = "yuchen-feed";
      return container;
    },
    create: function(parent, data) {
      // content is required;
      // should be put in form validation part tho
      if (!data.content) {
        return alert("No content! Say something first!");
      }
      // alow anonymous user
      if (!data.userName) {
        data.userName = "Anonymous";
      }
      var feed = this.init(data);
      parent.appendChild(feed);
      var time = feed.querySelector(".yuchen-feed-tail p");
      this.getTimeSpan(timeStamp, time);
    }
  }

  for (var key in _feed) {
    Object.defineProperty(_feed, key, {
      writable: false
    });
  }

  return _feed;
})()
