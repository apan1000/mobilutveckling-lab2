google.load("feeds", "1");
function initialize() {
    var feed = new google.feeds.Feed('http://www.rendip.com/rss');
    feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
    feed.setNumEntries(20);
    feed.load(function(result) {
    if (!result.error) {
      for (var i = 0; i < result.feed.entries.length; i++) {
        var entry = result.feed.entries[i];
        var mediaEntries = entry.xmlNode.getElementsByTagNameNS('*','thumbnail');
        for (var j = 0; j < mediaEntries.length; j++) {
            var mediaEntry = mediaEntries[j];
            var mediaThumbnailUrl = mediaEntry.attributes.getNamedItem('url').value;
            console.log(mediaThumbnailUrl);
            console.log(entry.title);
        }
        // Add facts to list
        $("#factlist")
        .append('<li data-title="'+entry.title+'" data-imgurl="'+mediaThumbnailUrl+'">'+
            '<a href="#pagetwo"><img src="'+mediaThumbnailUrl+'">'
            +entry.title+
            '</a></li>')
        .listview('refresh');
      }
      console.log(result.feed.entries);
        $("li").on("click",function(){
            console.log(this.dataset.title);
            $("#fact-head").text(this.dataset.title);
            $("#fact-content").html('<img src="'+this.dataset.imgurl+'">')
        });
    }
  });
}
google.setOnLoadCallback(initialize);